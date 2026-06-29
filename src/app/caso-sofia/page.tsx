"use client";

import { useState } from "react";
import {
  Scale,
  ShieldCheck,
  AlertTriangle,
  Globe,
  Gavel,
  BookOpen,
  School,
  Sparkles,
  HelpCircle,
  AlertOctagon,
  FileSpreadsheet,
  Layers,
} from "lucide-react";

export default function CasoSofiaPage() {
  const [sofiaError, setSofiaError] = useState(false);
  const niveles = [
    {
      level: "Nivel 1",
      scope: "Internacional",
      icon: Globe,
      norma: "CDPD - ONU (2006)",
      name: "Convención sobre los Derechos de las Personas con Discapacidad",
      articles: "Art. 2 (Definiciones) y Art. 24 (Educación)",
      complement: "Observación General N° 4 (2016)",
      analysis: "La 'denegación de ajustes razonables' califica legalmente como discriminación directa. El docente incurre en una infracción al denegar el soporte. La calculadora actúa como un ecualizador que remueve la barrera del aula, transitando del modelo integrador (el alumno se adapta) al modelo inclusivo (el sistema se rediseña).",
    },
    {
      level: "Nivel 2",
      scope: "Nacional",
      icon: Gavel,
      norma: "Ley N° 28044 / Ley N° 29973",
      name: "Ley General de Educación & Ley de la Persona con Discapacidad",
      articles: "LGE Art. 8 (Modificado por Ley N° 30797) + Ley N° 29973 Art. 11 y 35",
      complement: "Equidad e Inclusión Educativa Obligatoria",
      analysis: "Se confunde la Igualdad (dar a todos lo mismo) con la Equidad (otorgar el apoyo específico requerido). La calculadora es un ajuste técnico garantizado por ley. Las entidades educativas están obligadas a brindar estos soportes de acceso. Denegarla viola la legislación nacional vigente.",
    },
    {
      level: "Nivel 3",
      scope: "Sectorial (MINEDU)",
      icon: BookOpen,
      norma: "D.S. N° 007-2021-MINEDU",
      name: "Reglamento sobre Educación Inclusiva del Sector",
      articles: "MBDD + R.V.M. N° 094-2020-MINEDU",
      complement: "Marco del DUA, SAE y PEP",
      analysis: "Institucionaliza el DUA (planificación flexible), el Servicio de Apoyo Educativo (SAE) y el Plan Educativo Personalizado (PEP). El Marco del Buen Desempeño exige al docente adaptar la enseñanza. La RVM N° 094-2020 prescribe evaluar razonamientos y competencias, no destrezas operativas.",
    },
    {
      level: "Nivel 4",
      scope: "Institucional",
      icon: School,
      norma: "Dirección Escolar",
      name: "Responsabilidad Directiva y Pedagógica",
      articles: "Intervención a través del SAE Interno (SAEI)",
      complement: "Remoción de barreras áulicas e institucionales",
      analysis: "El SAEI interviene el aula para evaluar y modificar la práctica docente. No se interviene a la alumna, sino a la barrera del aula. Si el docente persiste, el SAEI formula el PEP de oficio que oficializa el uso de la calculadora. El desacato califica como falta administrativa disciplinaria.",
    },
    {
      level: "Nivel 5",
      scope: "Aula de Clases",
      icon: Sparkles,
      norma: "Estrategia Pedagógica",
      name: "Planificación DUA en Aula",
      articles: "Principios DUA I (Representación) y II (Expresión)",
      complement: "Integración de TICs y rúbricas adaptadas",
      analysis: "Se integran herramientas (calculadora, hojas de cálculo) para desplazar el cálculo algorítmico mecánico y focalizar el esfuerzo cognitivo en el análisis lógico. Las rúbricas evalúan el procedimiento reflexivo, validando el logro de competencia cuando resuelve con apoyos.",
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
                Caso de Estudio Nro 1
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-indigo/10 border border-brand-indigo/20 px-3.5 py-1 text-[10px] font-bold text-brand-indigo uppercase tracking-widest">
                Discalculia
              </span>
            </div>
            
            <h1 className="text-3xl font-black text-white tracking-tight sm:text-4xl md:text-5xl uppercase">
              El caso de Sofía y la Matemática
            </h1>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed max-w-3xl">
              Vulneración sistemática del derecho a la educación inclusiva por la prohibición 
              de herramientas tecnológicas y ajustes de apoyo.
            </p>
          </div>

          <div className="text-[10px] font-semibold text-text-muted uppercase tracking-widest">
            ANÁLISIS DE CASO • ENFOQUE JURÍDICO
          </div>
        </div>

        {/* Details & Image Block */}
        <div className="grid gap-8 lg:grid-cols-12 mb-16 items-start">
          
          {/* Text details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-sm font-extrabold uppercase tracking-widest text-white mb-4">
                Descripción del Escenario
              </h2>
              <div className="text-xs text-text-secondary space-y-4 leading-relaxed">
                <p>
                  El docente de Matemática de la institución prohíbe terminantemente a <strong>Sofía</strong> el uso 
                  de calculadora en clase y exámenes, justificando que representa una <em>&ldquo;ventaja injusta&rdquo;</em>. 
                  Como consecuencia, Sofía reprueba continuamente las evaluaciones operativas básicas.
                </p>

                <div className="p-4 rounded-xl border border-brand-teal/20 bg-brand-teal/5 flex items-start gap-3">
                  <span className="inline-flex items-center justify-center h-5 px-2.5 rounded bg-brand-teal text-[9px] font-extrabold text-bg-dark uppercase tracking-wider mt-0.5">
                    Diagnóstico
                  </span>
                  <p className="text-[11px] text-brand-teal font-semibold leading-relaxed">
                    Sofía presenta discalculia, un trastorno específico del aprendizaje numérico que limita la realización 
                    de cómputos mecánicos sin alterar su capacidad lógica y abstracta.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-brand-coral/20 bg-brand-coral/5 flex gap-3 text-xs leading-relaxed text-brand-coral">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold">Denegación de Ajuste Razonable</h4>
                    <p className="text-[11px] text-brand-coral/80 mt-0.5">
                      Prohibir la calculadora constituye un acto ilegal de discriminación directa por motivos de neurodiversidad.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Concept Card */}
            <div className="glass-card rounded-2xl p-8 border border-white/5 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-indigo/10 border border-brand-indigo/20 text-brand-indigo flex-shrink-0">
                <Scale className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-white">
                  Falsa Igualdad vs. Equidad Real
                </h3>
                <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                  La igualdad uniforme (mismo examen sin calculadora) castiga la discalculia de Sofía. La equidad real 
                  le provee el ajuste técnico idóneo para que evalúen su capacidad analítica y lógica real.
                </p>
              </div>
            </div>
          </div>

          {/* Sofia Case Image (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              {!sofiaError ? (
                <img
                  src="/images/caso-maria.png"
                  alt="El caso de Sofía y la Matemática"
                  onError={() => setSofiaError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-brand-indigo/30 via-bg-dark to-brand-teal/20 p-6 text-center">
                  <FileSpreadsheet className="h-12 w-12 text-brand-teal mb-3 animate-pulse" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Ilustración Caso Sofía</h3>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Section 3: The Five Levels Timeline */}
        <section className="mb-16" aria-labelledby="levels-heading">
          <div className="flex items-center gap-2.5 mb-8">
            <Layers className="h-5 w-5 text-brand-teal" />
            <h2 id="levels-heading" className="text-xs font-bold uppercase tracking-widest text-white">
              Análisis Estructurado en 5 Niveles
            </h2>
          </div>

          <div className="relative border-l border-white/5 pl-6 ml-4 space-y-6">
            {niveles.map((niv, idx) => {
              const Icon = niv.icon;
              return (
                <div key={idx} className="relative">
                  {/* Indicator Icon */}
                  <span className="absolute -left-[37px] top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand-indigo text-white shadow-md ring-4 ring-bg-dark">
                    <Icon className="h-3 w-3 text-brand-teal" />
                  </span>

                  <div className="glass-card rounded-xl p-6 hover:border-brand-indigo/30 transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-brand-teal">
                        {niv.level} — {niv.scope}
                      </span>
                      <span className="text-xs font-bold text-text-muted">
                        {niv.norma}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white tracking-tight mb-1">
                      {niv.name}
                    </h3>
                    <p className="text-[10px] font-bold text-brand-indigo uppercase tracking-wider mb-3">
                      Marco: {niv.articles}
                    </p>
                    
                    <div className="border-t border-white/5 pt-3.5">
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {niv.analysis}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 4: Debate */}
        <section className="glass-card rounded-2xl p-8 border border-white/5" aria-labelledby="debate-heading">
          <div className="flex items-center gap-2.5 mb-4">
            <HelpCircle className="h-5 w-5 text-brand-teal" />
            <h2 id="debate-heading" className="text-xs font-bold uppercase tracking-widest text-white">
              Módulo de Debate Pedagógico
            </h2>
          </div>
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-6">
            Pregunta de Análisis: ¿Constituye la prohibición de la calculadora una vulneración del derecho a la educación inclusiva de Sofía?
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Postura A */}
            <div className="p-6 rounded-xl border border-brand-coral/10 bg-brand-coral/5">
              <div className="flex items-center gap-2 mb-3">
                <AlertOctagon className="h-4.5 w-4.5 text-brand-coral" />
                <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-brand-coral">
                  Postura A (Docente)
                </h3>
              </div>
              <p className="text-xs text-brand-coral leading-relaxed">
                Argumenta que conceder el uso del dispositivo a Sofía rompe la uniformidad de la evaluación y resulta 
                &ldquo;injusto&rdquo; para los demás estudiantes del aula.
              </p>
            </div>

            {/* Postura B */}
            <div className="p-6 rounded-xl border border-emerald-500/10 bg-emerald-500/5">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" />
                <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                  Postura B (Perspectiva Jurídica)
                </h3>
              </div>
              <p className="text-xs text-emerald-300 leading-relaxed">
                Constituye discriminación directa. Los ajustes razonables son obligatorios e indispensables para equiparar 
                condiciones biológicas de aprendizaje.
              </p>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
