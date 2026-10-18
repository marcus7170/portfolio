

const PROJECTS_DATA = [
    {
        id: "bsl-lat-saas",
        title: "BSL (Brazilian eSports League) — Plataforma SaaS em Produção",
        category: "saas",
        categoryLabel: "Flagship • SaaS em Produção",
        featured: true,
        badge: "SaaS Ativo • BSL.LAT",
        description: "Plataforma SaaS multi-inquilino de futebol virtual competitivo em produção no domínio BSL.LAT (co-fundador e engenheiro de software líder). Desenvolveu conector nativo com a API oficial do EA Sports FC com contorno de proteção anti-bot da Akamai, motor de gamificação MD3, ranking dinâmico com BSL Points, gerenciador de ligas parceiras e monetização automatizada via Mercado Pago e Hubla.",
        metrics: [
            { label: "Domínio Oficial", value: "BSL.LAT", detail: "Ambiente em Produção" },
            { label: "Tempo de Boot", value: "0.02s", detail: "Redução de -99.4%" },
            { label: "Latência Média", value: "45ms", detail: "Carga de página instantânea" },
            { label: "Queries no Boot", value: "0 DDL", detail: "227 queries eliminadas" }
        ],
        tags: ["Python", "Flask", "MariaDB", "Akamai Bypass", "OAuth2", "Mercado Pago", "SaaS Multi-tenant", "EA FC 27 API"],
        github: null, 
        live: "https://bsl.lat",
        liveSecondary: "http://bslsuperpro.com.br/",
        details: "Engenharia de backend com connection pooling seguro (SafePooledConnection), controle de versão de schema com _schema_migrations, cache em memória com TTL e ingestão automática de partidas de consoles da atual geração (PS5, Xbox Series X|S, PC)."
    },
    {
        id: "aps-4-pharmastock",
        title: "PharmaStock (APS-4) — App Desktop de Gestão Farmacêutica em Java",
        category: "academic",
        categoryLabel: "Acadêmico UNIP • Mais Recente",
        featured: true,
        badge: "App Java • Outubro 2026",
        description: "Aplicação desktop completa 100% em Java (projeto acadêmico da UNIP com nome fictício) para controle de estoque farmacêutico com conformidade sanitária FEFO (First Expired, First Out). Possui arquitetura em camadas (Model, Repository, Service, View), algoritmos puros de ordenação (Quick Sort, Merge Sort), persistência híbrida (MySQL com fallback transparente em memória) e interface gráfica moderna acelerada por Java 2D com dashboard de KPIs animados.",
        metrics: [
            { label: "Linguagem", value: "Java 100%", detail: "Desktop Swing & Java 2D" },
            { label: "Regra Sanitária", value: "FEFO", detail: "First Expired, First Out" },
            { label: "Algoritmos", value: "O(N log N)", detail: "Quick & Merge Sort" },
            { label: "Persistência", value: "Híbrida", detail: "MySQL + Memória" }
        ],
        tags: ["Java", "Swing / Java 2D", "FEFO Protocol", "Quick Sort", "Merge Sort", "MySQL / JDBC", "POO Avançada"],
        github: "https://github.com/marcus7170/APS-4",
        live: null,
        details: "Implementação estrita de orientação a objetos, interfaces de repositório, fábrica abstrata e interface fluida com painéis analíticos e ordenação determinística."
    },
    {
        id: "aps-3-game",
        title: "APS-3 — Jogo Desktop 100% em Java (Swing & Java 2D)",
        category: "academic",
        categoryLabel: "Acadêmico UNIP • Jogos",
        featured: false,
        badge: "Jogo em Java • UNIP",
        description: "Jogo desktop desenvolvido integralmente em Java para a UNIP. Implementa lógica de gameloop em tempo real, manipulação de eventos gráficos (JanelaJogo.java), renderização visual em canvas Java 2D, sistema de áudios e efeitos sonoros integrados e detecção de colisões.",
        metrics: [
            { label: "Linguagem", value: "Java", detail: "JanelaJogo.java" },
            { label: "Recursos", value: "Áudios & Sprites", detail: "Efeitos Sonoros Nativos" }
        ],
        tags: ["Java", "Game Loop", "Swing", "Java 2D", "Áudios Nativos", "Colisões"],
        github: "https://github.com/marcus7170/APS-3",
        live: null,
        details: "Exercício prático de engenharia de jogos com controle de threads, renderização gráfica e manipulação de arquivos multimídia."
    },
    {
        id: "draft-bsl",
        title: "Draft-BSL — Sistema de Draft & Mercado de Atletas",
        category: "saas",
        categoryLabel: "Web App & E-Sports",
        featured: false,
        badge: "Tempo Real",
        description: "Aplicação interativa para realização de drafts de atletas virtuais em tempo real da comunidade BSL. Gestão de posições, controle de status VIP, lances por equipes e atualização instantânea de escalações com regras de prioridade de capitães.",
        metrics: [
            { label: "Jogadores Gerenciados", value: "300+", detail: "Base ativa no banco" },
            { label: "Interface", value: "Interativa", detail: "Draft visual dinâmico" }
        ],
        tags: ["JavaScript", "HTML5", "CSS3", "MariaDB", "Game Logic"],
        github: "https://github.com/marcus7170/Draft-BSL",
        live: "https://marcus7170.github.io/Draft-BSL/",
        details: "Interface ágil e responsiva com persistência de escolhas e sincronização entre equipes participantes."
    },
    {
        id: "python-rpg-tools",
        title: "Python Desktop & Utilitários — RPG com Tkinter & MySQL",
        category: "tools",
        categoryLabel: "Desktop & Utilitários",
        featured: false,
        badge: "Desktop & Database",
        description: "Coleção de projetos e scripts em Python desenvolvidos sob demanda, incluindo um jogo de RPG desktop completo com interface gráfica em Tkinter, banco de dados MySQL, autenticação segura com criptografia de senhas (SHA-256), seleção de personagens, inventário e scripts utilitários de backup e sorteios.",
        metrics: [
            { label: "Linguagem", value: "Python", detail: "Tkinter GUI & Scripts" },
            { label: "Segurança", value: "SHA-256", detail: "Criptografia de Senhas" }
        ],
        tags: ["Python", "Tkinter", "MySQL", "SHA-256", "GUI Desktop", "Scripts"],
        github: "https://github.com/marcus7170/python",
        live: null,
        details: "Aplicações práticas com integração direta ao MySQL, manipulação de interfaces gráficas nativas e tratamento de dados relacionais."
    },
    {
        id: "bsl-superpro-v1",
        title: "BSL Super Pro V1 — Versão Primária Histórica (2023)",
        category: "tools",
        categoryLabel: "Histórico & Open-Source",
        featured: false,
        badge: "V1 Histórica • 3 Anos Atrás",
        description: "Versão primária em código aberto desenvolvida há 3 anos que deu origem ao ecossistema do BSL. Mini game e portal em Flask e MySQL com autenticação de usuários e controle básico de partidas, servindo de base para o amadurecimento técnico que culminou no SaaS atual da BSL.LAT.",
        tags: ["Python", "Flask", "MySQL", "Open-Source", "Histórico"],
        github: "https://github.com/marcus7170/site_bsl-superpro_V1",
        live: null,
        details: "Registro histórico da primeira versão em código aberto, demonstrando a evolução de maturidade da arquitetura de software ao longo dos anos."
    },
    {
        id: "twbr-automation",
        title: "TWBR — Automação Web & Manipulação de DOM / Sockets",
        category: "tools",
        categoryLabel: "Automação & Scripts",
        featured: false,
        badge: "Script Avançado",
        description: "Suite de scripts para automação de tarefas em jogos de estratégia web em tempo real. Manipulação profunda do Document Object Model (DOM), interceptação de requisições de rede, timing de alta precisão e processamento de rotinas recorrentes.",
        tags: ["JavaScript", "DOM Manipulation", "Web Automation", "Network Intercept", "Algorithms"],
        github: "https://github.com/marcus7170/TWBR",
        live: null,
        details: "Demonstração prática de algoritmos de temporização e automação de interface sem dependências de frameworks pesados."
    },
    {
        id: "concurso-santos",
        title: "Simulado Concurso Santos — Web App Educacional",
        category: "tools",
        categoryLabel: "Ferramentas & Web",
        featured: false,
        badge: "Comunidade",
        description: "Plataforma web com simulados interativos de questões para concursos públicos da Prefeitura de Santos. Sistema de contagem de pontos, feedback imediato de gabarito e cálculo estatístico de desempenho por disciplina.",
        tags: ["HTML5", "CSS3", "JavaScript", "Gamificação Educacional"],
        github: "https://github.com/marcus7170/Concurso-Santos-Simulado.",
        live: "https://marcus7170.github.io/Concurso-Santos-Simulado./",
        details: "Design focado em usabilidade móvel e rapidez de resposta, ajudando concurseiros da Baixada Santista."
    },
    {
        id: "bsl-gamefut",
        title: "BSL GameFut — Simulador Interativo de Partidas",
        category: "tools",
        categoryLabel: "Jogos & Lógica",
        featured: false,
        badge: "Simulador",
        description: "Mecanismo em JavaScript que simula embates e partidas de futebol com probabilidades estatísticas baseadas nos atributos dos atletas cadastrados na liga.",
        tags: ["JavaScript", "Lógica de Jogos", "Probabilidades", "DOM"],
        github: "https://github.com/marcus7170/BSL-GameFut",
        live: "https://marcus7170.github.io/BSL-GameFut/",
        details: "Algoritmos probabilísticos para cálculo de gols, posse de bola, cartões e desempenho de capitães."
    },
    {
        id: "superpro-tatica",
        title: "Superpro Tática & Calculadora de Liga",
        category: "tools",
        categoryLabel: "Ferramentas & E-Sports",
        featured: false,
        badge: "Utilitário",
        description: "Ferramentas interativas de prancheta tática e cálculo de pontuação para capitães e técnicos montarem esquemas táticos e simularem o teto de gastos de suas equipes no campeonato.",
        tags: ["HTML5", "CSS3", "JavaScript", "Prancheta Tática"],
        github: "https://github.com/marcus7170/Superpro_tatica",
        live: "https://marcus7170.github.io/Superpro_tatica/",
        details: "Interface visual para montagem de formações no campo com drag and drop e cálculo dinâmico de química de elenco."
    },
    {
        id: "bsl-wiki",
        title: "BSL Wiki — Central Oficial de Regras & Documentação",
        category: "tools",
        categoryLabel: "Documentação & Web",
        featured: false,
        badge: "Documentação",
        description: "Wiki oficial documentando todas as regras do campeonato, tabela de punições por blacklist, estatutos da liga MD3, guias de inscrição e tutoriais de sincronização com o EA FC.",
        tags: ["HTML5", "CSS3", "Documentação", "UI Design"],
        github: "https://github.com/marcus7170/bsl_wiki",
        live: "https://marcus7170.github.io/bsl_wiki/",
        details: "Design limpo para leitura ágil de regras esportivas e diretrizes de conduta para mais de 300 atletas."
    },
    {
        id: "aps-2",
        title: "APS-2 — Aplicação Web & Sustentabilidade",
        category: "academic",
        categoryLabel: "Acadêmico • UNIP",
        featured: false,
        badge: "Novembro 2025",
        description: "Projeto de extensão acadêmica focado na conscientização sobre recursos hídricos e sustentabilidade com interface web interativa.",
        tags: ["HTML5", "CSS3", "JavaScript", "UNIP"],
        github: "https://github.com/marcus7170/APS-2",
        live: null,
        details: "Trabalho prático multidisciplinar integrando tecnologia e impacto ambiental."
    }
];

