"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AutoVideo from "@/components/AutoVideo";
import { WhatsAppButton, CallButton } from "@/components/CTAButtons";

// Diapositivas del hero. Si existe la foto en public/autos/, se muestra;
// si no, se usa un fondo degradado elegante con el nombre de la marca.
const slides = [
  { id: "byd-tang", brand: "BYD Tang", video: "/videos/chapa-byd-tang.mp4", img: "/autos/byd.webp", gradient: "from-[#0c3b3b] via-[#14605c] to-[#072222]" },
  { id: "peugeot-208", brand: "Peugeot 208", img: "/autos/hero-208.jpg", gradient: "from-[#0f1e46] via-[#1c3575] to-[#0b1530]" },
  { id: "opel", brand: "Opel", img: "/autos/opel.webp", gradient: "from-[#3d3a06] via-[#6b6410] to-[#232105]" },
  { id: "peugeot-308sw", brand: "Peugeot 308 SW", img: "/autos/hero-308sw.jpg", gradient: "from-[#0f1e46] via-[#1c3575] to-[#0b1530]" },
  { id: "byd-e2x", brand: "BYD e2X", img: "/autos/hero-byd-e2x.jpg", gradient: "from-[#0c3b3b] via-[#14605c] to-[#072222]" },
  { id: "citroen", brand: "Citroën", img: "/autos/citroen.jpg", gradient: "from-[#5c0f0f] via-[#8f1d1d] to-[#3d0a0a]" },
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
    // El slide con video dura más para que se aprecie.
    const dur = slides[index].video ? 9000 : 4500;
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
              preload="auto"
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
          <p className="inline-block rounded-full bg-white/10 backdrop-blur border border-white/25 px-4 py-1 text-[13px] text-white/85 font-semibold mb-6">
            Servicio oficial Peugeot · Citroën · BYD
          </p>
          <h1 className="font-heading font-extrabold text-[clamp(36px,5vw,64px)] leading-tight max-w-[680px] text-white drop-shadow-lg">
            Tu auto en{" "}
            <br className="hidden sm:block" />
            las mejores manos
          </h1>
          <p className="mt-5 text-lg md:text-xl text-gray-100 max-w-2xl drop-shadow">
            Mecánica · Chapa y Pintura · Revisiones
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <WhatsAppButton label="Escribinos por WhatsApp" />
            <CallButton />
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
