import type { Metadata } from "next";
import ServiceLayout from "@/components/ServiceLayout";

export const metadata: Metadata = {
  title: "Revisión Pre-Compra de Autos Usados",
  description:
    "Revisión pre-compra de autos usados en Montevideo: inspección técnica completa de mecánica, chapa, pintura y sistema eléctrico. Comprá seguro.",
};

const features = [
  "Inspección técnica completa antes de comprar",
  "Estado de motor y mecánica general",
  "Revisión de chapa y pintura (detección de choques)",
  "Sistema eléctrico y electrónica",
  "Suspensión, frenos y tren delantero",
  "Informe claro con nuestra recomendación",
];

export default function RevisionPrecompraPage() {
  return (
    <ServiceLayout
      title="Revisión Pre-Compra"
      lead="Comprá seguro, no te lleves sorpresas. Inspeccionamos el auto usado que querés comprar antes de que tomes la decisión."
      features={features}
    >
      <p>
        Analizamos mecánica, chapa, pintura y sistema eléctrico para darte un
        panorama honesto del estado real del vehículo. Con más de 53 años de
        experiencia, sabemos dónde mirar.
      </p>
      <p>
        Una pequeña inversión antes de comprar te puede ahorrar problemas y
        gastos importantes a futuro.
      </p>
    </ServiceLayout>
  );
}
