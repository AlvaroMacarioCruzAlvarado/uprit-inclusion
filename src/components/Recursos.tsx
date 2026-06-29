"use client";

import {
  FileText,
  Video,
  BookMarked,
  Podcast,
  Download,
  ExternalLink,
} from "lucide-react";

const recursos = [
  {
    icon: FileText,
    type: "Guía Didáctica",
    title: "Manual de Educación Inclusiva",
    description:
      "Herramientas pedagógicas prácticas y adaptaciones de currículo para el aula.",
    action: "Descargar PDF",
    actionIcon: Download,
    accent: "teal",
  },
  {
    icon: Video,
    type: "Material Audiovisual",
    title: "Diversidad Cultural en el Siglo XXI",
    description:
      "Clases grabadas y debates sobre multiculturalidad en la educación superior.",
    action: "Ver Transmisión",
    actionIcon: ExternalLink,
    accent: "violet",
  },
  {
    icon: BookMarked,
    type: "Artículo Científico",
    title: "Marco Normativo de Inclusión",
    description:
      "Compilación detallada de leyes, decretos y tratados internacionales vigentes.",
    action: "Leer Artículo",
    actionIcon: Download,
    accent: "coral",
  },
  {
    icon: Podcast,
    type: "Canal Digital",
    title: "Voces de la Inclusión",
    description:
      "Entrevistas y debates mensuales con activistas y especialistas del sector social.",
    action: "Escuchar Podcast",
    actionIcon: ExternalLink,
    accent: "teal",
  },
];

const colorStyles = {
  teal: {
    border: "border-brand-teal/15",
    text: "text-brand-teal",
    bg: "bg-brand-teal/5 hover:bg-brand-teal/10",
  },
  violet: {
    border: "border-brand-violet/15",
    text: "text-brand-violet",
    bg: "bg-brand-violet/5 hover:bg-brand-violet/10",
  },
  coral: {
    border: "border-brand-coral/15",
    text: "text-brand-coral",
    bg: "bg-brand-coral/5 hover:bg-brand-coral/10",
  },
};

export default function Recursos() {
  return (
    <div className="flex flex-col justify-between h-full pt-14 pb-4">
      {/* Slide Header */}
      <div className="reveal-item reveal-delay-1 flex items-center justify-between border-b border-white/5 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <BookMarked className="h-5 w-5 text-brand-teal" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-teal">
            Biblioteca de Recursos
          </span>
        </div>
        <div className="text-[10px] font-semibold text-text-muted">
          SECCIÓN 04 • MATERIALES Y APRENDIZAJE
        </div>
      </div>

      {/* Title */}
      <div className="reveal-item reveal-delay-2 mb-3.5">
        <h2 className="text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight text-white">
          Recursos para la{" "}
          <span className="bg-gradient-to-r from-brand-teal via-brand-violet to-brand-coral bg-clip-text text-transparent">
            Formación Inclusiva
          </span>
        </h2>
      </div>

      {/* Grid: 2x2 container */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4.5 resources-scroll overflow-y-auto pr-1">
        {recursos.map((rec, i) => {
          const style = colorStyles[rec.accent as keyof typeof colorStyles];
          const Icon = rec.icon;
          const ActionIcon = rec.actionIcon;

          return (
            <article
              key={i}
              className={`reveal-item group flex flex-col justify-between rounded-xl border ${style.border} p-5 bg-white/[0.01] transition-all hover:bg-white/[0.03]`}
              style={{ transitionDelay: `${i * 100 + 100}ms` }}
              tabIndex={0}
            >
              <div>
                {/* Upper line: Category and Icon */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-text-muted">
                    {rec.type}
                  </span>
                  <div className={`p-2 rounded-lg bg-white/[0.02] border border-white/5`}>
                    <Icon className={`h-4.5 w-4.5 ${style.text}`} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-sm font-bold text-white tracking-tight group-hover:text-brand-teal transition-colors">
                  {rec.title}
                </h3>
                <p className="text-xs text-text-secondary mt-1.5 leading-normal">
                  {rec.description}
                </p>
              </div>

              {/* Bottom Interactive Link */}
              <div
                className={`mt-4 inline-flex items-center gap-1.5 text-xs font-semibold w-fit px-3 py-1.5 rounded-lg border border-white/5 ${style.bg} transition-colors cursor-pointer`}
              >
                <span>{rec.action}</span>
                <ActionIcon className="h-3.5 w-3.5" />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
