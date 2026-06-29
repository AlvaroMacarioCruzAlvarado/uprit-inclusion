"use client";

import { useState } from "react";
import { BookOpen, Layers, Check, X, ShieldAlert, Sparkles, History, HelpCircle, TableProperties } from "lucide-react";

export default function InclusionPage() {
  const [evolutionError, setEvolutionError] = useState(false);
  const paradigmas = [
    {
      num: "01",
      name: "Paradigma de Prescindencia",
      epoch: "Antigüedad y Edad Media",
      stats: "Exclusión radical | 0% Inclusión",
      desc: "La discapacidad se atribuía a motivos religiosos o divinos (castigos o designios). Las personas con discapacidad eran vistas como improductivas o prescindibles, justificando su exclusión absoluta, abandono o eliminación física de la sociedad.",
      color: "border-rose-500/30 text-rose-400 bg-rose-500/5",
      badgeColor: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
    },
    {
      num: "02",
      name: "Paradigma Médico-Rehabilitador",
      epoch: "Siglo XX",
      stats: "Enfoque clínico | Integración escolar",
      desc: "La discapacidad se conceptualiza como un déficit clínico individual. El objetivo social es rehabilitar, curar o normalizar al sujeto para que logre asimilarse en una sociedad estandarizada. Se promueve la integración física, mas no la inclusión curricular.",
      color: "border-amber-500/30 text-amber-400 bg-amber-500/5",
      badgeColor: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    },
    {
      num: "03",
      name: "Paradigma Social y de Derechos",
      epoch: "Siglo XXI — Contemporáneo",
      stats: "Ajustes razonables | Inclusión universal",
      desc: "La discapacidad se redefine como la interacción de barreras externas y deficiencias individuales. Es el entorno físico e institucional el que debe reformularse y adaptarse. Consagrado en la CDPD-ONU (2006) como derecho fundamental.",
      color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    },
  ];

  return (
    <div className="relative overflow-hidden min-h-screen py-12 md:py-16 animate-fade-in-up">
      {/* Decorative Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-white/5 pb-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3.5 py-1 text-[10px] font-bold text-brand-teal uppercase tracking-widest">
                UPRIT - Facultad de Derecho y Ciencias Sociales
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-indigo/10 border border-brand-indigo/20 px-3.5 py-1 text-[10px] font-bold text-brand-indigo uppercase tracking-widest">
                Sesión Nro 1
              </span>
            </div>
            
            <h1 className="text-3xl font-black text-white tracking-tight sm:text-4xl md:text-5xl uppercase">
              Tratamiento de la Discapacidad
            </h1>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed max-w-2xl">
              Epistemología de la diversidad y evolución histórica de los modelos de atención y marcos teóricos.
            </p>
          </div>

          <div className="text-[10px] font-semibold text-text-muted uppercase tracking-widest">
            FACULTAD DE DERECHO • TRABAJO GRUPAL
          </div>
        </div>

        {/* Section 1: Evolution Banner Image */}
        <div className="relative h-40 md:h-56 w-full rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/50 to-transparent z-10" />
          {!evolutionError ? (
            <img
              src="/images/paradigmas-evolution.jpg"
              alt="Evolución Histórica de los Modelos de Atención"
              onError={() => setEvolutionError(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-brand-indigo/25 to-brand-coral/10 p-6 text-center">
              <History className="h-10 w-10 text-brand-teal mb-2 animate-spin-slow" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Evolución Histórica</h3>
            </div>
          )}
          
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
            <h2 className="text-lg md:text-2xl font-bold text-white tracking-tight leading-none uppercase">
              Modelos de Atención a lo Largo del Tiempo
            </h2>
          </div>
        </div>

        {/* Section 2: Paradigms Grid */}
        <section className="mb-16" aria-labelledby="paradigms-title">
          <div className="flex items-center gap-2.5 mb-8">
            <Layers className="h-5 w-5 text-brand-teal" />
            <h2 id="paradigms-title" className="text-xs font-bold uppercase tracking-widest text-white">
              Los Tres Paradigmas Históricos
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {paradigmas.map((par, i) => (
              <div
                key={i}
                className={`glass-card rounded-2xl border ${par.color} p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-black tracking-tight opacity-20">
                      {par.num}
                    </span>
                    <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md ${par.badgeColor}`}>
                      {par.epoch}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                    {par.name}
                  </h3>
                  
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-brand-teal mb-4">
                    {par.stats}
                  </p>
                  
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {par.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Caso Carlos */}
        <section className="glass-card rounded-2xl p-8 border border-white/5 mb-16" aria-labelledby="carlos-title">
          <div className="flex items-center gap-2.5 mb-2">
            <HelpCircle className="h-5 w-5 text-brand-teal" />
            <h2 id="carlos-title" className="text-xs font-bold uppercase tracking-widest text-white">
              Caso Integrado: Caso Carlos
            </h2>
          </div>
          <p className="text-[10px] font-bold text-brand-indigo uppercase tracking-widest mb-6">
            Análisis Práctico: Integrar frente a Incluir en el Aula
          </p>

          <div className="grid gap-6 lg:grid-cols-12 items-center">
            {/* Context (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white/[0.01] border border-white/5 p-5 rounded-xl">
                <h4 className="text-xs font-bold text-brand-teal uppercase tracking-wider mb-2">
                  Contexto del Caso:
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Carlos usa silla de ruedas. La escuela lo ha matriculado formalmente, pero no cuenta con rampa 
                  de acceso, ni el docente adapta sus dinámicas pedagógicas grupales.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-rose-500/10 bg-rose-500/5 flex gap-3 text-xs leading-relaxed text-rose-400">
                <ShieldAlert className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold">Barrera áulica detectada</h5>
                  <p className="text-[11px] text-rose-400/80 mt-0.5">
                    Permitir la entrada física sin adaptar metodologías ni infraestructura segrega al estudiante dentro del aula.
                  </p>
                </div>
              </div>
            </div>

            {/* Integration vs Inclusion Grid (7 cols) */}
            <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
              
              <div className="p-5 rounded-xl border border-amber-500/20 bg-amber-500/[0.02]">
                <div className="flex items-center gap-2 mb-3">
                  <X className="h-4.5 w-4.5 text-amber-500" />
                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-amber-500">
                    Enfoque Integrar
                  </h5>
                </div>
                <p className="text-[11px] text-amber-300 leading-relaxed">
                  Carlos asiste a clase, pero sus compañeros hacen dinámicas físicas fuera y él se queda resolviendo 
                  cuestionarios teóricos solo en el aula. El estudiante debe forzar su adaptación al sistema.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.02]">
                <div className="flex items-center gap-2 mb-3">
                  <Check className="h-4.5 w-4.5 text-emerald-500" />
                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-emerald-500">
                    Enfoque Incluir
                  </h5>
                </div>
                <p className="text-[11px] text-emerald-300 leading-relaxed">
                  Las dinámicas áulicas se planifican en espacios accesibles. Las funciones cooperativas se diseñan 
                  bajo DUA, asignando roles activos y valorando su capacidad intelectual.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Section 4: Table */}
        <section aria-labelledby="table-title">
          <div className="flex items-center gap-2.5 mb-6">
            <TableProperties className="h-5 w-5 text-brand-teal" />
            <h2 id="table-title" className="text-xs font-bold uppercase tracking-widest text-white">
              Análisis Comparativo del Tratamiento
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/5 bg-white/[0.01] shadow-2xl">
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5">
                  <th className="p-4.5 text-xs font-bold uppercase tracking-wider text-white">Aspecto de Comparación</th>
                  <th className="p-4.5 text-xs font-bold uppercase tracking-wider text-rose-400">Modelo Prescindencia</th>
                  <th className="p-4.5 text-xs font-bold uppercase tracking-wider text-amber-400">Modelo Médico</th>
                  <th className="p-4.5 text-xs font-bold uppercase tracking-wider text-emerald-400">Modelo Social</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-text-secondary">
                <tr>
                  <td className="p-4.5 font-bold text-white bg-white/[0.01]">Origen Conceptual</td>
                  <td className="p-4.5">Causas divinas o religiosas. Castigo celestial.</td>
                  <td className="p-4.5">Deficiencia o patología física catalogada como enfermedad.</td>
                  <td className="p-4.5">Interacción de deficiencias con barreras físicas y sociales.</td>
                </tr>
                <tr>
                  <td className="p-4.5 font-bold text-white bg-white/[0.01]">Acción Pedagógica</td>
                  <td className="p-4.5">Exclusión completa del sistema regular.</td>
                  <td className="p-4.5">Integración física condicionada a su normalización.</td>
                  <td className="p-4.5">Planificación DUA, y entrega de apoyos (SAE y PEP).</td>
                </tr>
                <tr>
                  <td className="p-4.5 font-bold text-white bg-white/[0.01]">Meta Principal</td>
                  <td className="p-4.5">Prescindir de la persona debido a su invalidez.</td>
                  <td className="p-4.5">Normalización e inserción clínica del individuo.</td>
                  <td className="p-4.5">Ciudadanía, autonomía y accesibilidad universal de derechos.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
