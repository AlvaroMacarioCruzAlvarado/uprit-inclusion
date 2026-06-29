"use client";

import { Target, CheckCircle2, ShieldCheck, TrendingUp, Users2, Award } from "lucide-react";

const metrics = [
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Accesibilidad",
    detail: "Normas WCAG 2.1 AA",
    color: "text-brand-teal",
  },
  {
    icon: TrendingUp,
    value: "+50",
    label: "Programas",
    detail: "De formación activa",
    color: "text-brand-violet",
  },
  {
    icon: Users2,
    value: "10K+",
    label: "Comunidad",
    detail: "Alumnos y docentes",
    color: "text-brand-coral",
  },
  {
    icon: Award,
    value: "15",
    label: "Premios",
    detail: "Iniciativa de Impacto",
    color: "text-brand-teal",
  },
];

const objectives = [
  "Promover igualdad de oportunidades en acceso a recursos de aprendizaje.",
  "Establecer programas de adaptabilidad curricular permanente.",
  "Desarrollar soluciones de accesibilidad universal física e informática.",
  "Construir lazos sólidos con la comunidad universitaria e institucional.",
];

export default function SobreNosotros() {
  return (
    <div className="flex flex-col justify-between h-full pt-14 pb-4">
      {/* Header section of slide */}
      <div className="reveal-item reveal-delay-1 flex items-center justify-between border-b border-white/5 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-brand-teal" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-teal">
            Sobre el Proyecto
          </span>
        </div>
        <div className="text-[10px] font-semibold text-text-muted">
          SECCIÓN 02 • VISIÓN GENERAL
        </div>
      </div>

      {/* Main Content: Asymmetric Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left column (Vision & Objectives) - 7 cols */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="reveal-item reveal-delay-2 text-[clamp(1.5rem,3.2vw,2.5rem)] font-extrabold leading-tight text-white">
            Compromiso real con la{" "}
            <span className="bg-gradient-to-r from-brand-teal via-brand-violet to-brand-coral bg-clip-text text-transparent">
              transformación social
            </span>
          </h2>
          
          <p className="reveal-item reveal-delay-2 text-[clamp(0.85rem,1.1vw,1.05rem)] leading-relaxed text-text-secondary">
            Creemos firmemente que la atención a la diversidad es el pilar central de 
            una institución educativa avanzada. Buscamos eliminar de raíz las barreras 
            cognitivas, físicas y sociales para que la igualdad de oportunidades no sea una 
            meta, sino una realidad cotidiana.
          </p>

          {/* Objectives Grid */}
          <div className="reveal-item reveal-delay-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">
              Objetivos Académicos
            </h3>
            <ul className="space-y-2.5" role="list">
              {objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4.5 w-4.5 flex-shrink-0 text-brand-teal mt-0.5" />
                  <span className="text-sm text-text-secondary leading-tight">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column (Metrics Grid) - 5 cols */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
          {metrics.map((metric, i) => (
            <div
              key={i}
              className="reveal-item p-4 rounded-xl border border-white/5 bg-white/[0.02] shadow-md flex flex-col justify-between h-[100px] sm:h-[120px] transition-all hover:bg-white/[0.04]"
              style={{ transitionDelay: `${i * 100 + 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-none">
                  {metric.value}
                </span>
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-text-secondary leading-none">
                  {metric.label}
                </h4>
                <p className="text-[10px] text-text-muted mt-1 leading-none">
                  {metric.detail}
                </p>
              </div>
            </div>
          ))}

          {/* Micro Card Quote */}
          <div className="reveal-item reveal-delay-4 col-span-2 p-3.5 rounded-xl border border-brand-violet/20 bg-brand-violet/5">
            <p className="text-xs italic text-brand-teal leading-relaxed">
              &ldquo;La inclusión no es dar a todos lo mismo, es darle a cada uno lo que necesita para triunfar.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
