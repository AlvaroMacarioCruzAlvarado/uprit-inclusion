"use client";

import Link from "next/link";

const footerLinks = [
  { label: "Inicio", href: "/" },
  { label: "Caso Valeria", href: "/caso-valeria" },
  { label: "Caso Juan", href: "/caso-juan" },
  { label: "BAP — Valeria", href: "/bap-valeria" },
  { label: "BAP — Juan", href: "/bap-juan" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1E2A5E] text-white py-10 mt-auto border-t border-white/10">
      <div className="mx-auto max-w-7xl px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-sm font-bold tracking-tight">
            Universidad Privada de Trujillo
          </span>
          <span className="text-xs text-white/60 mt-1">
            Grupo 5 · Diversidad e Inclusión Social
          </span>
        </div>

        {/* Right Section: Links */}
        <nav
          role="navigation"
          aria-label="Enlaces secundarios"
          className="flex flex-wrap justify-center gap-6"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-white/55 hover:text-white/90 transition-colors uppercase tracking-wider font-semibold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

      </div>
    </footer>
  );
}
