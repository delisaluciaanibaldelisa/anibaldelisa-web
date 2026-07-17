import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ];
  },
};

export default nextConfig;
