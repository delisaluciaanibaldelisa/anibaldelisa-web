"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import AutoVideo from "@/components/AutoVideo";

// Logos de marca para la franja "Servicio Oficial" (en movimiento continuo).
const marcas = [
  { name: "Peugeot", src: "/logos/peugeot.png" },
  { name: "Citroën", src: "/logos/citroen.png" },
  { name: "BYD", src: "/logos/byd.svg" },
  { name: "Opel", src: "/logos/opel.png" },
];

// Diapositivas del hero. Si existe la foto en public/autos/, se muestra;
// si no, se usa un fondo degradado elegante con el nombre de la marca.
const slides = [
  { id: "byd-tang", brand: "BYD Tang", video: "/videos/chapa-byd-tang.mp4", img: "/autos/byd.webp", gradient: "from-[#0c3b3b] via-[#14605c] to-[#072222]" },
  { id: "c3-aircross", brand: "Citroën C3 Aircross", img: "/autos/hero-c3aircross.jpg", gradient: "from-[#5c0f0f] via-[#8f1d1d] to-[#3d0a0a]" },
  { id: "peugeot-208", brand: "Peugeot 208", img: "/autos/hero-208.jpg", gradient: "from-[#0f1e46] via-[#1c3575] to-[#0b1530]" },
  { id: "byd-e2x", brand: "BYD e2X", img: "/autos/hero-byd-e2x.jpg", gradient: "from-[#0c3b3b] via-[#14605c] to-[#072222]" },
  { id: "opel", brand: "Opel", img: "/autos/opel.webp", gradient: "from-[#3d3a06] via-[#6b6410] to-[#232105]" },
  { id: "c5-aircross", brand: "Citroën C5 Aircross", img: "/autos/hero-c5aircross.jpg", gradient: "from-[#5c0f0f] via-[#8f1d1d] to-[#3d0a0a]" },
  { id: "peugeot-308sw", brand: "Peugeot 308 SW", img: "/autos/hero-308sw.jpg", gradient: "from-[#0f1e46] via-[#1c3575] to-[#0b1530]" },
  { id: "c4", brand: "Citroën C4", img: "/autos/hero-c4.jpg", gradient: "from-[#5c0f0f] via-[#8f1d1d] to-[#3d0a0a]" },
  { id: "peugeot-308phev", brand: "Peugeot 308 Hybrid", img: "/autos/hero-308phev.jpg", gradient: "from-[#0f1e46] via-[#1c3575] to-[#0b1530]" },
  { id: "peugeot-leasing", brand: "Peugeot", img: "/autos/hero-leasing.jpg", gradient: "from-[#0f1e46] via-[#1c3575] to-[#0b1530]" },
] as {
  id: string;
  brand: string;
  img: string;
  video?: string;
  gradient: string;
}[];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // El slide con video dura más para que se aprecie (2s más rápido que antes).
    const dur = slides[index].video ? 7000 : 2500;
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), dur);
    return () => clearTimeout(t);
  }, [index]);

  const slide = slides[index];

  return (
    <section
      className="relative overflow-hidden bg-dark text-white min-h-[70vh] md:min-h-[78vh] grid"
      data-wa-msg="Hola! Quiero hacer una consulta sobre el taller"
    >
      {/* Fondo con crossfade por marca */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {slide.video && !failed[slide.id] ? (
            <AutoVideo
              src={slide.video}
              poster={slide.img}
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : !failed[slide.id] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={slide.img}
              alt={`Service oficial ${slide.brand} en Montevideo — Taller Aníbal Delisa`}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
              onError={() =>
                setFailed((f) => ({ ...f, [slide.id]: true }))
              }
            />
          ) : (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
            >
              {/* Nombre de marca gigante de fondo */}
              <span className="absolute inset-0 grid place-items-center font-heading font-extrabold text-[18vw] md:text-[12vw] text-white/5 select-none tracking-tighter">
                {slide.brand}
              </span>
            </div>
          )}
          {/* Oscurecido para legibilidad del texto (navy, deja ver el auto) */}
          <div className="absolute inset-0 bg-[rgba(10,22,40,0.62)]" />
        </motion.div>
      </AnimatePresence>

      {/* Contenido fijo sobre el carrusel */}
      <div className="relative container-x self-center py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="inline-block rounded-full bg-white/10 backdrop-blur border border-white/25 px-5 py-1.5 text-[17px] text-white/90 font-bold mb-4">
            Servicio Oficial
          </p>

          {/* Logos de marca en movimiento continuo */}
          <div className="relative w-full max-w-md overflow-hidden mb-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee items-center gap-10 py-1">
              {[...marcas, ...marcas].map((m, i) => (
                <div
                  key={`${m.name}-${i}`}
                  className="shrink-0 grid place-items-center bg-white rounded-lg px-4 py-2 shadow-md"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.src}
                    alt={m.name}
                    className="h-6 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <h1 className="font-heading font-extrabold text-[clamp(36px,5vw,64px)] leading-tight max-w-[680px] text-white drop-shadow-lg">
            Tu auto en{" "}
            <br className="hidden sm:block" />
            las mejores manos
          </h1>
          <p className="mt-5 text-lg md:text-xl text-gray-100 max-w-2xl drop-shadow">
            Mecánica · Chapa y Pintura · Revisiones
          </p>
          <div className="mt-8">
            <Link
              href="/turnos"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gold px-8 py-4 font-heading font-bold text-charcoal shadow-[0_8px_24px_rgba(255,229,0,0.35)] transition-all hover:scale-[1.04] hover:shadow-[0_10px_30px_rgba(255,229,0,0.5)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/30 skew-x-[-20deg] transition-transform duration-700 group-hover:translate-x-full" />
              <CalendarCheck size={20} className="relative" />
              <span className="relative">Agendá tu turno</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Indicadores del carrusel */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Ver ${s.brand}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-8 bg-gold" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
