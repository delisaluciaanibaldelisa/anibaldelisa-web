---
name: animador-logo
description: Especialista en animar el logo/mascota (el rey) de Aníbal Delisa sin modificar el archivo de marca original. Usar SIEMPRE que se pida "que el logo cobre vida", agregarle ojos/brazos/gestos, o cualquier animación de personaje sobre un ícono PNG/SVG estático existente. Define la técnica de capa superpuesta, cómo ubicar elementos con precisión real (no a ojo), la API de secuencias de framer-motion, y el problema crítico de requestAnimationFrame en pestañas en segundo plano.
---

# Animador de logo/mascota — Aníbal Delisa

Cada vez que pidan animar el rey (u otro logo estático) para que "cobre vida",
"salude", "toque la pantalla", etc., seguí este proceso. Ya se probó en
`components/AnimatedMultiagentLogo.tsx` — leelo como referencia de código real
antes de reinventar la rueda.

## Regla de oro: nunca tocar el archivo de marca

El PNG/SVG original (ej. `public/logo.png`) **nunca se edita, redibuja ni
recorta**. Toda animación se logra superponiendo una capa SVG transparente
(`position: absolute; inset: 0`) por ENCIMA de la imagen intacta, con
elementos nuevos (ojos, brazos, manos, efectos) que solo aparecen durante la
secuencia y quedan en `opacity: 0` en reposo.

No intentes "redibujar" el personaje entero en SVG para reemplazar el PNG —
ya se probó (ver historial) y el resultado nunca matchea el original en
proporciones/color con la fidelidad que espera un cliente de marca. Superponer
siempre gana.

## Paso 1: ubicar las extremidades con datos reales, no a ojo

Adivinar coordenadas (ej. "los ojos van más o menos acá arriba") produce
overlays mal alineados o invisibles. En vez de eso, analizá el canal alfa del
PNG con `sharp` (ya está en `node_modules`) para encontrar dónde está
realmente dibujado el personaje dentro del canvas:

```js
const sharp = require('sharp');
sharp('public/logo.png').raw().ensureAlpha().toBuffer({resolveWithObject:true}).then(({data, info}) => {
  const {width, height, channels} = info;
  // Bounding box del contenido no transparente:
  let minX=width, maxX=0, minY=height, maxY=0;
  for (let y=0;y<height;y++) for (let x=0;x<width;x++) {
    const a = data[(y*width+x)*channels+3];
    if (a > 20) { if(x<minX)minX=x; if(x>maxX)maxX=x; if(y<minY)minY=y; if(y>maxY)maxY=y; }
  }
  console.log({minXpct:(minX/width*100).toFixed(1), maxXpct:(maxX/width*100).toFixed(1),
               minYpct:(minY/height*100).toFixed(1), maxYpct:(maxY/height*100).toFixed(1)});
});
```

Después, para "ver" la forma sin necesitar capturas de pantalla, generá un
mapa ASCII del alfa (útil porque no depende del panel de navegador visible):

```js
const cols = 100, rows = 50; // o los que necesites
// por cada celda: '#' si alfa>20, '.' si no — imprimir línea por línea
```

Con eso identificás con precisión: dónde está la cabeza (para los ojos),
dónde ya hay un brazo/mano dibujado en el original (para que el brazo nuevo
"nazca" ahí y no se note el empalme), y dónde hay espacio vacío/transparente
a los costados (ideal para dibujar una extremidad nueva sin que se mezcle
con el color sólido del cuerpo).

## Paso 2: contraste obligatorio

Si una extremidad nueva usa el MISMO color sólido que el cuerpo (ej. rojo
sobre rojo) y además se superpone sobre la silueta existente, **queda
invisible** — esto pasó en el primer intento real y fue el motivo del
rechazo del cliente. Reglas:

- Todo elemento nuevo (ojos, brazos, manos) lleva `stroke` de un color de
  marca distinto (ej. navy `#0A1628`) además del `fill`, para que el borde
  se lea incluso contra un fondo del mismo color de relleno.
- Preferí que las extremidades nuevas nazcan y se muevan por zonas
  transparentes del canvas (fuera de la silueta), no que crucen por encima
  de la parte sólida — así el contraste contra la página (blanco/transparente)
  hace todo el trabajo.
- Los ojos van con esclerótica clara (blanco) + pupila oscura, nunca un
  color que se confunda con el cuerpo.

## Paso 3: la secuencia con framer-motion (`useAnimate`)

El proyecto ya usa framer-motion (no agregar otra librería). Para coreografiar
varias partes en paralelo con tiempos distintos, usar `useAnimate` + la API de
timeline (`animate([[selector, keyframes, {at, duration}], ...])`):

