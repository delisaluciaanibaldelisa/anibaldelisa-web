import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { servicios } from "@/lib/site";
import Reveal from "@/components/Reveal";
import Breadcrumb from "@/components/Breadcrumb";
import ServiceIcon from "@/components/ServiceIcon";
import { pageOg } from "@/lib/seo";

const description =
  "Mecánica multimarca, Chapa y Pintura, alineación y balanceo y revisión pre-compra en Montevideo. Servicio Oficial Peugeot, Citroën, BYD y Opel.";

export const metadata: Metadata = {
  title: "Servicios",
  description,
  ...pageOg("Servicios", description),
};

export default function ServiciosPage() {
  return (
    <>
      <section className="bg-dark text-white">
        <div className="container-x py-16 md:py-20">
          <Reveal className="max-w-3xl">
            <Breadcrumb />
            <p className="text-xs font-bold uppercase tracking-[3px] text-gold mb-3">
              Servicio Oficial · Mecánica · Chapa y Pintura
            </p>
            <h1 className="font-heading font-extrabold text-3xl md:text-5xl leading-tight">
              Nuestros Servicios
            </h1>
            <p className="mt-4 text-lg text-gray-300 leading-relaxed">
              Servicio Oficial Peugeot, Citroën, BYD y Opel, Mecánica
              Multimarca, Chapa y Pintura, alineación y balanceo y revisión
              pre-compra. Más de 53 años de trayectoria en Montevideo.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-x grid gap-6 sm:grid-cols-2">
          {servicios.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <Link
                href={`/servicios/${s.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-gray-200 p-8 hover:border-primary hover:shadow-lg transition-all"
              >
                <div className="grid place-items-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-colors">
                  <ServiceIcon name={s.icon} size={28} />
                </div>
                <h2 className="font-heading font-bold text-xl text-dark">
                  {s.title}
                </h2>
                <p className="mt-2 text-gray-600 flex-1">{s.short}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-primary">
                  Conocer más
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
