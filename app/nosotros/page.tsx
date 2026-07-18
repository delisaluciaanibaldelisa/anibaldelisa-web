import type { Metadata } from "next";
import { GraduationCap, Cpu, Handshake, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import Reveal, { SlideReveal } from "@/components/Reveal";
import Breadcrumb from "@/components/Breadcrumb";
import MapEmbed from "@/components/MapEmbed";
import { ChatButton } from "@/components/CTAButtons";

export const metadata: Metadata = {
  title: "Aníbal Delisa",
  description:
    "La historia de Aníbal Delisa: más de 53 años de trayectoria, una familia y dos generaciones cuidando los autos de los uruguayos. Empresa familiar, service oficial Peugeot, Citroën, BYD y Opel.",
};

// Capítulos de la historia de Aníbal Delisa (storytelling con fotos de archivo).
const capitulos = [
  {
    year: "1974",
    title: "Los fierros en la sangre",
    text: "Aníbal Delisa nació el 2 de julio de 1974 en Montevideo. Desde muy chico llevó los fierros en la sangre: mientras otros jugaban, él ya andaba entre motores, descubriendo el oficio que se convertiría en la obra de su vida.",
    img: "/historia/historia-oficio.jpg",
    alt: "Aníbal Delisa trabajando de joven en el taller",
    side: "left" as const,
  },
  {
    year: "El oficio",
    title: "Nunca supo rendirse",
    text: "Trabajó desde muy joven, con una responsabilidad y un compromiso fuera de lo común. Quienes lo conocen reconocen esa magia especial del verdadero amante de los fierros. Tenía una resiliencia admirable: cada caída lo fortalecía. No conocía la palabra rendirse; solo sabía ir hacia adelante, con toda su fuerza.",
    img: "/historia/historia-taller.jpg",
    alt: "El taller de Aníbal Delisa en sus primeros años",
    side: "right" as const,
  },
  {
    year: "La familia",
    title: "Cinco hijos, un mismo engranaje",
    text: "Amante de su país y de su gente, Aníbal sumaba a su familia y a cada persona que se ganaba su corazón. Junto a Marita formó una hermosa familia y cinco hijos: César, Arturo, Enzo, Lucía y Bruno. Hoy cada uno ocupa un rol fundamental: son el engranaje que mueve a Aníbal Delisa.",
    img: "/historia/historia-diagnostico.jpg",
    alt: "La nueva generación de la familia Delisa junto al equipo de diagnóstico",
    side: "left" as const,
  },
  {
    year: "+53 años",
    title: "Un legado intachable",
    text: "Con valores, trabajo y responsabilidad, Aníbal logró lo que para muchos parecía imposible: más de 53 años de trayectoria intachable. Construyó mucho más que un taller: una gran familia en la que los clientes también son parte.",
    img: "/historia/historia-marca.jpg",
    alt: "Elevador con la marca Aníbal Delisa en el taller de Charrúa, Montevideo",
    side: "right" as const,
  },
  {
    year: "Hoy",
    title: "Tu segunda casa",
    text: "Ese trato humano y cercano es nuestra esencia: la tranquilidad de saber que todo va a estar bien y el abrazo en los momentos difíciles, después de un siniestro. Aníbal Delisa siempre fue más que un taller: es una segunda casa, donde lo último en tecnología y la capacitación conviven con lo que de verdad importa, las personas.",
    img: "/historia/historia-hijo.jpg",
    alt: "El trato cercano y familiar que distingue a Aníbal Delisa",
    side: "left" as const,
  },
];

const valores = [
  {
    icon: GraduationCap,
    title: "Experiencia y conocimiento",
    text: "Más de cinco décadas resolviendo todo tipo de reparaciones, en todas las marcas.",
  },
  {
    icon: Cpu,
    title: "Tecnología de punta",
    text: "Diagnóstico computarizado conectado con Francia y equipos de última generación.",
  },
  {
    icon: Handshake,
    title: "Transparencia y confianza",
    text: "Te explicamos siempre qué necesita tu auto. Sin sorpresas, con presupuestos claros.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      {/* Hero — Aníbal Delisa */}
      <section className="relative overflow-hidden bg-dark text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/historia/historia-origen.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-25 [filter:sepia(0.35)]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/90 to-navy/75" />
        <div className="relative container-x py-20 md:py-28">
          <Reveal className="max-w-3xl">
            <Breadcrumb />
            <p className="inline-block rounded-full bg-primary px-4 py-1 text-sm font-semibold text-white mb-5">
              Nuestra historia
            </p>
            <h1 className="font-heading font-extrabold text-4xl md:text-6xl">
              Aníbal Delisa
            </h1>
            <p className="mt-5 text-lg md:text-xl text-gray-200 leading-relaxed">
              Más que un taller: la historia de una familia que hace más de
              medio siglo cuida los autos de los uruguayos como si fueran
              propios.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Nuestra historia — storytelling con fotos de archivo */}
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="container-x">
          <Reveal className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <p className="text-xs font-bold uppercase tracking-[3px] text-gold">
              Desde 1973
            </p>
            <h2 className="mt-3 font-heading font-extrabold text-3xl md:text-4xl">
              Detrás de cada auto, una familia
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Más de medio siglo de historia, escrita por quienes la
              construyeron día a día.
            </p>
          </Reveal>

          <div className="space-y-6 md:space-y-8">
            {capitulos.map((c) => (
              <SlideReveal key={c.title} from={c.side}>
                <article className="relative overflow-hidden rounded-3xl min-h-[380px] md:min-h-[460px] flex items-end border border-white/10 shadow-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.img}
                    alt={c.alt}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover [filter:sepia(0.28)_contrast(1.05)_brightness(0.9)]"
                  />
                  <div
                    className={`absolute inset-0 ${
                      c.side === "left"
                        ? "bg-gradient-to-tr"
                        : "bg-gradient-to-tl"
                    } from-navy via-navy/80 to-navy/10`}
                  />
                  <div
                    className={`relative p-8 md:p-12 max-w-xl ${
                      c.side === "right" ? "ml-auto" : ""
                    }`}
                  >
                    <span className="inline-block rounded-full bg-primary px-4 py-1 text-sm font-heading font-bold">
                      {c.year}
                    </span>
                    <h3 className="mt-4 font-heading font-extrabold text-2xl md:text-3xl">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-white/85 leading-relaxed text-[15px] md:text-base">
                      {c.text}
                    </p>
                  </div>
                </article>
              </SlideReveal>
            ))}
          </div>

          <Reveal className="mt-12 md:mt-16 text-center max-w-2xl mx-auto">
            <p className="font-heading font-semibold text-xl md:text-2xl">
              Mejoramos cada día para ustedes, con un trato{" "}
              <span className="text-gold">cercano y profesional.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-16 md:py-24">
        <div className="container-x text-center max-w-2xl mx-auto">
          <Reveal>
            <h2 className="font-heading font-bold text-3xl text-dark">
              Atendido por sus propios dueños
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Cuando venís a Aníbal Delisa, te atienden las mismas personas que
              conocen cada detalle del taller. Ese trato cercano y directo es lo
              que nos distingue: sos parte de la familia.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-x">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">
              Nuestros valores
            </h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {valores.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="text-center">
                <div className="grid place-items-center w-16 h-16 rounded-full bg-primary text-white mx-auto mb-4">
                  <v.icon size={28} />
                </div>
                <h3 className="font-heading font-bold text-lg text-dark">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certificaciones */}
      <section className="py-16 md:py-20">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark">
              Service oficial
            </h2>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
              Somos service oficial de las marcas:
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {site.brands.map((b) => (
                <div
                  key={b}
                  className="px-6 py-3 rounded-lg border-2 border-primary text-primary font-heading font-bold text-lg"
                >
                  {b}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Ubicaciones */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-x">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">
              Nuestras ubicaciones
            </h2>
          </Reveal>
          <div className="grid gap-8 lg:grid-cols-2">
            {Object.values(site.locations).map((loc, i) => (
              <Reveal key={loc.title} delay={i * 0.1}>
                <h3 className="font-heading font-bold text-xl text-dark mb-2">
                  {loc.title}
                </h3>
                <p className="flex items-start gap-2 text-gray-600 mb-4">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
                  {loc.address}
                </p>
                <MapEmbed query={loc.mapsQuery} title={loc.title} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-white">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl">
              Vení a conocernos
            </h2>
            <p className="mt-3 text-accent/80 max-w-xl mx-auto">
              Escribinos y coordinamos tu visita al taller.
            </p>
            <div className="mt-8 flex justify-center">
              <ChatButton
                label="Escribinos por chat"
                className="!bg-accent hover:!bg-accent-light !text-white"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
