import type { Metadata } from "next";
import { Clock, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import Reveal from "@/components/Reveal";
import Breadcrumb from "@/components/Breadcrumb";
import TurnosBooking from "@/components/TurnosBooking";

export const metadata: Metadata = {
  title: "Agendá tu turno",
  description:
    "Reservá tu turno online en el taller Aníbal Delisa de Montevideo: service, mecánica, Chapa y Pintura, alineación y balanceo. Elegí día y hora en segundos.",
};

export default function TurnosPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-dark text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/autos/turnos-header.jpg"
          alt="Recepción de vehículos — Taller Aníbal Delisa"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(10,22,40,0.75)]" />
        <div className="relative container-x py-16 md:py-20">
          <Reveal className="max-w-3xl">
            <Breadcrumb />
            <h1 className="font-heading font-extrabold text-3xl md:text-5xl">
              Agendá tu turno
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Elegí día y hora, dejanos tus datos y listo: te confirmamos por
              email al instante.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <TurnosBooking />
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-gray-200 p-6 lg:sticky lg:top-32 space-y-4">
              <h2 className="font-heading font-bold text-lg text-dark">
                Información útil
              </h2>
              <p className="flex items-start gap-3 text-gray-700 text-sm">
                <Clock size={18} className="mt-0.5 shrink-0 text-accent" />
                Turnos de lunes a viernes por la mañana. El horario reservado
                es el de recepción del vehículo.
              </p>
              <p className="flex items-start gap-3 text-gray-700 text-sm">
                <MapPin size={18} className="mt-0.5 shrink-0 text-accent" />
                {site.locations.mecanica.address}
              </p>
              <p className="flex items-start gap-3 text-gray-700 text-sm">
                <Phone size={18} className="mt-0.5 shrink-0 text-accent" />
                ¿Preferís coordinar por teléfono? Llamanos al{" "}
                {site.locations.mecanica.phones.join(" / ")}.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
