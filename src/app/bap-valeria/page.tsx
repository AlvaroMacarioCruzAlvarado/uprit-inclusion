"use client";

import Link from "next/link";
import { Layers, Download, FileText, CheckCircle } from "lucide-react";

export default function BapValeriaPage() {
  const cards = [
    {
      dimLabel: "POLÍTICA · Gestión y Organización",
      dimBg: "bg-[#EEF2FF] text-[#3730A3] border-[#C7D2FE]",
      evidencia: "No se observan adaptaciones curriculares ni ajustes en la programación para la estudiante. Las evaluaciones mantienen las mismas condiciones para todo el grupo.",
      impactoLabel: "ALTO",
      impactoStyle: "bg-[#FEE2E2] text-[#DC2626] border-[#FECACA]",
      actor: "Equipo directivo, docente de Matemática y área psicopedagógica.",
      accionDua: "Diseñar ajustes razonables en planificación y evaluación: flexibilidad en tiempos, instrumentos y criterios de valoración, más seguimiento permanente."
    },
    {
      dimLabel: "CULTURAL · Actitudes y Creencias",
      dimBg: "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]",
      evidencia: "Persisten ideas que relacionan las dificultades matemáticas con falta de dedicación, afectando la confianza y participación.",
      impactoLabel: "MEDIO-ALTO",
      impactoStyle: "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]",
      actor: "Docentes, estudiantes y familia.",
      accionDua: "Fortalecer cultura inclusiva mediante sensibilización, reconocimiento de diferencias individuales, trabajo colaborativo y valoración de avances."
    },
    {
      dimLabel: "PRÁCTICA · Metodológica",
      dimBg: "bg-[#FEE2E2] text-[#DC2626] border-[#FCA5A5]",
      evidencia: "La enseñanza se centra en procedimientos abstractos y ejercicios escritos, con escaso empleo de recursos concretos y visuales.",
      impactoLabel: "ALTO",
      impactoStyle: "bg-[#FEE2E2] text-[#DC2626] border-[#FECACA]",
      actor: "Docente de Matemática.",
      accionDua: "Aplicar DUA con diversas formas de presentar información, diferentes maneras de resolver y demostrar aprendizajes. Actividades significativas, materiales manipulativos y retroalimentación continua."
    },
    {
      dimLabel: "PRÁCTICA · Comunicacional",
      dimBg: "bg-[#DBEAFE] text-[#2563EB] border-[#BFDBFE]",
      evidencia: "Consignas extensas con terminología compleja. Poca verificación de comprensión antes de iniciar tareas.",
      impactoLabel: "MEDIO",
      impactoStyle: "bg-[#DBEAFE] text-[#2563EB] border-[#BFDBFE]",
      actor: "Docente de Matemática.",
      accionDua: "Instrucciones simples y secuenciales con ejemplos, imágenes y organizadores gráficos. Comprobar comprensión antes del trabajo independiente."
    }
  ];

  return (
    <div className="animate-fade-in-up">
      
      {/* MAIN CONTAINER */}
      <div className="max-w-4xl mx-auto px-8 py-10">
        
        {/* Breadcrumb */}
        <nav className="text-xs text-[#6B7280] font-semibold mb-4 tracking-wider uppercase">
          <Link href="/" className="hover:text-[#1E2A5E] transition-colors">Inicio</Link> / BAP Valeria
        </nav>

        {/* Table Header block */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#1E2A5E]/10 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#1E2A5E] uppercase tracking-tight">
              Matriz BAP — Valeria R.
            </h1>
            <p className="text-xs text-[#6B7280] font-medium mt-1">
              Estudiante: Valeria R. | Diagnóstico: TDAH Tipo Combinado | Grado: 4to de Secundaria
            </p>
          </div>
          
          <a
            href="/documentos/CASO_VALERIA.docx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#1E2A5E] hover:bg-[#2D3E82] text-xs font-bold uppercase tracking-wider text-white px-5 py-3 transition-colors cursor-pointer"
          >
            <Download className="h-4 w-4" />
            Descargar Matriz
          </a>
        </div>

        {/* Stacked Cards Layout */}
        <div className="space-y-6">
          {cards.map((card, idx) => (
            <div key={idx} className="academic-card bg-white space-y-5">
              
              {/* ZONA 1: DIMENSIÓN */}
              <div>
                <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${card.dimBg}`}>
                  {card.dimLabel}
                </span>
              </div>

              {/* ZONAS 2, 3, 4: EVIDENCIA, IMPACTO, ACTOR */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2 pb-2 border-t border-[#F0F0F4]">
                
                {/* Evidencia (7 cols) */}
                <div className="md:col-span-6 space-y-1">
                  <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
                    Evidencia Observable en el Entorno
                  </span>
                  <p className="text-xs text-[#1A1A2E] leading-relaxed">
                    {card.evidencia}
                  </p>
                </div>

                {/* Impacto (2 cols) */}
                <div className="md:col-span-3 space-y-1">
                  <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
                    Impacto
                  </span>
                  <div>
                    <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wide border ${card.impactoStyle}`}>
                      {card.impactoLabel}
                    </span>
                  </div>
                </div>

                {/* Actor (3 cols) */}
                <div className="md:col-span-3 space-y-1">
                  <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
                    Actor Responsable
                  </span>
                  <p className="text-xs text-[#1A1A2E] font-semibold leading-relaxed">
                    {card.actor}
                  </p>
                </div>

              </div>

              {/* ZONA 5: ACCIÓN DUA */}
              <div className="bg-[#F0FDF4] border-l-4 border-[#2D9B6F] p-4.5 rounded-r-xl">
                <span className="text-[11px] font-bold text-[#2D9B6F] uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-[#2D9B6F]" />
                  Acción de Respuesta Inclusiva (Enfoque DUA)
                </span>
                <p className="text-xs text-[#1A1A2E] leading-relaxed">
                  {card.accionDua}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
