import type { MetadataRoute } from "next";
import { servicios, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/servicios",
    ...servicios.map((s) => `/servicios/${s.slug}`),
    "/seguridad-vial",
    "/seguridad-vial/emergencias-en-ruta",
    "/nosotros",
    "/contacto",
    "/turnos",
    "/privacy-policy",
    "/terms-and-conditions",
  ];

  const lastModified = new Date();

  const legal = new Set(["/privacy-policy", "/terms-and-conditions"]);

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified,
    changeFrequency: legal.has(route) ? "yearly" : "monthly",
    priority: route === ""
      ? 1
      : route === "/seguridad-vial"
        ? 0.9
        : legal.has(route)
          ? 0.3
          : 0.8,
  }));
}
