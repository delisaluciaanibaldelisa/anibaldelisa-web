"use client";

import { Phone, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import { openChat } from "@/lib/chat";

// Botón que abre la burbuja de chat in-site (el multiagente de IA).
// El cliente no ve ninguna referencia al canal de backend.
export function ChatButton({
  label = "Escribinos",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={openChat}
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-[#229ED9] hover:bg-[#1c8ac2] text-white font-semibold px-6 py-3 transition-colors ${className}`}
    >
      <MessageCircle size={20} />
      {label}
    </button>
  );
}

export function CallButton({
  label = "Llamanos",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={site.locations.mecanica.telHref}
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 transition-colors ${className}`}
    >
      <Phone size={18} />
      {label}
    </a>
  );
}
