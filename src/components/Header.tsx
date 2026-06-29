"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Heart,
  Sparkles,
} from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Pilares", href: "#pilares" },
  { label: "Recursos", href: "#recursos" },
  { label: "Sobre Nosotros", href: "#sobre-nosotros" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="header"
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass border-b border-surface-200/50 shadow-lg shadow-primary-950/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between lg:h-20">
          {/* Logo */}
          <a
            href="#inicio"
            className="group flex items-center gap-3 transition-all duration-300"
            aria-label="Ir al inicio"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 shadow-lg shadow-primary-600/30 transition-transform duration-300 group-hover:scale-105">
              <Heart className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-surface-900 lg:text-lg">
                Diversidad
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-600">
                & Inclusión Social
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            role="navigation"
            aria-label="Navegación principal"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative rounded-lg px-4 py-2 text-sm font-medium text-surface-600 transition-all duration-300 hover:bg-primary-50 hover:text-primary-700"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contacto"
              className="group hidden items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition-all duration-300 hover:from-primary-500 hover:to-primary-600 hover:shadow-xl hover:shadow-primary-600/40 sm:flex"
            >
              <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
              Ver Iniciativas
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-surface-700 transition-all duration-300 hover:bg-surface-100 lg:hidden"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Menú móvil"
          className={`overflow-hidden transition-all duration-500 ease-in-out lg:hidden ${
            mobileMenuOpen ? "max-h-96 pb-6" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col gap-1 rounded-2xl bg-white/80 p-4 shadow-lg backdrop-blur-lg">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-surface-700 transition-all duration-300 hover:bg-primary-50 hover:text-primary-700"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/30"
            >
              <Sparkles className="h-4 w-4" />
              Ver Iniciativas
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
