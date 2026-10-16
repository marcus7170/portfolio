/**
 * UI Animations & Micro-interactions — GSAP & ScrollTrigger
 * Marcus Vinícius (Marcus7170)
 * Orquestração de timelines, contadores com scrub e efeitos 3D interativos
 */

(function () {
    // 1. Registro seguro do ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    } else {
        console.warn("[GSAP] Bibliotecas GSAP ou ScrollTrigger não detectadas.");
        return;
    }

    // Configuração global de defaults
    gsap.defaults({
        ease: "power2.out",
        duration: 0.8
    });

    // 2. Sistema Responsivo & Acessibilidade (gsap.matchMedia)
    const mm = gsap.matchMedia();

    mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
        reduceMotion: "(prefers-reduced-motion: reduce)"
    }, (context) => {
        const { isDesktop, reduceMotion } = context.conditions;

        if (reduceMotion) {
            // Acessibilidade: exibe os elementos sem movimentação brusca
            gsap.set(".hero-reveal, .metric-card, .project-card, .timeline-card", {
                autoAlpha: 1,
                y: 0
            });
            return;
        }

        // --- A. TIMELINE DO HERO SECTION (Snappy & Fluid) ---
        const heroTl = gsap.timeline();

        heroTl.from(".hero-badge", {
            y: -15,
            autoAlpha: 0,
            duration: 0.4,
            ease: "power2.out"
        })
        .from(".hero-title-line", {
            y: 25,
            autoAlpha: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out"
        }, "-=0.2")
        .from(".hero-subtitle", {
            y: 15,
            autoAlpha: 0,
            duration: 0.4,
            ease: "power2.out"
        }, "-=0.2")
        .from(".hero-cta-group", {
            y: 15,
            autoAlpha: 0,
            duration: 0.4,
            ease: "power2.out"
        }, "-=0.2")
        .from(".hero-dev-card", {
            scale: 0.95,
            autoAlpha: 0,
            duration: 0.5,
            ease: "back.out(1.2)"
        }, "-=0.3");

        // --- B. CONTADORES DE MÉTRICAS COM SCROLLTRIGGER ---
        ScrollTrigger.create({
            trigger: "#metrics-section",
            start: "top 80%",
            once: true,
            onEnter: () => {
                // Animação de entrada dos cards de métricas
                gsap.from(".metric-card", {
                    y: 35,
                    autoAlpha: 0,
                    stagger: 0.12,
                    duration: 0.7,
                    ease: "power2.out"
                });

                // Contadores numéricos progressivos
                animateCounter("counter-boot", -99.4, 1, "%", 2.2);
                animateCounter("counter-latency", 45, 0, "ms", 2.0);
                animateCounter("counter-queries", 0, 0, " DDL", 1.8);
                animateCounter("counter-repos", 21, 0, "+", 2.0);
            }
        });

        // --- C. REVEAL DE PROJETOS NO SCROLL ---
        if (isDesktop) {
            ScrollTrigger.batch(".project-card", {
                start: "top 85%",
                interval: 0.1,
                batchMax: 3,
                onEnter: (batch) => {
                    gsap.to(batch, {
                        autoAlpha: 1,
                        y: 0,
                        stagger: 0.15,
                        duration: 0.7,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                }
            });
        } else {
            // No Mobile: Gatilho único e leve com once: true para não congelar o touch scroll
            ScrollTrigger.create({
                trigger: "#projects-grid",
                start: "top 90%",
                once: true,
                onEnter: () => {
                    gsap.to(".project-card", {
                        autoAlpha: 1,
                        y: 0,
                        stagger: 0.08,
                        duration: 0.5,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                }
            });
        }

        // --- D. TIMELINE / TRAJETÓRIA REVEAL ---
        gsap.utils.toArray(".timeline-node").forEach((node) => {
            gsap.from(node, {
                scrollTrigger: {
                    trigger: node,
                    start: "top 90%",
                    once: !isDesktop, // No mobile, dispara apenas uma vez
                    toggleActions: isDesktop ? "play none none reverse" : "play none none none"
                },
                x: isDesktop ? -30 : 0,
                y: isDesktop ? 0 : 20,
                autoAlpha: 0,
                duration: isDesktop ? 0.7 : 0.45,
                ease: "power2.out"
            });
        });

        // --- E. TERMINAL INTERATIVO REVEAL ---
        gsap.from(".terminal-container", {
            scrollTrigger: {
                trigger: "#terminal-section",
                start: "top 85%",
                once: !isDesktop
            },
            y: isDesktop ? 40 : 20,
            autoAlpha: 0,
            duration: isDesktop ? 0.9 : 0.5,
            ease: "power2.out"
        });

        // --- F. 3D TILT EFFECT NOS CARDS (Apenas Desktop) ---
        if (isDesktop) {
            initTiltEffect();
        }
    });

    // Função de contagem animada numérica
    function animateCounter(elementId, targetValue, decimals, suffix, duration) {
        const el = document.getElementById(elementId);
        if (!el) return;

        const startObj = { val: 0 };
        gsap.to(startObj, {
            val: targetValue,
            duration: duration,
            ease: "power2.out",
            onUpdate: () => {
                let current = startObj.val;
                if (decimals > 0) {
                    el.textContent = current.toFixed(decimals) + suffix;
                } else {
                    el.textContent = Math.round(current) + suffix;
                }
            }
        });
    }

    // Efeito 3D Card Tilt com iluminação dinâmica
    function initTiltEffect() {
        const tiltCards = document.querySelectorAll('.tilt-card');

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -7;
                const rotateY = ((x - centerX) / centerX) * 7;

                gsap.to(card, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    transformPerspective: 1000,
                    ease: "power1.out",
                    duration: 0.3
                });

                // Atualiza brilho radial na posição do mouse
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotationX: 0,
                    rotationY: 0,
                    ease: "power2.out",
                    duration: 0.5
                });
            });
        });
    }

    // Refresh do ScrollTrigger após carregamento de imagens e DOM
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });
})();
