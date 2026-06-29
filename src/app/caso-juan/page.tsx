"use client";

import { useState } from "react";
import {
  Accessibility,
  ShieldCheck,
  AlertTriangle,
  Globe,
  Gavel,
  BookOpen,
  School,
  Sparkles,
  HelpCircle,
  AlertOctagon,
  Layers,
} from "lucide-react";
export default function CasoJuanPage() {
  const [juanError, setJuanError] = useState(false);
  const niveles = [
    {
      level: "Nivel 1",
      scope: "Internacional",
      icon: Globe,
      norma: "CDPD - ONU (2006)",
      name: "Convención sobre los Derechos de las Personas con Discapacidad",
      articles: "Art. 2 (Definiciones) y Art. 24 (Educación)",
      complement: "Garantía de ajustes de accesibilidad de infraestructura física",
      analysis: "Establece la obligación ineludible de proveer rampas, aulas accesibles y asistencia personal. La omisión o negación de estos elementos de accesibilidad material y humana califica jurídicamente como discriminación directa por motivos de discapacidad.",
    },
    {
      level: "Nivel 2",
      scope: "Nacional",
      icon: Gavel,
      norma: "Ley N° 28044 / Ley N° 29973",
      name: "Ley General de Educación & Ley General de la Persona con Discapacidad",
      articles: "LGE Art. 8 (Modificado por Ley N° 30797) + Ley N° 29973 Art. 11 y 35",
      complement: "Garantías de accesibilidad física y adaptaciones instrumentales",
      analysis: "Determina que el entorno material es el que debe modificarse. Las instituciones educativas deben proporcionar ajustes razonables consistentes en la accesibilidad física integral y materiales adaptados. No deparar rampas o señalizaciones viola la Ley N° 29973.",
    },
    {
      level: "Nivel 3",
      scope: "Sectorial (MINEDU)",
      icon: BookOpen,
      norma: "D.S. N° 007-2021-MINEDU",
      name: "Reglamento de la Ley General de Educación sobre Educación Inclusiva",
      articles: "Marco del Buen Desempeño Docente (MBDD)",
      complement: "Pilares del servicio inclusivo: DUA, SAE y PEP",
      analysis: "Define la obligatoriedad de implementar el DUA, articular los Servicios de Apoyo Educativo (SAE) y diseñar el Plan Educativo Personalizado (PEP) para adaptaciones específicas de movilidad. El MBDD exige al docente adaptar activamente su práctica para garantizar la libre movilidad dentro del aula.",
    },
    {
      level: "Nivel 4",
      scope: "Institucional",
      icon: School,
      norma: "Dirección Escolar",
      name: "Responsabilidad del Director + Comité de Gestión Pedagógica",
      articles: "Provisión de rampas, mobiliario ergonómico y personal de apoyo",
      complement: "Formulación del PEP para adaptaciones espaciales",
      analysis: "El director y el comité de gestión tienen la responsabilidad legal de gestionar la instalación de rampas de acceso, proveer sillas de ruedas adaptadas si es requerido y asegurar asistencia. El SAE institucional debe coordinar la elaboración del PEP que formalice estos soportes y declare el aula accesible.",
    },
    {
      level: "Nivel 5",
      scope: "Aula de Clases",
      icon: Sparkles,
      norma: "Aula Inclusiva",
      name: "Distribución del Espacio y Evaluación Flexible",
      articles: "Establecimiento de rutas accesibles y mesas ajustables",
      complement: "Adaptación de rúbricas basadas en el proceso, no en la velocidad física",
      analysis: "El docente debe organizar el mobiliario garantizando pasillos despejados y rutas de tránsito fluidas. Se requiere la provisión de mesas ajustables en altura y materiales manipulables. En las evaluaciones, se deben adaptar rúbricas para valorar el proceso cognitivo, conceder tiempo adicional y asistencia física si es necesario.",
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
                Caso de Estudio Nro 2
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-indigo/10 border border-brand-indigo/20 px-3.5 py-1 text-[10px] font-bold text-brand-indigo uppercase tracking-widest">
                Movilidad Física
              </span>
            </div>
            
            <h1 className="text-3xl font-black text-white tracking-tight sm:text-4xl md:text-5xl uppercase">
              El caso de Juan y la Movilidad
            </h1>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed max-w-3xl">
              Diagnóstico jurídico-pedagógico que muestra cómo la falta de accesibilidad e infraestructura 
              vulnera los derechos educativos de inclusión.
            </p>
          </div>

          <div className="text-[10px] font-semibold text-text-muted uppercase tracking-widest">
            ANÁLISIS DE CASO • ENFOQUE FÍSICO
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
                  <strong>Juan</strong> es un estudiante con movilidad reducida (silla de ruedas) que se ve impedido 
                  de ingresar a aulas y laboratorios debido a la ausencia absoluta de rampas, barandas y mobiliario. 
                  El docente argumenta que <em>&ldquo;todos los alumnos deben adaptarse a la infraestructura de la escuela&rdquo;</em>.
                </p>

                <div className="p-4 rounded-xl border border-brand-teal/20 bg-brand-teal/5 flex items-start gap-3">
                  <span className="inline-flex items-center justify-center h-5 px-2.5 rounded bg-brand-teal text-[9px] font-extrabold text-bg-dark uppercase tracking-wider mt-0.5">
                    Diagnóstico
                  </span>
                  <p className="text-[11px] text-brand-teal font-semibold leading-relaxed">
                    Movilidad reducida permanente. Requiere de adaptaciones arquitectónicas y estructurales de accesibilidad 
                    física para participar en igualdad de condiciones académicas.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-brand-coral/20 bg-brand-coral/5 flex gap-3 text-xs leading-relaxed text-brand-coral">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold">Vulneración Legal Directa</h4>
                    <p className="text-[11px] text-brand-coral/80 mt-0.5">
                      Negar ajustes razonables y de accesibilidad física constituye un acto discriminatorio directo penado por la Ley N° 29973.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Concept Card */}
            <div className="glass-card rounded-2xl p-8 border border-white/5 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-teal/10 border border-brand-teal/20 text-brand-teal flex-shrink-0">
                <Accessibility className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-white">
                  Falsa Igualdad vs. Equidad Real
                </h3>
                <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                  Falsa igualdad es obligar a Juan a subir escaleras porque la escalera es &ldquo;la misma para todos&rdquo;. 
                  Equidad real es modificar la infraestructura para garantizar el acceso en silla de ruedas de manera autónoma.
                </p>
              </div>
            </div>
          </div>

          {/* Juan Case Image (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              {!juanError ? (
                <img
                  src="/images/juan.png"
                  alt="El caso de Juan y la Movilidad"
                  onError={() => setJuanError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-brand-indigo/30 via-bg-dark to-brand-teal/20 p-6 text-center">
                  <Accessibility className="h-12 w-12 text-brand-teal mb-3 animate-pulse" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Ilustración Caso Juan</h3>
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
              Módulo de Debate de Accesibilidad
            </h2>
          </div>
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-6">
            Pregunta de Análisis: ¿Cuál es el deber del docente y de la institución frente a la necesidad de accesibilidad física de Juan?
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Postura A */}
            <div className="p-6 rounded-xl border border-brand-coral/10 bg-brand-coral/5">
              <div className="flex items-center gap-2 mb-3">
                <AlertOctagon className="h-4.5 w-4.5 text-brand-coral" />
                <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-brand-coral">
                  Postura del Docente
                </h3>
              </div>
              <p className="text-xs text-brand-coral leading-relaxed">
                Argumenta que la institución tiene presupuestos limitados y que el estudiante es quien debe 
                acomodarse a los pabellones tal como están construidos.
              </p>
            </div>

            {/* Postura B */}
            <div className="p-6 rounded-xl border border-emerald-500/10 bg-emerald-500/5">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" />
                <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                  Postura del Marco Legal
                </h3>
              </div>
              <p className="text-xs text-emerald-300 leading-relaxed">
                Estipula que es obligación absoluta del entorno adaptarse y remover barreras arquitectónicas. 
                Negar el ajuste de movilidad constituye un acto de discriminación directa sancionado.
              </p>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
