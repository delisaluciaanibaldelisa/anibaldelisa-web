// Envío de emails vía Resend (API REST, sin SDK).
// Si la clave no está configurada o el envío falla, NUNCA rompe la reserva.

const FROM = "Aníbal Delisa <onboarding@resend.dev>"; // TODO: cambiar al dominio verificado

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM, to: opts.to, subject: opts.subject, html: opts.html }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

const pie = `
  <hr style="border:none;border-top:1px solid #e5e5e5;margin:24px 0" />
  <p style="color:#003366;font-weight:bold;margin:0">Aníbal Delisa — Taller Mecánico Multimarca</p>
  <p style="color:#555;margin:4px 0 0">Canelones 2308 esq. Bvar Artigas, Montevideo · Tel: 2408 4755 / 099 680 555</p>
  <p style="margin:12px 0 0">
    <a href="https://search.google.com/local/writereview?placeid=ChIJKW6LU6-Bn5URR8LW7U52gyI" style="color:#003366">⭐ ¿Cómo fue tu experiencia? Dejanos tu reseña en Google</a>
  </p>`;

export function emailConfirmacionCliente(datos: {
  nombre: string;
  fecha: string;
  hora: string;
  trabajo: string;
}): string {
  return `
  <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px">
    <h2 style="color:#003366">¡Tu turno está confirmado! ✅</h2>
    <p>Hola ${datos.nombre}, te esperamos en el taller:</p>
    <table style="border-collapse:collapse;width:100%;margin:16px 0">
      <tr><td style="padding:8px;border:1px solid #e5e5e5;font-weight:bold">📅 Fecha</td><td style="padding:8px;border:1px solid #e5e5e5">${datos.fecha}</td></tr>
      <tr><td style="padding:8px;border:1px solid #e5e5e5;font-weight:bold">🕘 Hora</td><td style="padding:8px;border:1px solid #e5e5e5">${datos.hora}</td></tr>
      <tr><td style="padding:8px;border:1px solid #e5e5e5;font-weight:bold">🔧 Trabajo</td><td style="padding:8px;border:1px solid #e5e5e5">${datos.trabajo}</td></tr>
      <tr><td style="padding:8px;border:1px solid #e5e5e5;font-weight:bold">📍 Dirección</td><td style="padding:8px;border:1px solid #e5e5e5">Canelones 2308 esq. Bvar Artigas, Montevideo</td></tr>
    </table>
    <p>Si necesitás reprogramar, escribinos por
      <a href="https://wa.me/59899680555?text=${encodeURIComponent("Hola! Necesito reprogramar mi turno")}" style="color:#003366;font-weight:bold">WhatsApp</a>
      o llamanos al 2408 4755.</p>
    ${pie}
  </div>`;
}

export function emailAvisoTaller(datos: {
  nombre: string;
  celular: string;
  email: string;
  marca: string;
  trabajo: string;
  fecha: string;
  hora: string;
  calendarSync: boolean;
}): string {
  return `
  <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px">
    <h2 style="color:#003366">🔔 Nuevo turno desde la web</h2>
    <table style="border-collapse:collapse;width:100%;margin:16px 0">
      <tr><td style="padding:8px;border:1px solid #e5e5e5;font-weight:bold">Cliente</td><td style="padding:8px;border:1px solid #e5e5e5">${datos.nombre}</td></tr>
      <tr><td style="padding:8px;border:1px solid #e5e5e5;font-weight:bold">Celular</td><td style="padding:8px;border:1px solid #e5e5e5">${datos.celular}</td></tr>
      <tr><td style="padding:8px;border:1px solid #e5e5e5;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #e5e5e5">${datos.email}</td></tr>
      <tr><td style="padding:8px;border:1px solid #e5e5e5;font-weight:bold">Marca</td><td style="padding:8px;border:1px solid #e5e5e5">${datos.marca}</td></tr>
      <tr><td style="padding:8px;border:1px solid #e5e5e5;font-weight:bold">Trabajo</td><td style="padding:8px;border:1px solid #e5e5e5">${datos.trabajo}</td></tr>
      <tr><td style="padding:8px;border:1px solid #e5e5e5;font-weight:bold">Fecha</td><td style="padding:8px;border:1px solid #e5e5e5">${datos.fecha} a las ${datos.hora}</td></tr>
    </table>
    <p style="color:${datos.calendarSync ? "#0a7d2c" : "#b30000"}">
      ${datos.calendarSync ? "✅ Agendado automáticamente en Google Calendar." : "⚠️ Google Calendar aún no conectado: anotar este turno a mano."}
    </p>
  </div>`;
}
