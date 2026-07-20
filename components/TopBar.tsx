import { Phone, MapPin, Star } from "lucide-react";
import { site } from "@/lib/site";

// Barra superior de dos niveles: contacto a la izquierda, Google a la derecha.
// Solo visible en desktop.
export default function TopBar() {
  return (
    <div className="hidden md:flex items-center justify-between h-8 px-10 bg-navy-mid">
      <p className="flex items-center gap-2 text-[11px] text-white/55">
        <Phone size={12} className="shrink-0" />
        2408 4755
        <span className="text-white/25">·</span>
        Lun–Vie 9:00–18:00
        <span className="text-white/25">·</span>
        <MapPin size={12} className="shrink-0" />
        Canelones 2308
      </p>
      <a
        href={site.google.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-[11px] text-gold hover:underline"
      >
        <Star size={12} fill="currentColor" className="shrink-0" />
        {site.google.rating} en Google · {site.google.reviewCount} reseñas
      </a>
    </div>
  );
}
