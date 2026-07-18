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
  SprayCan,
  Disc3,
  Cog,
  MoveVertical,
  Disc,
  TriangleAlert,
  Snowflake,
  CircleDot,
  CalendarCheck,
  Building2,
  SquareParking,
  Construction,
} from "lucide-react";
import { site } from "@/lib/site";
import Reveal, { ZoomReveal, SlideReveal } from "@/components/Reveal";
import HeroCarousel from "@/components/HeroCarousel";
import StatCounter from "@/components/StatCounter";
import MediaCarousel from "@/components/MediaCarousel";
import { WhatsAppButton, CallButton } from "@/components/CTAButtons";

// Pilares destacados de la grilla de servicios (bento).
const pilares = [
  {
    icon: BadgeCheck,
    title: "Servicio Oficial",
    text: "Service oficial Peugeot, Citroën, BYD y Opel. Diagnóstico computarizado conectado con la central técnica en Francia, repuestos legítimos y procedimientos originales que mantienen vigente la garantía oficial de tu auto.",
    href: "/servicios/servicio-oficial",
    logos: [
      { src: "/logos/peugeot.png?v=3", alt: "Peugeot" },
      { src: "/logos/citroen.png?v=3", alt: "Citroën" },
      { src: "/logos/byd.png?v=3", alt: "BYD" },
      { src: "/logos/opel.png?v=3", alt: "Opel" },
    ],
  },
  {
    icon: Wrench,
    title: "Mecánica Multimarca",
    text: "¿Tu auto es de otra marca? También lo atendemos. Reparamos y mantenemos todas las marcas del mercado con el compromiso y la calidad que nos respaldan hace más de 53 años. Presupuestos claros, sin sorpresas.",
    href: "/servicios/mecanica",
  },
  {
    icon: SprayCan,
    title: "Chapa y Pintura",
    text: "Siniestros con todas las aseguradoras. Enderezado en bancada, colorimetría computarizada y cabina con horno de secado: terminación de fábrica, imperceptible.",
    href: "/servicios/chapa-pintura",
  },
];