const CODE_SNIPPETS = {
    pool: {
        filename: "app/database/safe_pool.py (BSL.LAT)",
        language: "python",
        title: "Safe Connection Pooling (MySQL / MariaDB)",
        description: "Implementação thread-safe em produção no BSL.LAT que reaproveita a mesma conexão durante todo o ciclo da requisição HTTP no Flask, evitando overhead de handshake TCP e mantendo estabilidade com pooling de 16 conexões.",
        code: `import mysql.connector
from mysql.connector.pooling import MySQLConnectionPool
from flask import g, has_app_context

# Inicializa o Pool de Conexões do MySQL para reuso de conexões TCP (BSL.LAT)
db_pool = MySQLConnectionPool(
    pool_name="bsl_pool",
    pool_size=16,
    host=Config.DB_HOST,
    user=Config.DB_USER,
    password=Config.DB_PASSWORD,
    database=Config.DB_NAME
)

class SafePooledConnection:
    """Wrapper protetor para conexões emprestadas do pool"""
    def __init__(self, cnx):
        self._cnx = cnx
        self._closed = False

    def __getattr__(self, name):
        return getattr(self._cnx, name)

    def close(self):
        if not self._closed and self._cnx:
            self._closed = True
            try:
                self._cnx.close() # Devolve a conexão ao pool
            except Exception:
                pass

def get_db_connection():
    if has_app_context():
        if 'db_conn' in g and g.db_conn:
            if hasattr(g.db_conn, 'is_connected') and g.db_conn.is_connected():
                return g.db_conn
        raw_conn = db_pool.get_connection()
        conn = SafePooledConnection(raw_conn)
        g.db_conn = conn
        return conn
    return SafePooledConnection(db_pool.get_connection())`
    },
    ea_sync: {
        filename: "app/services/fc_clubs_api.py (BSL.LAT)",
        language: "python",
        title: "EA FC 27 API Connector & Akamai Anti-Bot Bypass",
        description: "Engenharia de sincronização em background em produção no BSL.LAT para puxar partidas oficiais do EA Sports FC Pro Clubs diretamente via servidor, contornando proteções anti-bot da Akamai via emulação rigorosa de TLS e headers de navegador moderno.",
        code: `import requests
from app.config import Config

class FC27Connector:
    """Conector nativo com a API oficial do EA Sports FC 27 (common-gen5)"""
    BASE_URL = "https://proclubs.ea.com/api/fc"
    PLATFORM = "common-gen5" # PS5, Xbox Series X|S, PC

    HEADERS = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8",
        "Referer": "https://www.ea.com/games/ea-sports-fc/pro-clubs",
        "Origin": "https://www.ea.com"
    }

    @classmethod
    def fetch_club_matches(cls, club_id: int, max_matches: int = 10):
        endpoint = f"{cls.BASE_URL}/clubs/matches"
        params = {
            "platform": cls.PLATFORM,
            "clubIds": club_id,
            "maxResultCount": max_matches
        }
        
        response = requests.get(endpoint, headers=cls.HEADERS, params=params, timeout=12)
        response.raise_for_status()
        matches = response.json()
        
        # Deduplicação no banco pelo matchId oficial da EA
        return cls.process_and_deduplicate(matches)`
    },
    schema_perf: {
        filename: "app/database/schema_versioning.py (BSL.LAT)",
        language: "python",
        title: "Zero-DDL Boot Optimizer (-99.4% Latency)",
        description: "Mecanismo leve em produção no BSL.LAT que substituiu mais de 220 queries repetitivas SHOW TABLES e ALTER TABLE a cada boot do Flask por uma verificação indexada única, reduzindo o tempo de boot de 3.8s para 0.02s.",
        code: `def ensure_md3_schema(conn):
    """Garante tabelas do sistema sem travar metadados no boot (BSL.LAT)"""
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS _schema_migrations (
            version_key VARCHAR(64) PRIMARY KEY,
            applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    """)
    conn.commit()

    CURRENT_VERSION = "v2026_10_09_perf_v1"
    cursor.execute("SELECT 1 FROM _schema_migrations WHERE version_key = %s", (CURRENT_VERSION,))
    if cursor.fetchone():
        # Migrações já aplicadas: Pula 227 checagens e inicializa em 0.02s!
        return

    # Executa DDL somente na primeira vez da migração
    apply_all_migrations(cursor)
    cursor.execute("INSERT INTO _schema_migrations (version_key) VALUES (%s)", (CURRENT_VERSION,))
    conn.commit()`
    },
    fefo_sort: {
        filename: "APS-4/src/model/Lote.java (PharmaStock)",
        language: "java",
        title: "Algoritmo de Ordenação FEFO (First Expired, First Out)",
        description: "Implementação da interface Comparable<Lote> no PharmaStock (APS-4 em Java), garantindo prioridade absoluta para medicamentos com lote mais próximo do vencimento com desempate determinístico.",
        code: `package model;

import java.time.LocalDate;

public class Lote implements Comparable<Lote> {
    private int idLote;
    private String numeroLote;
    private LocalDate dataValidade;
    private int quantidade;

    @Override
    public int compareTo(Lote outro) {
        // Regra Sanitária FEFO: O lote que vence mais cedo tem prioridade máxima
        int compData = this.dataValidade.compareTo(outro.dataValidade);
        if (compData != 0) {
            return compData;
        }
        // Desempate determinístico pelo identificador do lote
        return Integer.compare(this.idLote, outro.idLote);
    }
}`
    },
    telegram_bot: {
        filename: "worker/portfolio-notifier.js (Cloudflare Edge)",
        language: "javascript",
        title: "Serverless Edge Telemetry & Telegram Dispatcher",
        description: "Automação serverless em produção na Cloudflare que captura geolocalização nativa de borda, filtra bots, aplica rate-limiting por IP e envia alerta push instantâneo com formato seguro via API Oficial do Telegram.",
        code: `// Cloudflare Worker Serverless: Captura de Borda & Envio Telegram
export default {
    async fetch(request, env) {
        if (request.method !== 'POST') return new Response('Not Found', { status: 404 });

        const body = await request.json();
        const cf = request.cf || {};
        
        // Geolocalização nativa de borda da Cloudflare (Sem overhead de API externa)
        const city = cf.city || 'Desconhecida';
        const region = cf.region || '';
        const country = cf.country || 'BR';
        const isp = cf.asOrganization || 'Provedor';

        const messageHtml = [
            '🚨 <b>NOVO ACESSO NO PORTFÓLIO!</b>',
            '',
            \`📍 <b>Local:</b> \${city}, \${region} - \${country} (\${isp})\`,
            \`🔗 <b>Origem:</b> \${body.referrer || 'Acesso Direto'}\`,
            \`💻 <b>Dispositivo:</b> \${body.deviceType} (\${body.screenResolution})\`,
            \`⏰ <b>Horário:</b> \${new Date().toLocaleTimeString('pt-BR')}\`
        ].join('\\n');

        // Disparo assíncrono para a API Oficial do Telegram
        const tgUrl = \`https://api.telegram.org/bot\${env.TELEGRAM_BOT_TOKEN}/sendMessage\`;
        return await fetch(tgUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: env.TELEGRAM_CHAT_ID,
                text: messageHtml,
                parse_mode: 'HTML'
            })
        });
    }
};`
    }
};
