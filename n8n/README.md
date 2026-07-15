# Agente de IA (n8n) + Telegram — Aníbal Delisa

Este workflow conecta el sitio web con un **agente de IA (Claude)** dentro de n8n y lo
integra con **Telegram** en las dos direcciones.

Archivo a importar: [`anibaldelisa-agente-telegram.json`](./anibaldelisa-agente-telegram.json)

## Qué hace

**Flujo 1 — Chat web:**
```
Chat de la web  →  Webhook  →  Agente IA (Claude)  →  ├─ Responde en el chat web
                                                        └─ Avisa a tu Telegram
```

**Flujo 2 — Bot de Telegram (dos vías):**
```
Cliente escribe al bot en Telegram  →  Agente IA (Claude)  →  Responde por Telegram
```

---

## Paso a paso

### 1. Crear el bot de Telegram
1. En Telegram, abrí un chat con **@BotFather**.
2. Enviá `/newbot` y seguí los pasos (nombre y usuario del bot).
3. BotFather te da un **token** (algo como `123456789:AA...`). Guardalo.

### 2. Obtener tu Chat ID (para las notificaciones al negocio)
1. Abrí un chat con tu nuevo bot y mandale cualquier mensaje (ej: "hola").
2. En Telegram, buscá **@userinfobot** y escribile: te devuelve tu **Chat ID** (un número).
   - Para que avise a un **grupo del taller**: agregá el bot al grupo y usá el chat ID del grupo.

### 3. Cargar credenciales en n8n
En tu instancia de n8n → **Credentials → New**:
- **Telegram API**: pegá el token del bot (paso 1).
- **Anthropic API**: pegá tu API key de Anthropic (de https://console.anthropic.com).

> Las credenciales se cargan **solo en n8n**. Nunca van en el código ni en este archivo.

### 4. Importar el workflow
1. En n8n: **Workflows → Import from File** → elegí `anibaldelisa-agente-telegram.json`.
2. Abrí cada nodo marcado con ⚠️ y asigná la credencial correspondiente:
   - **Modelo Claude (web)** y **Modelo Claude (Telegram)** → credencial *Anthropic*.
     Confirmá el modelo en el desplegable (ej: *Claude Sonnet 5*).
   - **Notificar a Telegram**, **Responder en Telegram**, **Telegram Trigger** → credencial *Telegram*.
3. En el nodo **Notificar a Telegram**, reemplazá `REEMPLAZAR_CHAT_ID_DEL_NEGOCIO`
   por tu Chat ID (paso 2).

### 5. Activar y copiar la URL del webhook
1. **Activá** el workflow (toggle arriba a la derecha).
2. Abrí el nodo **Webhook (chat web)** y copiá la **Production URL**
   (termina en `/webhook/anibaldelisa-chat`).

### 6. Conectar la web con n8n
En el proyecto web, editá `.env.local` y pegá esa URL:
```env
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://TU-N8N.com/webhook/anibaldelisa-chat
```
Reiniciá el sitio (`npm run dev`) o volvé a deployar en Vercel (y agregá la variable
en Vercel → Settings → Environment Variables).

---

## Cómo se comunican la web y n8n

La web hace un `POST` al webhook con este cuerpo:
```json
{ "message": "texto del cliente", "timestamp": 1700000000000, "source": "web" }
```
El agente responde y el nodo **Responder al chat web** devuelve:
```json
{ "reply": "respuesta del asistente" }
```
El widget de la web muestra ese `reply`. El formulario de contacto manda lo mismo con
`"source": "formulario-web"`.

## Notas
- El **modelo** por defecto es Claude Sonnet 5 (buen balance costo/calidad para atención
  al cliente). Podés cambiarlo en los nodos *Modelo Claude*.
- Si tu versión de n8n muestra un aviso de "actualizar nodo", aceptalo: los nombres de
  los parámetros pueden variar levemente entre versiones, pero la estructura es la misma.
- El sistema del agente tiene cargados los datos reales del negocio (direcciones,
  teléfonos, horarios) y la instrucción de **no inventar precios ni turnos**.
