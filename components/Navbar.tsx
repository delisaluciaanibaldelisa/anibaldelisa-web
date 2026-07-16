"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { nav, site } from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú mobile al cambiar de ruta.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      {/* Franja superior: trayectoria */}
      <div className="bg-primary text-white text-center text-xs md:text-sm font-semibold py-1.5 px-4">
        Más de {site.yearsExperience} años de trayectoria en Uruguay
      </div>

      {/* Barra principal azul marino */}
      <nav
        className={`bg-accent text-white transition-shadow ${
          scrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="container-x flex items-center justify-between h-16 md:h-20">
          {/* Logo: rey + nombre en blanco */}
          <Link href="/" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Aníbal Delisa"
              className="h-12 w-auto md:h-14 drop-shadow"
            />
            <span className="font-logo text-xl md:text-2xl text-white tracking-wide">
              Aníbal Delisa
            </span>
          </Link>

          {/* Links desktop */}
          <ul className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                    "highlight" in item && item.highlight
                      ? isActive(item.href)
                        ? "bg-primary text-white"
                        : "text-white bg-primary/80 hover:bg-primary"
                      : isActive(item.href)
                        ? "text-white bg-white/15"
                        : "text-gray-200 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA desktop */}
          <a
            href={site.locations.mecanica.telHref}
            className="hidden md:inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2.5 rounded-md transition-colors"
          >
            <Phone size={16} />
            Llamanos
          </a>

          {/* Botón mobile */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 text-white"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Menú mobile */}
        {open && (
          <div className="md:hidden border-t border-white/10 bg-accent">
            <ul className="container-x py-3 flex flex-col gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-3 py-3 rounded-md font-semibold ${
                      "highlight" in item && item.highlight
                        ? "text-white bg-primary"
                        : isActive(item.href)
                          ? "text-white bg-white/15"
                          : "text-gray-200"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={site.locations.mecanica.telHref}
                  className="flex items-center justify-center gap-2 bg-primary text-white font-semibold px-4 py-3 rounded-md"
                >
                  <Phone size={18} />
                  Llamanos: {site.locations.mecanica.phones[0]}
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
