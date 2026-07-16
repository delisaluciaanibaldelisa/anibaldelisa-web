"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, ChevronDown, Plus, CalendarCheck } from "lucide-react";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios", mega: true },
  { href: "/seguridad-vial", label: "Seguridad Vial", gold: true },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

const megaItems = [
  {
    emoji: "⭐",
    title: "Servicio Oficial",
    sub: "Peugeot · Citroën · BYD · Opel",
    href: "/servicios/mecanica",
  },
  {
    emoji: "🔧",
    title: "Mecánica Multimarca",
    sub: "Todas las marcas",
    href: "/servicios/mecanica",
  },
  {
    emoji: "🎨",
    title: "Chapa y Pintura",
    sub: "Acabado de fábrica",
    href: "/servicios/chapa-pintura",
  },
  {
    emoji: "🔍",
    title: "Revisión Pre-Compra",
    sub: "Comprá seguro",
    href: "/servicios/revision-precompra",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicios, setMobileServicios] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra menús al cambiar de ruta.
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
    setMobileServicios(false);
  }, [pathname]);

  // Bloquea el scroll del body con el overlay mobile abierto.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      <nav
        className={`relative bg-navy text-white border-b border-gold/12 transition-all duration-300 ${
          scrolled ? "shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur" : ""
        }`}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div
          className={`container-x flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-14 md:h-16" : "h-16 md:h-20"
          }`}
        >
          {/* IZQUIERDA — Logo + tagline */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Aníbal Delisa"
              className={`w-auto drop-shadow transition-all duration-300 ${
                scrolled ? "h-10 md:h-11" : "h-12 md:h-14"
              }`}
            />
            <span className="flex flex-col leading-tight">
              <span className="font-logo text-lg md:text-xl text-white tracking-wide">
                Aníbal Delisa
              </span>
              <span className="text-gold text-[9px] tracking-[2px] font-semibold">
                MÁS DE 53 AÑOS EN URUGUAY
              </span>
            </span>
          </Link>

          {/* CENTRO — Links desktop */}
          <ul className="hidden lg:flex items-center gap-1">
            {links.map((item) => (
              <li key={item.label} className="relative">
                {item.mega ? (
                  <button
                    type="button"
                    onMouseEnter={() => setMegaOpen(true)}
                    onClick={() => setMegaOpen((v) => !v)}
                    className={`inline-flex items-center gap-1 px-3 py-2 text-[13px] font-semibold transition-colors ${
                      isActive(item.href)
                        ? "text-white border-b-2 border-gold"
                        : "text-white/70 hover:text-white"
                    }`}
                    aria-expanded={megaOpen}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${megaOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onMouseEnter={() => setMegaOpen(false)}
                    className={`px-3 py-2 text-[13px] font-semibold transition-colors ${
                      item.gold
                        ? "text-gold hover:text-gold-dark"
                        : isActive(item.href)
                          ? "text-white border-b-2 border-gold"
                          : "text-white/70 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* DERECHA — CTAs desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/turnos"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-charcoal text-[13px] font-bold px-4 py-2.5 rounded-md transition-all hover:scale-[1.02]"
            >
              <CalendarCheck size={15} />
              Agendá tu turno
            </Link>
            <a
              href={site.locations.mecanica.telHref}
              className="inline-flex items-center gap-2 border border-white/35 hover:bg-white/8 text-white text-[13px] font-semibold px-4 py-2.5 rounded-md transition-colors"
            >
              <Phone size={15} />
              Llamanos
            </a>
          </div>

          {/* Hamburger mobile */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden relative w-10 h-10 grid place-items-center"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              className="absolute w-6 h-0.5 bg-gold rounded"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              className="absolute w-6 h-0.5 bg-gold rounded"
            />
          </button>
        </div>

        {/* MEGA MENÚ Servicios (desktop) */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 z-[100] hidden lg:block bg-white border-t-[3px] border-primary shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
            >
              <div className="container-x grid grid-cols-5 gap-4 py-6">
                {megaItems.map((m) => (
                  <Link
                    key={m.title}
                    href={m.href}
                    className="rounded-lg p-4 border-l-[3px] border-transparent hover:border-primary hover:bg-[#F8F8F8] transition-all"
                  >
                    <span className="text-2xl">{m.emoji}</span>
                    <p className="mt-2 font-heading font-bold text-sm text-charcoal">
                      {m.title}
                    </p>
                    <p className="mt-0.5 text-xs text-[#888]">{m.sub}</p>
                  </Link>
                ))}
                {/* Columna CTA */}
                <div className="rounded-lg bg-navy text-white p-4 flex flex-col justify-between">
                  <div>
                    <p className="font-heading font-bold text-sm">
                      ¿Necesitás turno?
                    </p>
                    <p className="mt-0.5 text-xs text-white/60">Agendá online</p>
                  </div>
                  <Link
                    href="/turnos"
                    className="mt-3 inline-flex items-center justify-center bg-gold hover:bg-gold-dark text-charcoal text-xs font-bold px-3 py-2 rounded-md transition-colors"
                  >
                    Agendá tu turno
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* OVERLAY MOBILE fullscreen */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-0 top-14 z-[200] bg-[rgba(10,22,40,0.97)] overflow-y-auto"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05 } },
              }}
              className="container-x pt-8 pb-32 flex flex-col"
            >
              {links.map((item) => (
                <motion.li
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, x: 24 },
                    show: { opacity: 1, x: 0 },
                  }}
                  className="border-b border-white/10"
                >
                  {item.mega ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setMobileServicios((v) => !v)}
                        className="w-full flex items-center justify-between py-4 text-[22px] font-bold text-white"
                        aria-expanded={mobileServicios}
                      >
                        {item.label}
                        <Plus
                          size={22}
                          className={`transition-transform ${
                            mobileServicios ? "rotate-45" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileServicios && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4"
                          >
                            {megaItems.map((m) => (
                              <li key={m.title}>
                                <Link
                                  href={m.href}
                                  className="block py-2.5 text-base text-white/80"
                                >
                                  {m.emoji} {m.title}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block py-4 text-[22px] font-bold ${
                        item.gold ? "text-gold" : "text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.li>
              ))}

              {/* CTAs finales */}
              <motion.li
                variants={{
                  hidden: { opacity: 0, x: 24 },
                  show: { opacity: 1, x: 0 },
                }}
                className="pt-8 flex flex-col gap-3"
              >
                <Link
                  href="/turnos"
                  className="flex items-center justify-center gap-2 bg-gold text-charcoal font-bold px-4 py-4 rounded-md"
                >
                  <CalendarCheck size={18} />
                  Agendá tu turno
                </Link>
                <a
                  href={site.locations.mecanica.telHref}
                  className="flex items-center justify-center gap-2 border border-white text-white font-semibold px-4 py-4 rounded-md"
                >
                  <Phone size={18} />
                  2408 4755
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
