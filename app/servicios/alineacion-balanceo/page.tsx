import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServiceLayout from "@/components/ServiceLayout";
import { pageOg } from "@/lib/seo";

const description =
  "Alineación y balanceo en Montevideo con equipos de última generación y precisión milimétrica. Prolongá la vida de tus neumáticos y viajá seguro.";

export const metadata: Metadata = {
  title: "Alineación y Balanceo",
  description,
  ...pageOg("Alineación y Balanceo", description),
};

const features = [
  "Equipos de alineación de última generación",
  "Precisión milimétrica",
  "Balanceo de ruedas computarizado",
  "Diagnóstico del tren delantero",
  "Recomendaciones según el estado de tus cubiertas",
];

export default function AlineacionBalanceoPage() {
  return (
    <ServiceLayout
      title="Alineación y Balanceo"
      lead="Equipos de última generación y precisión milimétrica para una conducción segura, estable y económica."
      features={features}
    >
      <p>
        Una buena alineación y balanceo prolonga la vida útil de tus neumáticos,
        mejora el control del vehículo y reduce el consumo de combustible.
      </p>
      <p>
        ¿Querés saber cuándo conviene hacerlos y qué señales indican que tu auto
        los necesita?{" "}
        <Link
          href="/seguridad-vial"
          className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
        >
          Mirá nuestra guía de Seguridad Vial
          <ArrowRight size={16} />
        </Link>
      </p>
    </ServiceLayout>
  );
}
