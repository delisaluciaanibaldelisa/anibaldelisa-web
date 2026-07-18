import { MapPin } from "lucide-react";
import { mapsEmbedUrl } from "@/lib/site";

// Embed de Google Maps sin API key (usa el modo output=embed).
export default function MapEmbed({
  query,
  title,
}: {
  query: string;
  title: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-navy/10 shadow-[0_12px_32px_rgba(14,42,94,0.14)] aspect-[16/10] w-full">
      <iframe
        title={`Mapa: ${title}`}
        src={mapsEmbedUrl(query)}
        className="w-full h-full grayscale-[15%] contrast-[1.05]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      {/* Badge de ubicación flotante */}
      <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-navy/90 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg pointer-events-none">
        <MapPin size={13} className="text-gold" />
        {title}
      </div>
    </div>
  );
}
