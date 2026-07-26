import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/LegalLayout";
import { site } from "@/lib/site";
import { pageOg } from "@/lib/seo";

const description =
  "Política de Privacidad de Aníbal Delisa: qué datos personales recolectamos, con qué finalidad, cómo los protegemos y cuáles son tus derechos según la Ley 18.331 de Uruguay.";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description,
  ...pageOg("Política de Privacidad", description),
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Política de Privacidad" updated="julio de 2026">
      <p>
        En <strong>Aníbal Delisa SRL</strong> (“Aníbal Delisa”, “nosotros”)
        respetamos tu privacidad y nos comprometemos a proteger los datos
        personales que nos confiás. Esta política explica qué información
        recolectamos a través de nuestro sitio{" "}
        <a href={site.url}>{site.url.replace("https://", "")}</a>, con qué
        finalidad y cuáles son tus derechos.
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <p>
        El responsable de tus datos es Aníbal Delisa SRL, con domicilio en
        {" "}
        {site.locations.mecanica.address}. Para cualquier consulta sobre esta
        política podés escribirnos a{" "}
        <a href={`mailto:${site.locations.mecanica.email}`}>
          {site.locations.mecanica.email}
        </a>
        .
      </p>

      <h2>2. Qué datos recolectamos</h2>
      <p>Recolectamos únicamente los datos que necesitamos para atenderte:</p>
      <ul>
        <li>
          <strong>Datos que nos brindás al agendar un turno o contactarnos:</strong>{" "}
          nombre, teléfono/celular, correo electrónico, marca y modelo del
          vehículo y el trabajo que necesitás.
        </li>
        <li>
          <strong>Datos de navegación:</strong> información técnica anónima o
          seudonimizada (páginas visitadas, tipo de dispositivo, origen de la
          visita) recolectada mediante herramientas de analítica y cookies.
        </li>
        <li>
          <strong>Comunicaciones:</strong> los mensajes que nos enviás por el
          chat del sitio, WhatsApp, correo o teléfono.
        </li>
      </ul>
      <p>
        No recolectamos datos sensibles ni solicitamos información de tarjetas
        o cuentas bancarias a través del sitio.
      </p>

      <h2>3. Con qué finalidad usamos tus datos</h2>
      <ul>
        <li>Gestionar y confirmar los turnos que solicitás.</li>
        <li>Responder tus consultas y brindarte presupuestos.</li>
        <li>Contactarte respecto del servicio de tu vehículo.</li>
        <li>
          Mejorar nuestro sitio y medir el rendimiento de nuestras campañas
          publicitarias.
        </li>
      </ul>

      <h2>4. Terceros que intervienen</h2>
      <p>
        Para operar el sitio utilizamos servicios de terceros que pueden
        procesar ciertos datos por nuestra cuenta, entre ellos:
      </p>
      <ul>
        <li>
          <strong>Google</strong> (Google Analytics y Google Ads), para
          medición de tráfico y publicidad.
        </li>
        <li>
          <strong>Proveedor de envío de correos</strong>, para enviarte la
          confirmación de tu turno.
        </li>
        <li>
          <strong>WhatsApp / Meta</strong>, cuando elegís comunicarte por ese
          canal.
        </li>
      </ul>
      <p>
        No vendemos ni cedemos tus datos personales a terceros con fines
        comerciales.
      </p>

      <h2>5. Conservación de los datos</h2>
      <p>
        Conservamos tus datos solo durante el tiempo necesario para cumplir con
        las finalidades descritas y con las obligaciones legales aplicables.
        Cuando dejan de ser necesarios, los eliminamos o anonimizamos.
      </p>

      <h2>6. Tus derechos</h2>
      <p>
        De acuerdo con la Ley N.º 18.331 de Protección de Datos Personales de
        Uruguay, tenés derecho a acceder a tus datos, rectificarlos,
        actualizarlos o solicitar su supresión. Para ejercer estos derechos,
        escribinos a{" "}
        <a href={`mailto:${site.locations.mecanica.email}`}>
          {site.locations.mecanica.email}
        </a>
        . También podés presentar un reclamo ante la Unidad Reguladora y de
        Control de Datos Personales (URCDP) de Uruguay.
      </p>

      <h2>7. Cookies</h2>
      <p>
        Utilizamos cookies propias y de terceros para el funcionamiento del
        sitio, para recordar preferencias y para medir su uso. Podés configurar
        tu navegador para bloquear o eliminar cookies; algunas funciones del
        sitio podrían verse afectadas si lo hacés.
      </p>

      <h2>8. Cambios en esta política</h2>
      <p>
        Podemos actualizar esta política para reflejar cambios en nuestras
        prácticas o en la normativa. Publicaremos siempre la versión vigente en
        esta página, con su fecha de actualización.
      </p>

      <h2>9. Contacto</h2>
      <p>
        Si tenés preguntas sobre esta Política de Privacidad, escribinos a{" "}
        <a href={`mailto:${site.locations.mecanica.email}`}>
          {site.locations.mecanica.email}
        </a>{" "}
        o visitá nuestra página de{" "}
        <Link href="/contacto">Contacto</Link>.
      </p>
    </LegalLayout>
  );
}
