import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Reduce el bundle de JS importando solo los íconos/componentes usados
  // en vez de la librería completa (mejora tiempo de carga y de interacción).
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  // Cache largo para assets estáticos (fotos/videos de public/) — mejora
  // velocidad de carga en visitas repetidas sin afectar el deploy (el
  // hash de build invalida el cache cuando cambian los archivos JS/CSS).
  async headers() {
    return [
      {
        source: "/autos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/logos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/historia/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
