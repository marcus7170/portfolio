/**
 * Cloudflare Worker: Notificador Oficial de Visitas no Telegram
 * Marcus Vinícius Soares da Silva (Marcus7170)
 * 
 * Vantagens do Telegram:
 * - 100% Gratuito, oficial da plataforma, sem limite de mensagens e nunca fica cheio
 * - Notificações push em tempo real no celular (iOS / Android / Desktop)
 * - Formatação segura em HTML (imune a erros de parse com caracteres especiais)
 * - Geolocalização nativa de borda da Cloudflare (Cidade, Estado, País, Provedor ISP)
 * - Rate-limiting por IP (anti-spam de 20 minutos) e filtro de robôs/crawlers
 */

const ipCooldownMap = new Map();
const RATE_LIMIT_MS = 20 * 60 * 1000; // 20 minutos por IP

export default {
    async fetch(request, env) {
        // 1. Trata CORS Preflight (OPTIONS)
        if (request.method === 'OPTIONS') {
            return handleCors();
        }

        const url = new URL(request.url);
        if (request.method !== 'POST' || (url.pathname !== '/visit' && url.pathname !== '/')) {
            return new Response('Not Found', { status: 404 });
        }

        try {
            const body = await request.json();
            const clientIp = request.headers.get('cf-connecting-ip') || 'Desconhecido';
            const userAgent = body.userAgent || request.headers.get('user-agent') || '';

            // 2. Filtro de Bots (Googlebot, Bing, Scanners, Lighthouse)
            const isBot = /bot|crawler|spider|crawling|lighthouse|headless|curl|wget|python|postman/i.test(userAgent);
            if (isBot) {
                return new Response(JSON.stringify({ status: 'ignored', reason: 'Bot detectado' }), {
                    headers: corsHeaders()
                });
            }

            // 3. Rate-Limiting por IP (Anti-Spam)
            const now = Date.now();
            const lastSeen = ipCooldownMap.get(clientIp);
            if (lastSeen && (now - lastSeen) < RATE_LIMIT_MS) {
                return new Response(JSON.stringify({ status: 'rate_limited', reason: 'IP em cooldown' }), {
                    headers: corsHeaders()
                });
            }
            ipCooldownMap.set(clientIp, now);

            if (ipCooldownMap.size > 1000) {
                ipCooldownMap.clear();
            }

            // 4. Dados Geográficos da Borda da Cloudflare
            const cf = request.cf || {};
            const city = cf.city || 'Cidade Desconhecida';
            const region = cf.region || cf.regionCode || '';
            const country = cf.country || 'BR';
            const isp = cf.asOrganization || cf.asn || 'Provedor';

            // 5. Origem Formatada (99Freelas, LinkedIn, etc.)
            const originInfo = formatOrigin(body.referrer, body.customRef);

            // 6. Horário de Brasília
            const brasiliaTime = new Date().toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            // 7. Montagem da Mensagem em HTML Seguro (Evita quebra por caracteres como _ ou &)
            const messageHtml = [
                '🚨 <b>NOVO ACESSO NO PORTFÓLIO!</b>',
                '',
                `📍 <b>Local:</b> ${escapeHtml(city)}${region ? ', ' + escapeHtml(region) : ''} - ${escapeHtml(country)} (${escapeHtml(isp)})`,
                `🔗 <b>Origem:</b> ${escapeHtml(originInfo)}`,
                `💻 <b>Dispositivo:</b> ${escapeHtml(body.deviceType || 'Desktop')} (${escapeHtml(body.screenResolution || 'N/A')})`,
                `🌐 <b>Idioma:</b> ${escapeHtml(body.language || 'pt-BR')}`,
                `⏰ <b>Horário:</b> ${brasiliaTime}`
            ].join('\n');

            // 8. Validação das Credenciais do Telegram (com suas credenciais já configuradas)
            const botToken = env.TELEGRAM_BOT_TOKEN || '8664127545:AAGwDC5VnXm-n9UfN56GI4uvTKUFAArhXZI';
            const chatId = env.TELEGRAM_CHAT_ID || '5982643537';

            if (!botToken || !chatId) {
                console.error('Credenciais do Telegram não configuradas no Worker.');
                return new Response(JSON.stringify({ 
                    error: 'Configure TELEGRAM_BOT_TOKEN e TELEGRAM_CHAT_ID nas variáveis de ambiente do Cloudflare Worker.' 
                }), {
                    status: 500,
                    headers: corsHeaders()
                });
            }

            // 9. Envio para a API Oficial do Telegram
            const tgUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
            const tgPayload = {
                chat_id: chatId,
                text: messageHtml,
                parse_mode: 'HTML',
                disable_web_page_preview: true
            };

            // Se a visita veio de uma URL com link, adiciona botão inline direto no Telegram
            if (body.referrer && body.referrer.startsWith('http')) {
                tgPayload.reply_markup = {
                    inline_keyboard: [
                        [{ text: '🔗 Ver Link de Origem', url: body.referrer }]
                    ]
                };
            }

            const tgResponse = await fetch(tgUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tgPayload)
            });

            const tgData = await tgResponse.json();

            return new Response(JSON.stringify({ 
                success: tgResponse.ok, 
                telegramStatus: tgResponse.status,
                data: tgData
            }), {
                headers: corsHeaders()
            });

        } catch (err) {
            console.error('Erro ao processar notificação:', err);
            return new Response(JSON.stringify({ error: err.message }), {
                status: 500,
                headers: corsHeaders()
            });
        }
    }
};

function formatOrigin(referrer, customRef) {
    if (customRef) {
        return `🎯 Campanha Direta (${customRef})`;
    }
    if (!referrer || referrer === '') {
        return '🔗 Acesso Direto / Mensagem';
    }
    try {
        const refUrl = new URL(referrer);
        const host = refUrl.hostname.toLowerCase();
        
        if (host.includes('99freelas')) return '💼 99Freelas';
        if (host.includes('linkedin')) return '💼 LinkedIn';
        if (host.includes('github')) return '🐙 GitHub';
        if (host.includes('google')) return '🔍 Busca Google';
        if (host.includes('whatsapp') || host.includes('wa.me')) return '💬 WhatsApp';
        if (host.includes('instagram')) return '📸 Instagram';
        
        return `🌐 ${refUrl.hostname}`;
    } catch {
        return referrer.slice(0, 50);
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function corsHeaders() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };
}

function handleCors() {
    return new Response(null, {
        status: 204,
        headers: corsHeaders()
    });
}
