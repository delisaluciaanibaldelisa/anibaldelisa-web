// Genera el bloque openGraph/twitter para una página puntual.
// Next.js reemplaza openGraph/twitter completos si la página los define
// (no hace merge profundo con el layout), así que cada página necesita
// su propia imagen — reusamos la misma og.jpg pero con título/descripción propios.
import type { Metadata } from "next";
import { site } from "./site";

export function pageOg(
  title: string,
  description: string,
): Pick<Metadata, "openGraph" | "twitter"> {
  const fullTitle = `${title} | ${site.name}`;
  return {
    openGraph: {
      title: fullTitle,
      description,
      images: [
        {
          url: "/og.jpg",
          width: 1200,
          height: 630,
          alt: `${site.name} — ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
