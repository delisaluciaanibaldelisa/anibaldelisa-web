import Link from "next/link";
import {
  Award,
  ShieldCheck,
  BadgeCheck,
  Globe2,
  Star,
  ArrowRight,
} from "lucide-react";
import { servicios, site } from "@/lib/site";
import Reveal from "@/components/Reveal";
import ServiceIcon from "@/components/ServiceIcon";
import { ChatButton, CallButton } from "@/components/CTAButtons";

const razones = [
  {
    icon: Award,
    title: `+${site.yearsExperience} años de experiencia`,
    text: "Más de cinco décadas cuidando autos en Montevideo, un negocio familiar atendido por sus dueños.",
  },
  {
    icon: ShieldCheck,
    title: "Todas las aseguradoras",
    text: "Trabajamos con todas las compañías de seguros del Uruguay para agilizar tus reparaciones.",
  },
  {
    icon: BadgeCheck,
    title: "Service oficial",
    text: `Service oficial ${site.brands.join(", ")} con repuestos y procedimientos originales.`,
  },
  {
    icon: Globe2,
    title: "Diagnóstico conectado con Francia",
    text: "Diagnóstico computarizado conectado directamente con la central técnica en Francia.",
  },
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
      {/* HERO */}
      <section className="relative overflow-hidden bg-dark text-white">
        <div
          className="absolute inset-0 bg-gradient-to-br from-dark via-accent to-dark"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-primary/25 mix-blend-multiply"
          aria-hidden="true"
        />
        <div className="relative container-x py-24 md:py-32 lg:py-40">
          <Reveal className="max-w-3xl">
            <p className="inline-block rounded-full bg-white/10 border border-white/20 px-4 py-1 text-sm font-semibold mb-6">
              Service Oficial Peugeot · Citroën · BYD · Opel
            </p>
            <h1 className="font-heading font-extrabold text-4xl md:text-6xl leading-tight">
              Tu Auto en las Mejores Manos
            </h1>
            <p className="mt-5 text-lg md:text-xl text-gray-200 max-w-2xl">
              Más de {site.yearsExperience} años de experiencia en Uruguay.
              Mecánica multimarca, chapa y pintura, alineación y balanceo.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <ChatButton label="Escribinos por chat" />
              <CallButton />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICIOS PRINCIPALES */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">
              Nuestros Servicios
            </h2>
            <p className="mt-3 text-gray-600">
              Todo lo que tu vehículo necesita, en un solo lugar y con la
              confianza de siempre.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {servicios.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.08}>
                <Link
                  href={`/servicios/${s.slug}`}
                  className="group block h-full rounded-xl border border-gray-200 p-6 hover:border-primary hover:shadow-lg transition-all"
                >
                  <div className="grid place-items-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    <ServiceIcon name={s.icon} size={24} />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-dark">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{s.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Ver más
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUÉ ELEGIRNOS */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-x">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">
              ¿Por qué elegirnos?
            </h2>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {razones.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.08} className="text-center">
                <div className="grid place-items-center w-14 h-14 rounded-full bg-primary text-white mx-auto mb-4">
                  <r.icon size={26} />
                </div>
                <h3 className="font-heading font-bold text-lg text-dark">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{r.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ASEGURADORAS */}
      <section className="py-16 md:py-20">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark">
              Trabajamos con todas las aseguradoras
            </h2>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
              Gestionamos tu reparación con cualquier compañía de seguros del
              país.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {aseguradoras.map((a) => (
                <div
                  key={a}
                  className="px-6 py-3 rounded-lg bg-gray-100 text-accent font-heading font-bold text-lg"
                >
                  {a}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-x">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">
              Lo que dicen nuestros clientes
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonios.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <figure className="h-full rounded-xl bg-white border border-gray-200 p-6 flex flex-col">
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
          <Reveal>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl">
              ¿Necesitás service o reparación?
            </h2>
            <p className="mt-3 text-white/90 max-w-xl mx-auto">
              Escribinos y coordinamos tu turno. Te respondemos a la brevedad.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <ChatButton
                label="Escribinos por chat"
                className="!bg-white !text-primary hover:!bg-gray-100"
              />
              <CallButton className="!bg-dark hover:!bg-black" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
