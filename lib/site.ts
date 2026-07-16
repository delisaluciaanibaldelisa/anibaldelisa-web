// Datos centralizados del negocio Aníbal Delisa.
// Fuente única de verdad para contactos, direcciones y links.

export const site = {
  name: "Aníbal Delisa",
  legalName: "Aníbal Delisa SRL",
  yearsExperience: 53,
  // TODO: cambiar a https://www.anibaldelisa.com cuando el dominio apunte a Vercel.
  url: "https://anibaldelisa-web.vercel.app",
  // Ficha de Google Maps (Place ID derivado del link oficial de la ficha).
  google: {
    placeId: "ChIJKW6LU6-Bn5URR8LW7U52gyI",
    rating: 4.8,
    reviewCount: 459,
    mapsUrl:
      "https://www.google.com/maps/place/?q=place_id:ChIJKW6LU6-Bn5URR8LW7U52gyI",
    writeReviewUrl:
      "https://search.google.com/local/writereview?placeid=ChIJKW6LU6-Bn5URR8LW7U52gyI",
  },
  geo: { lat: -34.9069644, lng: -56.1647645 },
  // Google Analytics 4 (ID de medición — público, no es secreto).
  ga4Id: "G-1FWLB868QW",
  tagline: "Taller mecánico multimarca en Montevideo",
  description:
    "Service oficial Peugeot, Citroën, BYD y Opel en Montevideo. Mecánica multimarca, chapa y pintura, alineación y balanceo. +53 años de trayectoria.",
  brands: ["Peugeot", "Citroën", "BYD", "Opel"],
  // WhatsApp por sector (wa.me abre el chat directo).
  whatsapp: {
    general: "https://wa.me/59899680555", // Mecánica / consultas generales
    chapa: "https://wa.me/59899657807", // Chapa y Pintura
  },
  // Canal de contacto directo por Telegram (backend del chat, invisible al cliente).
  telegram: {
    username: process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || "@anibaldelisa",
    link: process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/anibaldelisa",
  },
  locations: {
    mecanica: {
      title: "Mecánica",
      phones: ["2408 4755", "099 680 555"],
      email: "anibaldelisa@anibaldelisa.com",
      address: "Canelones 2308 esq. Bvar Artigas, Montevideo",
      mapsQuery: "Canelones 2308, Montevideo, Uruguay",
      hours: "Lunes a Viernes 9:00–12:30 y 14:00–18:00",
      telHref: "tel:+59824084755",
    },
    chapa: {
      title: "Chapa y Pintura",
      phones: ["2409 0753", "099 657 807"],
      email: "delisahnos@anibaldelisa.com",
      address: "Charrúa 2293 esq. Dr. Mario Cassinoni, Montevideo",
      mapsQuery: "Charrúa 2293, Montevideo, Uruguay",
      hours: "Lunes a Viernes 9:00–12:30 y 14:00–18:00",
      telHref: "tel:+59824090753",
    },
  },
} as const;

export const nav = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/seguridad-vial", label: "Seguridad Vial" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
  { href: "/turnos", label: "Agendá tu turno", highlight: true },
] as const;

export const servicios = [
  {
    slug: "mecanica",
    title: "Mecánica Multimarca",
    icon: "Wrench",
    short:
      "Diagnóstico computarizado y reparación de todas las marcas, con garantía.",
  },
  {
    slug: "chapa-pintura",
    title: "Chapa y Pintura",
    icon: "SprayCan",
    short:
      "Reparaciones para aseguradoras y particulares, con cabina de pintura climatizada.",
  },
  {
    slug: "alineacion-balanceo",
    title: "Alineación y Balanceo",
    icon: "Gauge",
    short:
      "Equipos de última generación para una conducción segura y estable.",
  },
  {
    slug: "revision-precompra",
    title: "Revisión Pre-Compra",
    icon: "ClipboardCheck",
    short:
      "Inspección técnica completa antes de comprar un auto usado.",
  },
] as const;

// URL de embed de Google Maps a partir de una consulta de dirección.
export function mapsEmbedUrl(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}
