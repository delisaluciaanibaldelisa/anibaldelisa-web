import type { MetadataRoute } from "next";
import { servicios, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/servicios",
    ...servicios.map((s) => `/servicios/${s.slug}`),
    "/seguridad-vial",
    "/nosotros",
    "/contacto",
    "/turnos",
  ];

  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : route === "/seguridad-vial" ? 0.9 : 0.8,
  }));
}
