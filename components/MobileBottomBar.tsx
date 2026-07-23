"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarCheck, Phone, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import { openChat } from "@/lib/chat";
import { trackEvent, trackAdsConversion, ADS_CONVERSIONS } from "@/lib/analytics";

// Barra de navegación inferior fija, solo en mobile (estilo app).
// 4 accesos: Inicio · Turnos · Chat · Llamar.
export default function MobileBottomBar() {
  const pathname = usePathname();
  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const itemClass = (isActive: boolean) =>
    `flex flex-col items-center justify-center gap-0.5 flex-1 py-2 text-[11px] font-semibold transition-colors ${
      isActive ? "text-gold" : "text-white/70"
    }`;

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-navy border-t border-gold/15 pb-[env(safe-area-inset-bottom)]"
      aria-label="Navegación rápida"
    >
      <div className="flex items-stretch">
        <Link href="/" className={itemClass(active("/"))}>
          <Home size={22} />
          Inicio
        </Link>

        <Link
          href="/turnos"
          className={itemClass(active("/turnos"))}
          onClick={() => trackEvent("turno_agendado", { source: "barra_mobile" })}
        >
          <CalendarCheck size={22} />
          Turnos
        </Link>

        <button
          type="button"
          onClick={() => {
            trackEvent("chat_open", { source: "barra_mobile" });
            openChat();
          }}
          className={itemClass(false)}
        >
          <MessageCircle size={22} />
          Chat
        </button>

        <a
          href={site.locations.mecanica.telHref}
          onClick={() => {
            trackEvent("call_click", { source: "barra_mobile" });
            trackAdsConversion(ADS_CONVERSIONS.llamada, 1.0);
          }}
          className={itemClass(false)}
        >
          <Phone size={22} />
          Llamar
        </a>
      </div>
    </nav>
  );
}
