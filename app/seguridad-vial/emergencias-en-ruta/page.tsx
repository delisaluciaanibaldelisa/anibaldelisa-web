import type { Metadata } from "next";
import Link from "next/link";
import {
  Siren,
  Phone,
  Flame,
  CircleAlert,
  ChevronDown,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import Breadcrumb from "@/components/Breadcrumb";
import { ChatButton } from "@/components/CTAButtons";
import { pageOg } from "@/lib/seo";

const description =
  "Guía de Aníbal Delisa sobre qué hacer ante una emergencia vial en Uruguay: neumático reventado, pérdida de frenos, derrape, choque, vuelco, incendio y vehículo detenido en ruta.";

export const metadata: Metadata = {
  title: "Qué hacer ante una emergencia vial en Uruguay",
  description,
  ...pageOg("Qué hacer ante una emergencia vial", description),
};

type Pregunta = {
  q: string;
  intro?: string;
  bullets?: string[];
  outro?: string;
  plain: string;
};

const preguntas: Pregunta[] = [
  {
    q: "¿Qué hago si se revienta un neumático o se desprende una rueda?",
    bullets: [
      "Sujetá firmemente el volante con las dos manos.",
      "Intentá mantener el vehículo en línea recta.",
      "Soltá el acelerador de manera progresiva.",
      "No frenes ni gires bruscamente.",
      "Cuando hayas reducido la velocidad y recuperado el control, frená suavemente y salí de la calzada si es seguro.",
      "Encendé las balizas y señalizá el vehículo.",
      "No continúes circulando: solicitá asistencia mecánica.",
    ],
    outro:
      "Una correcta revisión de los neumáticos, la presión y el ajuste de las ruedas ayuda a prevenir este tipo de situaciones.",
    plain:
      "Sujetá firmemente el volante con las dos manos. Intentá mantener el vehículo en línea recta. Soltá el acelerador de manera progresiva. No frenes ni gires bruscamente. Cuando hayas reducido la velocidad y recuperado el control, frená suavemente y salí de la calzada si es seguro. Encendé las balizas y señalizá el vehículo. No continúes circulando: solicitá asistencia mecánica. Una correcta revisión de los neumáticos, la presión y el ajuste de las ruedas ayuda a prevenir este tipo de situaciones.",
  },
  {
    q: "¿Qué hago si me quedo sin frenos?",
    bullets: [
      "Mantené la calma y encendé las balizas.",
      "Presioná firmemente el pedal. Si se va hasta el fondo, bombealo varias veces para intentar recuperar presión.",
      "Reducí los cambios de manera progresiva para utilizar el freno motor.",
      "Accioná el freno de estacionamiento gradualmente, evitando bloquear las ruedas.",
      "Buscá una salida segura, una banquina amplia, una vía ascendente o una zona libre de obstáculos.",
      "Utilizá la bocina o las luces para advertir a otros conductores.",
      "No apagues el motor ni coloques la transmisión en “P” o marcha atrás mientras el vehículo esté en movimiento.",
      "Una vez detenido, no vuelvas a circular y solicitá asistencia.",
    ],
    plain:
      "Mantené la calma y encendé las balizas. Presioná firmemente el pedal; si se va hasta el fondo, bombealo varias veces para intentar recuperar presión. Reducí los cambios de manera progresiva para utilizar el freno motor. Accioná el freno de estacionamiento gradualmente, evitando bloquear las ruedas. Buscá una salida segura, una banquina amplia, una vía ascendente o una zona libre de obstáculos. Utilizá la bocina o las luces para advertir a otros conductores. No apagues el motor ni coloques la transmisión en P o marcha atrás mientras el vehículo esté en movimiento. Una vez detenido, no vuelvas a circular y solicitá asistencia.",
  },
  {
    q: "¿Debo colocar el punto muerto al entrar en una curva?",
    intro:
      "No. Antes de ingresar a una curva se debe reducir la velocidad y seleccionar una marcha adecuada. Durante la curva conviene mantener el cambio colocado, sujetar correctamente el volante y realizar movimientos suaves.",
    outro:
      "Circular en punto muerto o con el embrague presionado reduce la capacidad de respuesta y elimina la ayuda del freno motor. Evitá acelerar, frenar o girar bruscamente dentro de la curva.",
    plain:
      "No. Antes de ingresar a una curva se debe reducir la velocidad y seleccionar una marcha adecuada. Durante la curva conviene mantener el cambio colocado, sujetar correctamente el volante y realizar movimientos suaves. Circular en punto muerto o con el embrague presionado reduce la capacidad de respuesta y elimina la ayuda del freno motor. Evitá acelerar, frenar o girar bruscamente dentro de la curva.",
  },
  {
    q: "¿Debo reaccionar diferente si mi vehículo tiene tracción delantera o trasera?",
    intro:
      "No existe una maniobra universal que sea segura para todas las pérdidas de adherencia. Acelerar bruscamente en un vehículo con tracción delantera puede hacer que continúe de frente y abra su trayectoria. En un vehículo con tracción trasera, soltar repentinamente el acelerador dentro de una curva puede desestabilizar la parte posterior. Independientemente del tipo de tracción:",
    bullets: [
      "Reducí la velocidad antes de la curva.",
      "Mantené la marcha colocada.",
      "Evitá movimientos bruscos.",
      "Utilizá el acelerador, el freno y la dirección de forma progresiva.",
      "No desconectes los sistemas electrónicos de estabilidad durante la circulación normal.",
    ],
    outro:
      "Las maniobras avanzadas de recuperación deben aprenderse únicamente con instructores y en lugares controlados.",
    plain:
      "No existe una maniobra universal que sea segura para todas las pérdidas de adherencia. Acelerar bruscamente en un vehículo con tracción delantera puede hacer que continúe de frente y abra su trayectoria. En un vehículo con tracción trasera, soltar repentinamente el acelerador dentro de una curva puede desestabilizar la parte posterior. Reducí la velocidad antes de la curva, mantené la marcha colocada, evitá movimientos bruscos, utilizá el acelerador, el freno y la dirección de forma progresiva, y no desconectes los sistemas electrónicos de estabilidad durante la circulación normal. Las maniobras avanzadas de recuperación deben aprenderse únicamente con instructores y en lugares controlados.",
  },
  {
    q: "¿Qué hago si el vehículo derrapa o comienza a hacer un trompo?",
    bullets: [
      "Mantené la calma y mirá hacia el lugar seguro al que querés dirigir el vehículo.",
      "Soltá suavemente el acelerador.",
      "No frenes de golpe ni utilices el freno de estacionamiento.",
      "Evitá movimientos rápidos o exagerados del volante.",
      "Si todavía conservás capacidad de dirección, realizá correcciones pequeñas y progresivas.",
      "Cuando recuperes la adherencia, reducí la velocidad y detenete en un lugar seguro.",
    ],
    outro:
      "En caso de hidroplaneamiento, sujetá firmemente el volante, evitá girarlo bruscamente y soltá el acelerador suavemente hasta que los neumáticos vuelvan a tener contacto con el pavimento.",
    plain:
      "Mantené la calma y mirá hacia el lugar seguro al que querés dirigir el vehículo. Soltá suavemente el acelerador. No frenes de golpe ni utilices el freno de estacionamiento. Evitá movimientos rápidos o exagerados del volante. Si todavía conservás capacidad de dirección, realizá correcciones pequeñas y progresivas. Cuando recuperes la adherencia, reducí la velocidad y detenete en un lugar seguro. En caso de hidroplaneamiento, sujetá firmemente el volante, evitá girarlo bruscamente y soltá el acelerador suavemente hasta que los neumáticos vuelvan a tener contacto con el pavimento.",
  },
  {
    q: "¿Qué hago si pierdo la dirección?",
    intro:
      "En algunos casos no se pierde completamente la dirección, sino su asistencia, por lo que el volante se vuelve mucho más pesado.",
    bullets: [
      "Sujetá firmemente el volante.",
      "Soltá progresivamente el acelerador.",
      "Encendé las balizas.",
      "Evitá cambios bruscos de trayectoria.",
      "Aplicá los frenos gradualmente.",
      "Intentá detenerte en línea recta y fuera de la circulación.",
      "No apagues el motor mientras el vehículo esté en movimiento.",
      "No continúes conduciendo, aunque la dirección parezca volver a funcionar.",
    ],
    plain:
      "En algunos casos no se pierde completamente la dirección, sino su asistencia, por lo que el volante se vuelve mucho más pesado. Sujetá firmemente el volante, soltá progresivamente el acelerador y encendé las balizas. Evitá cambios bruscos de trayectoria, aplicá los frenos gradualmente e intentá detenerte en línea recta y fuera de la circulación. No apagues el motor mientras el vehículo esté en movimiento, y no continúes conduciendo aunque la dirección parezca volver a funcionar.",
  },
  {
    q: "¿Qué debo hacer ante un choque o siniestro de tránsito?",
    intro:
      "La normativa uruguaya establece que los conductores involucrados deben detenerse, permanecer en el lugar, señalizar, procurar asistencia y denunciar el incidente.",
    bullets: [
      "Detené el vehículo sin generar un nuevo peligro.",
      "Encendé las balizas y señalizá el lugar.",
      "Llamá al 911 e informá la ubicación, cantidad de personas y existencia de heridos, fuego o personas atrapadas.",
      "No muevas a una persona lesionada, salvo que exista un peligro inmediato.",
      "No le des comida, agua ni medicamentos.",
      "No retires el casco de un motociclista.",
      "Evitá modificar la escena innecesariamente.",
      "Permanecé en un lugar protegido del tránsito mientras llega la asistencia.",
    ],
    plain:
      "La normativa uruguaya establece que los conductores involucrados deben detenerse, permanecer en el lugar, señalizar, procurar asistencia y denunciar el incidente. Detené el vehículo sin generar un nuevo peligro, encendé las balizas y señalizá el lugar. Llamá al 911 e informá la ubicación, cantidad de personas y existencia de heridos, fuego o personas atrapadas. No muevas a una persona lesionada salvo peligro inmediato, no le des comida, agua ni medicamentos, y no retires el casco de un motociclista. Evitá modificar la escena innecesariamente y permanecé en un lugar protegido del tránsito mientras llega la asistencia.",
  },
  {
    q: "¿Qué hago si el vehículo vuelca y hay personas en su interior?",
    bullets: [
      "Comprobá si existe fuego, humo, agua, pérdida de combustible o peligro de otro impacto.",
      "Llamá inmediatamente al 911.",
      "Si estás suspendido por el cinturón, no lo sueltes bruscamente. Sujetá primero el cuerpo y protegé la cabeza y el cuello.",
      "No intentes salir si el vehículo está inestable o si tenés dolor, mareos o dificultades para moverte.",
      "No extraigas a una persona lesionada o atrapada, salvo que exista un peligro inmediato como fuego o inmersión.",
      "No abras puertas ni muevas el vehículo si eso puede volverlo inestable.",
      "Seguí las instrucciones del operador de emergencias hasta la llegada de los equipos de rescate.",
    ],
    plain:
      "Comprobá si existe fuego, humo, agua, pérdida de combustible o peligro de otro impacto, y llamá inmediatamente al 911. Si estás suspendido por el cinturón, no lo sueltes bruscamente: sujetá primero el cuerpo y protegé la cabeza y el cuello. No intentes salir si el vehículo está inestable o si tenés dolor, mareos o dificultades para moverte. No extraigas a una persona lesionada o atrapada salvo peligro inmediato como fuego o inmersión, no abras puertas ni muevas el vehículo si eso puede volverlo inestable, y seguí las instrucciones del operador de emergencias hasta la llegada de los equipos de rescate.",
  },
  {
    q: "¿Qué hago si mi vehículo se incendia?",
    bullets: [
      "Salí de la circulación y detenete tan pronto como sea seguro.",
      "Apagá el motor.",
      "Hacé que todas las personas salgan inmediatamente.",
      "Alejate al menos 30 metros, manteniéndote fuera del tránsito y del humo.",
      "Llamá al 104 o al 911.",
      "No regreses al vehículo para buscar objetos.",
      "No abras el capó ni el baúl: la entrada de oxígeno puede aumentar rápidamente el fuego.",
      "No intentes combatir un incendio que ya se haya propagado.",
    ],
    outro:
      "Si el vehículo es eléctrico o híbrido, informalo al servicio de emergencia. No toques cables de color naranja, componentes de alta tensión ni una batería dañada. Aunque las llamas desaparezcan, la batería puede volver a encenderse.",
    plain:
      "Salí de la circulación y detenete tan pronto como sea seguro, apagá el motor y hacé que todas las personas salgan inmediatamente. Alejate al menos 30 metros, manteniéndote fuera del tránsito y del humo, y llamá al 104 o al 911. No regreses al vehículo para buscar objetos, no abras el capó ni el baúl (la entrada de oxígeno puede aumentar rápidamente el fuego) y no intentes combatir un incendio que ya se haya propagado. Si el vehículo es eléctrico o híbrido, informalo al servicio de emergencia: no toques cables de color naranja, componentes de alta tensión ni una batería dañada, ya que aunque las llamas desaparezcan la batería puede volver a encenderse.",
  },
  {
    q: "¿Qué hago si el vehículo queda detenido en la ruta?",
    bullets: [
      "Intentá sacarlo completamente de la calzada.",
      "Encendé las balizas.",
      "Colocá los dispositivos reflectantes solamente si podés hacerlo sin exponerte al tránsito.",
      "Si es seguro salir, hacelo por el lado contrario a la circulación.",
      "Ubicate lejos de la calzada y, cuando exista, detrás de la barrera de protección.",
      "No permanezcas delante ni detrás del vehículo.",
      "No intentes repararlo ocupando un carril.",
      "Solicitá asistencia mecánica.",
    ],
    plain:
      "Intentá sacarlo completamente de la calzada y encendé las balizas. Colocá los dispositivos reflectantes solamente si podés hacerlo sin exponerte al tránsito. Si es seguro salir, hacelo por el lado contrario a la circulación y ubicate lejos de la calzada, detrás de la barrera de protección cuando exista. No permanezcas delante ni detrás del vehículo, no intentes repararlo ocupando un carril, y solicitá asistencia mecánica.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: preguntas.map((p) => ({
    "@type": "Question",
    name: p.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: p.plain,
    },
  })),
};

