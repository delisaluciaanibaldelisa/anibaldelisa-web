import Link from "next/link";
import {
  BadgeCheck,
  Wrench,
  ClipboardCheck,
  Gauge,
  CircleCheck,
  Star,
  ArrowRight,
  ShieldCheck,
  Users,
} from "lucide-react";
import { site } from "@/lib/site";
import Reveal, { ZoomReveal, SlideReveal } from "@/components/Reveal";
import HeroCarousel from "@/components/HeroCarousel";
import AnimatedCar from "@/components/AnimatedCar";
import { WhatsAppButton, CallButton } from "@/components/CTAButtons";

// Textos de la web original anibaldelisa.com — respetar tal cual.
const cubos = [
  {
    icon: BadgeCheck,
    title: "Servicio Oficial",
    text: "Formamos un equipo con años de experiencia y tecnología única en el país. Contamos con sistema de diagnóstico en línea conectado directamente con Francia para el seguimiento técnico de PEUGEOT, CITROËN, BYD y OPEL. Esto nos permite realizar servicios y reparaciones con precisión durante y después de la garantía. Garantizamos el mejor servicio con respaldo técnico internacional.",
    href: "/servicios/mecanica",
  },
  {
    icon: Wrench,
    title: "Mecánica Multimarca",
    text: "Para todas las marcas del mercado, desde service hasta reparaciones generales. Diagnóstico computarizado, motor, transmisión, frenos, suspensión, sistema eléctrico y más. Repuestos de calidad y asesoramiento transparente en cada trabajo.",
    href: "/servicios/mecanica",
  },
  {
    icon: ClipboardCheck,
    title: "Revisión Pre-Compra de Autos Usados",
    text: "Antes de comprar un auto usado, asegurate de conocer su estado real. En Aníbal Delisa realizamos una inspección técnica completa de: mecánica, chapa y pintura, sistema eléctrico y más. Evitá sorpresas. Comprá seguro.",
    href: "/servicios/revision-precompra",
  },
];

// Lista de servicios de la web original.
const serviciosGarantia = [
  "Aire Acondicionado",
  "Frenos",
  "Alineación y Balanceo",
  "Dirección",
  "Revisión de Autos Usados",
  "Embrague",
  "Suspensión y Amortiguación",
  "Distribución",
];

const aseguradoras = ["BSE", "Sura", "Mapfre", "Porto Seguro", "SBI", "HDI"];