// Servicios especializados (grid compacto). text = micro-copy persuasivo.
const especializados = [
  {
    icon: Disc3,
    title: "Frenos",
    text: "Frenás seguro. Pastillas, discos y sistema completo revisados a fondo.",
    href: "/servicios/frenos",
  },
  {
    icon: Cog,
    title: "Distribución",
    tag: "Correa · Cadena",
    text: "El corazón del motor. Cambiarla a tiempo te evita una rotura carísima.",
    href: "/servicios/distribucion",
  },
  {
    icon: MoveVertical,
    title: "Suspensión y Amortiguación",
    text: "Manejo firme y confortable. Amortiguadores, rótulas y tren delantero.",
    href: "/servicios/suspension-amortiguacion",
  },
  {
    icon: Disc,
    title: "Embrague",
    text: "Cambios suaves de nuevo. Diagnóstico y reemplazo con repuestos de calidad.",
    href: "/servicios/embrague",
  },
  {
    icon: TriangleAlert,
    title: "Fallas y Diagnóstico",
    text: "¿Se prendió una luz en el tablero? La detectamos con diagnóstico computarizado.",
    href: "/servicios/fallas-diagnostico",
  },
  {
    icon: Snowflake,
    title: "Aire Acondicionado",
    text: "Frío cuando lo necesitás. Carga de gas y reparación del sistema completo.",
    href: "/servicios/aire-acondicionado",
  },
  {
    icon: ClipboardCheck,
    title: "Revisión Pre-Compra",
    text: "Comprá tranquilo. Inspección completa del usado antes de que decidas.",
    href: "/servicios/revision-precompra",
  },
  {
    icon: Gauge,
    title: "Alineación y Balanceo",
    text: "Tus neumáticos duran más y el auto no tira. Precisión milimétrica.",
    href: "/servicios/alineacion-balanceo",
  },
  {
    icon: CircleDot,
    title: "Neumáticos",
    text: "Montaje, balanceo y asesoramiento para elegir la goma justa para tu auto.",
    href: "/servicios/neumaticos",
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

const aseguradoras = [
  { name: "BSE", src: "/aseguradoras/bse.png" },
  { name: "Sura", src: "/aseguradoras/sura.png" },
  { name: "Mapfre", src: "/aseguradoras/mapfre.png" },
  { name: "Porto Seguro", src: "/aseguradoras/porto.png?v=2" },
  { name: "SBI Seguros", src: "/aseguradoras/sbi.png" },
  { name: "San Cristóbal", src: "/aseguradoras/sancristobal.png" },
  { name: "Barbuss", src: "/aseguradoras/barbuss.png" },
];

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

      {/* FRANJA ASEGURADORAS — siniestros + carrusel de logos */}
      <section className="py-12 md:py-16 bg-navy overflow-hidden">
        <Reveal className="container-x text-center mb-8">
          <p className="text-sm font-bold uppercase tracking-[3px] text-gold mb-2">
            Siniestros · Chapa y Pintura
          </p>
          <h2 className="font-heading font-bold text-[clamp(20px,2.8vw,34px)] text-white tracking-wide uppercase">
            Trabajamos con todas las aseguradoras
          </h2>
        </Reveal>
        {/* Carrusel continuo centrado, con difuminado en los bordes */}
        <div className="relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-5">
            {[...aseguradoras, ...aseguradoras].map((a, i) => (
              <div
                key={`${a.name}-${i}`}
                className="shrink-0 grid place-items-center h-20 min-w-[150px] px-7 rounded-xl bg-white shadow-lg"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.src}
                  alt={`${a.name} — aseguradora con la que trabaja Aníbal Delisa`}
                  title={a.name}
                  className="max-h-11 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NUESTROS SERVICIOS — bento grid moderno */}
      <section
        className="py-16 md:py-24 bg-gray-50"
        data-wa-msg="Hola! Quiero agendar un service para mi auto"
      >
        <div className="container-x">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[3px] text-primary mb-3">
              <span className="h-px w-6 bg-primary" />
              Nuestros Servicios
              <span className="h-px w-6 bg-primary" />
            </p>
            <h2 className="font-heading font-extrabold text-[clamp(28px,4vw,44px)] text-dark leading-tight">
              Todo lo que tu auto necesita,
              <span className="text-primary"> en un solo lugar</span>
            </h2>
            <p className="mt-4 text-gray-600 text-[15px] leading-[1.7]">
              Más de 53 años cuidando cada detalle. Desde el service oficial de
              tu marca hasta la reparación más compleja, con la confianza de una
              empresa familiar.
            </p>
          </Reveal>

          {/* Pilares destacados */}
          <div className="grid gap-6 lg:grid-cols-3">
            {pilares.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <Link
                  href={p.href}
                  className="group relative flex h-full flex-col overflow-hidden bg-navy text-white rounded-3xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                >
                  {/* Halo decorativo */}
                  <span className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-primary/20 blur-2xl transition-opacity group-hover:opacity-70" />
                  <div className="relative grid place-items-center w-14 h-14 rounded-2xl bg-white/10 text-gold mb-5 group-hover:scale-110 transition-transform">
                    <p.icon size={28} />
                  </div>
                  <h3 className="relative font-heading font-bold text-xl">
                    {p.title}
                  </h3>
                  <p className="relative mt-3 text-white/70 text-[15px] leading-[1.7] flex-1">
                    {p.text}
                  </p>
                  {p.logos && (
                    <div className="relative mt-5 pt-4 border-t border-white/10 flex items-center gap-2.5 flex-wrap">
                      {p.logos.map((l) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={l.alt}
                          src={l.src}
                          alt={`Servicio oficial ${l.alt} — Aníbal Delisa Montevideo`}
                          title={`Servicio oficial ${l.alt}`}
                          className="h-9 w-9 object-cover rounded-md ring-1 ring-white/15"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  )}
                  <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                    Conocer más
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Servicios especializados */}
          <Reveal className="mt-12 mb-6 text-center">
            <p className="text-xs font-bold uppercase tracking-[3px] text-gray-400">
              Especialistas en cada sistema
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {especializados.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.06}>
                <Link
                  href={s.href}
                  className="group flex h-full items-start gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30"
                >
                  <div className="grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-primary/8 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <s.icon size={22} />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h4 className="font-heading font-bold text-[15px] text-dark">
                        {s.title}
                      </h4>
                      {"tag" in s && s.tag && (
                        <span className="text-[10px] font-bold uppercase tracking-wide text-primary">
                          {s.tag}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[13px] text-gray-600 leading-snug">
                      {s.text}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* CTA */}
          <Reveal className="mt-12 text-center">
            <Link
              href="/turnos"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-heading font-bold px-8 py-4 rounded-full shadow-lg transition-all hover:scale-[1.03]"
            >
              <CalendarCheck size={18} />
              Agendá tu turno online
            </Link>
            <p className="mt-3 text-sm text-gray-500">
              ¿Preferís consultarnos primero?{" "}
              <a
                href={site.whatsapp.general}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                Escribinos por WhatsApp
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* CHAPA Y PINTURA — texto original, con zoom y auto animado */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-mid to-navy text-white"
        data-wa-msg="Hola! Quiero un presupuesto de chapa y pintura"
        data-wa-num="chapa"
      >
        <div className="container-x py-20 md:py-28">
          <ZoomReveal>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl leading-tight max-w-3xl">
              CHAPA Y PINTURA CON ACABADO DE FÁBRICA
            </h2>
          </ZoomReveal>

          {/* Damero 2x2: texto/video arriba, video/texto abajo — videos en diagonal */}
          <div className="mt-8 grid gap-8 lg:grid-cols-2 items-stretch">
            <SlideReveal
              from="left"
              className="space-y-4 text-gray-200 leading-relaxed self-center"
            >
              <p>
                Reparamos tu vehículo con un protocolo profesional de
                carrocería: diagnóstico del daño, enderezado en bancada con
                control dimensional y sustitución de paneles mediante soldadura
                cuando el impacto lo requiere.
              </p>
              <p>
                En pintura igualamos el color exacto de fábrica por colorimetría
                computarizada y aplicamos en cabina presurizada y climatizada,
                con secado controlado por horno. La terminación bicapa queda
                uniforme, sin diferencias de tono ni marcas de reparación.
              </p>
              <p>
                Gestionamos el siniestro de principio a fin con tu compañía de
                seguros, con garantía escrita sobre el trabajo realizado.
              </p>
              <p className="font-semibold text-white">
                Precisión técnica y terminación de fábrica: tu auto vuelve a
                lucir como el primer día.
              </p>
            </SlideReveal>

            <SlideReveal from="right">
              <MediaCarousel
                imgMs={2500}
                videoMs={3500}
                items={[
                  { type: "video", src: "/videos/hero-byd-seal.mp4", poster: "/autos/chapa-citroen-screen.jpg" },
                  { type: "img", src: "/autos/chapa-508.jpg", alt: "Reparación de chapa y pintura — Aníbal Delisa Montevideo" },
                  { type: "video", src: "/videos/chapa-byd-tang.mp4", poster: "/autos/chapa-brandvision.jpg" },
                  { type: "img", src: "/autos/chapa-partner.jpg", alt: "Cabina de pintura climatizada — Aníbal Delisa" },
                ]}
                className="w-full h-[220px] lg:h-72 rounded-xl [clip-path:polygon(8%_0%,100%_0%,100%_100%,0%_100%)]"
              />
            </SlideReveal>

            <SlideReveal from="left">
              <MediaCarousel
                imgMs={2500}
                videoMs={3500}
                items={[
                  { type: "img", src: "/autos/chapa-brandvision.jpg", alt: "Terminación profesional de pintura — Aníbal Delisa" },
                  { type: "video", src: "/videos/chapa-byd-yuan.mp4", poster: "/autos/chapa-508sw.jpg" },
                  { type: "img", src: "/autos/chapa-concept.jpg", alt: "Igualación exacta de color — Aníbal Delisa Montevideo" },
                  { type: "img", src: "/autos/chapa-508sw.jpg", alt: "Chapa y pintura con acabado de fábrica — Aníbal Delisa" },
                ]}
                className="w-full h-[220px] lg:h-72 rounded-xl [clip-path:polygon(0%_0%,92%_0%,100%_100%,0%_100%)]"
              />
            </SlideReveal>

            <SlideReveal from="right" className="self-center">
              <div className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6">
                <ul className="space-y-3">
                  {[
                    "Enderezado en bancada con control dimensional",
                    "Soldadura y sustitución de paneles",
                    "Cabina de pintura climatizada con horno de secado",
                    "Colorimetría computarizada para igualación exacta",
                    "Tratamiento anticorrosión",
                    "Gestión integral con tu aseguradora y garantía escrita",
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
                <div className="mt-6 flex items-center gap-3">
                  <WhatsAppButton
                    href={site.whatsapp.chapa}
                    label="Escribinos por WhatsApp"
                  />
                  <CallButton
                    href={site.locations.chapa.telHref}
                    label="Llamanos"
                  />
                </div>
              </div>
            </SlideReveal>
          </div>
        </div>
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
              responsabilidad que caracterizan a una empresa familiar.
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

          {/* Stats animadas (Corrección 5) */}
          <Reveal delay={0.2} className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCounter value={53} suffix="+" label="Años" color="#FFE500" />
            <StatCounter value={4} label="Marcas oficiales" color="#e00000" />
            <StatCounter value={2} label="Talleres" color="#0A1628" />
            <StatCounter
              value={4.8}
              decimals={1}
              suffix=" ⭐"
              label="En Google"
              color="#FFE500"
            />
          </Reveal>

          {/* Presencia e infraestructura — sello premium y expansión */}
          <Reveal delay={0.2} className="mt-14">
            <p className="text-xs font-bold uppercase tracking-[3px] text-primary">
              Nuestra presencia
            </p>
            <h3 className="mt-3 font-heading font-extrabold text-2xl md:text-3xl text-dark">
              Crecemos para atenderte cada día mejor
            </h3>

            <div className="mt-8 grid gap-5 sm:grid-cols-3 text-left">
              {/* Talleres propios */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5">
                <div className="grid place-items-center w-12 h-12 rounded-xl bg-navy text-white">
                  <Building2 size={24} />
                </div>
                <p className="mt-4 font-heading font-bold text-lg text-dark">
                  2 talleres propios
                </p>
                <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">
                  Mecánica y Chapa y Pintura, con instalaciones equipadas y
                  tecnología de última generación en Montevideo.
                </p>
              </div>

              {/* Estacionamiento privado */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5">
                <div className="grid place-items-center w-12 h-12 rounded-xl bg-navy text-white">
                  <SquareParking size={24} />
                </div>
                <p className="mt-4 font-heading font-bold text-lg text-dark">
                  Estacionamiento privado
                </p>
                <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">
                  Playas propias y seguras: dejá tu auto resguardado y con total
                  tranquilidad mientras lo atendemos.
                </p>
              </div>

              {/* En expansión — próximamente */}
              <div className="relative rounded-2xl border border-gold/40 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5">
                <span className="absolute top-4 right-4 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-charcoal">
                  Próximamente
                </span>
                <div className="grid place-items-center w-12 h-12 rounded-xl bg-primary text-white">
                  <Construction size={24} />
                </div>
                <p className="mt-4 font-heading font-bold text-lg text-dark">
                  2 nuevas instalaciones
                </p>
                <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">
                  Estamos reformando dos propiedades para ampliar nuestra
                  capacidad y brindarte una atención aún más ágil y cómoda.
                </p>
              </div>
            </div>

            <p className="mt-10 font-heading font-semibold text-lg md:text-xl text-dark max-w-2xl mx-auto">
              No dejamos de crecer: cada mejora que hacemos persigue un solo
              objetivo,{" "}
              <span className="text-primary">
                cuidar tu auto como se merece.
              </span>
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

      {/* QUÉ DICEN NUESTROS CLIENTES — protagonismo navy (Corrección 7) */}
      <section className="py-16 md:py-24 bg-navy text-white">
        <div className="container-x">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading font-bold text-[clamp(22px,3vw,38px)] text-white">
              Qué Dicen Nuestros Clientes
            </h2>
            {/* Calificación real de la ficha de Google */}
            <a
              href={site.google.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex flex-col items-center gap-1 group"
            >
              <span className="font-heading font-black text-[72px] leading-none text-gold">
                {site.google.rating}
              </span>
              <span className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={18} fill="currentColor" />
                ))}
              </span>
              <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                {site.google.reviewCount} reseñas en Google
              </span>
            </a>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonios.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <figure className="h-full rounded-xl bg-white/5 border border-white/8 p-6 flex flex-col">
                  <span
                    className="font-heading font-black text-4xl leading-none text-primary select-none"
                    aria-hidden="true"
                  >
                    “
                  </span>
                  <blockquote className="text-white/85 flex-1 mt-1">
                    {t.text}
                  </blockquote>
                  <figcaption className="mt-4 font-heading font-bold text-white">
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
              className="inline-flex items-center justify-center gap-2 rounded-md border-[1.5px] border-white/30 hover:bg-white/8 text-white font-semibold px-6 py-3 transition-colors"
            >
              ⭐ Dejanos tu reseña en Google
            </a>
          </Reveal>
        </div>
      </section>

      {/* Separador claro entre secciones oscuras */}
      <div className="h-3 bg-white" aria-hidden="true" />

      {/* ESCRIBINOS — cierre navy (Corrección 1) */}
      <section className="py-16 md:py-24 bg-navy text-white">
        <div className="container-x text-center">
          <ZoomReveal>
            {/* Línea decorativa roja */}
            <div className="mx-auto mb-5 h-[3px] w-12 bg-primary" aria-hidden="true" />
            <h2 className="font-heading font-extrabold text-[clamp(28px,4vw,36px)] text-white">
              Escribinos
            </h2>
            <p className="mt-3 text-white/65 max-w-xl mx-auto text-[15px] leading-[1.7]">
              Para consultas, comunícate con nosotros por WhatsApp o llámanos.
              Nuestro equipo está listo para brindarte una atención
              excepcional.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppButton label="Escribinos por WhatsApp" />
              <CallButton className="!bg-transparent !border-[1.5px] !border-white/40 hover:!bg-white/8 !text-white" />
            </div>
          </ZoomReveal>
        </div>
      </section>
    </>
  );
}
