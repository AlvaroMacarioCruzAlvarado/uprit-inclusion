"use client";

import { useState } from "react";
import { FileText, Download, AlertCircle, Layers, TableProperties } from "lucide-react";

export default function BapPage() {
  const [andreaError, setAndreaError] = useState(false);
  const columnas = [
    "Dimensión de la BAP",
    "Evidencia Observable en el Entorno",
    "Nivel de Impacto",
    "Actor Responsable",
    "Acción de Respuesta Inclusiva (Enfoque DUA)",
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
                Mapeo de Barreras (BAP)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-indigo/10 border border-brand-indigo/20 px-3.5 py-1 text-[10px] font-bold text-brand-indigo uppercase tracking-widest">
                Estudiante: Andrea R.
              </span>
            </div>
            
            <h1 className="text-3xl font-black text-white tracking-tight sm:text-4xl md:text-5xl uppercase">
              Matriz de Mapeo Estructurado de BAP
            </h1>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed max-w-3xl">
              Identificación de Barreras para el Aprendizaje y la Participación (BAP) para Andrea R. (4.º de Secundaria) 
              con el fin de programar las respuestas curriculares DUA y apoyos de adaptabilidad.
            </p>
          </div>

          <div className="text-[10px] font-semibold text-text-muted uppercase tracking-widest">
            DIAGNÓSTICO PSICOPEDAGÓGICO • BAP
          </div>
        </div>

        {/* Action / Document Card with Image */}
        <div className="grid gap-6 md:grid-cols-12 mb-12 items-center">
          {/* Text and Actions (8 cols) */}
          <div className="md:col-span-8 glass-card rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full border border-white/5">
            <div>
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-brand-teal shadow-inner flex-shrink-0">
                  <FileText className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    Matriz de Diagnóstico y Planificación — Andrea R.
                  </h2>
                  <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                    El análisis de evidencias áulicas, el nivel de impacto de cada BAP y las directrices del DUA 
                    para Andrea R. se encuentran detallados en el informe técnico en PDF adjunto.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5">
              <a
                href="https://www.gomesyjaratranspot.com/documentos/CASO%20DE%20ANDREA-GRUPO3.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-teal px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-bg-dark shadow-lg shadow-brand-teal/20 hover:bg-teal-400 transition-colors cursor-pointer"
              >
                <Download className="h-4.5 w-4.5 text-bg-dark" />
                Descargar Caso Andrea PDF
              </a>
            </div>
          </div>

          {/* Student Case image (4 cols) */}
          <div className="md:col-span-4 h-full">
            <div className="relative h-48 md:h-56 w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg">
              {!andreaError ? (
                <img
                  src="/images/andrea-bap.jpg"
                  alt="Caso Andrea R. - Barreras de Aprendizaje"
                  onError={() => setAndreaError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-brand-indigo/30 via-bg-dark to-brand-teal/20 p-6 text-center">
                  <TableProperties className="h-10 w-10 text-brand-teal mb-2" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Ilustración Caso Andrea</h3>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table Section */}
        <section aria-labelledby="table-title">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-brand-teal" />
              <h2 id="table-title" className="text-xs font-bold uppercase tracking-widest text-white">
                Estructura de la Matriz BAP
              </h2>
            </div>
            <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
              5 Columnas de Diagnóstico
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/5 bg-white/[0.01] shadow-2xl">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5">
                  {columnas.map((col, idx) => (
                    <th
                      key={idx}
                      className="p-4.5 text-xs font-bold uppercase tracking-wider text-white border-r border-white/5 last:border-r-0"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {[
                  "Física / Arquitectónica",
                  "Pedagógica / Curricular",
                  "Social / Actitudinal",
                ].map((dim, rowIdx) => (
                  <tr key={rowIdx}>
                    <td className="p-5 font-bold text-white border-r border-white/5 bg-white/[0.005]">
                      {dim}
                    </td>
                    <td
                      colSpan={4}
                      className="p-5 text-center text-text-secondary italic border-r border-white/5 last:border-0 bg-white/[0.002]"
                    >
                      <div className="flex items-center justify-center gap-1.5 text-xs">
                        <AlertCircle className="h-4 w-4 text-brand-teal/80" />
                        <span>Ver datos completos en el documento PDF adjunto.</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
