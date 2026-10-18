

document.addEventListener('DOMContentLoaded', () => {
    initProjectsGrid();
    initProjectFilters();
    initTerminalTabs();
    initNavbarScroll();
    initCopyButtons();
    initTelemetryWidget();
    initDefenseSystem();
});

function initProjectsGrid() {
    const grid = document.getElementById('projects-grid');
    if (!grid || typeof PROJECTS_DATA === 'undefined') return;

    grid.innerHTML = '';

    PROJECTS_DATA.forEach(proj => {
        const card = document.createElement('div');
        card.className = `project-card tilt-card ${proj.category} ${proj.featured ? 'featured-card' : ''}`;
        card.setAttribute('data-category', proj.category);

        let metricsHtml = '';
        if (proj.metrics && proj.metrics.length > 0) {
            metricsHtml = `
                <div class="project-metrics-grid">
                    ${proj.metrics.map(m => `
                        <div class="p-metric-item">
                            <span class="p-metric-val">${m.value}</span>
                            <span class="p-metric-lbl">${m.label}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        let tagsHtml = proj.tags.map(t => `<span class="tech-tag">${t}</span>`).join('');

        let linksHtml = '';
        if (proj.github) {
            linksHtml += `<a href="${proj.github}" target="_blank" rel="noopener" class="card-btn card-btn-secondary"><i class="bi bi-github"></i> Código</a>`;
        }
        if (proj.live) {
            linksHtml += `<a href="${proj.live}" target="_blank" rel="noopener" class="card-btn card-btn-primary"><i class="bi bi-box-arrow-up-right"></i> Acessar</a>`;
        }

        card.innerHTML = `
            <div class="card-top-bar">
                <span class="category-badge">${proj.categoryLabel}</span>
                <span class="status-badge-mini">${proj.badge}</span>
            </div>
            <h3 class="project-title">${proj.title}</h3>
            <p class="project-desc">${proj.description}</p>
            ${metricsHtml}
            <div class="project-tags">${tagsHtml}</div>
            <div class="card-actions">${linksHtml}</div>
        `;

        grid.appendChild(card);
    });

    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
}

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (!filterButtons.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            const cards = document.querySelectorAll('.project-card');

            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    if (typeof gsap !== 'undefined') {
                        gsap.fromTo(card, { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.4 });
                    }
                } else {
                    card.style.display = 'none';
                }
            });

            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        });
    });
}

function initTerminalTabs() {
    const tabButtons = document.querySelectorAll('.terminal-tab');
    const codeEl = document.getElementById('terminal-code-content');
    const filenameEl = document.getElementById('terminal-filename');
    const descEl = document.getElementById('terminal-description');

    if (!tabButtons.length || !codeEl || typeof CODE_SNIPPETS === 'undefined') return;

    function loadSnippet(key) {
        const snippet = CODE_SNIPPETS[key];
        if (!snippet) return;

        if (filenameEl) filenameEl.textContent = snippet.filename;
        if (descEl) descEl.textContent = snippet.description;

        codeEl.textContent = snippet.code;

        if (typeof gsap !== 'undefined') {
            gsap.fromTo(codeEl, { opacity: 0.3 }, { opacity: 1, duration: 0.3 });
        }
    }

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const snippetKey = btn.getAttribute('data-snippet');
            loadSnippet(snippetKey);
        });
    });

    loadSnippet('pool');
}

function initCopyButtons() {
    const copyTerminalBtn = document.getElementById('btn-copy-code');
    const codeEl = document.getElementById('terminal-code-content');

    if (copyTerminalBtn && codeEl) {
        copyTerminalBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(codeEl.textContent).then(() => {
                showToast("Código copiado para a área de transferência!");
            });
        });
    }

    const copyEmailBtn = document.getElementById('btn-copy-email');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText('marcussoares527@gmail.com').then(() => {
                showToast("E-mail copiado: marcussoares527@gmail.com");
            });
        });
    }
}

function showToast(message) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'app-toast';
        toast.className = 'app-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

