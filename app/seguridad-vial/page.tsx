import type { Metadata } from "next";
import {
  CircleCheck,
  AlertTriangle,
  ShieldAlert,
  Flame,
  Triangle,
  BriefcaseMedical,
  Baby,
  ChevronDown,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import Breadcrumb from "@/components/Breadcrumb";
import ChecklistViaje from "@/components/ChecklistViaje";
import { ChatButton } from "@/components/CTAButtons";

export const metadata: Metadata = {
  title: "Recomendaciones de Seguridad Vial",
  description:
    "Guía completa de seguridad vial para conductores en Uruguay: qué llevar en tu auto según la ley, controles antes de viajes largos e importancia de la alineación y balanceo.",
};

const beneficiosAlineacion = [
  "Prolonga la vida útil de los neumáticos hasta un 30% más",
  "Mejora el control y la estabilidad, especialmente en curvas",
  "Reduce el consumo de combustible (un auto desalineado genera más resistencia)",
  "Evita que el auto “tire” hacia un lado al soltar el volante",
  "Previene el desgaste irregular de las cubiertas",
  "Se recomienda revisar cada 10.000 km o ante cualquier golpe fuerte",
];

const beneficiosBalanceo = [
  "Elimina las vibraciones en el volante o en el piso del vehículo",
  "Evita el desgaste prematuro de amortiguadores y rodamientos",
  "Mejora la comodidad de marcha y reduce la fatiga del conductor",
  "Debe hacerse al montar neumáticos nuevos o al detectar vibraciones",
];

const senales = [
  { s: "El volante vibra a cierta velocidad", c: "Necesitás balanceo" },
  { s: "El auto se va hacia un lado", c: "Necesitás alineación" },
  { s: "La goma se desgasta solo de un lado", c: "Necesitás alineación" },
  {
    s: "El consumo de nafta aumentó sin razón aparente",
    c: "Posible desalineación",
  },
];

const maletinContenido = [
  "2 paquetes de apósitos estériles",
  "2 paquetes de gasas",
  "Linterna con luz LED",
  "2 pares de guantes limpios (látex)",
  "Cinta adhesiva hipoalergénica",
  "Tijera de corte de gasa con punta roma",
  "2 vendas de gasa",
  "Bolsa roja para residuos biológicos (con advertencia de riesgo biológico)",
  "2 chalecos retro-reflectivos",
];

const recomendados = [
  "Rueda de auxilio en buen estado + gato hidráulico + llave de ruedas",
  "Cables de arranque (para batería descargada)",
  "Linterna con pilas de repuesto",
  "Agua potable (mínimo 2 litros por persona)",
  "Cargador USB de auto para mantener el celular con batería",
  "Manta de emergencia (térmica dorada/plateada)",
  "Herramientas básicas: destornilladores, alicates, llave inglesa ajustable",
  "Cinta aisladora y aislante",
  "Papel y bolígrafo (para intercambio de datos en un accidente)",
];

function SectionTitle({
  kicker,
  title,
}: {
  kicker: string;
  title: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-sm font-bold uppercase tracking-wide text-primary">
        {kicker}
      </p>
      <h2 className="mt-1 font-heading font-bold text-2xl md:text-3xl text-dark">
        {title}
      </h2>
    </div>
  );
}

function BenefitList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3">
          <CircleCheck
            size={20}
            className="mt-0.5 shrink-0 text-primary"
          />
          <span className="text-gray-700">{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function SeguridadVialPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark text-white">
        <div className="container-x py-16 md:py-20">
          <Reveal className="max-w-3xl">
            <Breadcrumb />
            <p className="inline-block rounded-full bg-primary px-4 py-1 text-sm font-semibold text-white mb-5">
              Sección de seguridad
            </p>
            <h1 className="font-heading font-extrabold text-3xl md:text-5xl">
              Recomendaciones de Seguridad Vial
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Todo lo que necesitás saber para viajar seguro en Uruguay: la
              importancia de la alineación y el balanceo, los controles antes de
              un viaje largo y qué llevar en tu auto según la ley.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SECCIÓN 1: Alineación y balanceo */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <Reveal>
            <SectionTitle
              kicker="Sección 1"
              title="¿Por qué es importante alinear y balancear tu vehículo?"
            />
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal className="rounded-2xl border border-gray-200 p-6 md:p-8">
              <h3 className="font-heading font-bold text-xl text-accent mb-4">
                Alineación (dirección)
              </h3>
              <BenefitList items={beneficiosAlineacion} />
            </Reveal>
            <Reveal
              delay={0.1}
              className="rounded-2xl border border-gray-200 p-6 md:p-8"
            >
              <h3 className="font-heading font-bold text-xl text-accent mb-4">
                Balanceo
              </h3>
              <BenefitList items={beneficiosBalanceo} />
            </Reveal>
          </div>

          {/* Señales de alerta */}
          <Reveal className="mt-12">
            <h3 className="flex items-center gap-2 font-heading font-bold text-xl text-primary mb-5">
              <AlertTriangle size={22} />
              Señales de alerta
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {senales.map((x) => (
                <div
                  key={x.s}
                  className="rounded-xl border-l-4 border-primary bg-primary/5 p-4"
                >
                  <p className="font-semibold text-dark">{x.s}</p>
                  <p className="mt-1 text-sm text-primary font-bold">
                    → {x.c}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-10 rounded-2xl bg-gray-50 p-6 md:p-8 text-center">
            <p className="font-heading font-bold text-lg text-dark mb-4">
              Hacé tu alineación y balanceo con nosotros
            </p>
            <ChatButton label="Escribinos por chat" />
          </Reveal>
        </div>
      </section>

      {/* SECCIÓN 2: Checklist */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-x max-w-3xl">
          <Reveal>
            <SectionTitle
              kicker="Sección 2"
              title="Controles antes de un viaje largo"
            />
            <p className="text-gray-600 mb-8">
              Marcá cada ítem a medida que lo verificás. Tu progreso se guarda
              mientras estés en esta página.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ChecklistViaje />
          </Reveal>
        </div>
      </section>

      {/* SECCIÓN 3: Qué llevar */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <Reveal>
            <SectionTitle
              kicker="Sección 3"
              title="Qué llevar en tu auto — Normativa Uruguay"
            />
          </Reveal>

          {/* Obligatorios */}
          <Reveal>
            <h3 className="font-heading font-bold text-xl text-dark mb-5">
              Elementos obligatorios
            </h3>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            <Reveal className="rounded-2xl border border-gray-200 p-6">
              <span className="inline-block rounded bg-primary px-2.5 py-0.5 text-xs font-bold text-white mb-3">
                OBLIGATORIO
              </span>
              <Flame className="text-primary mb-2" size={26} />
              <h4 className="font-heading font-bold text-dark">
                Matafuego (extintor)
              </h4>
              <p className="mt-1.5 text-sm text-gray-600">
                Tipo ABC de polvo químico seco, cargado y con vencimiento
                vigente. Accesible (no bloqueado en el baúl) y con el manómetro
                en zona verde. Obligatorio para todo vehículo de 4 o más ruedas
                (Art. 29, Ley 18.191).
              </p>
            </Reveal>

            <Reveal delay={0.08} className="rounded-2xl border border-gray-200 p-6">
              <span className="inline-block rounded bg-primary px-2.5 py-0.5 text-xs font-bold text-white mb-3">
                OBLIGATORIO
              </span>
              <Triangle className="text-primary mb-2" size={26} />
              <h4 className="font-heading font-bold text-dark">
                Balizas / triángulos
              </h4>
              <p className="mt-1.5 text-sm text-gray-600">
                Mínimo 2 triángulos de señalización o dispositivos reflectantes,
                para usar en caso de emergencia en la vía pública.
              </p>
            </Reveal>

            <Reveal delay={0.16} className="rounded-2xl border border-gray-200 p-6">
              <span className="inline-block rounded bg-primary px-2.5 py-0.5 text-xs font-bold text-white mb-3">
                OBLIGATORIO
              </span>
              <BriefcaseMedical className="text-primary mb-2" size={26} />
              <h4 className="font-heading font-bold text-dark">
                Maletín de primeros auxilios
              </h4>
              <p className="mt-1.5 text-sm text-gray-600">
                Color blanco con cruz verde, material impermeable. Debe llevar
                impreso “Maletín con elementos de primeros auxilios y seguridad
                vial” y los teléfonos 911 – 108 – 104.
              </p>
            </Reveal>
          </div>

          {/* Acordeón maletín */}
          <Reveal className="mt-6">
            <details className="group rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <summary className="flex items-center justify-between cursor-pointer list-none font-heading font-bold text-dark">
                <span className="flex items-center gap-2">
                  <ShieldAlert size={20} className="text-primary" />
                  Contenido mínimo legal del maletín
                </span>
                <ChevronDown
                  size={20}
                  className="transition-transform group-open:rotate-180"
                />
              </summary>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {maletinContenido.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-gray-700">
                    <CircleCheck size={16} className="mt-0.5 shrink-0 text-primary" />
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-gray-500">
                Obligatorio desde 2014 (Ley 18.191 / UNASEV).
              </p>
            </details>
          </Reveal>

          {/* Recomendados */}
          <Reveal className="mt-12">
            <h3 className="font-heading font-bold text-xl text-dark mb-5">
              Muy recomendados
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {recomendados.map((r, i) => (
                <div
                  key={r}
                  className="flex items-start gap-3 rounded-xl border border-gray-200 p-4"
                  style={{ transitionDelay: `${i * 20}ms` }}
                >
                  <span className="inline-block rounded bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white shrink-0 mt-0.5">
                    REC
                  </span>
                  <span className="text-sm text-gray-700">{r}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Niños */}
          <Reveal className="mt-8 rounded-2xl border-l-4 border-accent bg-accent/5 p-6">
            <h3 className="flex items-center gap-2 font-heading font-bold text-lg text-accent mb-3">
              <Baby size={22} />
              Para viajes con niños (obligatorio)
            </h3>
            <ul className="grid gap-2 sm:grid-cols-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CircleCheck size={16} className="mt-0.5 shrink-0 text-accent" />
                Silla homologada según peso/talla
              </li>
              <li className="flex items-start gap-2">
                <CircleCheck size={16} className="mt-0.5 shrink-0 text-accent" />
                Protector solar lateral
              </li>
              <li className="flex items-start gap-2">
                <CircleCheck size={16} className="mt-0.5 shrink-0 text-accent" />
                Snacks y agua extra
              </li>
            </ul>
          </Reveal>

          {/* Nota legal */}
          <p className="mt-10 text-center text-sm text-gray-500">
            Según la Ley 18.191 y UNASEV — gub.uy. Esta información es
            orientativa; verificá siempre la normativa vigente.
          </p>
        </div>
      </section>
    </>
  );
}
