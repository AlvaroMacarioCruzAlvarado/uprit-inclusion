"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Landmark } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Inclusión", href: "/inclusion" },
  { label: "Caso Sofía", href: "/caso-sofia" },
  { label: "Caso Juan", href: "/caso-juan" },
  { label: "BAP", href: "/bap" },
  { label: "Normativa", href: "/normativa" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  return (
    <header role="banner" className="sticky top-0 z-50 glass-header">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo Brand with Image Placeholder */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-90"
            aria-label="Ir al inicio"
          >
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 shadow-inner overflow-hidden">
              {!logoError ? (
                <img
                  src="/images/logoUPRIT.png"
                  alt="Logo UPRIT"
                  onError={() => setLogoError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-brand-indigo/10 text-brand-teal">
                  <Landmark className="h-5.5 w-5.5" />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-white leading-none">
                UPRIT — Grupo 3
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-teal mt-1">
                Diversidad e Inclusión Social
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            role="navigation"
            aria-label="Navegación principal"
            className="hidden lg:flex items-center gap-2"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-xl px-4 py-2.5 text-[12px] font-extrabold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-brand-indigo text-white shadow-md shadow-brand-indigo/25"
                      : "text-text-secondary hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-white/5 text-white transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <nav
            role="navigation"
            aria-label="Navegación móvil"
            className="lg:hidden border-t border-white/5 pb-5 pt-3 animate-fade-in-up"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-xl px-4 py-3.5 text-xs font-extrabold uppercase tracking-wider transition-all ${
                      isActive
                        ? "bg-brand-indigo text-white"
                        : "text-text-secondary hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}

      </div>
    </header>
  );
}
