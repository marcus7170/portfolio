

(() => {

    const WORKER_ENDPOINT = 'https://portfolio-notifier.marcussoares527.workers.dev/visit';

    const DWELL_TIME_MS = 2500;

    const COOLDOWN_HOURS = 2;

    function shouldTrack() {
        const urlParams = new URLSearchParams(window.location.search);
        const isTestMode = urlParams.get('test') === 'true';

        if (isTestMode) {
            console.log('[Tracker] Modo de teste ativado via parâmetro ?test=true');
            return true;
        }

        const isLocal = window.location.hostname === 'localhost' ||
                        window.location.hostname === '127.0.0.1' ||
                        window.location.protocol === 'file:';
        if (isLocal) {
            console.log('[Tracker] Ambiente local detectado. Notificação desativada (use ?test=true para testar).');
            return false;
        }

        if (navigator.webdriver) {
            return false;
        }

        if (sessionStorage.getItem('portfolio_visited_session')) {
            console.log('[Tracker] Visita já notificada nesta sessão de navegação.');
            return false;
        }

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

    function collectVisitorData() {
        const urlParams = new URLSearchParams(window.location.search);

        const refParam = urlParams.get('ref') || urlParams.get('utm_source') || '';
        const referrer = document.referrer || '';

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

    async function sendVisitNotification() {
        if (!shouldTrack()) return;

        const data = collectVisitorData();

        try {
            
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

    window.addEventListener('load', () => {
        setTimeout(sendVisitNotification, DWELL_TIME_MS);
    });

})();
