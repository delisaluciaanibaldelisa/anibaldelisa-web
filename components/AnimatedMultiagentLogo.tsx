"use client";

import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────
// El rey "cobra vida": WebP animado transparente (public/multiagent-logo-alive.webp),
// derivado del video provisto. Se usa vía <img> — así funciona con fondo
// transparente en TODOS los navegadores, incluido iOS Safari (que no soporta
// WebM transparente y por eso antes mostraba fondo blanco en el celular).
// public/logo.png queda como fallback estático si el WebP no cargara.
// ─────────────────────────────────────────────────────────────────────────

export const KING_ANIMATION_CONFIG = {
  autoPlayDelayMs: 800,
  webp: "/multiagent-logo-alive.webp",
  fallback: "/logo.png",
};

type Props = {
  className?: string;
  /** Se llama ~1s después de entrar en pantalla (para mostrar el cartel de saludo). */
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
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgError, setImgError] = useState(false);
  const [cacheBust, setCacheBust] = useState(0);
  const firedRef = useRef(false);
  const isFirstReplay = useRef(true);

  // Reinicia la animación recargando el WebP (útil para "repetir al tocar").
  const replay = () => setCacheBust((c) => c + 1);

  // Dispara onTouch (aparición del cartel) una vez al entrar en pantalla.
  useEffect(() => {
    if (!autoPlay || typeof window === "undefined") return;
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          observer.disconnect();
          if (onTouch) window.setTimeout(onTouch, KING_ANIMATION_CONFIG.autoPlayDelayMs + 1600);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]);

  // Replay manual desde el padre (ej. al cerrar el chat).
  useEffect(() => {
    if (isFirstReplay.current) {
      isFirstReplay.current = false;
      return;
    }
    if (replayTrigger) replay();
  }, [replayTrigger]);

  const src = imgError
    ? KING_ANIMATION_CONFIG.fallback
    : `${KING_ANIMATION_CONFIG.webp}${cacheBust ? `?r=${cacheBust}` : ""}`;

  return (
    <div ref={containerRef} className={`relative inline-block ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt="Asistente Aníbal Delisa"
        className="h-20 w-auto md:h-24 drop-shadow-[0_8px_10px_rgba(0,0,0,0.35)]"
        onError={() => setImgError(true)}
      />
    </div>
  );
}
