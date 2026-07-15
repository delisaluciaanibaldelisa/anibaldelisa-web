import type { Metadata } from "next";
import ServiceLayout from "@/components/ServiceLayout";

export const metadata: Metadata = {
  title: "Mecánica Multimarca",
  description:
    "Mecánica multimarca en Montevideo con diagnóstico computarizado conectado con Francia para Peugeot, Citroën, BYD y Opel. Garantía en todos los trabajos.",
};

const features = [
  "Motor: reparación, ajuste y puesta a punto",
  "Transmisión y caja de cambios",
  "Sistema de frenos",
  "Suspensión y tren delantero",
  "Sistema eléctrico y electrónica",
  "Correa y kit de distribución",
  "Embrague",
  "Aire acondicionado y climatización",
];

export default function MecanicaPage() {
  return (
    <ServiceLayout
      title="Mecánica Multimarca"
      lead="Reparación y mantenimiento para todas las marcas, con diagnóstico computarizado y la experiencia de más de 53 años."
      features={features}
    >
      <p>
        Somos service oficial Peugeot, Citroën, BYD y Opel, con diagnóstico
        computarizado conectado directamente con la central técnica en Francia.
        Esto nos permite detectar fallas con precisión y resolverlas con
        procedimientos y repuestos originales.
      </p>
      <p>
        Trabajamos también con todas las demás marcas del mercado. Todos
        nuestros trabajos cuentan con garantía y te explicamos siempre qué
        necesita tu vehículo antes de intervenir.
      </p>
    </ServiceLayout>
  );
}
