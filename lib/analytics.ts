"use client";

import { sendGAEvent } from "@next/third-parties/google";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

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

// Conversión de Google Ads (cuenta Aníbal Delisa, AW-17722010991).
// sendTo = "AW-17722010991/<label>" de la acción de conversión configurada en Ads.
export function trackAdsConversion(sendTo: string, value?: number) {
  try {
    window.gtag?.("event", "conversion", {
      send_to: sendTo,
      ...(value !== undefined ? { value, currency: "USD" } : {}),
    });
  } catch {
    // Analytics nunca debe romper la experiencia del usuario.
  }
}

// Etiquetas de conversión ya creadas en la cuenta de Google Ads.
export const ADS_CONVERSIONS = {
  llamada: "AW-17722010991/dgjkCOrP5b0cEO_awYJC",
  whatsapp: "AW-17722010991/dJslCK-sxtAcEO_awYJC",
} as const;
