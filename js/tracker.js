/**
 * Portfolio Visit Tracker & Notification Dispatcher
 * Marcus Vinícius Soares da Silva (Marcus7170)
 * 
 * Envia notificação segura via Cloudflare Worker para o WhatsApp quando alguém acessa o portfólio.
 * Possui proteções anti-spam, anti-F5, filtro de bots e detecção de origem (99Freelas, LinkedIn, etc.)
 */

(() => {
    // ⚙️ CONFIGURAÇÃO
    // URL do seu Cloudflare Worker publicado
    const WORKER_ENDPOINT = 'https://portfolio-notifier.marcussoares527.workers.dev/visit';
    
    // Tempo mínimo que o usuário deve ficar na página antes do disparo (filtra bots rápidos de bounce)
    const DWELL_TIME_MS = 2500;
    
    // Cooldown para o mesmo navegador (em horas) para não mandar mensagem repetida do mesmo visitante
    const COOLDOWN_HOURS = 2;

    // 1. Verificações de Elegibilidade (Anti-Spam / Anti-Loop)
    function shouldTrack() {
        const urlParams = new URLSearchParams(window.location.search);
        const isTestMode = urlParams.get('test') === 'true';

        // Se for teste forçado via URL (?test=true), permite rodar mesmo em localhost
        if (isTestMode) {
            console.log('[Tracker] Modo de teste ativado via parâmetro ?test=true');
            return true;
        }

        // Ignora ambiente de desenvolvimento local para você não receber mensagens enquanto programa
        const isLocal = window.location.hostname === 'localhost' ||
                        window.location.hostname === '127.0.0.1' ||
                        window.location.protocol === 'file:';
        if (isLocal) {
            console.log('[Tracker] Ambiente local detectado. Notificação desativada (use ?test=true para testar).');
            return false;
        }

        // Ignora navegadores automatizados conhecidos (Lighthouse, Puppeteer, Selenium)
        if (navigator.webdriver) {
            return false;
        }

        // Anti-F5: Verifica se já notificou na sessão atual do navegador
        if (sessionStorage.getItem('portfolio_visited_session')) {
            console.log('[Tracker] Visita já notificada nesta sessão de navegação.');
            return false;
        }

        // Cooldown: Verifica se notificou recentemente no mesmo dispositivo
        const lastVisit = localStorage.getItem('portfolio_last_visit_time');
        if (lastVisit) {
            const hoursSince = (Date.now() - parseInt(lastVisit, 10)) / (1000 * 60 * 60);
            if (hoursSince < COOLDOWN_HOURS) {
                console.log(`[Tracker] Visita ignorada pelo cooldown (${hoursSince.toFixed(1)}h desde a última).`);
                return false;
            }
        }

        return true;
    }

    // 2. Coleta de Metadados do Visitante
    function collectVisitorData() {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Origem de campanha ou referência direta
        const refParam = urlParams.get('ref') || urlParams.get('utm_source') || '';
        const referrer = document.referrer || '';
        
        // Identificação simples de tipo de dispositivo
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const deviceType = isMobile ? 'Mobile' : 'Desktop';

        return {
            referrer: referrer,
            customRef: refParam,
            deviceType: deviceType,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            language: navigator.language || 'pt-BR',
            userAgent: navigator.userAgent,
            pathname: window.location.pathname || '/',
            title: document.title,
            timestamp: new Date().toISOString()
        };
    }

    // 3. Envio da Notificação para o Cloudflare Worker
    async function sendVisitNotification() {
        if (!shouldTrack()) return;

        const data = collectVisitorData();

        try {
            // Marca como visitado antes do fetch para evitar requisições concorrentes
            sessionStorage.setItem('portfolio_visited_session', 'true');
            localStorage.setItem('portfolio_last_visit_time', Date.now().toString());

            const response = await fetch(WORKER_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                keepalive: true
            });

            if (response.ok) {
                console.log('[Tracker] Notificação de visita enviada com sucesso!');
            } else {
                console.warn('[Tracker] Servidor retornou status:', response.status);
            }
        } catch (error) {
            console.error('[Tracker] Falha silenciosa ao enviar notificação:', error);
        }
    }

    // 4. Inicialização após carregamento e tempo de permanência mínimo
    window.addEventListener('load', () => {
        setTimeout(sendVisitNotification, DWELL_TIME_MS);
    });

})();
