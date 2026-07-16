---
name: especialista-web
description: Especialista en construcción y optimización de diseño web para el sitio de Aníbal Delisa. Usar SIEMPRE antes de tocar diseño, colores, layout, componentes visuales o crear páginas nuevas en anibaldelisa-web. Define la paleta oficial (rojo, azul, blanco, toques de amarillo puro), tipografías, reglas de composición y el checklist de verificación.
---

# Especialista en Construcción Web — Aníbal Delisa

Actuás como diseñador/desarrollador web senior. Cada cambio visual debe respetar
este sistema. Ante la duda, elegí la opción más limpia y profesional.

## Paleta oficial (4 colores — NO agregar otros)

| Color | Valor | Token | Uso |
|---|---|---|---|
| 🔴 Rojo (del logo) | `#E00000` | `primary` | CTAs principales, íconos destacados, acentos, línea decorativa |
| 🔵 Azul navy | `#0A1628` / medio `#162040` | `navy`/`dark`/`accent` / `navy-mid` | Navbar, footer, secciones oscuras, texto base |
| ⚪ Blanco | `#FFFFFF` (grises F5-F8 de apoyo) | — | Fondos de contenido, texto sobre oscuro |
| 🟡 Amarillo puro | `#FFE500` | `gold` | SOLO TOQUES: botón "Agendá tu turno", tagline 53 años, estrellas/4.8 Google, borde de card destacada. Nunca fondos grandes ni texto pequeño sobre blanco |

Reglas duras:
- El rojo `#E00000` es el del logo del rey: NUNCA cambiarlo.
- Texto sobre amarillo → siempre navy. Texto sobre navy/rojo → blanco.
- Nunca dos secciones navy seguidas sin separador blanco/gris.
- Cero negro puro: donde iría negro, va navy `#0A1628`.
- Los colores viven en `@theme` de `app/globals.css` (Tailwind v4, NO hay tailwind.config).

## Tipografía

- Logo: Serpentine D Bold (`font-logo`) — solo para "Aníbal Delisa".
- Títulos: Montserrat (`font-heading`). H1 hero `clamp(36px,5vw,64px)`, H2 `clamp(22px,3vw,38px)`, H3 18px.
- Cuerpo: Open Sans 15px / line-height 1.7. Párrafos max-width 640px.
- Labels meta: 11px, uppercase, letter-spacing 2px+.

## Composición y componentes

- Contenedor: utility `container-x` (max-w 80rem).
- Cards: `rounded-2xl`, hover premium = translateY(-6px) + sombra `0 16px 40px rgba(0,0,0,0.10)` + border-top de color 3px.
- Animaciones con framer-motion vía `Reveal`/`ZoomReveal`/`SlideReveal` — suaves, `once: true`, sin exceso.
- Botones: rojo = acción principal, verde #25D366 solo WhatsApp, amarillo solo "Agendá tu turno", outline blanco sobre navy.
- El rey (logo.png) es transparente: nunca meterlo en recuadros.
- Mobile-first: diseñar a 375px y escalar.

## Reglas de negocio visibles

- Telegram INVISIBLE al cliente (el chat del rey es "el asistente", sin marcas).
- Textos de la home = textos de la web original (no reescribirlos).
- Datos de contacto SOLO desde `lib/site.ts` (nunca hardcodear).
- Gotcha: si cambiás `@theme` y el dev server no toma los colores → parar server, borrar `.next`, reiniciar.

## Checklist antes de dar por terminado un cambio visual

1. `npm run build` sin errores (parar el dev server antes si hay que borrar `.next`).
2. Verificar en el navegador con JS los colores computados clave (topbar, navbar, botones).
3. Contraste legible en cada combinación nueva (amarillo nunca lleva texto blanco).
4. Mobile: probar viewport angosto (menú hamburguesa, hero, cards apiladas).
5. Commit + push a `main` (deploy automático a Vercel) y verificar producción.
