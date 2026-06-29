"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Brain,
  Database,
  Zap,
  MessageSquare,
  BookOpen,
  AlertTriangle,
  FileText,
  Download,
  CheckCircle,
  X,
  Clock,
  Layout,
  UserCheck
} from "lucide-react";

export default function CasoValeriaPage() {
  const [widths, setWidths] = useState({ atencion: 0, memoria: 0, inhibicion: 0 });

  useEffect(() => {
    // Triggers layout mount animation
    const timer = setTimeout(() => {
      setWidths({ atencion: 85, memoria: 80, inhibicion: 65 });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="animate-fade-in-up">
      
      {/* MAIN LAYOUT CONTAINER */}
      <div className="max-w-7xl mx-auto px-8 py-10">
        
        {/* HEADER BLOCK */}
        <div className="mb-10 pb-6 border-b border-[#1E2A5E]/10">
          <nav className="text-xs text-[#6B7280] font-semibold mb-2 tracking-wider uppercase">
            <Link href="/" className="hover:text-[#1E2A5E] transition-colors">Inicio</Link> / Caso Valeria
          </nav>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-[#1E2A5E]">
                Caso Valeria R. — TDAH Tipo Combinado
              </h1>
              <p className="text-sm text-[#6B7280] mt-2 leading-relaxed max-w-3xl">
                Análisis jurídico-pedagógico de las barreras al aprendizaje matemático en una estudiante con TDAH,
                con propuesta de ajustes razonables bajo el enfoque DUA.
              </p>
            </div>
            <div className="text-xs font-semibold text-[#3730A3] uppercase tracking-widest bg-[#EEF2FF] border border-[#C7D2FE] px-3 py-1.5 rounded-md shrink-0">
              UPRIT · ANÁLISIS DE CASO
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: 60% (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* TARJETA 1 — IDENTIFICACIÓN */}
            <div className="academic-card">
              <span className="eyebrow-label block mb-2">Identificación</span>
              <h2 className="card-title mb-4">Identificación de la Estudiante</h2>
              
              <div className="space-y-0 mb-6">
                <div className="ficha-row">
                  <span className="ficha-label">Estudiante</span>
                  <span className="ficha-value">Valeria R.</span>
                </div>
                <div className="ficha-row">
                  <span className="ficha-label">Edad / Grado</span>
                  <span className="ficha-value">15 años / 4to de Secundaria</span>
                </div>
                <div className="ficha-row">
                  <span className="ficha-label">Diagnóstico</span>
                  <span className="inline-block bg-[#EEF2FF] text-[#3730A3] border border-[#C7D2FE] rounded-full px-3 py-1 text-xs font-semibold">
                    TDAH Tipo Combinado
                  </span>
                </div>
                <div className="ficha-row flex-col items-start gap-2">
                  <span className="ficha-label self-start">Perfil General</span>
                  <p className="text-sm text-[#1A1A2E] leading-relaxed">
                    Alta capacidad creativa y pensamiento divergente. Presenta dificultades específicas para mantener
                    la atención focalizada y sostenida en procesos algebraicos y aritméticos de larga duración.
                  </p>
                </div>
              </div>

              {/* Download Container */}
              <div className="bg-[#F5F6FA] rounded-xl p-4.5 border border-[#1E2A5E]/8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1E2A5E]/10 text-[#1E2A5E] flex-shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-[#1A1A2E] leading-tight">Ficha Completa de Valeria</h4>
                    <span className="text-[10px] text-[#6B7280]">TAREA_N_03_CASO_VALERIA.docx</span>
                  </div>
                </div>
                <a
                  href="/documentos/TAREA_N_03_CASO_VALERIA.docx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#1E2A5E] hover:bg-[#2D3E82] text-xs font-bold uppercase tracking-wider text-white px-5 py-3 transition-colors cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  Descargar Caso
                </a>
              </div>
            </div>

            {/* TARJETA 2 — PERFIL NEUROCOGNITIVO */}
            <div className="academic-card">
              <span className="eyebrow-label block mb-2">Perfil Neurocognitivo</span>
              <h2 className="card-title mb-6">Funciones Ejecutivas Afectadas</h2>
              
              <div className="space-y-6">
                {/* FE 1 */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-[#3730A3]/10 text-[#3730A3] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Brain className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#1E2A5E]">Atención Sostenida</h3>
                      <p className="text-xs text-[#6B7280] leading-relaxed mt-1">
                        Dificultades severas para mantener atención. Se distrae fácilmente con estímulos auditivos periféricos en el aula.
                      </p>
                    </div>
                  </div>
                  {/* Severity Bar */}
                  <div className="pl-12 flex items-center gap-4">
                    <div className="flex-1 bg-[#F0F0F4] h-1.5 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${widths.atencion}%` }}
                        className="bg-[#DC2626] h-full rounded-full transition-all duration-700 ease-out"
                      />
                    </div>
                    <span className="text-xs font-black text-[#DC2626] w-8 text-right">{widths.atencion}%</span>
                  </div>
                </div>

                {/* FE 2 */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Database className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#1E2A5E]">Memoria de Trabajo</h3>
                      <p className="text-xs text-[#6B7280] leading-relaxed mt-1">
                        Dificultad para retener la secuencia de pasos en algoritmos complejos. Olvida el objetivo intermedio al resolver.
                      </p>
                    </div>
                  </div>
                  {/* Severity Bar */}
                  <div className="pl-12 flex items-center gap-4">
                    <div className="flex-1 bg-[#F0F0F4] h-1.5 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${widths.memoria}%` }}
                        className="bg-[#DC2626] h-full rounded-full transition-all duration-700 ease-out"
                      />
                    </div>
                    <span className="text-xs font-black text-[#DC2626] w-8 text-right">{widths.memoria}%</span>
                  </div>
                </div>

                {/* FE 3 */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-[#D97706]/10 text-[#D97706] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Zap className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#1E2A5E]">Inhibición / Impulsividad</h3>
                      <p className="text-xs text-[#6B7280] leading-relaxed mt-1">
                        Resuelve los primeros pasos sin leer completamente el enunciado, cometiendo errores por omisión de datos clave.
                      </p>
                    </div>
                  </div>
                  {/* Severity Bar */}
                  <div className="pl-12 flex items-center gap-4">
                    <div className="flex-1 bg-[#F0F0F4] h-1.5 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${widths.inhibicion}%` }}
                        className="bg-[#E8A020] h-full rounded-full transition-all duration-700 ease-out"
                      />
                    </div>
                    <span className="text-xs font-black text-[#E8A020] w-8 text-right">{widths.inhibicion}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* TARJETA 3 — BARRERAS AL APRENDIZAJE (BAP) */}
            <div className="academic-card">
              <span className="eyebrow-label block mb-2">Barreras Identificadas</span>
              <h2 className="card-title mb-6">Barreras al Aprendizaje y la Participación</h2>
              
              <div className="space-y-5">
                {/* BAP 1 */}
                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-lg bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageSquare className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1E2A5E]">Barrera Didáctica</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed mt-1">
                      Explicaciones verbales prolongadas sin apoyo visual generan desconexión rápida en la estudiante.
                    </p>
                  </div>
                </div>

                {/* BAP 2 */}
                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-lg bg-[#FEF3C7] text-[#D97706] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BookOpen className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1E2A5E]">Barrera Curricular</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed mt-1">
                      Evaluaciones con texto lineal excesivo saturan la memoria de trabajo, impidiendo acceder a la lógica matemática.
                    </p>
                  </div>
                </div>

                {/* BAP 3 */}
                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-lg bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertTriangle className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1E2A5E]">Barrera Actitudinal</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed mt-1">
                      La exigencia de "terminar rápido" genera ansiedad que bloquea el razonamiento abstracto.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* TARJETA 4 — PROPUESTA DE APOYOS */}
            <div className="academic-card">
              <span className="eyebrow-label block mb-2">Propuesta de Intervención</span>
              <h2 className="card-title mb-6">Ajustes Razonables Propuestos</h2>
              
              <div className="space-y-6">
                {/* AP 1 */}
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center rounded bg-[#DBEAFE] text-[#2563EB] border border-[#BFDBFE] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider flex-shrink-0 w-24">
                    TIEMPO
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1E2A5E]">Pausas Activas</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed mt-1">
                      Periodos de descanso breves durante sesiones largas para regular la fatiga cognitiva.
                    </p>
                  </div>
                </div>

                {/* AP 2 */}
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center rounded bg-[#E6F4EA] text-[#2D9B6F] border border-[#A7F3D0] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider flex-shrink-0 w-24">
                    FORMATO
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1E2A5E]">Guías con Enfoque DUA</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed mt-1">
                      Esquemas visuales, colores por término algebraico, subtítulos claros. Permitir infografías con fórmulas clave.
                    </p>
                  </div>
                </div>

                {/* AP 3 */}
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center rounded bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider flex-shrink-0 w-24">
                    MEDIACIÓN
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1E2A5E]">Modelado de Pensamiento</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed mt-1">
                      Pensar en voz alta al resolver + checklists adhesivos para no saltar pasos del algoritmo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* TARJETA 5 — METAS DE LOGRO */}
            <div className="academic-card">
              <span className="eyebrow-label block mb-2">Metas Trimestrales</span>
              <h2 className="card-title mb-4">Competencia Matemática — Meta de Logro</h2>
              
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6F4EA] text-[#2D9B6F] px-4 py-1.5 text-xs font-semibold">
                  Competencia: Resuelve problemas de regularidad, equivalencia y cambio
                </span>
                <p className="text-xs text-[#1A1A2E] leading-relaxed mt-3.5 bg-[#F5F6FA] p-4.5 rounded-xl border border-[#1E2A5E]/8">
                  "Al finalizar el trimestre, Valeria logrará identificar, representar y resolver ecuaciones de primer grado con una incógnita, transitando de la representación concreta (balanzas digitales / material manipulativo) a la representación simbólica, manteniendo estructura de pasos en al menos el 80% de los ejercicios propuestos."
                </p>
              </div>

              {/* Green Progress Bar */}
              <div className="space-y-1 mb-8">
                <div className="flex justify-between text-xs font-bold text-[#2D9B6F]">
                  <span>Progreso de Meta Establecido</span>
                  <span>80%</span>
                </div>
                <div className="w-full bg-[#F0F0F4] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#2D9B6F] w-[80%] h-full rounded-full" />
                </div>
              </div>

              <h3 className="text-sm font-bold text-[#1E2A5E] uppercase tracking-wider border-t border-[#F0F0F4] pt-6 mb-4">
                Indicadores de Pensamiento Abstracto Fallido
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* IND 1 */}
                <div className="bg-white border border-[#FEE2E2] rounded-xl p-4.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-[#DC2626] uppercase">IND 1</span>
                      <X className="h-4 w-4 text-[#DC2626]" />
                    </div>
                    <h4 className="text-xs font-bold text-[#1E2A5E] leading-snug">Falla en Traducción Lingüística</h4>
                  </div>
                  <p className="text-[11px] text-[#6B7280] leading-normal mt-2 pt-2 border-t border-[#F0F0F4]">
                    Incapacidad de convertir un enunciado narrativo a una expresión algebraica básica.
                  </p>
                </div>

                {/* IND 2 */}
                <div className="bg-white border border-[#FEE2E2] rounded-xl p-4.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-[#DC2626] uppercase">IND 2</span>
                      <X className="h-4 w-4 text-[#DC2626]" />
                    </div>
                    <h4 className="text-xs font-bold text-[#1E2A5E] leading-snug">Falla en Automatización</h4>
                  </div>
                  <p className="text-[11px] text-[#6B7280] leading-normal mt-2 pt-2 border-t border-[#F0F0F4]">
                    Incapacidad para recordar la secuencia lógica de un procedimiento sin el ejemplo modelo al frente.
                  </p>
                </div>

                {/* IND 3 */}
                <div className="bg-white border border-[#FEE2E2] rounded-xl p-4.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-[#DC2626] uppercase">IND 3</span>
                      <X className="h-4 w-4 text-[#DC2626]" />
                    </div>
                    <h4 className="text-xs font-bold text-[#1E2A5E] leading-snug">Falla en Manipulación Mental</h4>
                  </div>
                  <p className="text-[11px] text-[#6B7280] leading-normal mt-2 pt-2 border-t border-[#F0F0F4]">
                    Dificultad para mantener una variable "x" en la memoria de trabajo durante transposición de términos.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: 40% (lg:col-span-5) */}
          <aside className="lg:col-span-5 lg:sticky lg:top-20 space-y-8">
            <div className="academic-card bg-white">
              <span className="eyebrow-label block mb-2">Resumen del Caso</span>
              <h2 className="card-title mb-6">Indicadores Clave</h2>

              {/* Metrics */}
              <div className="space-y-4 mb-6">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-[#1A1A2E]">
                    <span>Atención Sostenida</span>
                    <span className="font-bold text-[#DC2626]">{widths.atencion}%</span>
                  </div>
                  <div className="w-full bg-[#F0F0F4] h-2 rounded-full overflow-hidden">
                    <div style={{ width: `${widths.atencion}%` }} className="bg-[#DC2626] h-full rounded-full transition-all duration-700 ease-out" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-[#1A1A2E]">
                    <span>Memoria de Trabajo</span>
                    <span className="font-bold text-[#DC2626]">{widths.memoria}%</span>
                  </div>
                  <div className="w-full bg-[#F0F0F4] h-2 rounded-full overflow-hidden">
                    <div style={{ width: `${widths.memoria}%` }} className="bg-[#DC2626] h-full rounded-full transition-all duration-700 ease-out" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-[#1A1A2E]">
                    <span>Inhibición / Impulsividad</span>
                    <span className="font-bold text-[#E8A020]">{widths.inhibicion}%</span>
                  </div>
                  <div className="w-full bg-[#F0F0F4] h-2 rounded-full overflow-hidden">
                    <div style={{ width: `${widths.inhibicion}%` }} className="bg-[#E8A020] h-full rounded-full transition-all duration-700 ease-out" />
                  </div>
                </div>
              </div>

              {/* Separator */}
              <div className="border-t border-[#F0F0F4] my-6" />

              {/* Quick Data Ficha Rows */}
              <div className="space-y-0 mb-6">
                <div className="ficha-row py-2.5">
                  <span className="ficha-label">Diagnóstico</span>
                  <span className="ficha-value">TDAH Tipo Combinado</span>
                </div>
                <div className="ficha-row py-2.5">
                  <span className="ficha-label">Grado</span>
                  <span className="ficha-value">4to de Secundaria</span>
                </div>
                <div className="ficha-row py-2.5">
                  <span className="ficha-label">Área</span>
                  <span className="ficha-value">Matemática</span>
                </div>
                <div className="ficha-row py-2.5">
                  <span className="ficha-label">Apoyos</span>
                  <span className="ficha-value">3 ajustes razonables</span>
                </div>
              </div>

              {/* Separator */}
              <div className="border-t border-[#F0F0F4] my-6" />

              {/* Chip Enfoque */}
              <div className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#EEF2FF] border border-[#C7D2FE] px-4 py-3 text-xs font-semibold text-[#3730A3]">
                <CheckCircle className="h-4.5 w-4.5 text-[#2D9B6F]" />
                Enfoque DUA aplicado
              </div>
            </div>
          </aside>

        </div>
      </div>

    </div>
  );
}
