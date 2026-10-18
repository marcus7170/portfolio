
(() => {
    const WORKER_ENDPOINT = 'https://portfolio-notifier.marcussoares527.workers.dev/visit';
    const DWELL_TIME_MS = 800;
    const COOLDOWN_HOURS = 2;

    let hasExecuted = false;

    function shouldTrack() {
        const urlParams = new URLSearchParams(window.location.search);
        const refParam = (urlParams.get('ref') || urlParams.get('utm_source') || '').toLowerCase();
        const isTestMode = urlParams.get('test') === 'true';
        const isCampaign = refParam.length > 0;

        const referrer = (document.referrer || '').toLowerCase();
        const ua = (navigator.userAgent || '').toLowerCase();
        const isLinkedIn = refParam.includes('linkedin') || 
                           referrer.includes('linkedin') || 
                           referrer.includes('lnkd.in') || 
                           ua.includes('linkedin');

        if (isTestMode || isCampaign || isLinkedIn) {
            return true;
        }

        const isLocal = window.location.hostname === 'localhost' ||
                        window.location.hostname === '127.0.0.1' ||
                        window.location.protocol === 'file:';
        if (isLocal) {
            return false;
        }

        if (navigator.webdriver) {
            return false;
        }

        if (sessionStorage.getItem('portfolio_visited_session')) {
            return false;
        }

        const lastVisit = localStorage.getItem('portfolio_last_visit_time');
        if (lastVisit) {
            const hoursSince = (Date.now() - parseInt(lastVisit, 10)) / (1000 * 60 * 60);
            if (hoursSince < COOLDOWN_HOURS) {
                return false;
            }
        }

        return true;
    }

    function collectVisitorData() {
        const urlParams = new URLSearchParams(window.location.search);
        let refParam = urlParams.get('ref') || urlParams.get('utm_source') || '';
        const referrer = document.referrer || '';
        const ua = navigator.userAgent || '';

        if (!refParam) {
            if (ua.toLowerCase().includes('linkedin')) {
                refParam = 'linkedin_app';
            } else if (referrer.toLowerCase().includes('linkedin') || referrer.toLowerCase().includes('lnkd.in')) {
                refParam = 'linkedin';
            }
        }

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
        const deviceType = isMobile ? 'Mobile' : 'Desktop';

        return {
            referrer: referrer,
            customRef: refParam,
            deviceType: deviceType,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            language: navigator.language || 'pt-BR',
            userAgent: ua,
            pathname: window.location.pathname || '/',
            title: document.title,
            timestamp: new Date().toISOString()
        };
    }

    async function sendVisitNotification() {
        if (hasExecuted) return;
        if (!shouldTrack()) return;
        hasExecuted = true;

        const data = collectVisitorData();

        try {
            sessionStorage.setItem('portfolio_visited_session', 'true');
            localStorage.setItem('portfolio_last_visit_time', Date.now().toString());

            await fetch(WORKER_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                keepalive: true
            });
        } catch (error) {
        }
    }

    function scheduleTracking() {
        setTimeout(sendVisitNotification, DWELL_TIME_MS);
    }

    if (document.readyState === 'complete') {
        scheduleTracking();
    } else {
        window.addEventListener('load', scheduleTracking);
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(sendVisitNotification, 1500);
        });
    }
})();

