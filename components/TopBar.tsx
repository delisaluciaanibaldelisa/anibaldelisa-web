import { site } from "@/lib/site";

// Barra superior de dos niveles: contacto a la izquierda, Google a la derecha.
// Solo visible en desktop.
export default function TopBar() {
  return (
    <div className="hidden md:flex items-center justify-between h-8 px-10 bg-navy-mid">
      <p className="text-[11px] text-white/55">
        📞 2408 4755 &nbsp;·&nbsp; Lun–Vie 9:00–18:00 &nbsp;·&nbsp; 📍 Canelones
        2308
      </p>
      <a
        href={site.google.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[11px] text-gold hover:underline"
      >
        ⭐ {site.google.rating} en Google · {site.google.reviewCount} reseñas
      </a>
    </div>
  );
}
