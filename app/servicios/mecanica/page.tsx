import type { Metadata } from "next";
import ServiceLayout from "@/components/ServiceLayout";

export const metadata: Metadata = {
  title: "Mecánica Multimarca",
  description:
    "Mecánica multimarca en Montevideo: reparación y mantenimiento para todas las marcas con diagnóstico computarizado y más de 53 años de experiencia. Garantía en todos los trabajos.",
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
        Reparamos y mantenemos todas las marcas del mercado, sin importar el
        modelo ni el año. Con diagnóstico computarizado y equipos de última
        generación, detectamos la falla con precisión y la resolvemos bien la
        primera vez.
      </p>
      <p>
        Todos nuestros trabajos cuentan con garantía y presupuesto claro: te
        explicamos siempre qué necesita tu vehículo y por qué, antes de
        intervenir.
      </p>
    </ServiceLayout>
  );
}
