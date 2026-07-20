import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { nav, site } from "@/lib/site";

function LocationBlock({
  data,
}: {
  data: (typeof site.locations)[keyof typeof site.locations];
}) {
  return (
    <div>
      <h3 className="font-heading font-bold text-white text-lg mb-3">
        {data.title}
      </h3>
      <ul className="space-y-2 text-sm text-gray-300">
        <li className="flex items-start gap-2">
          <MapPin size={16} className="mt-0.5 shrink-0 text-primary-light" />
          <span>{data.address}</span>
        </li>
        <li className="flex items-center gap-2">
          <Phone size={16} className="shrink-0 text-primary-light" />
          <span>{data.phones.join(" / ")}</span>
        </li>
        <li className="flex items-center gap-2">
          <Mail size={16} className="shrink-0 text-primary-light" />
          <a
            href={`mailto:${data.email}`}
            className="inline-block py-1 hover:text-white break-all"
          >
            {data.email}
          </a>
        </li>
        <li className="flex items-start gap-2">
          <Clock size={16} className="mt-0.5 shrink-0 text-primary-light" />
          <span>{data.hours}</span>
        </li>
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-auto">
      <div className="container-x py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Marca */}
        <div className="lg:col-span-1">
          <p className="font-logo text-2xl text-white tracking-wide">
            Aníbal Delisa
          </p>
          <div className="mt-4 space-y-2 text-sm text-gray-400">
            <p>
              <span className="font-semibold text-white">Servicio Oficial:</span>{" "}
              PEUGEOT · CITROËN · BYD · OPEL
            </p>
            <p>Mecánica Multimarca</p>
            <p>Chapa y Pintura · Siniestros</p>
          </div>
        </div>

        {/* Contactos */}
        <LocationBlock data={site.locations.mecanica} />
        <LocationBlock data={site.locations.chapa} />

        {/* Links rápidos */}
        <div>
          <h3 className="font-heading font-bold text-white text-lg mb-3">
            Enlaces
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block py-1.5 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 text-xs text-gray-500">
          <p>Copyright © 2026, {site.name}, Todos los derechos reservados.</p>
          <a
            href="https://aquoralabs.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Desarrollado por Aquora Labs — visitar sitio"
            className="inline-flex items-center gap-2 opacity-70 transition-opacity hover:opacity-100"
          >
            <span>Desarrollado por</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/aquora-labs.svg"
              alt="Aquora Labs"
              className="h-6 w-auto"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
