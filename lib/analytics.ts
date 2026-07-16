"use client";

import { sendGAEvent } from "@next/third-parties/google";

// Eventos de conversión para GA4 (y a futuro Meta Pixel).
// Nombres estables: no cambiarlos sin actualizar los informes/campañas.
export function trackEvent(
  name:
    | "whatsapp_click"
    | "call_click"
    | "chat_open"
    | "form_submit"
    | "review_click"
    | "turno_agendado",
  params?: Record<string, string>,
) {
  try {
    sendGAEvent("event", name, params ?? {});
  } catch {
    // Analytics nunca debe romper la experiencia del usuario.
  }
}
