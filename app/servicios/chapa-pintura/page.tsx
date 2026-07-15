import type { Metadata } from "next";
import ServiceLayout from "@/components/ServiceLayout";

export const metadata: Metadata = {
  title: "Chapa y Pintura",
  description:
    "Chapa y pintura en Montevideo para aseguradoras y particulares. Cabina de pintura climatizada, igualación exacta de color y reparaciones estructurales.",
};

const features = [
  "Reparaciones para aseguradoras y particulares",
  "Cabina de pintura climatizada",
  "Igualación exacta de color",
  "Reparación de rayaduras y abolladuras",
  "Reparaciones estructurales complejas",
  "Gestión completa con tu compañía de seguros",
];

export default function ChapaPinturaPage() {
  return (
    <ServiceLayout
      title="Chapa y Pintura"
      lead="Desde una rayadura hasta una reparación estructural compleja, dejamos tu auto como nuevo. Trabajamos con todas las aseguradoras."
      features={features}
    >
      <p>
        Nuestro taller de chapa y pintura cuenta con cabina de pintura
        climatizada e igualación exacta de color, para que la reparación sea
        imperceptible. Atendemos tanto a particulares como a todas las
        compañías de seguros del país.
      </p>
      <p>
        Nos ocupamos de la gestión con tu aseguradora para que no tengas que
        preocuparte por nada.
      </p>
    </ServiceLayout>
  );
}
