import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  SLOTS,
  type Slot,
  esFechaValida,
  slotToRange,
  horaDisplay,
  fechaDisplay,
} from "@/lib/turnos";
import {
  calendarConfigured,
  getBusyRanges,
  createCalendarEvent,
} from "@/lib/gcal";
import {
  sendEmail,
  emailConfirmacionCliente,
  emailAvisoTaller,
} from "@/lib/email";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

// Calcula qué horarios de un día están ocupados según el calendario.
async function slotsOcupados(fecha: string): Promise<Set<Slot>> {
  const ocupados = new Set<Slot>();
  if (!calendarConfigured()) return ocupados;

  const primero = slotToRange(fecha, SLOTS[0]);
  const ultimo = slotToRange(fecha, SLOTS[SLOTS.length - 1]);
  const busy = await getBusyRanges(primero.startISO, ultimo.endISO);

  for (const hora of SLOTS) {
    const { startISO, endISO } = slotToRange(fecha, hora);
    const s = new Date(startISO).getTime();
    const e = new Date(endISO).getTime();
    const pisado = busy.some(
      (b) => new Date(b.start).getTime() < e && new Date(b.end).getTime() > s,
    );
    if (pisado) ocupados.add(hora);
  }
  return ocupados;
}

// GET /api/turnos?fecha=YYYY-MM-DD → disponibilidad del día
export async function GET(req: NextRequest) {
  const fecha = req.nextUrl.searchParams.get("fecha") ?? "";
  if (!esFechaValida(fecha)) {
    return NextResponse.json({ error: "Fecha no disponible" }, { status: 400 });
  }
  try {
    const ocupados = await slotsOcupados(fecha);
    return NextResponse.json({
      fecha,
      slots: SLOTS.map((hora) => ({ hora, libre: !ocupados.has(hora) })),
    });
  } catch {
    // Si el calendario falla, no bloqueamos la agenda: mostramos todo libre
    // y el taller recibe el email de aviso igualmente.
    return NextResponse.json({
      fecha,
      slots: SLOTS.map((hora) => ({ hora, libre: true })),
    });
  }
}

const reservaSchema = z.object({
  fecha: z.string(),
  hora: z.enum(SLOTS),
  nombre: z.string().min(2).max(80),
  celular: z
    .string()
    .min(8)
    .max(20)
    .regex(/^[\d\s+\-()]+$/, "Celular inválido"),
  email: z.string().email(),
  marca: z.string().min(2).max(40),
  trabajo: z.string().min(3).max(300),
});

// POST /api/turnos → crea la reserva
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const parsed = reservaSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Revisá los datos del formulario" },
      { status: 400 },
    );
  }
  const datos = parsed.data;

  if (!esFechaValida(datos.fecha)) {
    return NextResponse.json(
      { error: "La fecha elegida no está disponible" },
      { status: 400 },
    );
  }

  const sync = calendarConfigured();

  // Re-verificación en el servidor: evita que dos clientes tomen el mismo turno.
  if (sync) {
    try {
      const ocupados = await slotsOcupados(datos.fecha);
      if (ocupados.has(datos.hora)) {
        return NextResponse.json(
          {
            error:
              "Ese horario se acaba de ocupar. Por favor elegí otro horario.",
            code: "ocupado",
          },
          { status: 409 },
        );
      }
      const { startISO, endISO } = slotToRange(datos.fecha, datos.hora);
      await createCalendarEvent({
        summary: `Turno: ${datos.nombre} — ${datos.marca} — ${datos.trabajo}`,
        description: `Nombre: ${datos.nombre}\nCelular: ${datos.celular}\nEmail: ${datos.email}\nMarca: ${datos.marca}\nTrabajo: ${datos.trabajo}\n\nReservado desde la web.`,
        startISO,
        endISO,
      });
    } catch {
      return NextResponse.json(
        {
          error:
            "No pudimos confirmar la agenda en este momento. Llamanos al 2408 4755 y te lo reservamos.",
        },
        { status: 502 },
      );
    }
  }

  const fechaLinda = fechaDisplay(datos.fecha);
  const horaLinda = horaDisplay(datos.hora);

  // Emails de confirmación (nunca bloquean la reserva).
  await Promise.all([
    sendEmail({
      to: datos.email,
      subject: `Turno confirmado — ${fechaLinda} ${horaLinda} — Aníbal Delisa`,
      html: emailConfirmacionCliente({
        nombre: datos.nombre,
        fecha: fechaLinda,
        hora: horaLinda,
        trabajo: datos.trabajo,
      }),
    }),
    sendEmail({
      to: site.locations.mecanica.email,
      subject: `🔔 Nuevo turno web: ${datos.nombre} — ${fechaLinda} ${horaLinda}`,
      html: emailAvisoTaller({ ...datos, fecha: fechaLinda, hora: horaLinda, calendarSync: sync }),
    }),
  ]);

  return NextResponse.json({ ok: true, calendarSync: sync });
}
