"use client";

import { useState } from "react";
import { Play } from "lucide-react";

// Video destacado con "click para reproducir": muestra una portada liviana
// y solo descarga el video cuando el usuario lo pide (preload none).
export default function VideoFeature({
  src,
  poster,
  title,
  subtitle,
}: {
  src: string;
  poster?: string;
  title: string;
  subtitle: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-navy shadow-2xl">
      {playing ? (
        <video
          src={src}
          className="h-full w-full object-contain bg-black"
          controls
          autoPlay
          playsInline
          preload="auto"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Reproducir video: ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          {poster && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={poster}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover opacity-30 [filter:sepia(0.3)]"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy-mid/40" />
          <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-white shadow-xl transition-transform group-hover:scale-110">
            <Play size={30} fill="currentColor" className="ml-1" />
          </span>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
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
