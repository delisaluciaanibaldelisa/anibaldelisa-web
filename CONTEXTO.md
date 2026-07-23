# CONTEXTO.md

Resumen rápido para retomar el proyecto después de un tiempo sin tocarlo.

---

- **Nombre del proyecto:** `anibaldelisa-web` — sitio web de Aníbal Delisa SRL
  (taller de Montevideo: Servicio Oficial Peugeot / Citroën / BYD / Opel,
  Mecánica Multimarca, Chapa y Pintura). Empresa familiar, +53 años.

- **Estado actual:**
  - **Funciona:** todo el sitio público (home, 12 páginas de servicio, Nuestra
    Historia con storytelling + video, Servicios, Seguridad Vial, Contacto).
    Turnos online con sincronización real a Google Calendar y emails de
    confirmación (cliente + aviso al taller, `RESEND_API_KEY` cargada). SEO
    completo (JSON-LD `AutoRepair`, sitemap, robots, OG, GA4). Optimizado para
    mobile (sin scroll horizontal). **Dominio propio conectado**:
    `www.anibaldelisa.com` apunta a Vercel (DNS gestionado desde la cuenta Wix
    del dominio, correo en Google Workspace intacto). Todas las imágenes migradas
    a `next/image` (WebP/AVIF automático, responsive, sin CLS).
  - **No funciona / pendiente:** el **visor de reseñas de Google** está
    construido pero **no muestra reseñas** hasta cargar `GOOGLE_PLACES_API_KEY`
    (ver *Próximos pasos*). Mientras tanto muestra solo la calificación general
    (4.8 / 459), que es real.

- **Última modificación:** julio 2026. Conectado el dominio propio
  `www.anibaldelisa.com` (antes solo `anibaldelisa-web.vercel.app`), sin tocar
  el correo de Google Workspace. Pasada grande de optimización: video de la
  entrevista comprimido de 49 MB a 26 MB, todas las `<img>` migradas a
  `next/image` en todo el sitio, footer con logo de Aquora Labs agrandado y
  centrado. Antes de eso: se eliminaron los testimonios inventados por un
  visor de reseñas reales de Google, y limpieza de "olor a IA" (sin emojis en
  la interfaz, sin frases cliché).

- **Próximos pasos:**
  1. **Cargar `GOOGLE_PLACES_API_KEY`** en Vercel para activar el visor de
     reseñas. Habilitar "Places API (New)" en Google Cloud, crear la API key,
     restringirla a esa API. Requiere facturación activa. Devuelve máx. 5 reseñas.
  2. Verificar en Search Console la propiedad del dominio nuevo
     (`www.anibaldelisa.com`) — antes indexaba el Wix viejo.
  3. Considerar verificar `anibaldelisa.com` en Resend para mandar los emails
     desde un remitente propio (`turnos@anibaldelisa.com`) en vez de
     `onboarding@resend.dev`. Requiere sumar el `include:` de Resend al TXT SPF
     existente en Wix (no crear un TXT nuevo — rompe SPF tener dos).
  4. Revisar los **emojis en los emails** de `lib/email.ts` (✅ 🔧 📍) — se
     dejaron a propósito; decidir si se quitan.

- **Estructura del proyecto:**
  ```
  app/          Rutas (App Router). Home, servicios/[slug], nosotros,
                contacto, turnos, seguridad-vial, api/turnos, sitemap, robots
  components/   UI reutilizable (Navbar, Footer, HeroCarousel, GoogleReviews,
                MediaCarousel, VideoFeature, TurnosBooking, Reveal…)
  lib/          Datos y lógica: site.ts (fuente única del negocio),
                servicios-detalle.ts, google-reviews.ts, gcal.ts, email.ts,
                turnos.ts, chat.ts, analytics.ts
  public/       autos/ videos/ logos/ aseguradoras/ historia/ + logo y og
  ```

- **Tech stack:** Next.js **16.2.10** (App Router, Turbopack) · React 19 ·
  **Tailwind CSS v4** (colores en `@theme` dentro de `app/globals.css`,
  **no hay `tailwind.config.js`**) · TypeScript · framer-motion ·
  lucide-react · react-hook-form + zod · googleapis (Calendar) ·
  Resend (emails) · GA4. Deploy en **Vercel** (auto-deploy al pushear a `main`).

- **Bugs / limitaciones conocidas:**
  - **Google Places API devuelve máximo 5 reseñas** y no permite elegir cuáles
    (límite de Google, no del código).
  - Las carpetas `/autos/`, `/videos/`, `/logos/`, `/historia/` tienen
    `Cache-Control: immutable` (1 año) en `next.config.ts`, pero ya no aplica a
    imágenes servidas vía `next/image` (usan su propio cache por contenido en
    `/_next/image`) — solo importa si algo linkea el archivo crudo directo.
  - El DNS de `anibaldelisa.com` vive en la cuenta Wix (`ns4/ns5.wixdns.net`),
    aunque el dominio esté registrado en Hostinger. Para cualquier cambio de
    DNS futuro, hay que entrar a wix.com → cuenta → Dominios → el dominio →
    "Administrar registros DNS" (no hace falta el diseñador, la cuenta dueña
    tiene acceso). El correo (MX + SPF) está ahí y **no hay que tocarlo**.
  - `AGENTS.md` avisa que esta versión de Next tiene breaking changes:
    conviene consultar `node_modules/next/dist/docs/` antes de escribir código.

- **Links útiles:**
  - Repo: https://github.com/delisaluciaanibaldelisa/anibaldelisa-web
  - Producción: https://www.anibaldelisa.com (alias: https://anibaldelisa-web.vercel.app)
  - Ficha de Google (Place ID `ChIJKW6LU6-Bn5URR8LW7U52gyI`):
    https://www.google.com/maps/place/?q=place_id:ChIJKW6LU6-Bn5URR8LW7U52gyI
  - Docs de Next (locales): `node_modules/next/dist/docs/`
  - Variables de entorno requeridas: ver `.env.example`

---

**Comandos:** `npm run dev` (local) · `npm run build` (validar antes de pushear)
· `npm run lint`
