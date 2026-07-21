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
    confirmación. SEO completo (JSON-LD `AutoRepair`, sitemap, robots, OG,
    GA4). Optimizado para mobile (sin scroll horizontal).
  - **No funciona / pendiente:** el **visor de reseñas de Google** está
    construido pero **no muestra reseñas** hasta cargar `GOOGLE_PLACES_API_KEY`
    (ver *Próximos pasos*). Mientras tanto muestra solo la calificación general
    (4.8 / 459), que es real.

- **Última modificación:** julio 2026. Se eliminaron los testimonios inventados
  y se reemplazaron por un visor de reseñas reales de Google (carrusel con
  foto, nombre, estrellas y atribución). Además se hizo una limpieza de
  "olor a IA": se quitaron emojis de la interfaz y frases cliché
  ("en un solo lugar", "más que un taller", "no es solo X: es Y") a favor de
  texto concreto y verificable.

- **Próximos pasos:**
  1. **Cargar `GOOGLE_PLACES_API_KEY`** en Vercel para activar el visor de
     reseñas. Habilitar "Places API (New)" en Google Cloud, crear la API key,
     restringirla a esa API. Requiere facturación activa. Devuelve máx. 5 reseñas.
  2. **Comprimir `public/videos/entrevista-vertigo.mp4`** (49 MB; los otros
     videos pesan ~6 MB). Con ffmpeg a ~5 MB sin pérdida visible. Hoy no
     penaliza porque es *click-to-play*, pero conviene.
  3. **Apuntar el dominio propio** `anibaldelisa.com` a Vercel y actualizar
     `site.url` en `lib/site.ts` (hay un TODO marcado ahí).
  4. Revisar los **emojis en los emails** de `lib/email.ts` (✅ 🔧 📍) — se
     dejaron a propósito; decidir si se quitan.
  5. Evaluar migrar los `<img>` a **`next/image`** para mejorar LCP.

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
    `Cache-Control: immutable` (1 año) en `next.config.ts`. **Si reemplazás una
    imagen, hay que subir el `?v=N` en la URL** o el navegador sirve la vieja.
    Los logos de marca van hoy en `?v=6`.
  - El video de la entrevista pesa 49 MB (ver *Próximos pasos*).
  - `AGENTS.md` avisa que esta versión de Next tiene breaking changes:
    conviene consultar `node_modules/next/dist/docs/` antes de escribir código.

- **Links útiles:**
  - Repo: https://github.com/delisaluciaanibaldelisa/anibaldelisa-web
  - Producción: https://anibaldelisa-web.vercel.app
  - Ficha de Google (Place ID `ChIJKW6LU6-Bn5URR8LW7U52gyI`):
    https://www.google.com/maps/place/?q=place_id:ChIJKW6LU6-Bn5URR8LW7U52gyI
  - Docs de Next (locales): `node_modules/next/dist/docs/`
  - Variables de entorno requeridas: ver `.env.example`

---

**Comandos:** `npm run dev` (local) · `npm run build` (validar antes de pushear)
· `npm run lint`
