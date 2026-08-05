// El chat in-site (el rey) fue retirado: el agente de IA atiende ahora por
// ManyChat (Instagram/Messenger) y WhatsApp. Los botones "Escribinos"/"Chat"
// de la web derivan directo al WhatsApp general del taller.
import { site } from "./site";

export const OPEN_CHAT_EVENT = "anibal:open-chat";

export function openChat() {
  if (typeof window !== "undefined") {
    window.open(site.whatsapp.general, "_blank", "noopener,noreferrer");
  }
}