export default function EmergenciasEnRutaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-dark text-white">
        <div className="container-x py-16 md:py-20">
          <Reveal className="max-w-3xl">
            <Breadcrumb />
            <p className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-white mb-5">
              <Siren size={16} />
              Guía de emergencias
            </p>
            <h1 className="font-heading font-extrabold text-3xl md:text-5xl">
              Qué hacer ante una emergencia vial
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Tu seguridad y la de tu familia nos importa.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-x max-w-3xl">
          {/* Intro */}
          <Reveal>
            <p className="text-gray-700 leading-relaxed">
              Cumplir el plan de mantenimiento indicado por el fabricante
              reduce el riesgo de sufrir fallas mecánicas. Sin embargo, una
              emergencia también puede producirse por un impacto, un pozo, el
              estado del pavimento o una situación imprevista.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Por eso creamos esta guía para todas las personas, sean o no
              clientes de Aníbal Delisa. Saber cómo reaccionar, mantener la
              calma y evitar maniobras bruscas puede ayudar a reducir las
              consecuencias.
            </p>
          </Reveal>

          {/* Callout de emergencia */}
          <Reveal className="mt-8 rounded-2xl bg-primary text-white p-6 md:p-8">
            <div className="flex items-start gap-3">
              <Phone size={26} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-heading font-bold text-lg">
                  En una emergencia con personas lesionadas, llamá al{" "}
                  <a href="tel:911" className="underline underline-offset-2">
                    911
                  </a>
                  .
                </p>
                <p className="mt-1 flex items-center gap-1.5">
                  <Flame size={18} className="shrink-0" />
                  En caso de incendio, también podés comunicarte con Bomberos
                  al{" "}
                  <a href="tel:104" className="underline underline-offset-2">
                    104
                  </a>
                  .
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-4 flex items-start gap-2 text-sm text-gray-500">
            <CircleAlert size={16} className="shrink-0 mt-0.5" />
            <p>
              Esta información es orientativa. La reacción adecuada puede
              variar según el vehículo, las condiciones del tránsito y el tipo
              de falla. Priorizá siempre la vida y seguí las indicaciones de
              los servicios de emergencia.
            </p>
          </Reveal>

          {/* Preguntas */}
          <div className="mt-12 space-y-4">
            {preguntas.map((p, i) => (
              <Reveal key={p.q} delay={i * 0.03}>
                <details className="group rounded-2xl border border-gray-200 p-6">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-heading font-bold text-dark">
                    {p.q}
                    <ChevronDown
                      size={20}
                      className="shrink-0 transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <div className="mt-3 text-gray-700 leading-relaxed space-y-3">
                    {p.intro && <p>{p.intro}</p>}
                    {p.bullets && (
                      <ul className="space-y-1.5 list-disc pl-5">
                        {p.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                    {p.outro && <p>{p.outro}</p>}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>

          {/* Prevención / CTA */}
          <Reveal className="mt-14 rounded-2xl bg-gray-50 p-6 md:p-8 text-center">
            <h2 className="font-heading font-bold text-xl md:text-2xl text-dark">
              La prevención es la primera medida de seguridad
            </h2>
            <p className="mt-3 text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Realizar el mantenimiento según el kilometraje o el tiempo
              indicado por el fabricante permite detectar problemas en frenos,
              neumáticos, dirección, suspensión, luces y otros sistemas
              esenciales. En Aníbal Delisa atendemos vehículos Peugeot,
              Citroën, BYD, Opel y otras marcas. Si notás ruidos, vibraciones,
              testigos encendidos o cambios en el comportamiento del
              vehículo, no esperes al próximo service.
            </p>
            <p className="mt-3 font-heading font-semibold text-dark">
              Agendá un control preventivo. Cuidar tu vehículo también es
              cuidar a quienes viajan contigo.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/turnos"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 transition-all hover:scale-[1.03]"
              >
                Agendá tu turno
              </Link>
              <ChatButton label="Escribinos por chat" />
            </div>
          </Reveal>

          {/* Fuentes */}
          <p className="mt-10 text-center text-sm text-gray-500">
            Contenido basado en la Ley uruguaya de Tránsito y Seguridad Vial,
            la Guía Nacional de Conducción y recomendaciones de organismos
            públicos especializados.
          </p>
        </div>
      </section>
    </>
  );
}
