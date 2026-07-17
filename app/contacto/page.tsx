import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, CalendarCheck } from "lucide-react";
import { site } from "@/lib/site";
import Reveal, { ZoomReveal } from "@/components/Reveal";
import Breadcrumb from "@/components/Breadcrumb";
import MapEmbed from "@/components/MapEmbed";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contactá a Aníbal Delisa en Montevideo. Mecánica: Canelones 2308. Chapa y pintura: Charrúa 2293. Teléfonos, email y horarios de atención.",
};

function ContactCard({
  data,
}: {
  data: (typeof site.locations)[keyof typeof site.locations];
}) {
  return (
    <div className="rounded-2xl border border-gray-200 p-6">
      <h3 className="font-heading font-bold text-xl text-primary mb-4">
        {data.title}
      </h3>
      <ul className="space-y-3 text-gray-700">
        <li className="flex items-start gap-3">
          <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
          {data.address}
        </li>
        <li className="flex items-center gap-3">
          <Phone size={18} className="shrink-0 text-primary" />
          {data.phones.join(" / ")}
        </li>
        <li className="flex items-center gap-3">
          <Mail size={18} className="shrink-0 text-primary" />
          <a href={`mailto:${data.email}`} className="hover:text-primary break-all">
            {data.email}
          </a>
        </li>
        <li className="flex items-start gap-3">
          <Clock size={18} className="mt-0.5 shrink-0 text-primary" />
          {data.hours}
        </li>
      </ul>
      <div className="mt-5">
        <MapEmbed query={data.mapsQuery} title={data.title} />
      </div>
    </div>
  );
}

export default function ContactoPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-dark text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/autos/turnos-taller.jpg"
          alt="Atención al cliente — Taller Aníbal Delisa Montevideo"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[rgba(10,22,40,0.78)]" />
        <div className="relative container-x py-16 md:py-20">
          <Reveal className="max-w-3xl">
            <Breadcrumb />
            <h1 className="font-heading font-extrabold text-3xl md:text-5xl">
              Contacto
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Encontranos en nuestras dos ubicaciones en Montevideo.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-x grid gap-8 md:grid-cols-2">
          <Reveal>
            <ContactCard data={site.locations.mecanica} />
          </Reveal>
          <Reveal delay={0.1}>
            <ContactCard data={site.locations.chapa} />
          </Reveal>
        </div>
      </section>

      {/* Agendá tu turno */}
      <section className="py-16 md:py-20 bg-navy text-white">
        <div className="container-x text-center">
          <ZoomReveal>
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl">
              ¿Listo para tu próximo service?
            </h2>
            <p className="mt-3 text-white/70 max-w-xl mx-auto">
              Elegí día y hora online en segundos.
            </p>
            <Link
              href="/turnos"
              className="mt-7 inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-charcoal font-bold px-7 py-3.5 rounded-md transition-all hover:scale-[1.03]"
            >
              <CalendarCheck size={18} />
              Agendá tu turno
            </Link>
          </ZoomReveal>
        </div>
      </section>
    </>
  );
}
