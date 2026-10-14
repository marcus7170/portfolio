/**
 * Hero 3D Interactive Scene — Three.js
 * Marcus Vinícius (Marcus7170)
 * Renderização procedural em WebGL com iluminação dinâmica e partículas
 */

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

    function init() {
        // 1. Cena
        scene = new THREE.Scene();

        // 2. Câmera
        camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 24;

        // 3. Renderer
        renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Grupo Principal
        mainGroup = new THREE.Group();
        scene.add(mainGroup);

        // 4. Criação do Núcleo 3D Procedural (Backend / AI Neural Sphere)
        createCoreNode();

        // 5. Criação das Órbitas de Dados (Anéis Wireframe Dourados)
        createOrbitalRings();

        // 6. Nuvem de Partículas Ambientais (Partículas Douradas / Âmbar)
        createParticleField();

        // 7. Iluminação
        const ambientLight = new THREE.AmbientLight(0xffb800, 0.8);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xffc72c, 2.5, 50);
        pointLight1.position.set(15, 12, 10);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xf59e0b, 1.8, 50);
        pointLight2.position.set(-15, -10, -8);
        scene.add(pointLight2);

        // Eventos
        window.addEventListener('resize', onWindowResize, false);
        window.addEventListener('mousemove', onMouseMove, false);

        // Otimização de Performance: pausa o render quando a aba não está visível
        document.addEventListener('visibilitychange', () => {
            isVisible = !document.hidden;
        });

        // Loop de Animação
        animate();
    }

    // Núcleo Geométrico Multifacetado (Icosaedro com Wireframe e Nós de Dados)
    function createCoreNode() {
        const coreGeometry = new THREE.IcosahedronGeometry(6.2, 2);

        // Material wireframe dourado elegante
        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0xffb800,
            wireframe: true,
            transparent: true,
            opacity: 0.38
        });

        coreMesh = new THREE.Mesh(coreGeometry, wireframeMaterial);
        mainGroup.add(coreMesh);

        // Nós luminosos nos vértices do icosaedro
        const nodePositions = [];
        const posAttribute = coreGeometry.getAttribute('position');
        for (let i = 0; i < posAttribute.count; i += 3) {
            nodePositions.push(posAttribute.getX(i), posAttribute.getY(i), posAttribute.getZ(i));
        }

        const nodesGeometry = new THREE.BufferGeometry();
        nodesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));

        // Canvas dinâmico para brilho dos nós
        const nodeCanvas = document.createElement('canvas');
        nodeCanvas.width = 32;
        nodeCanvas.height = 32;
        const ctx = nodeCanvas.getContext('2d');
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 220, 100, 1)');
        gradient.addColorStop(0.3, 'rgba(255, 184, 0, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 184, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);

        const nodeTexture = new THREE.CanvasTexture(nodeCanvas);

        const nodesMaterial = new THREE.PointsMaterial({
            size: 0.8,
            map: nodeTexture,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const vertexNodes = new THREE.Points(nodesGeometry, nodesMaterial);
        coreMesh.add(vertexNodes);
    }

    // Anéis Orbitais com Rotações Independentes
    function createOrbitalRings() {
        const ringConfigs = [
            { radius: 8.8, tube: 0.04, color: 0xffb800, rotSpeed: 0.004, tilt: { x: 0.6, y: 0.3 } },
            { radius: 10.4, tube: 0.03, color: 0xf59e0b, rotSpeed: -0.003, tilt: { x: -0.8, y: 0.5 } },
            { radius: 12.0, tube: 0.02, color: 0xfde047, rotSpeed: 0.002, tilt: { x: 0.2, y: -0.9 } }
        ];

        ringConfigs.forEach(cfg => {
            const ringGeo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 100);
            const ringMat = new THREE.MeshBasicMaterial({
                color: cfg.color,
                transparent: true,
                opacity: 0.45
            });
            const ringMesh = new THREE.Mesh(ringGeo, ringMat);
            ringMesh.rotation.x = cfg.tilt.x;
            ringMesh.rotation.y = cfg.tilt.y;
            ringMesh.userData = { rotSpeed: cfg.rotSpeed };

            orbitalRings.push(ringMesh);
            mainGroup.add(ringMesh);
        });
    }

    // Campo de Partículas de Dados em Profundidade
    function createParticleField() {
        const particleCount = 280;
        const positions = new Float32Array(particleCount * 3);
        const scales = new Float32Array(particleCount);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 45;
            positions[i + 1] = (Math.random() - 0.5) * 35;
            positions[i + 2] = (Math.random() - 0.5) * 30;
            scales[i / 3] = Math.random() * 0.4 + 0.1;
        }

        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Textura suave para partículas
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
            size: 0.5,
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
        mouseX = (event.clientX - windowHalfX) * 0.0006;
        mouseY = (event.clientY - windowHalfY) * 0.0006;
    }

    function onWindowResize() {
        if (!container) return;
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }

    // Scroll-link: ajusta a posição e rotação conforme a página é rolada
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY || window.pageYOffset;
        if (mainGroup) {
            mainGroup.position.y = -scrollY * 0.006;
            mainGroup.rotation.y = scrollY * 0.0015;
        }
    }, { passive: true });

    function animate() {
        requestAnimationFrame(animate);
        if (!isVisible) return;

        // Interpolação suave do mouse (Motion physics)
        targetX += (mouseX - targetX) * 0.04;
        targetY += (mouseY - targetY) * 0.04;

        if (mainGroup) {
            mainGroup.rotation.y += 0.0025;
            mainGroup.rotation.x = targetY * 0.8;
            mainGroup.rotation.z = targetX * 0.5;
        }

        // Rotação dos anéis orbitais
        orbitalRings.forEach(ring => {
            ring.rotation.z += ring.userData.rotSpeed;
            ring.rotation.x += ring.userData.rotSpeed * 0.6;
        });

        // Oscilação suave do campo de partículas
        if (particleSystem) {
            particleSystem.rotation.y -= 0.0008;
            particleSystem.rotation.x -= 0.0004;
        }

        renderer.render(scene, camera);
    }

    // Inicializa quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
