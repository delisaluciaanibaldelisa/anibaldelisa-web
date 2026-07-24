"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useAnimate, useReducedMotion } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────
// Animación "cobra vida" del rey (multiagente) — pensada para verse una vez
// por sesión al entrar a la web y poder repetirse tocando el ícono.
// El archivo public/logo.png NUNCA se modifica ni se redibuja: se superpone
// una capa SVG transparente (ojos, brazo, mano, sombra, onda de contacto)
// perfectamente alineada encima de la imagen original, y solo esa capa
// aparece durante la secuencia. En reposo, la imagen vuelve a verse tal
// cual es hoy en el sitio.
// ─────────────────────────────────────────────────────────────────────────

// Variables fáciles de tocar — ver punto 3/4 de la respuesta al usuario.
export const KING_ANIMATION_CONFIG = {
  /** Duración total de la secuencia completa, en milisegundos. */
  durationMs: 4600,
  /** Espera desde que el ícono entra en pantalla hasta que arranca sola. */
  autoPlayDelayMs: 1000,
  /** Cuántas veces saluda con la mano al final. */
  waveCount: 2,
  /** Color del resplandor/pulso de respiración en reposo (dorado de marca). */
  glowColor: "#FFE500",
  /** Cuánto "crece" la mano al acercarse a la pantalla (efecto de profundidad). */
  handReachScale: 1.4,
  /** Cuánto se agranda/inclina el ícono al "despertar". */
  wakeScale: 1.06,
};

const SESSION_KEY = "anibal_king_greeted_v1";

type Props = {
  className?: string;
  /** Se llama justo en el instante en que la mano "toca" la pantalla. */
  onTouch?: () => void;
  /** Reproducir automáticamente una vez por sesión (por defecto sí). */
  autoPlay?: boolean;
  /** Cambiá este número (ej. sumando 1) para forzar una repetición manual. */
  replayTrigger?: number;
};

