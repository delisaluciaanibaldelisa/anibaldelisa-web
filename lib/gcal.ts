// Integración con Google Calendar vía service account (sin dependencias externas).
// Si las credenciales no están configuradas, el sistema de turnos funciona igual
// (todos los horarios libres) y esta integración queda latente.

import crypto from "node:crypto";

type ServiceAccount = { client_email: string; private_key: string };

function getServiceAccount(): ServiceAccount | null {
  try {
    const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    if (!raw) return null;
    const json = JSON.parse(raw);
    if (!json.client_email || !json.private_key) return null;
    return {
      client_email: json.client_email,
      // Al pegar el JSON en Vercel, los saltos de línea pueden quedar escapados.
      private_key: String(json.private_key).replace(/\\n/g, "\n"),
    };
  } catch {
    return null;
  }
}

export function calendarConfigured(): boolean {
  return Boolean(getServiceAccount() && process.env.GOOGLE_CALENDAR_ID);
}

function b64url(input: string | Buffer): string {
  return Buffer.from(input).toString("base64url");
}

async function getAccessToken(): Promise<string> {
  const sa = getServiceAccount();
  if (!sa) throw new Error("Service account no configurada");

  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = b64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: "https://www.googleapis.com/auth/calendar",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const unsigned = `${header}.${payload}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsigned);
  const signature = signer.sign(sa.private_key).toString("base64url");

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=${encodeURIComponent(
      "urn:ietf:params:oauth:grant-type:jwt-bearer",
    )}&assertion=${unsigned}.${signature}`,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Error de token Google: ${data.error_description || data.error}`);
  }
  return data.access_token;
}

// Devuelve los rangos ocupados del calendario entre dos instantes.
export async function getBusyRanges(
  timeMin: string,
  timeMax: string,
): Promise<{ start: string; end: string }[]> {
  const token = await getAccessToken();
  const calendarId = process.env.GOOGLE_CALENDAR_ID!;
  const res = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ timeMin, timeMax, items: [{ id: calendarId }] }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Error freeBusy: ${JSON.stringify(data.error)}`);
  return data.calendars?.[calendarId]?.busy ?? [];
}

// Crea el evento del turno en el calendario del taller.
export async function createCalendarEvent(opts: {
  summary: string;
  description: string;
  startISO: string;
  endISO: string;
}): Promise<void> {
  const token = await getAccessToken();
  const calendarId = process.env.GOOGLE_CALENDAR_ID!;
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary: opts.summary,
        description: opts.description,
        start: { dateTime: opts.startISO, timeZone: "America/Montevideo" },
        end: { dateTime: opts.endISO, timeZone: "America/Montevideo" },
        colorId: "11", // rojo (tomate): turno ocupado
      }),
    },
  );
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(`Error al crear evento: ${JSON.stringify(data.error)}`);
  }
}
