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
import {
  WhatsAppButton,
  CallButton,
  ChatButton,
} from "@/components/CTAButtons";

const cubos = [
  {
    icon: BadgeCheck,
    title: "Servicio Oficial",
    text: "Peugeot – Citroën – BYD – Opel",
    href: "/servicios/mecanica",
  },
  {
    icon: Wrench,
    title: "Mecánica Multimarca",
    text: "Diagnóstico computarizado y reparación integral de todas las marcas, con garantía.",
    href: "/servicios/mecanica",
  },
  {
    icon: ClipboardCheck,
    title: "Revisión Precompra",
    text: "Inspección técnica completa antes de comprar un usado. Comprá seguro.",
    href: "/servicios/revision-precompra",
  },
];

const serviciosGarantia = [
  "Service oficial Peugeot · Citroën · BYD · Opel",
  "Mecánica multimarca",
  "Frenos",
  "Embrague",
  "Suspensión y tren delantero",
  "Correa y kit de distribución",
  "Motor y puesta a punto",
  "Caja y transmisión",
  "Sistema eléctrico y electrónica",
  "Aire acondicionado",
  "Diagnóstico computarizado",
  "Alineación y balanceo",
  "Chapa y pintura",
  "Revisión pre-compra",
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
      {/* HERO: carrusel de marcas */}
      <HeroCarousel />

      {/* CUBOS DE SERVICIOS + ALINEACIÓN */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-3">
            {cubos.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.1}>
                <Link
                  href={c.href}
                  className="group flex h-full flex-col items-center text-center bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all p-8"
                >
                  <div className="grid place-items-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all">
                    <c.icon size={30} />
                  </div>
                  <h2 className="font-heading font-bold text-xl text-dark">
                    {c.title}
                  </h2>
                  <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                    {c.text}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Rectángulo largo: Alineación y Balanceo */}
          <ZoomReveal className="mt-6">
            <Link
              href="/seguridad-vial"
              className="group flex flex-col md:flex-row items-start md:items-center gap-5 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all p-8"
            >
              <div className="grid place-items-center w-16 h-16 shrink-0 rounded-2xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                <Gauge size={30} />
              </div>
              <div className="flex-1">
                <h2 className="font-heading font-bold text-xl text-dark">
                  Alineación y Balanceo
                </h2>
                <p className="mt-1.5 text-gray-600 text-sm leading-relaxed">
                  Alinear y balancear a tiempo prolonga la vida de tus
                  neumáticos hasta un 30%, mejora la estabilidad en curvas y
                  reduce el consumo de combustible. Si el volante vibra o el
                  auto se va hacia un lado, es momento de revisarlo.
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
        </div>
      </section>

      {/* CHAPA Y PINTURA — sección destacada con zoom */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-[#243447] to-dark text-white">
        <div className="container-x py-20 md:py-28">
          <ZoomReveal>
            <p className="text-sm font-bold uppercase tracking-widest text-primary-light mb-3">
              Nuestro sector de carrocería
            </p>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl leading-tight max-w-3xl">
              CHAPA Y PINTURA CON ACABADO DE FÁBRICA
            </h2>
          </ZoomReveal>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 items-start">
            <SlideReveal from="left" className="space-y-4 text-gray-200 leading-relaxed">
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
                    label="WhatsApp Chapa y Pintura"
                    className="flex-1"
                  />
                  <CallButton
                    href={site.locations.chapa.telHref}
                    label="Llamar 2409 0753"
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

      {/* GARANTÍA TOTAL */}
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
            <div className="mt-7">
              <ChatButton label="Consultanos por tu auto" />
            </div>
          </SlideReveal>

          <SlideReveal from="right">
            <div className="rounded-2xl border border-gray-200 p-6 md:p-8 bg-gray-50">
              <h3 className="font-heading font-bold text-lg text-dark mb-5">
                Todo lo que hacemos por tu vehículo
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

      {/* ATENDIDO POR SUS PROPIOS DUEÑOS */}
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
          <Reveal delay={0.15} className="mt-6 space-y-4 text-gray-700 leading-relaxed text-left md:text-center">
            <p>
              Con más de {site.yearsExperience} años de trayectoria en Uruguay,
              especializada en Mecánica – Chapa y Pintura.
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
              href="/nosotros"
              className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
            >
              Conocé nuestra historia
              <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ASEGURADORAS — marquee continuo */}
      <section className="py-12 md:py-16 overflow-hidden">
        <Reveal className="container-x text-center mb-8">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark">
            Trabajamos con todas las aseguradoras
          </h2>
        </Reveal>
        <div className="relative">
          <div className="flex w-max animate-marquee gap-6 pr-6">
            {[...aseguradoras, ...aseguradoras].map((a, i) => (
              <div
                key={`${a}-${i}`}
                className="px-8 py-4 rounded-xl bg-gray-100 text-accent font-heading font-bold text-lg whitespace-nowrap"
              >
                {a}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container-x">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">
              Lo que dicen nuestros clientes
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonios.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <figure className="h-full rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow p-6 flex flex-col">
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
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container-x text-center">
          <ZoomReveal>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl">
              ¿Necesitás service o reparación?
            </h2>
            <p className="mt-3 text-white/90 max-w-xl mx-auto">
              Escribinos y coordinamos tu turno. Te respondemos a la brevedad.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppButton label="Escribinos por WhatsApp" />
              <CallButton className="!bg-dark hover:!bg-black" />
            </div>
          </ZoomReveal>
        </div>
      </section>
    </>
  );
}
