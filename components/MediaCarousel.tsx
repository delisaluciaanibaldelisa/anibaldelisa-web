"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AutoVideo from "@/components/AutoVideo";

type Item =
  | { type: "img"; src: string; alt: string }
  | { type: "video"; src: string; poster: string };

// Carrusel que rota entre imágenes y videos mezclados con crossfade.
// Cada item dura `imgMs` (imágenes) o `videoMs` (videos).
export default function MediaCarousel({
  items,
  className = "",
  imgMs = 3000,
  videoMs = 4000,
}: {
  items: Item[];
  className?: string;
  imgMs?: number;
  videoMs?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const dur = items[index].type === "video" ? videoMs : imgMs;
    const t = setTimeout(
      () => setIndex((i) => (i + 1) % items.length),
      dur,
    );
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {items.map((item, i) => (
        <div
          key={item.src}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {item.type === "video" ? (
            // Solo se monta el video cuando es el activo (evita cargar todos).
            i === index ? (
              <AutoVideo
                src={item.src}
                poster={item.poster}
                preload="metadata"
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={item.poster}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            )
          ) : (
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
}
