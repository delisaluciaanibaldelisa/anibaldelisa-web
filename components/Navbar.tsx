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
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <nav className="container-x flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link
          href="/"
          className="font-heading font-extrabold text-xl md:text-2xl text-primary tracking-tight"
        >
          Aníbal Delisa
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
                      : "text-primary hover:bg-primary/10"
                    : isActive(item.href)
                      ? "text-primary"
                      : "text-dark hover:text-primary"
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
          className="md:hidden p-2 text-dark"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Menú mobile */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <ul className="container-x py-3 flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-3 py-3 rounded-md font-semibold ${
                    "highlight" in item && item.highlight
                      ? "text-primary bg-primary/10"
                      : isActive(item.href)
                        ? "text-primary"
                        : "text-dark"
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
    </header>
  );
}
