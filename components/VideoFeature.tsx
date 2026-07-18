"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

// Video destacado que muestra el primer cuadro real del video como portada
// (preload="metadata": no descarga el video completo hasta que se reproduce).
export default function VideoFeature({
  src,
  title,
  subtitle,
}: {
  src: string;
  title: string;
  subtitle: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    setPlaying(true);
    ref.current?.play();
  };

  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-navy shadow-2xl">
      <video
        ref={ref}
        src={src}
        className="h-full w-full object-contain bg-navy"
        preload="metadata"
        playsInline
        controls={playing}
      />
      {!playing && (
        <button
          type="button"
          onClick={start}
          aria-label={`Reproducir video: ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          <div className="absolute inset-0 bg-navy/30 transition-colors group-hover:bg-navy/20" />
          <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-white shadow-xl transition-transform group-hover:scale-110">
            <Play size={30} fill="currentColor" className="ml-1" />
          </span>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/90 to-transparent p-6 text-left">
            <p className="text-xs font-bold uppercase tracking-[2px] text-gold">
              {subtitle}
            </p>
            <p className="mt-1 font-heading text-xl font-bold text-white">
              {title}
            </p>
          </div>
        </button>
      )}
    </div>
  );
}
