"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "INICIO", href: "/" },
  { label: "CASO VALERIA", href: "/caso-valeria" },
  { label: "CASO JUAN", href: "/caso-juan" },
  { label: "SESIÓN 5", href: "/sesion-5" },
  { label: "SESIÓN 6", href: "/sesion-6" },
  { label: "SESIÓN 7", href: "/sesion-7" },
  { label: "BAP — VALERIA", href: "/bap-valeria" },
  { label: "BAP — JUAN", href: "/bap-juan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] h-16 bg-[#1E2A5E]/90 backdrop-blur-[8px] border-bottom border-white/10 px-8 flex items-center justify-between">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Brand Logo & Texts */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-95"
          aria-label="Ir al inicio"
        >
          {/* Square Rounded Logo Container */}
          
          <div className="flex flex-col justify-center">
            <span className="text-sm font-bold text-white leading-none">
              UPRIT — Grupo 5
            </span>
            <span className="text-[11px] font-medium text-[#2D9B6F] mt-0.5 leading-none">
              Atención a la Diversidad e Inclusión Social
            </span>
          </div>
        </Link>

        {/* Center Side: Desktop Navigation Links */}
        <nav
          role="navigation"
          aria-label="Navegación principal"
          className="hidden lg:flex items-end h-16"
        >
          <div className="flex items-center gap-1 h-full pt-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] px-3.5 py-2 rounded-t-md transition-all duration-200 uppercase tracking-wider ${
                    isActive
                      ? "text-white font-semibold border-b-2 border-[#2D9B6F] bg-white/8"
                      : "text-white/60 hover:text-white/90"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-white/10 text-white transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#1E2A5E] border-t border-white/10 shadow-xl lg:hidden animate-fade-in-up">
          <nav
            role="navigation"
            aria-label="Navegación móvil"
            className="flex flex-col p-4 gap-1"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-lg px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-white/10 text-[#2D9B6F]"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
