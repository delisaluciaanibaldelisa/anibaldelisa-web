import type { Metadata } from "next";
import ServiceLayout from "@/components/ServiceLayout";
import { pageOg } from "@/lib/seo";

const description =
  "Revisión pre-compra de autos usados en Montevideo: inspección técnica completa de mecánica, Chapa y Pintura y sistema eléctrico. Antes de comprar, alguien de confianza que mire lo que no se ve.";

export const metadata: Metadata = {
  title: "Revisión Pre-Compra de Autos Usados",
  description,
  ...pageOg("Revisión Pre-Compra de Autos Usados", description),
};

const features = [
  "Inspección técnica completa antes de comprar",
  "Estado de motor y mecánica general",
  "Revisión de Chapa y Pintura (detección de choques)",
  "Sistema eléctrico y electrónica",
  "Suspensión, frenos y tren delantero",
  "Informe claro con nuestra recomendación",
];

export default function RevisionPrecompraPage() {
  return (
    <ServiceLayout
      title="Revisión Pre-Compra"
      lead="Comprar un auto usado es una de las decisiones más importantes que vas a tomar. Antes de firmar, necesitás a alguien de confianza que mire con ojo experto lo que a simple vista no se ve."
      features={features}
    >
      <p>
        Un auto puede parecer impecable por fuera y esconder un choque mal
        reparado, un motor cansado o una falla eléctrica que aparece a los pocos
        meses. Lo revisamos a fondo —mecánica, Chapa y Pintura y sistema
        eléctrico— y te decimos la verdad, sin intereses de por medio.
      </p>
      <p>
        Con más de 53 años en el oficio sabemos exactamente dónde mirar. Te
        entregamos un informe claro con nuestra recomendación honesta: comprá
        tranquilo o seguí buscando.
      </p>
      <p className="font-semibold text-dark">
        Porque una pequeña inversión antes de comprar te puede ahorrar miles de
        dólares y dolores de cabeza. La decisión sigue siendo tuya; nosotros te
        damos la información para tomarla con seguridad.
      </p>
    </ServiceLayout>
  );
}