function initNavbarScroll() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initTelemetryWidget() {
    const toast = document.getElementById('telemetry-toast');
    const pill = document.getElementById('telemetry-pill');
    const btnClose = document.getElementById('btn-close-telemetry');
    const btnDismiss = document.getElementById('btn-telemetry-dismiss');
    const btnToTerminal = document.getElementById('btn-telemetry-to-terminal');

    if (!toast) return;

    const timeEl = document.getElementById('tg-mockup-time');
    const geoEl = document.getElementById('tg-mockup-geo');
    const refEl = document.getElementById('tg-mockup-ref');
    const deviceEl = document.getElementById('tg-mockup-device');

    if (timeEl) {
        timeEl.textContent = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }

    if (deviceEl) {
        const isMobile = window.innerWidth <= 768;
        deviceEl.textContent = `${isMobile ? 'Mobile' : 'Desktop'} (${window.screen.width}x${window.screen.height})`;
    }

    if (refEl) {
        const referrer = document.referrer ? document.referrer.toLowerCase() : '';
        if (referrer.includes('99freelas')) refEl.textContent = '💼 99Freelas';
        else if (referrer.includes('linkedin')) refEl.textContent = '💼 LinkedIn';
        else if (referrer.includes('github')) refEl.textContent = '🐙 GitHub';
        else if (referrer.includes('google')) refEl.textContent = '🔍 Busca Google';
        else refEl.textContent = '🔗 Acesso Direto / Link';
    }

    const isDismissed = sessionStorage.getItem('telemetry_toast_closed') === 'true';

    if (isDismissed) {
        if (pill) pill.classList.add('active');
    } else {
        setTimeout(() => {
            toast.classList.add('active');
            toast.setAttribute('aria-hidden', 'false');
        }, 3500);
    }

    function closeToast() {
        toast.classList.remove('active');
        toast.setAttribute('aria-hidden', 'true');
        if (pill) pill.classList.add('active');
        sessionStorage.setItem('telemetry_toast_closed', 'true');
    }

    if (btnClose) btnClose.addEventListener('click', closeToast);
    if (btnDismiss) btnDismiss.addEventListener('click', closeToast);

    if (pill) {
        pill.addEventListener('click', () => {
            pill.classList.remove('active');
            toast.classList.add('active');
            toast.setAttribute('aria-hidden', 'false');
        });
    }

    if (btnToTerminal) {
        btnToTerminal.addEventListener('click', () => {
            closeToast();

            const tgTab = document.querySelector('.terminal-tab[data-snippet="telegram_bot"]');
            if (tgTab) {
                tgTab.click();
            }

            const terminalSection = document.getElementById('terminal-section');
            if (terminalSection) {
                terminalSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
}

function initDefenseSystem() {
    const modal = document.getElementById('defense-modal');
    const triggerNameEl = document.getElementById('defense-trigger-name');
    const btnClose = document.getElementById('btn-close-defense');
    const btnDismiss = document.getElementById('btn-defense-dismiss');
    const backdrop = document.getElementById('defense-modal-backdrop');
    const btnToTerminal = document.getElementById('btn-defense-to-terminal');
    const devTagBtn = document.getElementById('dev-tag-f12');
    const btnInlineTest = document.getElementById('btn-test-defense-click');

    if (!modal) return;

    function openDefenseModal(triggerReason) {
        if (triggerNameEl) {
            triggerNameEl.textContent = triggerReason || 'Atalho F12 / DevTools';
        }
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');

        if (navigator.vibrate) {
            navigator.vibrate([40, 60, 40]);
        }
    }

    function closeDefenseModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }

    window.addEventListener('keydown', (e) => {
        const isF12 = e.key === 'F12' || e.keyCode === 123;
        const isInspect = (e.ctrlKey || e.metaKey) && e.shiftKey && 
                          (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c');
        const isViewSource = (e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U');

        if (isF12) {
            e.preventDefault();
            e.stopPropagation();
            openDefenseModal('Tecla F12 (DevTools)');
            return false;
        }

        if (isInspect) {
            e.preventDefault();
            e.stopPropagation();
            openDefenseModal('Atalho de Inspeção (Ctrl+Shift+' + e.key.toUpperCase() + ')');
            return false;
        }

        if (isViewSource) {
            e.preventDefault();
            e.stopPropagation();
            openDefenseModal('Exibir Código Fonte (Ctrl+U)');
            return false;
        }

        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeDefenseModal();
        }
    }, true);

    window.addEventListener('contextmenu', (e) => {
        
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        e.preventDefault();
        openDefenseModal('Clique com Botão Direito (Inspecionar)');
    }, true);

    if (devTagBtn) {
        devTagBtn.addEventListener('click', () => {
            openDefenseModal('Demonstração Interativa (Tag Hero)');
        });
    }

    if (btnInlineTest) {
        btnInlineTest.addEventListener('click', () => {
            openDefenseModal('Simulação de Boas Práticas de Defesa');
        });
    }

    if (btnClose) btnClose.addEventListener('click', closeDefenseModal);
    if (btnDismiss) btnDismiss.addEventListener('click', closeDefenseModal);
    if (backdrop) backdrop.addEventListener('click', closeDefenseModal);

    if (btnToTerminal) {
        btnToTerminal.addEventListener('click', () => {
            closeDefenseModal();
            const terminalSection = document.getElementById('terminal-section');
            if (terminalSection) {
                terminalSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
}
