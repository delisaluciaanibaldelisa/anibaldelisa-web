"use client";

import { useEffect, useRef } from "react";

// Video de fondo con autoplay garantizado.
// React a veces no refleja el atributo `muted`, y sin él los navegadores
// bloquean el autoplay: acá se fuerza por propiedad y se reintenta play().
export default function AutoVideo({
  src,
  poster,
  className = "",
  preload = "metadata",
}: {
  src: string;
  poster?: string;
  className?: string;
  preload?: "none" | "metadata" | "auto";
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const play = () => v.play().catch(() => {});
    play();
    // Reintenta cuando hay datos suficientes.
    v.addEventListener("canplay", play);
    return () => v.removeEventListener("canplay", play);
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload={preload}
      className={className}
    />
  );
}
