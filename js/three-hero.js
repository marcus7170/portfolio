

(function () {
    const container = document.getElementById('three-canvas-container');
    if (!container) return;

    let scene, camera, renderer;
    let mainGroup, coreMesh, particleSystem, orbitalRings = [];
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    let isVisible = true;
    let isHeroInView = true;
    let isMobile = window.innerWidth < 768;
    let animationFrameId = null;
    let isScrolling = false;

    function init() {
        isMobile = window.innerWidth < 768;

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = isMobile ? 28 : 24;

        renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: !isMobile,
            powerPreference: isMobile ? "low-power" : "high-performance"
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        mainGroup = new THREE.Group();
        scene.add(mainGroup);

        createCoreNode();

        createOrbitalRings();

        createParticleField();

        const ambientLight = new THREE.AmbientLight(0xffb800, isMobile ? 0.9 : 0.8);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xffc72c, 2.2, 50);
        pointLight1.position.set(15, 12, 10);
        scene.add(pointLight1);

        if (!isMobile) {
            const pointLight2 = new THREE.PointLight(0xf59e0b, 1.6, 50);
            pointLight2.position.set(-15, -10, -8);
            scene.add(pointLight2);
        }

        window.addEventListener('resize', onWindowResize, { passive: true });
        if (!isMobile) {
            window.addEventListener('mousemove', onMouseMove, { passive: true });
        }

        document.addEventListener('visibilitychange', () => {
            isVisible = !document.hidden;
            if (isVisible && isHeroInView && !animationFrameId) {
                animate();
            }
        });

        setupHeroObserver();

        setupScrollSync();

        animate();
    }

    function setupHeroObserver() {
        const heroSection = document.getElementById('hero');
        if (!heroSection || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isHeroInView = entry.isIntersecting;
                if (isHeroInView && isVisible && !animationFrameId) {
                    animate();
                }
            });
        }, {
            threshold: 0.05
        });

        observer.observe(heroSection);
    }

    function setupScrollSync() {
        window.addEventListener('scroll', () => {
            if (!isHeroInView || isScrolling) return;
            isScrolling = true;
            requestAnimationFrame(() => {
                const scrollY = window.scrollY || window.pageYOffset;
                if (mainGroup) {
                    mainGroup.position.y = -scrollY * 0.005;
                    mainGroup.rotation.y = scrollY * 0.0012;
                }
                isScrolling = false;
            });
        }, { passive: true });
    }

    function createCoreNode() {
        const detail = isMobile ? 1 : 2;
        const coreGeometry = new THREE.IcosahedronGeometry(6.2, detail);

        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0xffb800,
            wireframe: true,
            transparent: true,
            opacity: 0.38
        });

        coreMesh = new THREE.Mesh(coreGeometry, wireframeMaterial);
        mainGroup.add(coreMesh);

        const nodePositions = [];
        const posAttribute = coreGeometry.getAttribute('position');
        const step = isMobile ? 6 : 3;
        for (let i = 0; i < posAttribute.count; i += step) {
            nodePositions.push(posAttribute.getX(i), posAttribute.getY(i), posAttribute.getZ(i));
        }

        const nodesGeometry = new THREE.BufferGeometry();
        nodesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));

        const nodeCanvas = document.createElement('canvas');
        nodeCanvas.width = 16;
        nodeCanvas.height = 16;
        const ctx = nodeCanvas.getContext('2d');
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(255, 220, 100, 1)');
        gradient.addColorStop(0.4, 'rgba(255, 184, 0, 0.7)');
        gradient.addColorStop(1, 'rgba(255, 184, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);

        const nodeTexture = new THREE.CanvasTexture(nodeCanvas);

        const nodesMaterial = new THREE.PointsMaterial({
            size: isMobile ? 0.6 : 0.8,
            map: nodeTexture,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const vertexNodes = new THREE.Points(nodesGeometry, nodesMaterial);
        coreMesh.add(vertexNodes);
    }

    function createOrbitalRings() {
        const radialSegments = isMobile ? 8 : 16;
        const tubularSegments = isMobile ? 40 : 80;

        const ringConfigs = [
            { radius: 8.8, tube: 0.04, color: 0xffb800, rotSpeed: 0.004, tilt: { x: 0.6, y: 0.3 } },
            { radius: 10.4, tube: 0.03, color: 0xf59e0b, rotSpeed: -0.003, tilt: { x: -0.8, y: 0.5 } }
        ];

        if (!isMobile) {
            ringConfigs.push({ radius: 12.0, tube: 0.02, color: 0xfde047, rotSpeed: 0.002, tilt: { x: 0.2, y: -0.9 } });
        }

        ringConfigs.forEach(cfg => {
            const ringGeo = new THREE.TorusGeometry(cfg.radius, cfg.tube, radialSegments, tubularSegments);
            const ringMat = new THREE.MeshBasicMaterial({
                color: cfg.color,
                transparent: true,
                opacity: 0.42
            });
            const ringMesh = new THREE.Mesh(ringGeo, ringMat);
            ringMesh.rotation.x = cfg.tilt.x;
            ringMesh.rotation.y = cfg.tilt.y;
            ringMesh.userData = { rotSpeed: cfg.rotSpeed };

            orbitalRings.push(ringMesh);
            mainGroup.add(ringMesh);
        });
    }

    function createParticleField() {
        const particleCount = isMobile ? 70 : 220;
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 45;
            positions[i + 1] = (Math.random() - 0.5) * 35;
            positions[i + 2] = (Math.random() - 0.5) * 30;
        }

        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const pCanvas = document.createElement('canvas');
        pCanvas.width = 16;
        pCanvas.height = 16;
        const pCtx = pCanvas.getContext('2d');
        const pGrad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
        pGrad.addColorStop(0, 'rgba(255, 230, 120, 1)');
        pGrad.addColorStop(0.5, 'rgba(255, 184, 0, 0.5)');
        pGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        pCtx.fillStyle = pGrad;
        pCtx.fillRect(0, 0, 16, 16);
        const pTexture = new THREE.CanvasTexture(pCanvas);

        const particleMat = new THREE.PointsMaterial({
            size: isMobile ? 0.4 : 0.5,
            map: pTexture,
            transparent: true,
            opacity: 0.65,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        particleSystem = new THREE.Points(particleGeo, particleMat);
        scene.add(particleSystem);
    }

    function onMouseMove(event) {
        if (isMobile) return;
        mouseX = (event.clientX - windowHalfX) * 0.0006;
        mouseY = (event.clientY - windowHalfY) * 0.0006;
    }

    function onWindowResize() {
        if (!container || !camera || !renderer) return;
        isMobile = window.innerWidth < 768;
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }

    function animate() {
        
        if (!isVisible || !isHeroInView) {
            animationFrameId = null;
            return;
        }

        animationFrameId = requestAnimationFrame(animate);

        if (!isMobile) {
            targetX += (mouseX - targetX) * 0.04;
            targetY += (mouseY - targetY) * 0.04;

            if (mainGroup) {
                mainGroup.rotation.y += 0.002;
                mainGroup.rotation.x = targetY * 0.7;
                mainGroup.rotation.z = targetX * 0.4;
            }
        } else if (mainGroup) {
            mainGroup.rotation.y += 0.002;
        }

        for (let i = 0; i < orbitalRings.length; i++) {
            const ring = orbitalRings[i];
            ring.rotation.z += ring.userData.rotSpeed;
            ring.rotation.x += ring.userData.rotSpeed * 0.5;
        }

        if (particleSystem) {
            particleSystem.rotation.y -= 0.0006;
        }

        renderer.render(scene, camera);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
