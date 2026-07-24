"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────────────────
// El rey "cobra vida": reproduce public/multiagent-logo-alive.webm (con
// mp4 de respaldo), un video de 6s renderizado frame-a-frame a partir de
// public/logo.png (que NUNCA se modifica). El primer y último frame son el
// logo original en reposo, así que arranca y termina idéntico al logo fijo.
//   - Autoplay 1 vez por sesión al entrar (validationMode = en cada carga).
//   - Se reproduce de nuevo al tocar el ícono.
//   - muted + playsInline (requisito para autoplay en móvil).
//   - Respeta prefers-reduced-motion (queda en el logo estático).
// Fallback: si el video no carga, muestra logo.png fijo (idéntico al reposo).
// ─────────────────────────────────────────────────────────────────────────

export const KING_ANIMATION_CONFIG = {
  autoPlayDelayMs: 800,
  /** true = se reproduce en cada carga y al tocar (etapa de aprobación).
   *  false = 1 vez por sesión y replay controlado por el padre. */
  validationMode: true,
  webm: "/multiagent-logo-alive.webm",
  mp4: "/multiagent-logo-alive.mp4",
};

const SESSION_KEY = "anibal_king_greeted_v3";

type Props = {
  className?: string;
  onTouch?: () => void;
  autoPlay?: boolean;
  replayTrigger?: number;
};

export default function AnimatedMultiagentLogo({
  className,
  onTouch,
  autoPlay = true,
  replayTrigger,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoError, setVideoError] = useState(false);
  const isFirstReplay = useRef(true);
  const touchTimer = useRef<number | null>(null);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    try {
      v.currentTime = 0;
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } catch {
      /* noop */
    }
    // El cartel "¿Necesitás ayuda?" aparece cuando la mano toca el vidrio (~2.8s).
    if (onTouch) {
      if (touchTimer.current) window.clearTimeout(touchTimer.current);
      touchTimer.current = window.setTimeout(onTouch, 2800);
    }
  };

  // Autoplay al entrar en pantalla.
  useEffect(() => {
    if (!autoPlay || typeof window === "undefined") return;
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
  }, [autoPlay]);

  // Replay manual desde el padre (modo no-validación).
  useEffect(() => {
    if (isFirstReplay.current) {
      isFirstReplay.current = false;
      return;
    }
    if (replayTrigger) play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replayTrigger]);

  const handleClick = (e: MouseEvent) => {
    if (KING_ANIMATION_CONFIG.validationMode) e.stopPropagation();
    play();
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className ?? ""}`}
      onClick={handleClick}
    >
      {videoError ? (
        <Image
          src="/logo.png"
          alt="Asistente Aníbal Delisa"
          width={512}
          height={512}
          className="w-20 h-auto md:w-24 drop-shadow-[0_8px_10px_rgba(0,0,0,0.35)]"
          priority
        />
      ) : (
        <video
          ref={videoRef}
          className="w-20 h-auto md:w-24 drop-shadow-[0_8px_10px_rgba(0,0,0,0.35)]"
          width={512}
          height={512}
          muted
          playsInline
          preload="auto"
          poster="/logo.png"
          onError={() => setVideoError(true)}
          aria-label="Asistente Aníbal Delisa"
        >
          <source src={KING_ANIMATION_CONFIG.webm} type="video/webm" />
          <source src={KING_ANIMATION_CONFIG.mp4} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
