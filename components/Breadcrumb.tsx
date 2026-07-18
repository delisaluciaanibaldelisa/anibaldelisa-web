"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

// Migas de pan para páginas internas, con datos estructurados BreadcrumbList.
const labels: Record<string, string> = {
  servicios: "Servicios",
  mecanica: "Mecánica",
  "chapa-pintura": "Chapa y Pintura",
  "alineacion-balanceo": "Alineación y Balanceo",
  "revision-precompra": "Revisión Pre-Compra",
  "seguridad-vial": "Seguridad Vial",
  nosotros: "Aníbal Delisa",
  contacto: "Contacto",
  turnos: "Agendá tu turno",
};

export default function Breadcrumb() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const items = [
    { label: "Inicio", href: "/" },
    ...segments.map((seg, i) => ({
      label: labels[seg] ?? seg,
      href: "/" + segments.slice(0, i + 1).join("/"),
    })),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      item: `${site.url}${it.href === "/" ? "" : it.href}`,
    })),
  };

  return (
    <nav aria-label="Migas de pan" className="text-xs text-white/60 mb-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {items.map((it, i) => (
        <span key={it.href}>
          {i > 0 && <span className="mx-1.5">/</span>}
          {i === items.length - 1 ? (
            <span className="text-white">{it.label}</span>
          ) : (
            <Link href={it.href} className="hover:text-white">
              {it.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