```tsx
const [scope, animate] = useAnimate();
// el <div ref={scope}> debe envolver TODOS los elementos con las clases
// que vas a animar por selector (ej. ".king-eyes", ".king-arm-reach").

await animate([
  [".king-eyes", { opacity: 1 }, { at: 0.8, duration: 0.25 }],
  [".king-arm-reach", { scale: [0.5, 2.2], x: ["0%","-24%"] }, { at: 1.5, duration: 1.3 }],
  // "at" son segundos absolutos dentro de la secuencia completa
]);
```

Nota de TypeScript: framer-motion a veces no infiere bien el tipo de una
secuencia armada dinámicamente (`const seq = [...]`). Si tira error de tipos
en `animate(seq)`, un `// @ts-expect-error` puntual con comentario explicando
por qué es aceptable — el shape es correcto en runtime, es una limitación de
inferencia de TS con arrays heterogéneos.

Cada `transform-origin` de brazo/mano debe apuntar a la "articulación" real
(hombro, muñeca) para que la rotación se vea como un movimiento de brazo y no
como si flotara.

## Paso 4: el problema #1 al verificar — pestañas en segundo plano

**Los navegadores pausan por completo `requestAnimationFrame` (y por lo
tanto cualquier animación JS-driven, incluidas las de framer-motion cuando
usa su motor `JSAnimation`) en pestañas que no están visibles/al frente.**
Esto se puede confirmar así, sin necesitar capturas de pantalla:

```js
document.hidden // true si la pestaña no está compositando frames
```

Si estás probando con las herramientas de navegador de este entorno y las
animaciones "no se mueven" pero tampoco hay errores en consola, lo primero
que hay que chequear es `document.hidden`. Si da `true`, no es un bug del
código — es que el panel del navegador no está visible en pantalla en ese
momento. Pedile al usuario que muestre/traiga al frente el panel antes de
volver a intentar verificar, o confiá en verificación estructural (DOM,
`getComputedStyle`, `getBoundingClientRect`) en vez de screenshots cuando el
panel esté en ese estado.

Para diagnosticar más a fondo sin pixeles, se puede inspeccionar el objeto
de animación interno de framer-motion:

```js
const controls = animate('.selector', {opacity: 1}, {duration: 0.5});
const inner = controls.animations[0];
inner.constructor.name; // "JSAnimation" = rAF-driven, se pausa si hidden
inner.time;             // se queda en 0 si el rAF nunca corre
```

## Paso 5: accesibilidad y comportamiento en producción

- Respetar `prefers-reduced-motion`: con `useReducedMotion()` de
  framer-motion, si es `true`, no reproducir el autoplay (dejar solo un
  cambio muy sutil de luminosidad si el cliente lo pide) — pero el replay
  manual por click puede seguir funcionando si el cliente lo pide para
  validar.
- Reproducción automática: usar `IntersectionObserver` sobre un ref del
  contenedor + `setTimeout` de espera, no simplemente `useEffect` al montar
  (el ícono suele estar siempre en viewport por ser `position: fixed`, pero
  es la forma correcta/futura-proof si algún día no lo está).
- Limitar a "una vez por sesión" con `sessionStorage`, EXCEPTO durante una
  etapa de validación explícita en la que el cliente pida verla varias
  veces — en ese caso, agregar un flag tipo `validationMode` fácil de
  desactivar después, y documentarlo en el propio archivo.
- Si el ícono también sirve para abrir un panel/chat con un click, y ese
  click reemplaza el ícono por otra cosa (ej. una X), la animación se corta
  a mitad de camino. Resolverlo así: durante validación, el click en el
  ícono SOLO repite la animación (`e.stopPropagation()` para no disparar el
  onClick del botón padre); en producción final, considerar disparar el
  replay en un momento que no compita con la acción principal (ej. al
  CERRAR el panel en vez de al abrirlo).

## Sobre exportar la animación a video (WebM/MP4)

Sin una herramienta de grabación de pantalla o un pipeline tipo Playwright
con `page.video()` habilitado, **no es posible generar un archivo de video
real** de la animación desde este entorno. Si el cliente lo pide, decirlo
explícitamente y no fabricar un archivo — la verificación debe hacerse
abriendo el sitio real en un navegador visible.

## Checklist antes de dar por terminada una animación de este tipo

1. ¿Las coordenadas de ojos/extremidades salen de analizar el PNG real (alfa),
   no de una estimación visual?
2. ¿Cada extremidad nueva tiene `stroke` de contraste además del `fill`?
3. ¿Las extremidades nacen/viven en zonas transparentes del canvas cuando es
   posible, evitando superponerse al color sólido del cuerpo?
4. ¿`transform-origin` está en la articulación correcta para cada parte que
   rota?
5. `npm run build` sin errores.
6. Verificación estructural mínima (sin pantalla): elementos existen en el
   DOM, sin errores de consola, `document.hidden` chequeado antes de asumir
   que "no se mueve" es un bug.
7. Avisar honestamente si no se pudo verificar píxel a pixel, y pedir al
   usuario que lo confirme en su propio navegador visible.