const testimonios = [
  {
    name: "Gabriela M.",
    text: "Llevo mi Peugeot hace años. Siempre honestos, te explican todo y los precios son justos. Un lujo de taller.",
  },
  {
    name: "Fernando R.",
    text: "Me resolvieron un choque con el seguro sin que tuviera que preocuparme por nada. La pintura quedó impecable.",
  },
  {
    name: "Lucía P.",
    text: "Hice la revisión pre-compra antes de comprar un usado y me salvaron de una mala inversión. Recomendadísimos.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO — carrusel de marcas */}
      <HeroCarousel />

      {/* FRANJA ASEGURADORAS (como en la original, justo bajo el hero) */}
      <section className="py-10 md:py-12 bg-white overflow-hidden border-b border-gray-100">
        <Reveal className="container-x text-center mb-6">
          <h2 className="font-heading font-bold text-xl md:text-2xl text-accent tracking-wide uppercase">
            Trabajamos con todas las aseguradoras
          </h2>
        </Reveal>
        <div className="relative">
          <div className="flex w-max animate-marquee gap-6 pr-6">
            {[...aseguradoras, ...aseguradoras].map((a, i) => (
              <div
                key={`${a}-${i}`}
                className="px-8 py-3 rounded-xl bg-gray-100 text-accent font-heading font-bold text-lg whitespace-nowrap"
              >
                {a}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MECÁNICA — cubos con los textos originales */}
      <section
        className="py-16 md:py-24 bg-gray-100"
        data-wa-msg="Hola! Quiero agendar un service para mi auto"
      >
        <div className="container-x">
          <Reveal className="mb-10">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Nuestros servicios
            </p>
            <h2 className="mt-1 font-heading font-bold text-3xl md:text-4xl text-dark">
              Mecánica
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {cubos.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.1}>
                <Link
                  href={c.href}
                  className="group flex h-full flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all p-8"
                >
                  <div className="grid place-items-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all">
                    <c.icon size={28} />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-dark">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                    {c.text}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Rectángulo largo: Alineación y Balanceo (texto original) */}
          <ZoomReveal className="mt-6">
            <Link
              href="/seguridad-vial"
              className="group flex flex-col md:flex-row items-start md:items-center gap-5 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all p-8"
              data-wa-msg="Hola! Quiero un turno para alineación y balanceo"
            >
              <div className="grid place-items-center w-14 h-14 shrink-0 rounded-2xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                <Gauge size={28} />
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-bold text-xl text-dark">
                  Alineación y Balanceo
                </h3>
                <p className="mt-1.5 text-gray-600 text-sm leading-relaxed">
                  Equipos de última generación y precisión milimétrica. Tus
                  neumáticos duran más, tu auto maneja mejor y viajás más
                  seguro.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 font-semibold text-primary whitespace-nowrap">
                Saber más
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </Link>
          </ZoomReveal>

          {/* Botones de la sección (como en la original) */}
          <Reveal className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppButton label="Escribinos por WhatsApp" />
            <CallButton label="Llamanos" />
          </Reveal>
        </div>
      </section>

      {/* CHAPA Y PINTURA — texto original, con zoom y auto animado */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-accent via-[#0a2547] to-dark text-white"
        data-wa-msg="Hola! Quiero un presupuesto de chapa y pintura"
        data-wa-num="chapa"
      >
        <div className="container-x py-20 md:py-28">
          <ZoomReveal>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl leading-tight max-w-3xl">
              CHAPA Y PINTURA CON ACABADO DE FÁBRICA
            </h2>
          </ZoomReveal>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 items-start">
            <SlideReveal
              from="left"
              className="space-y-4 text-gray-200 leading-relaxed"
            >
              <p>
                En nuestro taller realizamos reparaciones de chapa y pintura
                para aseguradoras privadas y clientes particulares, cuidando
                cada detalle del proceso.
              </p>
              <p>
                Desde un rayón superficial hasta una reparación estructural
                compleja, trabajamos con tecnología de punta, materiales de
                alta calidad y terminaciones profesionales.
              </p>
              <p>
                Contamos con cabina de pintura climatizada, sistema de
                igualación exacta de color y garantía en cada trabajo
                realizado.
              </p>
              <p className="font-semibold text-white">
                Precisión, calidad y confianza para que tu auto vuelva a lucir
                impecable.
              </p>
            </SlideReveal>

            <SlideReveal from="right">
              <div className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6">
                <ul className="space-y-3">
                  {[
                    "Aseguradoras privadas y particulares",
                    "Cabina de pintura climatizada",
                    "Igualación exacta de color",
                    "Reparaciones estructurales complejas",
                    "Garantía en cada trabajo",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <CircleCheck
                        size={20}
                        className="mt-0.5 shrink-0 text-primary-light"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <WhatsAppButton
                    href={site.whatsapp.chapa}
                    label="Escribinos por WhatsApp"
                    className="flex-1"
                  />
                  <CallButton
                    href={site.locations.chapa.telHref}
                    label="Llamanos"
                    className="flex-1"
                  />
                </div>
              </div>
            </SlideReveal>
          </div>
        </div>

        {/* Auto animado cruzando la sección */}
        <AnimatedCar className="mb-4" />
      </section>

      {/* GARANTÍA TOTAL — texto y lista de servicios originales */}
      <section className="py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2 items-start">
          <SlideReveal from="left">
            <div className="flex items-center gap-3 mb-4">
              <div className="grid place-items-center w-12 h-12 rounded-xl bg-primary text-white">
                <ShieldCheck size={26} />
              </div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">
                Garantía Total en Nuestros Servicios
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                En Aníbal Delisa combinamos {site.yearsExperience} años de
                experiencia con tecnología de última generación para cuidar tu
                vehículo con excelencia.
              </p>
              <p>
                Ofrecemos servicio completo de mecánica, chapa y pintura para
                todas las marcas, con garantía en cada trabajo realizado.
              </p>
              <p className="font-semibold text-dark">
                Porque la confianza no se improvisa, se construye reparación
                tras reparación. Tu auto en manos de quienes saben lo que
                hacen.
              </p>
            </div>
            <div className="mt-7 flex flex-col sm:flex-row gap-4">
              <WhatsAppButton label="Consultanos por WhatsApp" />
              <Link
                href="/servicios/chapa-pintura"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-accent hover:bg-accent-light text-white font-semibold px-6 py-3 transition-all hover:scale-[1.03]"
              >
                Chapa y Pintura
                <ArrowRight size={18} />
              </Link>
            </div>
          </SlideReveal>

          <SlideReveal from="right">
            <div className="rounded-2xl border border-gray-200 p-6 md:p-8 bg-gray-50">
              <h3 className="font-heading font-bold text-lg text-dark mb-5">
                Servicios
              </h3>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {serviciosGarantia.map((s) => (
                  <li key={s} className="flex items-start gap-2.5">
                    <CircleCheck
                      size={18}
                      className="mt-0.5 shrink-0 text-primary"
                    />
                    <span className="text-sm text-gray-700">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SlideReveal>
        </div>
      </section>

      {/* ATENDIDO POR SUS PROPIOS DUEÑOS — texto original */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container-x max-w-4xl text-center">
          <ZoomReveal>
            <div className="grid place-items-center w-16 h-16 rounded-full bg-primary text-white mx-auto mb-5">
              <Users size={30} />
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">
              Atendido Por Sus Propios Dueños
            </h2>
          </ZoomReveal>
          <Reveal
            delay={0.15}
            className="mt-6 space-y-4 text-gray-700 leading-relaxed text-left md:text-center"
          >
            <p>
              Con más de {site.yearsExperience} años de trayectoria en Uruguay,
              especializada en Mecánica - Chapa y Pintura.
            </p>
            <p>
              Nuestro equipo está formado por profesionales capacitados que
              trabajan con dedicación y compromiso en cada servicio. Nos
              respaldan la experiencia, la ética de trabajo y la
              responsabilidad que caracterizan a un negocio familiar.
            </p>
            <p>
              Contamos con instalaciones equipadas y utilizamos repuestos
              originales para garantizar el mejor resultado en cada
              reparación.
            </p>
            <p className="font-semibold text-dark">
              Ofrecemos soluciones confiables porque entendemos el valor que tu
              vehículo tiene para vos y tu familia.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-8">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 transition-all hover:scale-[1.03]"
            >
              Visitanos
            </Link>
          </Reveal>
        </div>
      </section>

      {/* QUÉ DICEN NUESTROS CLIENTES */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">
              Qué Dicen Nuestros Clientes
            </h2>
            {/* Calificación real de la ficha de Google */}
            <a
              href={site.google.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white shadow-sm px-5 py-2.5 hover:shadow-md transition-shadow"
            >
              <Star size={20} className="text-yellow-500" fill="currentColor" />
              <span className="font-heading font-bold text-dark text-lg">
                {site.google.rating}
              </span>
              <span className="text-sm text-gray-600">
                · {site.google.reviewCount} reseñas en Google
              </span>
            </a>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonios.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <figure className="h-full rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-shadow p-6 flex flex-col">
                  <div className="flex gap-0.5 text-primary mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={18} fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 flex-1">
                    “{t.text}”
                  </blockquote>
                  <figcaption className="mt-4 font-heading font-bold text-dark">
                    {t.name}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <a
              href={site.google.writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-accent hover:bg-accent-light text-white font-semibold px-6 py-3 transition-all hover:scale-[1.03]"
            >
              ⭐ Dejanos tu reseña en Google
            </a>
          </Reveal>
        </div>
      </section>

      {/* ESCRIBINOS — cierre como en la original */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container-x text-center">
          <ZoomReveal>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl">
              Escribinos
            </h2>
            <p className="mt-3 text-white/90 max-w-xl mx-auto">
              Para consultas, comunícate con nosotros por WhatsApp o llámanos.
              Nuestro equipo está listo para brindarte una atención
              excepcional.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppButton
                label="Escribinos por WhatsApp"
                className="!bg-white !text-[#1eb555] hover:!bg-gray-100"
              />
              <CallButton className="!bg-dark hover:!bg-black" />
            </div>
          </ZoomReveal>
        </div>
      </section>
    </>
  );
}
