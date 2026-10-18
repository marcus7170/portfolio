# Marcus Soares — Portfólio de Engenharia de Software

[![GitHub](https://img.shields.io/badge/GitHub-marcus7170-FFB800?style=for-the-badge&logo=github&logoColor=black)](https://github.com/marcus7170)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Marcus_Soares-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/marcus-soares-3b239b197)
[![Portfólio](https://img.shields.io/badge/Portfólio_Live-marcus7170.github.io-FFB800?style=for-the-badge&logo=firefox&logoColor=black)](https://marcus7170.github.io/portfolio/)
[![BSL.LAT](https://img.shields.io/badge/BSL.LAT-SaaS_em_Produção-F59E0B?style=for-the-badge)](https://bsl.lat)

Repositório oficial do portfólio web de **Marcus Vinícius Soares da Silva** ([@marcus7170](https://github.com/marcus7170)).  
Desenvolvedor Backend, Engenheiro de IA e Co-Fundador da **BSL (Brazilian eSports League) / BSL.LAT**. Graduando em Ciência da Computação na UNIP (conclusão em 2028).

---

## 🚀 Destaques da Aplicação

* **Hero 3D Interativo (Three.js)**: Esfera geométrica procedural de nós de dados e sinapses em WebGL, com anéis orbitais e campo de partículas douradas com física reativa ao cursor do mouse e ao scroll (100% procedural, leve e sem dependência de modelos externos pesados).
* **Animações Fluidas a 60fps (GSAP & ScrollTrigger)**:
  * Orquestração de timelines de entrada e transições de interface.
  * **Contadores de Métricas de Performance com Scrub**: Visualização dinâmica dos números reais de produção do BSL (-99,4% no tempo de boot, 45ms de latência média e eliminação de 227 queries DDL repetitivas).
  * **Efeito 3D Card Tilt**: Interação física nos cartões de projetos com iluminação dinâmica que acompanha o movimento do mouse.
* **Vitrine Dinâmica de Projetos**:
  * Integração e filtragem por categorias (*Backend & SaaS*, *IA & Automações*, *Acadêmico UNIP*, *Ferramentas & Web*).
  * Destaque ao SaaS em produção **BSL.LAT**, ao aplicativo em Java **PharmaStock (APS-4)** com protocolo sanitário FEFO, ao jogo desktop em Java **APS-3** e projetos utilitários.
* **Terminal Interativo de Código (Code Inspector)**:
  * Abas de código reais em produção: pooling seguro de conexões MySQL/MariaDB (`safe_pool.py`), conector oficial do EA Sports FC com contorno de proteção anti-bot Akamai (`fc_clubs_api.py`), otimizador de schema sem DDL e classe de ordenação FEFO em Java (`Lote.java`).
* **Download Integrado do Currículo**:
  * Botão direto para baixar a versão oficial em PDF (`Curriculo_Marcus_Dev.pdf`).

---

## 🛠️ Tecnologias Utilizadas

* **Estrutura & Semântica**: HTML5 semântico com metatags completas de SEO e OpenGraph
* **Estilização & Design System**: CSS3 moderno (Variáveis CSS, Glassmorphism, OLED Black & Cyber Gold Theme, Flexbox, CSS Grid)
* **Visualização 3D**: [Three.js](https://threejs.org/) (r128)
* **Engenharia de Animação**: [GSAP](https://gsap.com/) Core & [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
* **Tipografia**: Google Fonts (*Syne*, *Inter* e *JetBrains Mono*)
* **Ícones**: [Bootstrap Icons](https://icons.getbootstrap.com/)

---

## 📂 Estrutura de Arquivos

```
portfolio/
├── index.html                   # Página principal da aplicação
├── README.md                    # Documentação do projeto
├── css/
│   └── style.css                # Folha de estilos, tokens de design e responsividade
├── js/
│   ├── three-hero.js            # Cena 3D procedural em Three.js
│   ├── animations.js            # Animações orquestradas com GSAP e ScrollTrigger
│   ├── projects-data.js         # Base de dados estruturada dos projetos e snippets de código
│   └── main.js                  # Lógica de filtros, terminal interativo e utilitários
└── assets/
    ├── Curriculo_Marcus_Dev.pdf # Currículo oficial em PDF para download
    └── img/
        ├── marcus_avatar.jpg    # Foto de perfil tratada em alta resolução
        └── marcus_full.jpg      # Foto original completa
```

---

## 💻 Como Executar Localmente

Como o projeto é construído em Vanilla JavaScript nativo com bibliotecas carregadas via CDN, não é necessária nenhuma etapa de build ou instalação de dependências pesadas:

### Opção 1: Abrir diretamente
Basta dar dois cliques no arquivo `index.html` para abrir em qualquer navegador moderno.

### Opção 2: Servidor local (VS Code / Python / Node)
Se preferir rodar através de um servidor HTTP local:

```bash
# Com Python 3
python -m http.server 8000

# Com Node.js / npx
npx serve .
```

Acesse em seu navegador em `http://localhost:8000`.

---

## 📬 Contato

* **LinkedIn**: [linkedin.com/in/marcus-soares-3b239b197](https://www.linkedin.com/in/marcus-soares-3b239b197)
* **GitHub**: [github.com/marcus7170](https://github.com/marcus7170)
* **WhatsApp**: [+55 (13) 99190-6461](https://wa.me/5513991906461)
* **E-mail**: [marcussoares527@gmail.com](mailto:marcussoares527@gmail.com)
* **Plataforma BSL**: [bsl.lat](https://bsl.lat) / [bslsuperpro.com.br](http://bslsuperpro.com.br/)

---

© 2026 Marcus Vinícius Soares da Silva. Todos os direitos reservados.
