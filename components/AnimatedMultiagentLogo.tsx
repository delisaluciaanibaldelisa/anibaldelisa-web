"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { useAnimate, useReducedMotion } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────
// Animación "cobra vida" del rey (multiagente). public/logo.png NUNCA se
// modifica: se superpone una capa SVG transparente (ojos, DOS brazos, mano,
// sombra, onda de contacto) alineada sobre coordenadas reales del logo
// (extraídas analizando el canal alfa del PNG, no a ojo).
//
// Cabeza del logo: x 33%-58%, y 15%-32% del canvas 512x512.
// Brazo/mano ya dibujados en el PNG original: x 62%-76%, y 34%-46%.
// Torso: x 30%-73%, y 40%-62%. Todo lo demás (x<30% e y>62% a los costados)
// está vacío/transparente — ahí se dibujan las extremidades nuevas para que
// nunca se mezclen con el rojo sólido del cuerpo.
// ─────────────────────────────────────────────────────────────────────────

export const KING_ANIMATION_CONFIG = {
  /** Duración total de la secuencia, en milisegundos (spec: 5-6s). */
  durationMs: 6000,
  /** Espera desde que el ícono entra en pantalla hasta que arranca sola. */
  autoPlayDelayMs: 800,
  /** Cuántas veces saluda con el brazo izquierdo. */
  waveCount: 2,
  /** Cuánto crece la mano al acercarse a la pantalla (efecto de perspectiva). */
  handReachScale: 2.2,
  /**
   * Etapa de validación: si es true, NO se limita a una vez por sesión y
   * tocar el ícono reproduce de nuevo en vez de abrir el chat. Poner en
   * false para el comportamiento definitivo (abre el chat al instante,
   * saluda una vez por sesión, y se repite al cerrar el chat).
   */
  validationMode: true,
};

const SESSION_KEY = "anibal_king_greeted_v2";

type Props = {
  className?: string;
  /** Se llama en el instante en que la mano "toca" la pantalla. */
  onTouch?: () => void;
  /** Se llama cuando termina toda la secuencia. */
  onDone?: () => void;
  autoPlay?: boolean;
  /** Cambiá este número para forzar una repetición manual (modo no-validación). */
  replayTrigger?: number;
};

