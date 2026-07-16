"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WhatsAppButton, CallButton } from "@/components/CTAButtons";

// Diapositivas del hero. Si existe la foto en public/autos/, se muestra;
// si no, se usa un fondo degradado elegante con el nombre de la marca.
// Para activar fotos reales: guardar p.ej. public/autos/peugeot.jpg
const slides = [
  { brand: "Peugeot", img: "/autos/peugeot.jpg", gradient: "from-[#0f1e46] via-[#1c3575] to-[#0b1530]" },
  { brand: "BYD", img: "/autos/byd.webp", gradient: "from-[#0c3b3b] via-[#14605c] to-[#072222]" },
  { brand: "Opel", img: "/autos/opel.webp", gradient: "from-[#3d3a06] via-[#6b6410] to-[#232105]" },
  { brand: "Citroën", img: "/autos/citroen.jpg", gradient: "from-[#5c0f0f] via-[#8f1d1d] to-[#3d0a0a]" },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, []);

  const slide = slides[index];

  return (
    <section
      className="relative overflow-hidden bg-dark text-white min-h-[70vh] md:min-h-[78vh] grid"
      data-wa-msg="Hola! Quiero hacer una consulta sobre el taller"
    >
      {/* Fondo con crossfade por marca */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.brand}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {!failed[slide.brand] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={slide.img}
              alt={`Service oficial ${slide.brand} en Montevideo — Taller Aníbal Delisa`}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
              onError={() =>
                setFailed((f) => ({ ...f, [slide.brand]: true }))
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
          {/* Oscurecido para legibilidad del texto */}
          <div className="absolute inset-0 bg-black/45" />
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
          <p className="inline-block rounded-full bg-white/10 backdrop-blur border border-white/25 px-4 py-1 text-sm font-semibold mb-6">
            Servicio oficial Peugeot · Citroën · BYD
          </p>
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl leading-tight text-white drop-shadow-lg">
            Tu auto en las mejores manos
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
            key={s.brand}
            type="button"
            aria-label={`Ver ${s.brand}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