export default function AnimatedMultiagentLogo({
  className,
  onTouch,
  autoPlay = true,
  replayTrigger,
}: Props) {
  const [scope, animate] = useAnimate();
  const [imgError, setImgError] = useState(false);
  const playingRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const play = async () => {
    if (playingRef.current || !scope.current) return;
    playingRef.current = true;

    const D = KING_ANIMATION_CONFIG.durationMs / 1000; // segundos
    const at = (fraction: number) => fraction * D;
    const ease = [0.22, 1, 0.36, 1] as const; // easeOutExpo-ish, orgánico

    // Apaga la respiración de reposo mientras dura la secuencia.
    animate(".king-body", { filter: "brightness(1)" }, { duration: 0.2 });

    const seq = [
      // 1) Despertar: ojos aparecen + pequeño sacudón de cabeza.
      [".king-eyes", { opacity: 1, scale: [0.4, 1.05, 1] }, { at: at(0), duration: at(0.14) - at(0) }],
      [".king-body", { rotate: [0, -3, 2, 0] }, { at: at(0), duration: at(0.16) - at(0), ease }],

      // 2) Se inclina hacia el usuario (perspectiva + escala).
      [
        ".king-tilt",
        { rotateX: [0, 10, 8], scale: [1, KING_ANIMATION_CONFIG.wakeScale] },
        { at: at(0.14), duration: at(0.28) - at(0.14), ease },
      ],

      // 3) Extiende el brazo — aparece cerca del cuerpo.
      [
        ".king-arm",
        { opacity: [0, 1], scale: [0.35, 0.55] },
        { at: at(0.26), duration: at(0.34) - at(0.26), ease },
      ],
      // La mano avanza en perspectiva (crece + se acerca al centro/vidrio).
      [
        ".king-arm",
        {
          scale: [0.55, KING_ANIMATION_CONFIG.handReachScale],
          x: ["0%", "-14%"],
          y: ["0%", "10%"],
          rotate: [0, -8],
        },
        { at: at(0.34), duration: at(0.55) - at(0.34), ease },
      ],
      // Sombra de profundidad debajo de la mano, crece en sincro.
      [
        ".king-hand-shadow",
        { opacity: [0, 0.35], scale: [0.3, 1.3] },
        { at: at(0.32), duration: at(0.55) - at(0.32), ease },
      ],

      // 4) Contacto con el "vidrio": onda + reacción del logo.
      [
        ".king-ripple",
        { opacity: [0, 0.9, 0], scale: [0.2, 2.4] },
        { at: at(0.55), duration: at(0.7) - at(0.55), ease: "easeOut" },
      ],
      [
        ".king-tilt",
        { scaleY: [KING_ANIMATION_CONFIG.wakeScale, KING_ANIMATION_CONFIG.wakeScale * 0.97, KING_ANIMATION_CONFIG.wakeScale] },
        { at: at(0.55), duration: at(0.62) - at(0.55) },
      ],

      // 5) Retira la mano.
      [
        ".king-arm",
        { scale: [KING_ANIMATION_CONFIG.handReachScale, 0.5], x: ["-14%", "0%"], y: ["10%", "0%"], rotate: [-8, 0] },
        { at: at(0.68), duration: at(0.8) - at(0.68), ease },
      ],
      [
        ".king-hand-shadow",
        { opacity: [0.35, 0] },
        { at: at(0.68), duration: at(0.78) - at(0.68) },
      ],

      // 6) Saluda amistosamente (oscilación de la mano ya retirada).
      [
        ".king-arm",
        {
          rotate: waveKeyframes(KING_ANIMATION_CONFIG.waveCount),
          scale: 0.55,
        },
        { at: at(0.8), duration: at(0.94) - at(0.8), ease: "easeInOut" },
      ],

      // 7) Vuelve suavemente a su estado original.
      [
        ".king-arm",
        { opacity: [1, 0], scale: 0.35 },
        { at: at(0.92), duration: at(1) - at(0.92) },
      ],
      [
        ".king-eyes",
        { opacity: [1, 0] },
        { at: at(0.9), duration: at(1) - at(0.9) },
      ],
      [
        ".king-tilt",
        { rotateX: [8, 0], scale: [KING_ANIMATION_CONFIG.wakeScale, 1], scaleY: 1 },
        { at: at(0.88), duration: at(1) - at(0.88), ease },
      ],
    ];

    if (onTouch) {
      window.setTimeout(onTouch, at(0.55) * 1000);
    }

    // @ts-expect-error — framer-motion no infiere bien el tipo de una
    // secuencia armada dinámicamente; el shape es correcto en runtime.
    await animate(seq);
    playingRef.current = false;
  };

  // Reproducción automática — una vez que el ícono entra en pantalla,
  // con la espera configurada, y una sola vez por sesión de navegador.
  useEffect(() => {
    if (!autoPlay || prefersReducedMotion) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          observer.disconnect();
          const t = window.setTimeout(() => {
            sessionStorage.setItem(SESSION_KEY, "1");
            play();
          }, KING_ANIMATION_CONFIG.autoPlayDelayMs);
          return () => window.clearTimeout(t);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, prefersReducedMotion]);

  // Repetición manual — el padre sube este número (ej. al cerrar el chat)
  // para que el rey vuelva a saludar. El 0/undefined inicial no dispara nada.
  const isFirstReplay = useRef(true);
  useEffect(() => {
    if (isFirstReplay.current) {
      isFirstReplay.current = false;
      return;
    }
    if (replayTrigger) play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replayTrigger]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className ?? ""}`}
    >
      {/* Capa 1: logo original, intacto — respiración muy sutil en reposo. */}
      <div ref={scope} className="relative">
        <div
          className="king-tilt"
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          {imgError ? (
            <span className="grid place-items-center w-14 h-14 rounded-full bg-primary text-white font-heading font-extrabold text-xl shadow-lg">
              AD
            </span>
          ) : (
            <div
              className="king-body"
              style={
                prefersReducedMotion
                  ? undefined
                  : {
                      animation: "king-breathe 3.2s ease-in-out infinite",
                      // @ts-expect-error CSS custom property
                      "--king-glow": KING_ANIMATION_CONFIG.glowColor,
                    }
              }
            >
              <Image
                src="/logo.png"
                alt="Asistente Aníbal Delisa"
                width={512}
                height={512}
                className="w-20 h-auto md:w-24 drop-shadow-[0_8px_10px_rgba(0,0,0,0.35)]"
                onError={() => setImgError(true)}
                priority
              />
            </div>
          )}
        </div>

        {/* Capa 2: overlay SVG transparente — ojos, brazo/mano, sombra, onda. */}
        {!imgError && (
          <svg
            viewBox="0 0 100 100"
            className="pointer-events-none absolute inset-0 w-full h-full overflow-visible"
            aria-hidden="true"
          >
            {/* Ojos estilo anime — aparecen solo durante la animación. */}
            <g className="king-eyes" style={{ opacity: 0, transformOrigin: "46% 30%" }}>
              <ellipse cx="42" cy="30" rx="2.6" ry="3.4" fill="#0A1628" />
              <ellipse cx="53" cy="29" rx="2.6" ry="3.4" fill="#0A1628" />
              <ellipse cx="41.2" cy="28.7" rx="0.9" ry="1.1" fill="#ffffff" />
              <ellipse cx="52.2" cy="27.7" rx="0.9" ry="1.1" fill="#ffffff" />
            </g>

            {/* Sombra de profundidad bajo la mano al acercarse. */}
            <ellipse
              className="king-hand-shadow"
              cx="50"
              cy="66"
              rx="10"
              ry="3"
              fill="#0A1628"
              style={{ opacity: 0, transformOrigin: "50% 66%", filter: "blur(1.5px)" }}
            />

            {/* Onda de contacto contra el "vidrio". */}
            <circle
              className="king-ripple"
              cx="42"
              cy="58"
              r="6"
              fill="none"
              stroke="#FFE500"
              strokeWidth="1.4"
              style={{ opacity: 0, transformOrigin: "42% 58%" }}
            />

            {/* Brazo + mano minimalistas, en el color del logo. */}
            <g
              className="king-arm"
              style={{ opacity: 0, transformOrigin: "68% 42%" }}
            >
              <path
                d="M68 42 Q78 40 82 32 L86 34 Q82 44 70 48 Z"
                fill="#E00000"
              />
              <ellipse cx="84" cy="30" rx="5.5" ry="7" fill="#E00000" />
            </g>
          </svg>
        )}
      </div>

      <style jsx global>{`
        @keyframes king-breathe {
          0%,
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 0 rgba(0, 0, 0, 0));
          }
          50% {
            transform: scale(1.015);
            filter: drop-shadow(0 0 6px var(--king-glow, #ffe500));
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .king-body {
            animation: none !important;
            filter: brightness(1.03);
          }
        }
      `}</style>
    </div>
  );
}

// Genera los keyframes de rotación para el saludo (2 agitadas por defecto).
function waveKeyframes(count: number): number[] {
  const frames: number[] = [0];
  for (let i = 0; i < count; i++) {
    frames.push(22, -12);
  }
  frames.push(0);
  return frames;
}
