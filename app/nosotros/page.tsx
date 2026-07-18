import type { Metadata } from "next";
import { GraduationCap, Cpu, Handshake, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import Reveal from "@/components/Reveal";
import Breadcrumb from "@/components/Breadcrumb";
import MapEmbed from "@/components/MapEmbed";
import { ChatButton } from "@/components/CTAButtons";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Más de 53 años de trayectoria en Montevideo. Aníbal Delisa es un taller familiar, atendido por sus propios dueños. Service oficial Peugeot, Citroën, BYD y Opel.",
};

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
      {/* Hero / Historia */}
      <section className="bg-dark text-white">
        <div className="container-x py-16 md:py-24">
          <Reveal className="max-w-3xl">
            <Breadcrumb />
            <p className="inline-block rounded-full bg-primary px-4 py-1 text-sm font-semibold text-white mb-5">
              Desde 1973
            </p>
            <h1 className="font-heading font-extrabold text-3xl md:text-5xl">
              Más de {site.yearsExperience} años de trayectoria en Uruguay
            </h1>
            <p className="mt-5 text-lg text-gray-300 leading-relaxed">
              Aníbal Delisa es un taller mecánico multimarca familiar, atendido
              por sus propios dueños. A lo largo de más de cinco décadas nos
              ganamos la confianza de miles de clientes en Montevideo, cuidando
              cada auto como si fuera propio.
            </p>
            <p className="mt-4 text-lg text-gray-300 leading-relaxed">
              Combinamos la experiencia de toda una vida en el oficio con
              tecnología de diagnóstico de última generación, para ofrecer un
              servicio profesional, honesto y confiable.
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
