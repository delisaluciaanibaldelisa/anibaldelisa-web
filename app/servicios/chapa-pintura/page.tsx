import type { Metadata } from "next";
import ServiceLayout from "@/components/ServiceLayout";
import { pageOg } from "@/lib/seo";

const description =
  "Chapa y pintura en Montevideo para aseguradoras y particulares: enderezado en bancada, colorimetría computarizada, cabina climatizada con horno de secado y garantía escrita.";

export const metadata: Metadata = {
  title: "Chapa y Pintura",
  description,
  ...pageOg("Chapa y Pintura", description),
};

const features = [
  "Enderezado de chasis en bancada con control dimensional",
  "Soldadura MIG y sustitución de paneles",
  "Cabina de pintura presurizada y climatizada con horno de secado",
  "Colorimetría computarizada para igualación exacta de color",
  "Masillado, aparejo y pintura bicapa (base + barniz)",
  "Tratamiento anticorrosión y protección de bajos",
  "Gestión integral del siniestro con tu compañía de seguros",
];

export default function ChapaPinturaPage() {
  return (
    <ServiceLayout
      title="Chapa y Pintura"
      lead="Reparación integral de carrocería y pintura, desde una rayadura hasta daños estructurales. Protocolo profesional, colorimetría computarizada y garantía escrita. Trabajamos con todas las aseguradoras."
      features={features}
    >
      <p>
        Abordamos cada reparación con un protocolo profesional de carrocería:
        evaluación del daño, enderezado en bancada con control dimensional y
        sustitución de paneles mediante soldadura, verificando la geometría
        estructural del vehículo.
      </p>
      <p>
        El proceso de pintura combina la preparación de la superficie
        (masillado, aparejo y lijado), la igualación de color por colorimetría
        computarizada y la aplicación en cabina presurizada con secado
        controlado por horno. El resultado es una terminación bicapa uniforme,
        imperceptible respecto al acabado original de fábrica.
      </p>
      <p>
        Trabajamos con todas las compañías de seguros del país y gestionamos el
        siniestro de principio a fin, con garantía escrita sobre cada trabajo
        realizado.
      </p>
    </ServiceLayout>
  );
}
