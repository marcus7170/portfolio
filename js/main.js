/**
 * Main Interactive Logic for Portfolio v2
 * Marcus Vinícius Soares da Silva (Marcus7170)
 */

document.addEventListener('DOMContentLoaded', () => {
    initProjectsGrid();
    initProjectFilters();
    initTerminalTabs();
    initNavbarScroll();
    initCopyButtons();
});

// 1. Renderização dos Projetos a partir de PROJECTS_DATA
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

    // Se o ScrollTrigger estiver ativo, recalcula após render
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
}

// 2. Filtros de Projetos por Categoria
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

// 3. Terminal Interativo de Código
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

        // Animação de digitação/transição suave com GSAP
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

    // Carrega o primeiro snippet como padrão
    loadSnippet('pool');
}

// 4. Copiar Código do Terminal & Contatos
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

    // Botões de cópia rápida no rodapé
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

// Toast de Feedback
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

// 5. Navbar Scroll Effect & Mobile Menu
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

    // Smooth scroll para links internos
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
