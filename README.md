# Aníbal Delisa — Sitio web

Sitio web del taller mecánico multimarca **Aníbal Delisa** (Montevideo, Uruguay).
Service oficial Peugeot, Citroën, BYD y Opel. +53 años de trayectoria.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** (configuración de colores en `app/globals.css` con `@theme`)
- **Framer Motion** (animaciones)
- **Lucide React** (íconos)
- **React Hook Form + Zod** (formulario de contacto)
- Idioma: Español (Uruguay)

## Estructura

```
app/
  layout.tsx              → Layout global: fuentes, SEO, Schema.org, navbar/footer/chat
  page.tsx                → Inicio
  seguridad-vial/         → Guía de seguridad vial (sección clave para SEO)
  servicios/              → Índice + subpáginas (mecánica, chapa-pintura, etc.)
  nosotros/               → Historia, valores, ubicaciones con mapas
  contacto/               → Formulario + datos + mapas
  sitemap.ts / robots.ts  → SEO
components/               → Navbar, Footer, FloatingChat, ContactForm, etc.
lib/site.ts               → Datos centralizados del negocio (fuente única de verdad)
```

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm start        # servir el build
```

## Variables de entorno

Copiá `.env.example` a `.env.local` y completá:

```env
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://TU-N8N.com/webhook/anibaldelisa-chat
NEXT_PUBLIC_TELEGRAM_USERNAME=@anibaldelisa
NEXT_PUBLIC_TELEGRAM_URL=https://t.me/anibaldelisa
```

- `NEXT_PUBLIC_N8N_WEBHOOK_URL`: webhook de n8n que alimenta el chat flotante y el
  formulario de contacto. Si no está configurado, el chat cae a Telegram como fallback.
- `NEXT_PUBLIC_TELEGRAM_URL` / `NEXT_PUBLIC_TELEGRAM_USERNAME`: canal público de
  Telegram del taller (botones "Escribinos por Telegram").

## Integración del chat (n8n + Telegram)

El widget de chat (`components/FloatingChat.tsx`) hace un `POST` al webhook con:

```json
{ "message": "texto", "timestamp": 1700000000000, "source": "web" }
```

El formulario de contacto envía `source: "formulario-web"` al mismo webhook.
En n8n: recibir el webhook, procesar con IA (Claude/GPT) y notificar al Telegram del
negocio. La respuesta del flujo (`reply`, `message` u `output`) se muestra en el chat.

## Deploy en Vercel

1. Subí el repositorio a GitHub.
2. En [vercel.com](https://vercel.com) → **New Project** → importá el repo.
3. Vercel detecta Next.js automáticamente (`vercel.json` ya está configurado).
4. En **Settings → Environment Variables**, agregá `NEXT_PUBLIC_N8N_WEBHOOK_URL` y
   `NEXT_PUBLIC_WHATSAPP_NUMBER`.
5. **Deploy**. Configurá el dominio `www.anibaldelisa.com` en **Settings → Domains**.

> Si cambia el dominio final, actualizá `site.url` en `lib/site.ts` (afecta el
> sitemap, robots y los metadatos Open Graph).
