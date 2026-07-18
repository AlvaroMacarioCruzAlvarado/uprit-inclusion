"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Brain,
  AlertTriangle,
  UserCheck,
  CheckCircle,
  FileText,
  Bookmark,
  Users,
  Compass,
  ArrowRight,
  Flame,
  Scale,
  ShieldCheck,
  HelpCircle,
  Layers,
  Sparkles,
  RefreshCw
} from "lucide-react";

export default function Sesion6Page() {
  const [viewMode, setViewMode] = useState<"deficiencia" | "barrera">("barrera");
  const [activeTab, setActiveTab] = useState("barreras");
  
  // Interactive Checklist for SAE Interno Activation
  const [saeSteps, setSaeSteps] = useState([
    { id: 1, text: "Solicitud formal de apoyo del Comité de Gestión Pedagógica (SAE Interno) adjuntando informe del SAE Externo y evidencias.", completed: true },
    { id: 2, text: "Mapear y consolidar las fortalezas de Carlos y las barreras presentes en cada área formativa.", completed: false },
    { id: 3, text: "Establecer adaptaciones comunes de acceso, pedagógicas y evaluativas compartidas por todos sus docentes.", completed: false },
    { id: 4, text: "Elaborar el Plan Individual de Acompañamiento (o PEP según corresponda) de forma concertada.", completed: false },
    { id: 5, text: "Mantener comunicación estructurada y coordinada con la familia y el SAE Externo de apoyo.", completed: false },
    { id: 6, text: "Capacitar formalmente al equipo de docentes en TDAH y estrategias de comprensión lectora.", completed: false },
    { id: 7, text: "Realizar seguimiento periódico para evaluar el impacto y pertinencia de los ajustes.", completed: false }
  ]);

  const toggleStep = (id: number) => {
    setSaeSteps(
      saeSteps.map((step) =>
        step.id === id ? { ...step, completed: !step.completed } : step
      )
    );
  };

  const completedStepsCount = saeSteps.filter((s) => s.completed).length;
  const saeProgress = Math.round((completedStepsCount / saeSteps.length) * 100);

  return (
    <div className="animate-fade-in-up">
      {/* MAIN LAYOUT CONTAINER */}
      <div className="max-w-7xl mx-auto px-8 py-10">
        
        {/* HEADER BLOCK */}
        <div className="mb-10 pb-6 border-b border-[#1E2A5E]/10">
          <nav className="text-xs text-[#6B7280] font-semibold mb-2 tracking-wider uppercase">
            <Link href="/" className="hover:text-[#1E2A5E] transition-colors">Inicio</Link> / Sesión 6
          </nav>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF5F5] border border-[#FECACA] px-2.5 py-0.5 text-xs font-semibold text-[#DC2626] mb-2 uppercase">
                Estudio de Caso Crítico
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-[#1E2A5E]">
                Sesión 6: Derribando Barreras en el Aula
              </h1>
              <p className="text-sm text-[#6B7280] mt-1 leading-relaxed max-w-3xl">
                Análisis pedagógico y normativo del Caso de Carlos: Derribando barreras frente al TDAH y la baja comprensión lectora.
              </p>
            </div>
            <div className="text-xs font-semibold text-[#3730A3] uppercase tracking-widest bg-[#EEF2FF] border border-[#C7D2FE] px-3 py-1.5 rounded-md shrink-0">
              ANÁLISIS DE CASO
            </div>
          </div>
        </div>

        {/* INTERACTIVE COMPARISON TOGGLE (DEFICIT VS BARRIER) */}
        <div className="bg-[#1E2A5E] rounded-2xl p-6 mb-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="max-w-xl text-left">
            <span className="text-[10px] font-bold text-[#E8A020] uppercase tracking-wider block mb-1">
              Giro de Perspectiva Inclusiva (Modelo Social)
            </span>
            <h3 className="text-base font-extrabold text-white leading-tight">
              ¿Dónde colocamos el problema? ¿En el déficit del alumno o en el diseño de la clase?
            </h3>
            <p className="text-xs text-white/70 mt-1.5 leading-relaxed">
              El caso de Carlos demuestra que las dificultades de participación no son inherentes al estudiante, sino que surgen al interactuar con un entorno inflexible.
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-xl self-stretch md:self-center">
            <button
              onClick={() => setViewMode("deficiencia")}
              className={`flex-1 md:flex-initial text-center px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === "deficiencia"
                  ? "bg-[#DC2626] text-white shadow"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Mirada del Déficit
            </button>
            <button
              onClick={() => setViewMode("barrera")}
              className={`flex-1 md:flex-initial text-center px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === "barrera"
                  ? "bg-[#2D9B6F] text-white shadow"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Mirada de Barreras
            </button>
          </div>
        </div>

        {/* DYNAMIC CARD DISPLAY BASED ON PERSPECTIVE */}
        {viewMode === "deficiencia" ? (
          <div className="p-6 rounded-2xl border border-[#DC2626]/20 bg-[#FFF5F5] text-[#1A1A2E] flex gap-4.5 items-start mb-8 animate-fade-in-up">
            <Flame className="h-6 w-6 text-[#DC2626] shrink-0 mt-0.5" />
            <div className="text-left space-y-2">
              <h4 className="text-sm font-black text-[#DC2626] uppercase tracking-wider">
                Perspectiva Tradicional de Exclusión (Mirada Patologizante)
              </h4>
              <p className="text-xs leading-relaxed max-w-4xl text-[#6B7280]">
                El docente interpreta el bajo rendimiento de Carlos como una <strong>&ldquo;falta de concentración y compromiso&rdquo;</strong>. Se asume que levantarse de su asiento, experimentar niveles altos de ansiedad o no culminar la copia del pizarrón se debe a una falta de interés del alumno. Esta visión responsabiliza en su totalidad a Carlos por su TDAH y baja comprensión lectora, ignorando que la metodología empleada no responde a sus ritmos biológicos ni canales cognitivos.
              </p>
              <span className="inline-block text-[10px] bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20 rounded px-2.5 py-0.5 font-bold uppercase">
                Consecuencia: Calificación desaprobatoria "C" sin apoyos
              </span>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl border border-[#2D9B6F]/20 bg-[#EFF8F4] text-[#1A1A2E] flex gap-4.5 items-start mb-8 animate-fade-in-up">
            <ShieldCheck className="h-6 w-6 text-[#2D9B6F] shrink-0 mt-0.5" />
            <div className="text-left space-y-2">
              <h4 className="text-sm font-black text-[#2D9B6F] uppercase tracking-wider">
                Perspectiva Social de Inclusión (Mirada del Entorno)
              </h4>
              <p className="text-xs leading-relaxed max-w-4xl text-[#6B7280]">
                La dificultad de Carlos se origina en la <strong>inflexibilidad didáctica del docente</strong>: dictado ininterrumpido de 40 minutos, copia forzada de esquemas complejos y encargo de un ensayo de 3 páginas sin andamiaje. La barrera no es el TDAH, sino un diseño pedagógico que le exige atención selectiva prolongada y copia escrita copiosa sin apoyos ni andamios. El pararse es su forma de autorregulación y la ansiedad es síntoma de sobrecarga cognitiva.
              </p>
              <span className="inline-block text-[10px] bg-[#2D9B6F]/10 text-[#2D9B6F] border border-[#2D9B6F]/20 rounded px-2.5 py-0.5 font-bold uppercase">
                Enfoque DUA: Eliminar barreras modificando la enseñanza
              </span>
            </div>
          </div>
        )}

        {/* TAB CONTROLLERS */}
        <div className="flex gap-2 mb-8 border-b border-[#F0F0F4] pb-4">
          <button
            onClick={() => setActiveTab("barreras")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === "barreras"
                ? "bg-[#1E2A5E] text-white shadow-sm"
                : "bg-white text-[#6B7280] border border-[#F0F0F4] hover:bg-[#F5F6FA] hover:text-[#1E2A5E]"
            }`}
          >
            <span className="flex items-center gap-2">
              <AlertTriangle className="h-3.5 w-3.5" />
              1. Barreras del Aula (BAP)
            </span>
          </button>
          <button
            onClick={() => setActiveTab("adaptaciones")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === "adaptaciones"
                ? "bg-[#1E2A5E] text-white shadow-sm"
                : "bg-white text-[#6B7280] border border-[#F0F0F4] hover:bg-[#F5F6FA] hover:text-[#1E2A5E]"
            }`}
          >
            <span className="flex items-center gap-2">
              <UserCheck className="h-3.5 w-3.5" />
              2. Adaptaciones Requeridas
            </span>
          </button>
          <button
            onClick={() => setActiveTab("sae")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === "sae"
                ? "bg-[#1E2A5E] text-white shadow-sm"
                : "bg-white text-[#6B7280] border border-[#F0F0F4] hover:bg-[#F5F6FA] hover:text-[#1E2A5E]"
            }`}
          >
            <span className="flex items-center gap-2">
              <Compass className="h-3.5 w-3.5" />
              3. Activación del SAE Interno
            </span>
          </button>
        </div>

        {/* TAB CONTENTS CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* MAIN COLUMN (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {activeTab === "barreras" && (
              <div className="space-y-6">
                <div className="academic-card bg-white">
                  <span className="eyebrow-label block mb-2">Diagnóstico de Entorno</span>
                  <h2 className="card-title mb-6">Barreras para el Aprendizaje y la Participación (BAP)</h2>
                  
                  <div className="space-y-5">
                    
                    {/* BAP Didactica */}
                    <div className="border border-[#F0F0F4] rounded-xl p-5 hover:border-[#DC2626]/20 transition-all">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="h-9 w-9 rounded-lg bg-[#FFF5F5] text-[#DC2626] flex items-center justify-center">
                          <AlertTriangle className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-extrabold text-[#1E2A5E]">Barrera Didáctica y Metodológica</h3>
                          <span className="text-[10px] text-[#DC2626] font-bold uppercase">Nivel de Impacto: Alto</span>
                        </div>
                      </div>
                      <p className="text-xs text-[#6B7280] leading-relaxed">
                        Metodología rígida y expositiva: dictado extenso de 40 minutos en el cual se espera que Carlos mantenga atención continua. Copiado forzado de la pizarra de un organizador gráfico complejo y extenso. Tarea individual de alta demanda motora y lectora (ensayo de 3 páginas) para el día siguiente sin proveer andamios.
                      </p>
                    </div>

                    {/* BAP Evaluacion */}
                    <div className="border border-[#F0F0F4] rounded-xl p-5 hover:border-[#DC2626]/20 transition-all">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="h-9 w-9 rounded-lg bg-[#FFF5F5] text-[#DC2626] flex items-center justify-center">
                          <Scale className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-extrabold text-[#1E2A5E]">Barrera en la Evaluación formativa</h3>
                          <span className="text-[10px] text-[#DC2626] font-bold uppercase">Nivel de Impacto: Alto</span>
                        </div>
                      </div>
                      <p className="text-xs text-[#6B7280] leading-relaxed">
                        Evaluación sumativa de producto final (el ensayo concluido) en vez de valorar el proceso de aprendizaje del alumno. El docente no monitorea el desarrollo, no registra avances, no realiza intervenciones de andamiaje ni provee retroalimentación oportuna para ayudarlo a mejorar.
                      </p>
                    </div>

                    {/* BAP Actitudinal */}
                    <div className="border border-[#F0F0F4] rounded-xl p-5 hover:border-[#E8A020]/20 transition-all">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="h-9 w-9 rounded-lg bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
                          <Users className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-extrabold text-[#1E2A5E]">Barrera Actitudinal (Sesgo de Capacidad)</h3>
                          <span className="text-[10px] text-[#D97706] font-bold uppercase">Nivel de Impacto: Medio-Alto</span>
                        </div>
                      </div>
                      <p className="text-xs text-[#6B7280] leading-relaxed">
                        Sesgo cognitivo docente centrado en el déficit del alumno. Se interpreta la conducta de Carlos (inquietud motora, levantarse de la silla) y el no finalizar la tarea como &ldquo;falta de concentración y compromiso&rdquo;. Esta actitud atribuye el problema al carácter y no al diseño pedagógico uniforme.
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {activeTab === "adaptaciones" && (
              <div className="space-y-6">
                <div className="academic-card bg-white">
                  <span className="eyebrow-label block mb-2">Ajustes Razonables</span>
                  <h2 className="card-title mb-6">Adaptaciones Curriculares y de Acceso</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Adaptación de Acceso */}
                    <div className="border border-[#F0F0F4] rounded-xl p-5 hover:border-[#2D9B6F]/20 hover:bg-[#EFF8F4]/20 transition-all">
                      <div className="flex items-center gap-2.5 mb-3.5">
                        <div className="h-9 w-9 rounded-lg bg-[#E6F4EA] text-[#2D9B6F] flex items-center justify-center font-bold text-xs uppercase">
                          ACC
                        </div>
                        <h3 className="text-sm font-extrabold text-[#1E2A5E]">Adaptaciones de Acceso</h3>
                      </div>
                      
                      <ul className="text-xs text-[#6B7280] space-y-3.5 list-disc pl-4.5 leading-relaxed">
                        <li><strong>Organizador Simplificado:</strong> Entregar a Carlos un esquema impreso o digital prediseñado con las ideas matrices, palabras clave, fechas y espacios breves para completar.</li>
                        <li><strong>Reducción de Carga Motora:</strong> Evitar la copia completa de abundantes esquemas lineales de la pizarra para focalizarse en el análisis de información.</li>
                        <li><strong>Ubicación Preferente:</strong> Ubicarlo en un sitio en el aula con mínima interferencia de distractores externos.</li>
                        <li><strong>Pausas de Movimiento:</strong> Pactar previamente breves intervalos de movimiento físico controlado para ayudar a su autorregulación motora.</li>
                      </ul>
                      <div className="mt-4 text-[10px] text-[#2D9B6F] bg-[#E6F4EA] px-3 py-1 rounded w-fit font-bold uppercase">
                        No modifica la meta, facilita el acceso
                      </div>
                    </div>

                    {/* Adaptación Pedagógica/Metodológica */}
                    <div className="border border-[#F0F0F4] rounded-xl p-5 hover:border-[#3730A3]/20 hover:bg-[#EEF2FF]/20 transition-all">
                      <div className="flex items-center gap-2.5 mb-3.5">
                        <div className="h-9 w-9 rounded-lg bg-[#EEF2FF] text-[#3730A3] flex items-center justify-center font-bold text-xs uppercase">
                          PED
                        </div>
                        <h3 className="text-sm font-extrabold text-[#1E2A5E]">Adaptaciones Metodológicas</h3>
                      </div>

                      <ul className="text-xs text-[#6B7280] space-y-3.5 list-disc pl-4.5 leading-relaxed">
                        <li><strong>Micro-momentos (8-10 min):</strong> Dividir la sesión alternando explicaciones muy directas, lectura en parejas, análisis de líneas de tiempo visuales y trabajo breve guiado.</li>
                        <li><strong>Soportes de Escritura:</strong> En lugar del ensayo de 3 páginas, andamiar solicitando listar 3 causas y 3 consecuencias clave de la Crisis del Antiguo Régimen.</li>
                        <li><strong>Uso de Plantillas:</strong> Brindar plantillas de andamiaje con frases de inicio, desarrollo y cierre para ordenar las ideas principales.</li>
                        <li><strong>Múltiples Formatos:</strong> Permitirle demostrar su comprensión mediante texto breve, afiches, organizadores interactivos o un audio grabado.</li>
                      </ul>
                      <div className="mt-4 text-[10px] text-[#3730A3] bg-[#EEF2FF] px-3 py-1 rounded w-fit font-bold uppercase">
                        Evalúa comprensión de competencia, no extensión
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {activeTab === "sae" && (
              <div className="space-y-6">
                
                {/* SAE Steps Checklist */}
                <div className="academic-card bg-white">
                  <span className="eyebrow-label block mb-2">SAE Interno</span>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                    <div>
                      <h2 className="card-title">Activación del Servicio de Apoyo Educativo (SAE)</h2>
                      <p className="text-xs text-[#6B7280] mt-1 font-medium">
                        Funciones operativas del Comité de Gestión Pedagógica (SAE Interno) para el caso de Carlos:
                      </p>
                    </div>
                    
                    {/* Live progress indicator */}
                    <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] px-3.5 py-1 text-xs font-bold text-[#3730A3]">
                      <span>Progreso SAE: {saeProgress}%</span>
                    </div>
                  </div>

                  {/* Checklist container */}
                  <div className="space-y-3">
                    {saeSteps.map((step) => (
                      <button
                        key={step.id}
                        onClick={() => toggleStep(step.id)}
                        className={`w-full text-left p-4.5 rounded-xl border flex gap-3 transition-colors cursor-pointer ${
                          step.completed
                            ? "bg-[#EFF8F4] border-[#A7F3D0] text-[#1A1A2E]"
                            : "bg-white border-[#F0F0F4] text-[#6B7280] hover:bg-[#F5F6FA]"
                        }`}
                      >
                        <span className={`h-5 w-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          step.completed
                            ? "bg-[#2D9B6F] border-[#2D9B6F] text-white"
                            : "border-[#D1D5DB] bg-white"
                        }`}>
                          {step.completed && "✓"}
                        </span>
                        <div className="text-xs font-semibold leading-relaxed">
                          <span className="text-[10px] font-black text-[#1E2A5E] block mb-1">ACCIÓN 0{step.id}</span>
                          {step.text}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Visual Progress bar */}
                  <div className="mt-6 pt-4 border-t border-[#F0F0F4] space-y-1.5">
                    <div className="w-full bg-[#F0F0F4] h-2 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${saeProgress}%` }}
                        className="bg-[#3730A3] h-full rounded-full transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* ASIDE COLUMN (4 cols) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-20 space-y-8">
            
            {/* Student neuro profile card */}
            <div className="academic-card bg-white">
              <span className="eyebrow-label block mb-2">Perfil de Estudiante</span>
              <h2 className="card-title mb-6">Ficha Carlos G.</h2>

              <div className="space-y-0 mb-6">
                <div className="ficha-row py-2.5">
                  <span className="ficha-label">Diagnóstico</span>
                  <span className="ficha-value">TDAH Combinado</span>
                </div>
                <div className="ficha-row py-2.5">
                  <span className="ficha-label">Lectura</span>
                  <span className="ficha-value text-[#DC2626] font-bold">Baja comprensión</span>
                </div>
                <div className="ficha-row py-2.5">
                  <span className="ficha-label">Curso</span>
                  <span className="ficha-value text-right">Historia, Geografía y Ec.</span>
                </div>
                <div className="ficha-row py-2.5">
                  <span className="ficha-label">Nivel Educativo</span>
                  <span className="ficha-value">Secundaria</span>
                </div>
              </div>

              {/* Separator */}
              <div className="border-t border-[#F0F0F4] my-6" />

              {/* Cognitive Overload Visual chart */}
              <div className="space-y-4">
                <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
                  Perfil de Funciones Ejecutivas Afectadas
                </span>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-[#1A1A2E]">
                    <span>Atención Sostenida</span>
                    <span className="font-bold text-[#DC2626]">Alto impacto</span>
                  </div>
                  <div className="w-full bg-[#F0F0F4] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#DC2626] w-[85%] h-full rounded-full" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-[#1A1A2E]">
                    <span>Procesamiento de Lectura</span>
                    <span className="font-bold text-[#DC2626]">Bajo desempeño</span>
                  </div>
                  <div className="w-full bg-[#F0F0F4] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#DC2626] w-[80%] h-full rounded-full" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-[#1A1A2E]">
                    <span>Autorregulación Inquieta</span>
                    <span className="font-bold text-[#E8A020]">Respuesta motora</span>
                  </div>
                  <div className="w-full bg-[#F0F0F4] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#E8A020] w-[70%] h-full rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Critique Concluding Callout */}
            <div className="academic-card bg-[#1E2A5E] text-white">
              <span className="text-[11px] font-bold text-[#E8A020] uppercase tracking-widest block mb-2">
                Conclusión Pedagógica
              </span>
              <h3 className="text-base font-extrabold text-white leading-tight mb-4">
                ¿Es la calificación "C" una respuesta inclusiva?
              </h3>
              
              <p className="text-xs text-white/80 leading-relaxed mb-4">
                Colocar una calificación de &ldquo;C&rdquo; a Carlos y atribuir su bajo rendimiento únicamente a una falta de compromiso <strong>no constituye una respuesta inclusiva</strong>.
              </p>
              <p className="text-xs text-white/80 leading-relaxed">
                Antes de emitir una calificación de valor, el docente tiene la obligación ética y legal de flexibilizar su metodología, brindar andamios visuales, monitorear el progreso y otorgar al estudiante una oportunidad real para evidenciar sus aprendizajes de forma equitativa.
              </p>
              
              <div className="mt-6 border-t border-white/10 pt-4 text-[10px] text-white/60 font-bold uppercase tracking-wider flex items-center justify-between">
                <span>Inclusión Social Real</span>
                <Sparkles className="h-4 w-4 text-[#2D9B6F]" />
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}
