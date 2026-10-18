# 🚀 Notificador de Visitas via Telegram (Oficial & Gratuito)

Migramos para o **Telegram Bot**, a solução mais estável, rápida e sem limites para alertas de desenvolvedor.

---

## ⏱️ Passo 1: Criar o Bot no Telegram (Leva 1 Minuto)

1. No seu Telegram (celular ou desktop), procure pelo bot oficial: **`@BotFather`** (tem o selo azul de verificado).
2. Envie o comando:
   ```text
   /newbot
   ```
3. O BotFather vai perguntar o **Nome** do bot:
   - Digite: `Portfólio Alertas` (ou o nome que preferir).
4. Em seguida, ele vai pedir o **Username** (deve terminar obrigatoriamente com `bot`):
   - Digite: `marcus_portfolio_alert_bot` (se já estiver em uso, tente algo como `marcus_dev_alerts_bot`).
5. O BotFather responderá com o seu **Token da API**:
   > *"Use this token to access the HTTP API: `7123456789:AAFnkxxxx...`"*
   - **Guarde esse Token!** Ele é a variável `TELEGRAM_BOT_TOKEN`.

---

## 🆔 Passo 2: Pegar o seu Chat ID (30 segundos)

1. No Telegram, pesquise pelo bot: **`@userinfobot`**.
2. Envie qualquer mensagem (ou `/start`) para ele.
3. Ele responderá com os seus dados:
   - Procure pela linha **`Id: 123456789`** (uma sequência de números).
   - **Guarde esse Id!** Ele é a variável `TELEGRAM_CHAT_ID`.
4. **IMPORTANTE:** Abra a conversa com o seu próprio bot que você criou no Passo 1 e clique no botão **Começar / Start**. *(O Telegram exige que você dê start nele uma vez para autorizar o recebimento de mensagens).*

---

## ☁️ Passo 3: Publicar no Cloudflare Workers (2 minutos)

1. Acesse o painel da [Cloudflare](https://dash.cloudflare.com/) (gratuito).
2. No menu lateral, clique em **Compute (Workers & Pages)** > **Create Application** > **Create Worker**.
3. Dê um nome (ex: `portfolio-notifier`) e clique em **Deploy**.
4. Clique em **Edit code**:
   - Apague o código padrão.
   - Cole todo o código do arquivo [`worker/portfolio-notifier.js`](portfolio-notifier.js).
   - Clique em **Save and Deploy**.
5. Clique na aba **Settings** > **Variables and Secrets** e adicione as 2 variáveis:
   - `TELEGRAM_BOT_TOKEN`: *(Cole o Token do @BotFather)* -> marque como **Encrypt**.
   - `TELEGRAM_CHAT_ID`: *(Cole o seu Id numérico do @userinfobot)*.
   - Clique em **Deploy**.
6. Copie a URL pública do Worker gerada pela Cloudflare (ex: `https://portfolio-notifier.<seu-subdominio>.workers.dev`).

---

## 🔗 Passo 4: Atualizar no Portfólio

Abra o arquivo [`js/tracker.js`](../js/tracker.js) e atualize a linha 12 com a sua URL:

```javascript
const WORKER_ENDPOINT = 'https://portfolio-notifier.<seu-subdominio>.workers.dev/visit';
```

---

## 🧪 Como Testar

Abra no navegador:
```text
http://localhost:8000/?test=true
# ou diretamente no seu link online:
https://marcus7170.github.io/portfolio/?test=true
```

Você receberá uma notificação instantânea com som no Telegram:
```html
🚨 NOVO ACESSO NO PORTFÓLIO!

📍 Local: Santos, SP - Brasil (Claro S.A.)
🔗 Origem: 💼 99Freelas
💻 Dispositivo: Desktop (1920x1080)
🌐 Idioma: pt-BR
⏰ Horário: 17/10/2026 às 22:05
[🔗 Ver Link de Origem]
```