export default function AnimatedMultiagentLogo({
  className,
  onTouch,
  onDone,
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

    const S = (seconds: number) => seconds; // legibilidad
    const ease = [0.22, 1, 0.36, 1] as const;

    const seq = [
      // ── 0.8–1.5s: despertar — ojos aparecen y parpadean ──────────────
      [".king-eyes", { opacity: [0, 1] }, { at: S(0.8), duration: 0.25 }],
      [
        ".king-eye-l, .king-eye-r",
        { scaleY: [1, 1, 0.12, 1, 1] },
        { at: S(1.05), duration: 0.35 },
      ],
      [".king-head-wobble", { rotate: [0, -2.5, 2, 0] }, { at: S(0.85), duration: 0.5, ease }],

      // ── 1.5–2.8s: el brazo derecho aparece y se extiende hacia la cámara ──
      [
        ".king-arm-reach",
        { opacity: [0, 1] },
        { at: S(1.5), duration: 0.2 },
      ],
      [
        ".king-arm-reach",
        {
          scale: [0.5, 1, KING_ANIMATION_CONFIG.handReachScale],
          x: ["0%", "-6%", "-24%"],
          y: ["0%", "6%", "22%"],
          rotate: [0, -6, -14],
        },
        { at: S(1.5), duration: 1.3, ease },
      ],
      [
        ".king-hand-shadow",
        { opacity: [0, 0.4], scale: [0.4, 1.6] },
        { at: S(1.9), duration: 0.9, ease },
      ],

      // ── 2.8–3.2s: contacto con el vidrio + onda ──────────────────────
      [
        ".king-ripple",
        { opacity: [0, 1, 0], scale: [0.15, 1, 2.6] },
        { at: S(2.8), duration: 0.4, ease: "easeOut" },
      ],
      [
        ".king-arm-reach",
        { scale: [KING_ANIMATION_CONFIG.handReachScale, KING_ANIMATION_CONFIG.handReachScale * 0.94, KING_ANIMATION_CONFIG.handReachScale] },
        { at: S(2.8), duration: 0.18 },
      ],
      [".king-head-wobble", { rotate: [0, -1.5, 0] }, { at: S(2.85), duration: 0.2 }],

      // ── 3.2–4.0s: retira la mano ──────────────────────────────────────
      [
        ".king-arm-reach",
        {
          opacity: [1, 0],
          scale: [KING_ANIMATION_CONFIG.handReachScale, 0.5],
          x: ["-24%", "0%"],
          y: ["22%", "0%"],
          rotate: [-14, 0],
        },
        { at: S(3.2), duration: 0.8, ease },
      ],
      [
        ".king-hand-shadow",
        { opacity: [0.4, 0] },
        { at: S(3.2), duration: 0.6 },
      ],

      // ── 4.0–5.2s: levanta el otro brazo y saluda dos veces ───────────
      [
        ".king-arm-wave",
        { opacity: [0, 1], scale: [0.4, 1] },
        { at: S(4.0), duration: 0.25, ease },
      ],
      [
        ".king-arm-wave",
        { rotate: [0, -35, 0] },
        { at: S(4.0), duration: 0.35, ease },
      ],
      [
        ".king-hand-wave",
        {
          rotate: waveKeyframes(KING_ANIMATION_CONFIG.waveCount),
        },
        { at: S(4.35), duration: 0.65, ease: "easeInOut" },
      ],
      [
        ".king-arm-wave",
        { rotate: [-35, 0], opacity: [1, 0], scale: [1, 0.4] },
        { at: S(5.0), duration: 0.2, ease },
      ],

      // ── 5.2–6.0s: todo desaparece, vuelve el logo original ───────────
      [".king-eyes", { opacity: [1, 0] }, { at: S(5.2), duration: 0.4 }],
      [".king-head-wobble", { rotate: [0, 0] }, { at: S(5.2), duration: 0.4 }],
    ];

    if (onTouch) window.setTimeout(onTouch, 2800);
    if (onDone) window.setTimeout(onDone, KING_ANIMATION_CONFIG.durationMs);

    // @ts-expect-error — la secuencia se arma dinámicamente; el shape es
    // el correcto (AnimationSequence) en runtime.
    await animate(seq);
    playingRef.current = false;
  };

  // Reproducción automática al entrar en pantalla.
  useEffect(() => {
    if (!autoPlay || prefersReducedMotion) return;
    if (typeof window === "undefined") return;
    if (!KING_ANIMATION_CONFIG.validationMode && sessionStorage.getItem(SESSION_KEY)) {
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          observer.disconnect();
          window.setTimeout(() => {
            sessionStorage.setItem(SESSION_KEY, "1");
            play();
          }, KING_ANIMATION_CONFIG.autoPlayDelayMs);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, prefersReducedMotion]);

  // Repetición manual (modo no-validación): el padre sube replayTrigger.
  const isFirstReplay = useRef(true);
  useEffect(() => {
    if (isFirstReplay.current) {
      isFirstReplay.current = false;
      return;
    }
    if (replayTrigger) play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replayTrigger]);

  const handleClick = (e: MouseEvent) => {
    if (KING_ANIMATION_CONFIG.validationMode) {
      // Etapa de validación: tocar el rey solo repite la animación,
      // no abre el chat (para poder verla completa sin que la tape el panel).
      e.stopPropagation();
      play();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block overflow-visible ${className ?? ""}`}
      onClick={handleClick}
      style={{ perspective: 500 }}
    >
      <div ref={scope} className="relative overflow-visible">
        {imgError ? (
          <span className="grid place-items-center w-14 h-14 rounded-full bg-primary text-white font-heading font-extrabold text-xl shadow-lg">
            AD
          </span>
        ) : (
          <div className="king-head-wobble" style={{ transformOrigin: "50% 60%" }}>
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

        {/* Overlay SVG transparente — ojos y extremidades nuevas. */}
        {!imgError && (
          <svg
            viewBox="0 0 100 100"
            className="pointer-events-none absolute inset-0 w-full h-full overflow-visible"
            style={{ overflow: "visible" }}
            aria-hidden="true"
          >
            {/* ── Ojos estilo anime, sobre la zona real de la cabeza ── */}
            <g className="king-eyes" style={{ opacity: 0 }}>
              <g className="king-eye-l" style={{ transformOrigin: "40px 24px" }}>
                <ellipse cx="40" cy="24" rx="3.4" ry="4" fill="#ffffff" stroke="#0A1628" strokeWidth="0.6" />
                <circle cx="41" cy="24.6" r="1.7" fill="#0A1628" />
                <circle cx="41.6" cy="23.7" r="0.55" fill="#ffffff" />
              </g>
              <g className="king-eye-r" style={{ transformOrigin: "52px 23px" }}>
                <ellipse cx="52" cy="23" rx="3.4" ry="4" fill="#ffffff" stroke="#0A1628" strokeWidth="0.6" />
                <circle cx="53" cy="23.6" r="1.7" fill="#0A1628" />
                <circle cx="53.6" cy="22.7" r="0.55" fill="#ffffff" />
              </g>
            </g>

            {/* ── Sombra de profundidad bajo la mano que se acerca ── */}
            <ellipse
              className="king-hand-shadow"
              cx="48"
              cy="72"
              rx="13"
              ry="4"
              fill="#0A1628"
              style={{ opacity: 0, transformOrigin: "48px 72px", filter: "blur(1.5px)" }}
            />

            {/* ── Onda de contacto contra el "vidrio" ── */}
            <circle
              className="king-ripple"
              cx="48"
              cy="58"
              r="7"
              fill="none"
              stroke="#FFE500"
              strokeWidth="1.8"
              style={{ opacity: 0, transformOrigin: "48px 58px" }}
            />

            {/* ── Brazo derecho: se extiende y toca la pantalla ──
                Nace cerca de la mano ya dibujada en el logo (66,40) y
                crece/avanza hacia el centro-frente (48,58). */}
            <g
              className="king-arm-reach"
              style={{ opacity: 0, transformOrigin: "66px 40px" }}
            >
              <path
                d="M66 40 Q80 42 86 54 Q90 62 84 70 L74 66 Q78 58 74 50 Q70 44 62 44 Z"
                fill="#E00000"
                stroke="#0A1628"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <ellipse
                cx="84"
                cy="70"
                rx="9"
                ry="10"
                fill="#E00000"
                stroke="#0A1628"
                strokeWidth="1.4"
              />
              {/* dedos, para que se lea claramente como mano */}
              <path
                d="M78 62 L76 56 M84 60 L84 54 M90 62 L92 56"
                stroke="#0A1628"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </g>

            {/* ── Brazo izquierdo: aparece y saluda dos veces ──
                Nace en el costado vacío del cuerpo (28,52) y sube hacia
                (14,32), bien afuera de la silueta roja original. */}
            <g
              className="king-arm-wave"
              style={{ opacity: 0, transformOrigin: "28px 52px" }}
            >
              <path
                d="M28 52 Q16 48 12 36 L20 32 Q24 42 32 46 Z"
                fill="#E00000"
                stroke="#0A1628"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <g className="king-hand-wave" style={{ transformOrigin: "13px 32px" }}>
                <ellipse cx="13" cy="32" rx="8" ry="9" fill="#E00000" stroke="#0A1628" strokeWidth="1.4" />
                <path
                  d="M7 27 L5 21 M12 25 L11 18 M18 27 L19 20"
                  stroke="#0A1628"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </g>
            </g>
          </svg>
        )}
      </div>

      {prefersReducedMotion && (
        <style jsx global>{`
          .king-head-wobble {
            filter: brightness(1.03);
          }
        `}</style>
      )}
    </div>
  );
}

function waveKeyframes(count: number): number[] {
  const frames: number[] = [0];
  for (let i = 0; i < count; i++) frames.push(-30, 15);
  frames.push(0);
  return frames;
}
