"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Percent,
  Clock,
  BookOpen,
  Users,
  CheckCircle,
  Calculator,
  HelpCircle,
  FileText,
  Bookmark,
  Award,
  Layers,
  Sparkles,
  Info,
  ChevronRight,
  TrendingUp,
  LayoutGrid
} from "lucide-react";

export default function Sesion5Page() {
  const [activeTab, setActiveTab] = useState("general");
  
  // Interactive evaluation list
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Identifica correctamente los datos del problema.", status: "none" },
    { id: 2, text: "Selecciona una estrategia pertinente (gráfica, operativa, digital).", status: "none" },
    { id: 3, text: "Resuelve correctamente el problema de porcentajes.", status: "none" },
    { id: 4, text: "Explica el procedimiento o razonamiento detrás de su solución.", status: "none" },
    { id: 5, text: "Participa colaborativamente en el trabajo grupal.", status: "none" },
  ]);

  const updateStatus = (id: number, status: "logrado" | "no_logrado") => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  const logradosCount = checklist.filter((item) => item.status === "logrado").length;
  const totalCount = checklist.length;
  const progressPercent = Math.round((logradosCount / totalCount) * 100);

  // Metacognition interactive card
  const [selectedMetaQuestion, setSelectedMetaQuestion] = useState<number | null>(null);
  const metaQuestions = [
    {
      id: 1,
      q: "¿Qué aprendí hoy sobre los porcentajes?",
      a: "Aprendí que representan partes de un total (100) y que se aplican a diario en rebajas, impuestos (como el IGV) y cobros de intereses bancarios. También a representarlos de forma gráfica y numérica."
    },
    {
      id: 2,
      q: "¿Qué estrategia de cálculo me resultó más útil?",
      a: "El uso de la hoja de cálculo y el material concreto me permitieron visualizar cómo el total cambia. Las tarjetas de color también ayudaron a separar el porcentaje del monto base."
    },
    {
      id: 3,
      q: "¿En qué situaciones o aspectos necesito seguir mejorando?",
      a: "En la lectura de problemas complejos que involucran descuentos sucesivos, donde debo evitar restar los porcentajes directamente y aplicar cada descuento sobre el saldo nuevo."
    }
  ];

  return (
    <div className="animate-fade-in-up">
      {/* MAIN LAYOUT CONTAINER */}
      <div className="max-w-7xl mx-auto px-8 py-10">
        
        {/* HEADER BLOCK */}
        <div className="mb-10 pb-6 border-b border-[#1E2A5E]/10">
          <nav className="text-xs text-[#6B7280] font-semibold mb-2 tracking-wider uppercase">
            <Link href="/" className="hover:text-[#1E2A5E] transition-colors">Inicio</Link> / Sesión 5
          </nav>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6F4EA] border border-[#A7F3D0] px-2.5 py-0.5 text-xs font-semibold text-[#2D9B6F] mb-2 uppercase">
                Matemática Inclusiva
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-[#1E2A5E]">
                Sesión 5: Porcentajes en Situaciones Cotidianas
              </h1>
              <p className="text-sm text-[#6B7280] mt-1 leading-relaxed max-w-3xl">
                Planificación docente flexible basada en el Diseño Universal para el Aprendizaje (DUA) para segundo grado de educación secundaria.
              </p>
            </div>
            <div className="text-xs font-semibold text-[#3730A3] uppercase tracking-widest bg-[#EEF2FF] border border-[#C7D2FE] px-3 py-1.5 rounded-md shrink-0">
              PLAN DE SESIÓN (DUA)
            </div>
          </div>
        </div>

        {/* INTERACTIVE TAB SYSTEM */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-[#F0F0F4] pb-4">
          <button
            onClick={() => setActiveTab("general")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === "general"
                ? "bg-[#1E2A5E] text-white shadow-sm"
                : "bg-white text-[#6B7280] border border-[#F0F0F4] hover:bg-[#F5F6FA] hover:text-[#1E2A5E]"
            }`}
          >
            <span className="flex items-center gap-2">
              <LayoutGrid className="h-3.5 w-3.5" />
              Datos & Propósito
            </span>
          </button>
          <button
            onClick={() => setActiveTab("didactica")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === "didactica"
                ? "bg-[#1E2A5E] text-white shadow-sm"
                : "bg-white text-[#6B7280] border border-[#F0F0F4] hover:bg-[#F5F6FA] hover:text-[#1E2A5E]"
            }`}
          >
            <span className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              Secuencia Didáctica
            </span>
          </button>
          <button
            onClick={() => setActiveTab("dua")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === "dua"
                ? "bg-[#1E2A5E] text-white shadow-sm"
                : "bg-white text-[#6B7280] border border-[#F0F0F4] hover:bg-[#F5F6FA] hover:text-[#1E2A5E]"
            }`}
          >
            <span className="flex items-center gap-2">
              <Layers className="h-3.5 w-3.5" />
              Estrategia DUA
            </span>
          </button>
          <button
            onClick={() => setActiveTab("evaluacion")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === "evaluacion"
                ? "bg-[#1E2A5E] text-white shadow-sm"
                : "bg-white text-[#6B7280] border border-[#F0F0F4] hover:bg-[#F5F6FA] hover:text-[#1E2A5E]"
            }`}
          >
            <span className="flex items-center gap-2">
              <Award className="h-3.5 w-3.5" />
              Evaluación & Ficha
            </span>
          </button>
        </div>

        {/* TAB CONTENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT/MAIN COLUMN (8 cols on large screens) */}
          <div className="lg:col-span-8 space-y-8">
            
            {activeTab === "general" && (
              <div className="space-y-6">
                {/* General Data Card */}
                <div className="academic-card bg-white">
                  <span className="eyebrow-label block mb-2">Diseño Universal</span>
                  <h2 className="card-title mb-4">Datos Generales de la Sesión</h2>
                  
                  <div className="space-y-0">
                    <div className="ficha-row">
                      <span className="ficha-label">Área / Asignatura</span>
                      <span className="ficha-value">Matemática</span>
                    </div>
                    <div className="ficha-row">
                      <span className="ficha-label">Grado y Sección</span>
                      <span className="ficha-value">2° de Secundaria</span>
                    </div>
                    <div className="ficha-row">
                      <span className="ficha-label">Tema Principal</span>
                      <span className="ficha-value text-right">Resolución de problemas con porcentajes</span>
                    </div>
                    <div className="ficha-row">
                      <span className="ficha-label">Duración Estimada</span>
                      <span className="ficha-value">90 minutos</span>
                    </div>
                    <div className="ficha-row">
                      <span className="ficha-label">Enfoque Pedagógico</span>
                      <span className="inline-block bg-[#EEF2FF] text-[#3730A3] border border-[#C7D2FE] rounded-full px-3 py-1 text-xs font-semibold">
                        Diseño Universal para el Aprendizaje (DUA)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Purpose Card */}
                <div className="academic-card bg-white">
                  <span className="eyebrow-label block mb-2">Propósito Pedagógico</span>
                  <h2 className="card-title mb-4">Propósito de Aprendizaje</h2>
                  <p className="text-sm text-[#1A1A2E] leading-relaxed mb-6">
                    Los estudiantes resuelven problemas contextualizados relacionados con descuentos, impuestos y aumentos porcentuales utilizando diversas estrategias. Demuestran sus aprendizajes mediante diferentes formas de representación y expresión, eliminando barreras para el aprendizaje conforme a los principios del DUA.
                  </p>
                  
                  <div className="border-t border-[#F0F0F4] pt-6">
                    <h3 className="text-xs font-extrabold text-[#1E2A5E] uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <Bookmark className="h-4 w-4 text-[#2D9B6F]" />
                      Competencia y Capacidades Evaluadas
                    </h3>
                    <div className="bg-[#F5F6FA] p-4.5 rounded-xl border border-[#1E2A5E]/8 space-y-3">
                      <p className="text-xs font-bold text-[#1E2A5E]">
                        Competencia: <span className="text-[#3730A3]">Resuelve problemas de cantidad</span>
                      </p>
                      <ul className="text-xs text-[#6B7280] space-y-2 list-disc pl-4">
                        <li><strong>Traduce cantidades</strong> a expresiones numéricas porcentuales.</li>
                        <li><strong>Comunica su comprensión</strong> de los porcentajes de forma verbal y gráfica.</li>
                        <li><strong>Usa estrategias y procedimientos</strong> de estimación y cálculo.</li>
                        <li><strong>Argumenta afirmaciones</strong> sobre las relaciones numéricas de aumento y descuento.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "didactica" && (
              <div className="space-y-6">
                <div className="academic-card bg-white">
                  <span className="eyebrow-label block mb-2">Desarrollo de la Clase</span>
                  <h2 className="card-title mb-6">Secuencia Didáctica (90 Minutos)</h2>
                  
                  <div className="relative border-l-2 border-[#1E2A5E]/10 pl-6 ml-4 space-y-8">
                    
                    {/* INICIO */}
                    <div className="relative">
                      {/* Timeline dot */}
                      <span className="absolute -left-[35px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#1E2A5E] text-white text-[10px] font-bold ring-4 ring-white">
                        1
                      </span>
                      <div className="bg-[#F8F9FC] border border-[#1E2A5E]/8 rounded-xl p-5 hover:border-[#1E2A5E]/20 transition-all">
                        <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
                          <h3 className="text-sm font-bold text-[#1E2A5E] uppercase">Momento 1: Inicio (Focalización)</h3>
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#3730A3] bg-[#EEF2FF] px-2.5 py-0.5 rounded-full">
                            <Clock className="h-3 w-3" />
                            15 min
                          </span>
                        </div>
                        <p className="text-xs text-[#1A1A2E] leading-relaxed mb-4">
                          El docente presenta un video corto sobre ofertas y rebajas en supermercados locales, muestra folletos publicitarios reales con descuentos y plantea la pregunta desafiante: <strong>¿Cuál de estas ofertas nos conviene más?</strong> Se recuperan saberes previos mediante preguntas directas, análisis de imágenes y el uso de tarjetas de opinión rápida.
                        </p>
                        <div className="bg-[#E6F4EA] border-l-4 border-[#2D9B6F] p-3.5 rounded-r-xl">
                          <span className="text-[10px] font-bold text-[#2D9B6F] uppercase tracking-wider block mb-1">
                            Aplicación del DUA (Compromiso)
                          </span>
                          <p className="text-[11px] text-[#1A1A2E] leading-normal">
                            Opciones flexibles para responder (de forma oral, por escrito o levantando tarjetas de colores); conexión de los conceptos matemáticos con experiencias comerciales de la vida real.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* DESARROLLO */}
                    <div className="relative">
                      {/* Timeline dot */}
                      <span className="absolute -left-[35px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#1E2A5E] text-white text-[10px] font-bold ring-4 ring-white">
                        2
                      </span>
                      <div className="bg-[#F8F9FC] border border-[#1E2A5E]/8 rounded-xl p-5 hover:border-[#1E2A5E]/20 transition-all">
                        <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
                          <h3 className="text-sm font-bold text-[#1E2A5E] uppercase">Momento 2: Desarrollo (Estrategias)</h3>
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#3730A3] bg-[#EEF2FF] px-2.5 py-0.5 rounded-full">
                            <Clock className="h-3 w-3" />
                            55 min
                          </span>
                        </div>
                        <p className="text-xs text-[#1A1A2E] leading-relaxed mb-4">
                          Los estudiantes se organizan en equipos heterogéneos para resolver problemas de la vida cotidiana que implican descuentos, cálculo del IGV (impuestos) y aumentos porcentuales. Pueden resolver empleando múltiples herramientas: calculadoras físicas, material manipulativo concreto (fichas cuadradas), hojas cuadriculadas para dibujo de cuadrículas del 100, o una hoja de cálculo digital. Cada equipo selecciona el formato para presentar y sustentar su resolución.
                        </p>
                        <div className="bg-[#EEF2FF] border-l-4 border-[#3730A3] p-3.5 rounded-r-xl">
                          <span className="text-[10px] font-bold text-[#3730A3] uppercase tracking-wider block mb-1">
                            Aplicación del DUA (Representación + Acción y Expresión)
                          </span>
                          <p className="text-[11px] text-[#1A1A2E] leading-normal">
                            Presentación del problema en múltiples formatos (texto narrativo simplificado, diagramas e imágenes explicativas). Los alumnos demuestran lo aprendido en el formato de su elección (afiche visual, explicación oral, resolución escrita paso a paso o diapositiva digital).
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* CIERRE */}
                    <div className="relative">
                      {/* Timeline dot */}
                      <span className="absolute -left-[35px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#1E2A5E] text-white text-[10px] font-bold ring-4 ring-white">
                        3
                      </span>
                      <div className="bg-[#F8F9FC] border border-[#1E2A5E]/8 rounded-xl p-5 hover:border-[#1E2A5E]/20 transition-all">
                        <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
                          <h3 className="text-sm font-bold text-[#1E2A5E] uppercase">Momento 3: Cierre (Metacognición)</h3>
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#3730A3] bg-[#EEF2FF] px-2.5 py-0.5 rounded-full">
                            <Clock className="h-3 w-3" />
                            20 min
                          </span>
                        </div>
                        <p className="text-xs text-[#1A1A2E] leading-relaxed mb-4">
                          Los equipos socializan las diferentes estrategias empleadas. Realizan un ejercicio de autoevaluación cooperativa y completan de forma individual o grupal una ficha reflexiva de metacognición.
                        </p>
                        <div className="bg-[#FEF3C7] border-l-4 border-[#D97706] p-3.5 rounded-r-xl">
                          <span className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider block mb-1">
                            Aplicación del DUA (Autorregulación)
                          </span>
                          <p className="text-[11px] text-[#1A1A2E] leading-normal">
                            Fomento de la autorregulación a través de la reflexión sobre sus fortalezas, las dificultades encontradas y las estrategias de resolución que mejor les funcionaron.
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {activeTab === "dua" && (
              <div className="space-y-6">
                {/* Detailed DUA Principles Card */}
                <div className="academic-card bg-white">
                  <span className="eyebrow-label block mb-2">Enfoque DUA</span>
                  <h2 className="card-title mb-6">Atención a la Diversidad por Principios DUA</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Compromiso */}
                    <div className="border border-[#F0F0F4] rounded-xl p-5 hover:border-[#2D9B6F]/20 hover:bg-[#EFF8F4]/20 transition-all">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="h-9 w-9 rounded-lg bg-[#E6F4EA] text-[#2D9B6F] flex items-center justify-center">
                          <Sparkles className="h-4.5 w-4.5" />
                        </div>
                        <h3 className="text-sm font-bold text-[#1E2A5E] uppercase tracking-wide">Múltiples formas de Compromiso</h3>
                      </div>
                      <p className="text-xs text-[#6B7280] leading-relaxed">
                        Fomento de la motivación mediante la libertad de elección en la forma de realizar las tareas, uso de ejemplos prácticos muy cercanos a su vida diaria (supermercados y compras) y estructuración de trabajo colaborativo con roles definidos para mitigar la frustración.
                      </p>
                    </div>

                    {/* Representación */}
                    <div className="border border-[#F0F0F4] rounded-xl p-5 hover:border-[#3730A3]/20 hover:bg-[#EEF2FF]/20 transition-all">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="h-9 w-9 rounded-lg bg-[#EEF2FF] text-[#3730A3] flex items-center justify-center">
                          <BookOpen className="h-4.5 w-4.5" />
                        </div>
                        <h3 className="text-sm font-bold text-[#1E2A5E] uppercase tracking-wide">Múltiples formas de Representación</h3>
                      </div>
                      <p className="text-xs text-[#6B7280] leading-relaxed">
                        Presentación de la información de forma diversa: soportes en video comercial, folletos físicos impresos a color con números grandes, explicaciones orales pausadas y modelado visual concreto utilizando cuadrículas base 100 para ilustrar físicamente los porcentajes.
                      </p>
                    </div>

                    {/* Acción y Expresión */}
                    <div className="border border-[#F0F0F4] rounded-xl p-5 hover:border-[#2563EB]/20 hover:bg-[#DBEAFE]/20 transition-all">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="h-9 w-9 rounded-lg bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center">
                          <Calculator className="h-4.5 w-4.5" />
                        </div>
                        <h3 className="text-sm font-bold text-[#1E2A5E] uppercase tracking-wide">Múltiples de Acción y Expresión</h3>
                      </div>
                      <p className="text-xs text-[#6B7280] leading-relaxed">
                        Flexibilidad en el canal para evidenciar la comprensión: resolución escrita tradicional, diseño de un afiche gráfico conceptual, exposición oral rápida ante sus pares, o uso de herramientas informáticas como una hoja de cálculo con fórmulas aplicadas.
                      </p>
                    </div>

                    {/* Ajustes Razonables */}
                    <div className="border border-[#F0F0F4] rounded-xl p-5 hover:border-[#D97706]/20 hover:bg-[#FEF3C7]/20 transition-all">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="h-9 w-9 rounded-lg bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
                          <Info className="h-4.5 w-4.5" />
                        </div>
                        <h3 className="text-sm font-bold text-[#1E2A5E] uppercase tracking-wide">Ajustes Razonables Específicos</h3>
                      </div>
                      <p className="text-xs text-[#6B7280] leading-relaxed">
                        Oportunidad de tiempo adicional para estudiantes que lo requieran, apoyo coordinado entre compañeros (aprendizaje tutorado), entrega de consignas de problemas en enunciados cortos y directos, y retroalimentación formativa personalizada del docente durante el desarrollo.
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {activeTab === "evaluacion" && (
              <div className="space-y-6">
                
                {/* Rubric interactive block */}
                <div className="academic-card bg-white">
                  <span className="eyebrow-label block mb-2">Instrumento de Evaluación</span>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
                    <h2 className="card-title">Lista de Cotejo para la Sesión</h2>
                    
                    {/* Live indicator of success */}
                    <div className="flex items-center gap-2 text-xs font-bold text-[#2D9B6F] bg-[#E6F4EA] border border-[#A7F3D0] px-3 py-1 rounded-full">
                      <span>Evaluación: {progressPercent}% Logrado</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#6B7280] mb-6 leading-relaxed">
                    Usa esta lista para evaluar el proceso en tiempo real. Marca el estado de cada criterio para observar el avance de la competencia de forma interactiva:
                  </p>

                  <div className="space-y-3">
                    {checklist.map((item) => (
                      <div
                        key={item.id}
                        className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 transition-colors ${
                          item.status === "logrado"
                            ? "bg-[#EFF8F4] border-[#A7F3D0]"
                            : item.status === "no_logrado"
                            ? "bg-[#FFF5F5] border-[#FECACA]"
                            : "bg-[#F5F6FA] border-[#F0F0F4]"
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <CheckCircle className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${
                            item.status === "logrado"
                              ? "text-[#2D9B6F]"
                              : item.status === "no_logrado"
                              ? "text-[#DC2626]"
                              : "text-[#D1D5DB]"
                          }`} />
                          <span className="text-xs font-semibold text-[#1A1A2E] leading-normal">{item.text}</span>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <button
                            onClick={() => updateStatus(item.id, "logrado")}
                            className={`text-[10px] font-bold px-3 py-1 rounded-md transition-colors cursor-pointer border ${
                              item.status === "logrado"
                                ? "bg-[#2D9B6F] border-[#2D9B6F] text-white"
                                : "bg-white border-[#D1D5DB] text-[#6B7280] hover:bg-[#F5F6FA]"
                            }`}
                          >
                            Logrado
                          </button>
                          <button
                            onClick={() => updateStatus(item.id, "no_logrado")}
                            className={`text-[10px] font-bold px-3 py-1 rounded-md transition-colors cursor-pointer border ${
                              item.status === "no_logrado"
                                ? "bg-[#DC2626] border-[#DC2626] text-white"
                                : "bg-white border-[#D1D5DB] text-[#6B7280] hover:bg-[#F5F6FA]"
                            }`}
                          >
                            No Logrado
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Progress bar visual */}
                  <div className="mt-6 pt-4 border-t border-[#F0F0F4] space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-[#1E2A5E]">
                      <span>Progreso de Logro</span>
                      <span>{progressPercent}%</span>
                    </div>
                    <div className="w-full bg-[#F0F0F4] h-2 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${progressPercent}%` }}
                        className="bg-[#2D9B6F] h-full rounded-full transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Metacognition interactive card */}
                <div className="academic-card bg-white">
                  <span className="eyebrow-label block mb-2">Metacognición</span>
                  <h2 className="card-title mb-3">Ficha de Reflexión</h2>
                  <p className="text-xs text-[#6B7280] mb-6 leading-relaxed">
                    Haz clic en una de las preguntas de metacognición para ver un ejemplo de respuesta reflexiva formulada por los estudiantes:
                  </p>

                  <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
                    {metaQuestions.map((q) => (
                      <button
                        key={q.id}
                        onClick={() => setSelectedMetaQuestion(selectedMetaQuestion === q.id ? null : q.id)}
                        className={`text-left p-4.5 rounded-xl border transition-all cursor-pointer ${
                          selectedMetaQuestion === q.id
                            ? "bg-[#EEF2FF] border-[#C7D2FE] shadow-sm"
                            : "bg-white border-[#F0F0F4] hover:bg-[#F5F6FA] hover:border-[#D1D5DB]"
                        }`}
                      >
                        <span className="text-[10px] font-bold text-[#3730A3] uppercase block mb-2">Pregunta {q.id}</span>
                        <h4 className="text-xs font-bold text-[#1E2A5E] leading-snug mb-1">{q.q}</h4>
                        <span className="text-[10px] text-[#6B7280] flex items-center gap-1.5 mt-3 border-t border-[#F0F0F4]/40 pt-2 font-semibold">
                          Ver Respuesta <ChevronRight className={`h-3.5 w-3.5 transition-transform duration-200 ${
                            selectedMetaQuestion === q.id ? "rotate-90" : ""
                          }`} />
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Panel response container */}
                  {selectedMetaQuestion !== null && (
                    <div className="mt-4 p-4.5 rounded-xl bg-[#EEF2FF]/50 border border-[#C7D2FE]/60 text-xs animate-fade-in-up">
                      <h4 className="font-extrabold text-[#3730A3] uppercase tracking-wider mb-1.5">
                        Ejemplo de Respuesta - Pregunta {selectedMetaQuestion}:
                      </h4>
                      <p className="text-[#1A1A2E] leading-relaxed font-medium italic">
                        &ldquo;{metaQuestions.find((q) => q.id === selectedMetaQuestion)?.a}&rdquo;
                      </p>
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>

          {/* RIGHT COLUMN - ASIDE SUMMARY (4 cols on large screens) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-20 space-y-8">
            
            {/* Session Metadata Summary Card */}
            <div className="academic-card bg-white">
              <span className="eyebrow-label block mb-2">Resumen de Sesión</span>
              <h2 className="card-title mb-6">Detalles de Planificación</h2>

              {/* Ficha info */}
              <div className="space-y-0 mb-6">
                <div className="ficha-row py-2.5">
                  <span className="ficha-label">Tema</span>
                  <span className="ficha-value text-right max-w-[180px] truncate" title="Porcentajes cotidianos">Porcentajes</span>
                </div>
                <div className="ficha-row py-2.5">
                  <span className="ficha-label">Grado</span>
                  <span className="ficha-value">2° de Secundaria</span>
                </div>
                <div className="ficha-row py-2.5">
                  <span className="ficha-label">Duración</span>
                  <span className="ficha-value">90 minutos</span>
                </div>
                <div className="ficha-row py-2.5">
                  <span className="ficha-label">Instrumento</span>
                  <span className="ficha-value">Lista de Cotejo</span>
                </div>
              </div>

              {/* Separator */}
              <div className="border-t border-[#F0F0F4] my-6" />

              {/* Learning Evidence Box */}
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
                  Evidencia de Aprendizaje
                </span>
                <div className="bg-[#F8F9FC] border border-[#1E2A5E]/8 rounded-xl p-4 flex gap-3">
                  <FileText className="h-5 w-5 text-[#3730A3] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#1E2A5E]">Caso Práctico Evaluado</h4>
                    <p className="text-[11px] text-[#6B7280] mt-1 leading-relaxed">
                      Resolución del caso de aumento/descuento porcentual expresado mediante afiche, exposición, reporte escrito u hoja Excel.
                    </p>
                  </div>
                </div>
              </div>

              {/* Separator */}
              <div className="border-t border-[#F0F0F4] my-6" />

              {/* Enfoque DUA badge */}
              <div className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#EEF2FF] border border-[#C7D2FE] px-4 py-3 text-xs font-semibold text-[#3730A3]">
                <CheckCircle className="h-4.5 w-4.5 text-[#2D9B6F]" />
                Enfoque DUA Obligatorio
              </div>
            </div>

            {/* BAP Mitigated box */}
            <div className="academic-card bg-[#1E2A5E] text-white">
              <span className="text-[11px] font-bold text-[#E8A020] uppercase tracking-widest block mb-2">
                Barreras Mitigadas (BAP)
              </span>
              <h3 className="text-base font-extrabold text-white leading-tight mb-4">
                ¿Qué obstáculos del aula eliminamos en esta sesión?
              </h3>
              
              <div className="space-y-3 text-xs text-white/80">
                <div className="flex gap-2">
                  <div className="h-4.5 w-4.5 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5 font-bold">✓</div>
                  <p><strong>Ritmos de aprendizaje:</strong> Apoyo mediante tutoría de pares y flexibilidad de tiempo.</p>
                </div>
                <div className="flex gap-2">
                  <div className="h-4.5 w-4.5 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5 font-bold">✓</div>
                  <p><strong>Dificultad lectora:</strong> Problemas presentados con imágenes y enunciados directos.</p>
                </div>
                <div className="flex gap-2">
                  <div className="h-4.5 w-4.5 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5 font-bold">✓</div>
                  <p><strong>Ansiedad matemática:</strong> Reducción del estrés operativo al permitir calculadora y hoja de cálculo.</p>
                </div>
                <div className="flex gap-2">
                  <div className="h-4.5 w-4.5 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5 font-bold">✓</div>
                  <p><strong>Comunicación de respuestas:</strong> Libertad de demostrar el aprendizaje en 4 formatos distintos.</p>
                </div>
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}
