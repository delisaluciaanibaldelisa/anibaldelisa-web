import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceLayout from "@/components/ServiceLayout";
import {
  serviciosDetalle,
  serviciosDetalleSlugs,
} from "@/lib/servicios-detalle";

export function generateStaticParams() {
  return serviciosDetalleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = serviciosDetalle[slug];
  if (!data) return {};
  return {
    title: data.metaTitle,
    description: data.metaDescription,
  };
}

export default async function ServicioDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = serviciosDetalle[slug];
  if (!data) notFound();

  return (
    <ServiceLayout title={data.title} lead={data.lead} features={data.features}>
      {data.paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </ServiceLayout>
  );
}
