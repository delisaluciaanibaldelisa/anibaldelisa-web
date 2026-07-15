import type { ReactNode } from "react";
import Link from "next/link";
import { CircleCheck, ArrowLeft } from "lucide-react";
import Reveal from "@/components/Reveal";
import { ChatButton, CallButton } from "@/components/CTAButtons";

export default function ServiceLayout({
  title,
  lead,
  features,
  children,
}: {
  title: string;
  lead: string;
  features: readonly string[];
  children?: ReactNode;
}) {
  return (
    <>
      <section className="bg-dark text-white">
        <div className="container-x py-16 md:py-20">
          <Reveal className="max-w-3xl">
            <Link
              href="/servicios"
              className="inline-flex items-center gap-1.5 text-sm text-gray-300 hover:text-white mb-5"
            >
              <ArrowLeft size={16} />
              Todos los servicios
            </Link>
            <h1 className="font-heading font-extrabold text-3xl md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-lg text-gray-300">{lead}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="font-heading font-bold text-2xl text-dark mb-6">
                ¿Qué incluye?
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CircleCheck
                      size={20}
                      className="mt-0.5 shrink-0 text-primary"
                    />
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            {children && (
              <Reveal className="mt-8 text-gray-700 leading-relaxed space-y-4">
                {children}
              </Reveal>
            )}
          </div>

          {/* CTA lateral */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-gray-200 p-6 lg:sticky lg:top-24">
              <h3 className="font-heading font-bold text-lg text-dark">
                Pedí tu turno
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Coordinamos día y hora que te queden cómodos. Respondemos
                rápido.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <ChatButton label="Escribinos por chat" className="w-full" />
                <CallButton className="w-full" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
