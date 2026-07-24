import type { Metadata } from "next";
import Image from "next/image";
import { GraduationCap, Cpu, Handshake, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import Reveal, { SlideReveal } from "@/components/Reveal";
import Breadcrumb from "@/components/Breadcrumb";
import MapEmbed from "@/components/MapEmbed";
import VideoFeature from "@/components/VideoFeature";
import { ChatButton } from "@/components/CTAButtons";
import { pageOg } from "@/lib/seo";

const description =
  "La historia de Aníbal Delisa: más de 53 años de trayectoria, una familia y dos generaciones cuidando los autos de los Uruguayos. Empresa familiar, Servicio Oficial Peugeot, Citroën, BYD y Opel.";

export const metadata: Metadata = {
  title: "Nuestra Historia",
  description,
  ...pageOg("Nuestra Historia", description),
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
    text: "Con valores, trabajo y responsabilidad, Aníbal sostuvo más de 53 años de trayectoria intachable. Construyó una empresa donde los clientes terminan siendo parte de la casa.",
    img: "/historia/historia-marca.jpg",
    alt: "Elevador con la marca Aníbal Delisa en el taller de Charrúa, Montevideo",
    side: "right" as const,
  },
  {
    year: "Hoy",
    title: "Tu segunda casa",
    text: "El trato cercano sigue siendo nuestra forma de trabajar: explicar con claridad, dar tranquilidad y acompañar al cliente incluso en los momentos difíciles, después de un siniestro. En Aníbal Delisa conviven la tecnología de diagnóstico más actual y la capacitación permanente con algo que no se compra: el trato personal.",
    img: "/historia/historia-equipo.jpg",
    alt: "Trabajo de alineación en el taller de Aníbal Delisa",
    side: "left" as const,
  },
];

// Álbum familiar — fotos de archivo originales, sin retocar el relato.
const album = [
  {
    src: "/historia/historia-escritorio.jpg",
    alt: "Aníbal Delisa en el escritorio del taller, años 70",
    caption: "Años 70",
  },
  {
    src: "/historia/historia-elevador.jpg",
    alt: "Auto en el elevador del taller original",
    caption: "El taller original",
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
      {/* Hero — Aníbal Delisa (foto de archivo de fondo) */}
      <section className="relative overflow-hidden bg-dark text-white">
        <Image
          src="/historia/historia-origen.jpg"
          alt="El taller original de Aníbal Delisa"
          fill
          sizes="100vw"
          priority
          className="object-cover [filter:sepia(0.25)_brightness(0.9)]"
        />
        {/* Oscurecido a la izquierda para legibilidad del texto; la foto se ve a la derecha */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
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
              La historia de una familia que hace más de medio siglo repara y
              mantiene los autos de los Uruguayos.
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
                  <Image
                    src={c.img}
                    alt={c.alt}
                    fill
                    sizes="100vw"
                    className="object-cover [filter:sepia(0.28)_contrast(1.05)_brightness(0.9)]"
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

          {/* Álbum familiar — fotos de archivo originales del taller */}
          <Reveal className="mt-14 md:mt-20">
            <p className="text-center text-xs font-bold uppercase tracking-[3px] text-gold">
              Del álbum familiar
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
              {album.map((a) => (
                <div
                  key={a.src}
                  className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10"
                >
                  <Image
                    src={a.src}
                    alt={a.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover [filter:sepia(0.28)_contrast(1.05)_brightness(0.9)] transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                  <p className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-white/85">
                    {a.caption}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-14 md:mt-16 text-center max-w-2xl mx-auto">
            <p className="font-heading font-semibold text-xl md:text-2xl">
              Mejoramos cada día para ustedes, con un trato{" "}
              <span className="text-gold">cercano y profesional.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* En los medios — entrevista en Vértigo con Nando Parrado */}
      <section className="py-16 md:py-24 bg-dark text-white">
        <div className="container-x">
          <Reveal className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs font-bold uppercase tracking-[3px] text-gold">
              En los medios
            </p>
            <h2 className="mt-3 font-heading font-extrabold text-3xl md:text-4xl">
              Aníbal Delisa, en Vértigo
            </h2>
            <p className="mt-4 text-white/75 leading-relaxed">
              Nando Parrado confió su Porsche a Aníbal Delisa: la confianza no
              se pide, se construye. Una nota del programa Vértigo que resume lo
              que somos: pasión por los fierros y el trato de siempre.
            </p>
          </Reveal>
          <Reveal className="max-w-3xl mx-auto">
            <VideoFeature
              src="/videos/entrevista-vertigo.mp4"
              subtitle="Programa Vértigo · con Nando Parrado"
              title="Mirá la entrevista"
            />
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
                <div className="grid place-items-center w-16 h-16 rounded-full bg-navy text-white mx-auto mb-4">
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
              Servicio Oficial
            </h2>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
              Somos Servicio Oficial de las marcas:
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
