// Datos centralizados del negocio Aníbal Delisa.
// Fuente única de verdad para contactos, direcciones y links.

export const site = {
  name: "Aníbal Delisa",
  legalName: "Aníbal Delisa SRL",
  yearsExperience: 53,
  url: "https://www.anibaldelisa.com",
  tagline: "Taller mecánico multimarca en Montevideo",
  description:
    "Service oficial Peugeot, Citroën, BYD y Opel en Montevideo. Mecánica multimarca, chapa y pintura, alineación y balanceo. +53 años de trayectoria.",
  brands: ["Peugeot", "Citroën", "BYD", "Opel"],
  // Canal de contacto directo por Telegram.
  // Cambiá el usuario real en NEXT_PUBLIC_TELEGRAM_URL (.env.local) o acá abajo.
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
  { href: "/seguridad-vial", label: "Seguridad Vial", highlight: true },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
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
