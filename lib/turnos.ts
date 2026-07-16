// Definición compartida del sistema de turnos.
// Horarios fijos de lunes a viernes, cada 15 minutos (bloques de 10 minutos).

export const SLOTS = ["09:00", "09:15", "09:30", "09:45", "10:00"] as const;
export type Slot = (typeof SLOTS)[number];

export const TZ_OFFSET = "-03:00"; // America/Montevideo (sin horario de verano)
export const MAX_DIAS_ADELANTE = 60;

// "Hoy" en la zona horaria de Uruguay, formato YYYY-MM-DD.
export function hoyMontevideo(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Montevideo",
  }).format(new Date());
}

export function esFechaValida(fecha: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return false;
  const d = new Date(`${fecha}T12:00:00${TZ_OFFSET}`);
  if (Number.isNaN(d.getTime())) return false;
  const dow = d.getUTCDay(); // con T12:00-03:00, el día UTC coincide con el local
  if (dow === 0 || dow === 6) return false; // domingos y sábados bloqueados
  const hoy = hoyMontevideo();
  if (fecha < hoy) return false; // fechas pasadas bloqueadas
  const limite = new Date(`${hoy}T12:00:00${TZ_OFFSET}`);
  limite.setUTCDate(limite.getUTCDate() + MAX_DIAS_ADELANTE);
  return d.getTime() <= limite.getTime();
}

export function slotToRange(fecha: string, hora: Slot) {
  const startISO = `${fecha}T${hora}:00${TZ_OFFSET}`;
  const end = new Date(new Date(startISO).getTime() + 10 * 60 * 1000);
  return { startISO, endISO: end.toISOString() };
}

// Muestra "9:00" en vez de "09:00".
export function horaDisplay(hora: Slot): string {
  return hora.replace(/^0/, "");
}

// Próximos N días hábiles a partir de hoy (Montevideo).
export function proximosDiasHabiles(n: number): string[] {
  const dias: string[] = [];
  const cursor = new Date(`${hoyMontevideo()}T12:00:00${TZ_OFFSET}`);
  while (dias.length < n) {
    const dow = cursor.getUTCDay();
    if (dow !== 0 && dow !== 6) {
      dias.push(cursor.toISOString().slice(0, 10));
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return dias;
}

export function fechaDisplay(fecha: string): string {
  const d = new Date(`${fecha}T12:00:00${TZ_OFFSET}`);
  return new Intl.DateTimeFormat("es-UY", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "America/Montevideo",
  }).format(d);
}
