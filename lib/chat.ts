// Canal simple para abrir la burbuja de chat desde cualquier botón de la web.
// Los botones disparan este evento y FloatingChat lo escucha.

export const OPEN_CHAT_EVENT = "anibal:open-chat";

export function openChat() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT));
  }
}
