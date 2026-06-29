"use client";

import {
  GraduationCap,
  Accessibility,
  Globe2,
  Scale,
  HeartHandshake,
  Palette,
  ArrowUpRight,
} from "lucide-react";

const pilares = [
  {
    icon: GraduationCap,
    title: "Inclusión Educativa",
    description:
      "Acceso universal a educación de calidad con metodologías adaptadas a cada necesidad del alumnado.",
    color: "teal",
    tag: "Educación",
  },
  {
    icon: Accessibility,
    title: "Accesibilidad Universal",
    description:
      "Diseño de entornos físicos, informáticos e institucionales libres de barreras limitantes.",
    color: "violet",
    tag: "Entorno",
  },
  {
    icon: Globe2,
    title: "Diversidad Cultural",
    description:
      "Valoración activa de identidades y lenguas como motor del aprendizaje colectivo universitario.",
    color: "coral",
    tag: "Cultura",
  },
  {
    icon: Scale,
    title: "Equidad Social",
    description:
      "Programas destinados a reducir brechas socioeconómicas y garantizar igualdad de oportunidades.",
    color: "teal",
    tag: "Justicia",
  },
  {
    icon: HeartHandshake,
    title: "Convivencia y Respeto",
    description:
      "Resolución de conflictos y fomento del diálogo intercultural en espacios compartidos.",
    color: "violet",
    tag: "Comunidad",
  },
  {
    icon: Palette,
    title: "Expresión y Participación",
    description:
      "Canales democráticos de libre expresión donde todas las voces cuentan para la toma de decisiones.",
    color: "coral",
    tag: "Voces",
  },
];

const colorStyles = {
  teal: {
    bg: "bg-brand-teal/5 border-brand-teal/10 hover:border-brand-teal/30 hover:bg-brand-teal/[0.08]",
    icon: "text-brand-teal",
    badge: "bg-brand-teal/10 text-brand-teal",
  },
  violet: {
    bg: "bg-brand-violet/5 border-brand-violet/10 hover:border-brand-violet/30 hover:bg-brand-violet/[0.08]",
    icon: "text-brand-violet",
    badge: "bg-brand-violet/10 text-brand-violet",
  },
  coral: {
    bg: "bg-brand-coral/5 border-brand-coral/10 hover:border-brand-coral/30 hover:bg-brand-coral/[0.08]",
    icon: "text-brand-coral",
    badge: "bg-brand-coral/10 text-brand-coral",
  },
};

export default function Pilares() {
  return (
    <div className="flex flex-col justify-between h-full pt-14 pb-4">
      {/* Slide Header */}
      <div className="reveal-item reveal-delay-1 flex items-center justify-between border-b border-white/5 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-brand-violet" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-teal">
            Líneas de Acción
          </span>
        </div>
        <div className="text-[10px] font-semibold text-text-muted">
          SECCIÓN 03 • PILARES FUNDAMENTALES
        </div>
      </div>

      {/* Intro Subtitle */}
      <div className="reveal-item reveal-delay-2 mb-3.5">
        <h2 className="text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight text-white">
          Pilares de la{" "}
          <span className="bg-gradient-to-r from-brand-teal via-brand-violet to-brand-coral bg-clip-text text-transparent">
            Inclusión Social
          </span>
        </h2>
      </div>

      {/* Grid containing 6 columns - auto resizing */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {pilares.map((pilar, index) => {
          const style = colorStyles[pilar.color as keyof typeof colorStyles];
          const Icon = pilar.icon;

          return (
            <article
              key={index}
              className={`reveal-item group flex flex-col justify-between rounded-xl border p-4.5 transition-all duration-300 hover:-translate-y-0.5 ${style.bg}`}
              style={{ transitionDelay: `${index * 80 + 100}ms` }}
              tabIndex={0}
              aria-label={`Pilar de acción: ${pilar.title}`}
            >
              <div>
                {/* Upper line: Icon and Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg bg-white/[0.02] border border-white/5`}>
                    <Icon className={`h-5 w-5 ${style.icon}`} />
                  </div>
                  <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${style.badge}`}>
                    {pilar.tag}
                  </span>
                </div>

                {/* Text Content */}
                <h3 className="text-sm font-bold text-white tracking-tight">
                  {pilar.title}
                </h3>
                <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                  {pilar.description}
                </p>
              </div>

              {/* Bottom tag link */}
              <div className="flex items-center gap-1 text-[10px] font-semibold text-text-muted mt-3 group-hover:text-white transition-colors duration-200">
                <span>Ver detalles</span>
                <ArrowUpRight className="h-3 w-3" />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
