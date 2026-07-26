import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import Breadcrumb from "@/components/Breadcrumb";

// Layout simple para páginas legales (Términos, Privacidad): hero navy +
// cuerpo de texto legible con ancho de lectura acotado.
export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="bg-dark text-white">
        <div className="container-x py-14 md:py-20">
          <Reveal className="max-w-3xl">
            <Breadcrumb />
            <h1 className="font-heading font-extrabold text-3xl md:text-5xl">
              {title}
            </h1>
            <p className="mt-3 text-sm text-gray-400">
              Última actualización: {updated}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div
          className="container-x max-w-3xl legal-prose text-gray-700 leading-relaxed
            [&_h2]:font-heading [&_h2]:font-bold [&_h2]:text-dark [&_h2]:text-xl
            [&_h2]:mt-10 [&_h2]:mb-3
            [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:space-y-1.5 [&_ul]:list-disc [&_ul]:pl-5
            [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2"
        >
          {children}
        </div>
      </section>
    </>
  );
}
