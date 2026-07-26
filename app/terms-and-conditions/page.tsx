import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/LegalLayout";
import { site } from "@/lib/site";
import { pageOg } from "@/lib/seo";

const description =
  "Términos y Condiciones de uso del sitio de Aníbal Delisa: alcance de los turnos online, presupuestos, propiedad intelectual, responsabilidad y ley aplicable en Uruguay.";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description,
  ...pageOg("Términos y Condiciones", description),
};

export default function TermsPage() {
  return (
    <LegalLayout title="Términos y Condiciones" updated="julio de 2026">
      <p>
        Estos Términos y Condiciones regulan el uso del sitio web de{" "}
        <strong>Aníbal Delisa SRL</strong>. Al navegar y utilizar el sitio
        aceptás estos términos. Si no estás de acuerdo, te pedimos que no
        utilices el sitio.
      </p>

      <h2>1. Uso del sitio</h2>
      <p>
        El sitio ofrece información sobre nuestros servicios de mecánica,
        chapa y pintura y servicio oficial, y permite solicitar turnos y
        contactarnos. Te comprometés a utilizarlo de buena fe y a brindar datos
        veraces al agendar un turno o consultarnos.
      </p>

      <h2>2. Turnos online</h2>
      <p>
        Los turnos solicitados a través del sitio son una{" "}
        <strong>reserva sujeta a confirmación</strong>. La disponibilidad de
        horarios puede variar, y el ingreso del vehículo se coordina a partir
        de las 9:00 en horario de taller. Nos reservamos el derecho de
        reprogramar un turno por motivos operativos, avisándote con la mayor
        antelación posible.
      </p>

      <h2>3. Presupuestos y precios</h2>
      <p>
        El sitio no publica precios definitivos. Todo trabajo se cotiza sin
        cargo según el estado y las necesidades de cada vehículo. Cualquier
        reparación o repuesto adicional se realiza únicamente con tu
        autorización previa.
      </p>

      <h2>4. Propiedad intelectual</h2>
      <p>
        El logo, la marca “Aníbal Delisa”, los textos, imágenes y demás
        contenidos del sitio son de titularidad de Aníbal Delisa SRL o se
        utilizan con autorización. No está permitido reproducirlos o utilizarlos
        sin nuestro consentimiento por escrito.
      </p>

      <h2>5. Enlaces y servicios de terceros</h2>
      <p>
        El sitio puede incluir enlaces a servicios de terceros (por ejemplo
        WhatsApp o Google Maps). No somos responsables por el contenido, las
        políticas ni el funcionamiento de esos servicios externos.
      </p>

      <h2>6. Limitación de responsabilidad</h2>
      <p>
        Procuramos que la información del sitio sea correcta y esté actualizada,
        pero puede contener errores o desactualizaciones. La información
        publicada (incluidas las guías de seguridad vial) tiene carácter
        orientativo y no reemplaza el diagnóstico profesional de un mecánico ni
        la normativa vigente.
      </p>

      <h2>7. Protección de datos</h2>
      <p>
        El tratamiento de tus datos personales se rige por nuestra{" "}
        <Link href="/privacy-policy">Política de Privacidad</Link>, que forma
        parte de estos Términos.
      </p>

      <h2>8. Ley aplicable y jurisdicción</h2>
      <p>
        Estos Términos se rigen por las leyes de la República Oriental del
        Uruguay. Cualquier controversia se someterá a los tribunales
        competentes de la ciudad de Montevideo.
      </p>

      <h2>9. Cambios</h2>
      <p>
        Podemos modificar estos Términos en cualquier momento. La versión
        vigente será siempre la publicada en esta página, con su fecha de
        actualización.
      </p>

      <h2>10. Contacto</h2>
      <p>
        Ante cualquier duda escribinos a{" "}
        <a href={`mailto:${site.locations.mecanica.email}`}>
          {site.locations.mecanica.email}
        </a>{" "}
        o desde nuestra página de{" "}
        <Link href="/contacto">Contacto</Link>.
      </p>
    </LegalLayout>
  );
}
