"use client";

import { useState } from "react";
import {
  FileText,
  Download,
  BookOpen,
  Award,
  Layers,
  UserCheck,
  CheckCircle,
  ShieldCheck,
  Landmark,
} from "lucide-react";

export default function NormativaPage() {
  const [logoError, setLogoError] = useState(false);
  const [docenteError, setDocenteError] = useState(false);
  const pilares = [
    {
      title: "Enfoque Inclusivo y Educación de Calidad",
      desc: "Garantiza el derecho a la educación de calidad para todos, reconociendo la diversidad como un valor y no como un obstáculo.",
    },
    {
      title: "Cumplimiento del DUA",
      desc: "Establece el Diseño Universal para el Aprendizaje como marco pedagógico obligatorio para flexibilizar la enseñanza.",
    },
    {
      title: "Normativa Vigente (MINEDU)",
      desc: "Adhesión obligatoria a los decretos y resoluciones sectoriales nacionales que regulan la accesibilidad y apoyos.",
    },
  ];

  const piramide = [
    {
      level: "Nivel I",
      name: "Marco Internacional (Rango Constitucional)",
      docs: "CDPD-ONU (2006) + Observación General N° 4",
      desc: "Declara que excluir o segregar a un estudiante en el aula constituye una violación explícita de sus derechos humanos.",
      glow: "border-brand-teal/30 hover:border-brand-teal/50 shadow-brand-teal/5",
    },
    {
      level: "Nivel II",
      name: "Constitución Política",
      docs: "Constitución Política del Perú",
      desc: "Consagra el derecho universal a la educación y el desarrollo de la persona en igualdad de condiciones.",
      glow: "border-brand-indigo/30 hover:border-brand-indigo/50 shadow-brand-indigo/5",
    },
    {
      level: "Nivel III",
      name: "Leyes Nacionales",
      docs: "Ley N° 28044 / Ley N° 29973 / Ley N° 30797",
      desc: "Ley N° 28044 Art. 8 establece principio de Inclusión. Ley N° 29973 Art. 36 garantiza educación inclusiva y ajustes razonables obligatorios.",
      glow: "border-brand-coral/30 hover:border-brand-coral/50 shadow-brand-coral/5",
    },
    {
      level: "Nivel IV",
      name: "Decretos y Resoluciones Sectoriales",
      docs: "D.S. N° 007-2021-MINEDU / R.V.M. N° 041-2024 / RVM N° 094-2020",
      desc: "D.S. N° 007-2021 aprueba Reglamento y crea el SAE. R.V.M. N° 041-2024 regula el SAE. RVM N° 094-2020 pauta evaluación de competencias.",
      glow: "border-white/10 hover:border-white/20",
    },
  ];

  const practicas = [
    {
      title: "Adaptaciones Flexibles",
      desc: "Modificación de metodologías, tiempos y formatos de entrega curriculares.",
    },
    {
      title: "Co-enseñanza",
      desc: "Coordinación docente regular con el SAE para planificar y evaluar apoyos específicos.",
    },
    {
      title: "Accesibilidad Integral",
      desc: "Garantizar espacios físicos áulicos y plataformas web libres de barreras de comunicación.",
    },
  ];

  const documentos = [
    {
      title: "Ley General de Educación",
      subtitle: "Ley N.º 28044",
      url: "https://www.gomesyjaratranspot.com/documentos/ley-28044.pdf.pdf",
    },
    {
      title: "Ley de la Persona con Discapacidad",
      subtitle: "Ley N.º 29973",
      url: "https://www.gomesyjaratranspot.com/documentos/ley-29973.pdf.pdf",
    },
    {
      title: "Promoción de la Educación Inclusiva",
      subtitle: "Ley N.º 30797",
      url: "https://www.gomesyjaratranspot.com/documentos/ley-30797.pdf.pdf",
    },
    {
      title: "Reglamento Educación Inclusiva",
      subtitle: "D.S. N.º 007-2021-MINEDU",
      url: "https://www.gomesyjaratranspot.com/documentos/ds-007-2021.pdf.pdf",
    },
    {
      title: "Guías de Orientación Educativa",
      subtitle: "R.M. N.º 432-2022-MINEDU",
      url: "https://www.gomesyjaratranspot.com/documentos/rm-432-2022.pdf.pdf",
    },
    {
      title: "SAE Directivas y Protocolos",
      subtitle: "R.V.M. N.º 041-2024-MINEDU",
      url: "https://www.gomesyjaratranspot.com/documentos/rvm-041-2024.pdf.pdf",
    },
  ];

  const pasosSofia = [
    {
      step: "Paso 1",
      title: "El Derecho a la Matrícula (Acceso Incondicional)",
      base: "Ley N° 28044 + Ley N° 30797",
      analysis: "La escuela regular está obligada a reservar vacantes e inscribir a Sofía. Quedan terminantemente prohibidas las pruebas de selección o informes psicológicos excluyentes.",
    },
    {
      step: "Paso 2",
      title: "Evaluación Psicopedagógica (Fortalezas y Barreras)",
      base: "Decreto Supremo N° 007-2021-MINEDU",
      analysis: "Se realiza un diagnóstico de barreras físicas y del entorno escolar. Se elabora su Plan de Orientación Individual (POI) ordenando apoyos específicos (lengua de señas y agendas visuales).",
    },
    {
      step: "Paso 3",
      title: "Activación del SAE (Acompañamiento)",
      base: "R.V.M. N° 041-2024-MINEDU",
      analysis: "El SAE institucional capacitado por el MINEDU asesora directamente al docente a cargo, estructurando las dinámicas y materiales necesarios para garantizar su inclusión.",
    },
  ];

  return (
    <div className="relative overflow-hidden min-h-screen py-12 md:py-16 animate-fade-in-up">
      {/* Decorative Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header with Logo */}
        <div className="border-b border-white/5 pb-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex items-center gap-4">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 overflow-hidden shadow-inner flex-shrink-0">
              {!logoError ? (
                <img
                  src="/images/logoUPRIT.png"
                  alt="Logo UPRIT"
                  onError={() => setLogoError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-brand-indigo/10 text-brand-teal">
                  <Landmark className="h-6 w-6" />
                </div>
              )}
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-teal/10 border border-brand-teal/20 px-3 py-1 text-[9px] font-bold text-brand-teal uppercase tracking-widest mb-1.5">
                Facultad de Educación — Unidad de Posgrado
              </span>
              <h1 className="text-3xl font-black text-white tracking-tight sm:text-4xl uppercase">
                Marco Normativo de Inclusión en Perú
              </h1>
            </div>
          </div>

          <div className="text-[10px] font-semibold text-text-muted uppercase tracking-widest">
            UPRIT ACADÉMICO • NORMATIVA NACIONAL
          </div>
        </div>

        {/* Section 1: Three Pillars */}
        <section className="mb-16" aria-labelledby="pillars-title">
          <div className="grid gap-6 md:grid-cols-3">
            {pilares.map((pil, idx) => (
              <div key={idx} className="glass-card rounded-xl p-6 border border-white/5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-teal/10 border border-brand-teal/20 text-brand-teal mb-4">
                  <Award className="h-5.5 w-5.5" />
                </div>
                <h3 className="text-sm font-bold text-white tracking-tight mb-2">
                  {pil.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {pil.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Pyramid Normativa */}
        <section className="mb-16" aria-labelledby="pyramid-title">
          <div className="flex items-center gap-2.5 mb-8">
            <Layers className="h-5 w-5 text-brand-teal" />
            <h2 id="pyramid-title" className="text-xs font-bold uppercase tracking-widest text-white">
              Pirámide Normativa del Derecho Inclusivo
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {piramide.map((pir, idx) => (
              <div
                key={idx}
                className={`glass-card rounded-xl border p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 ${pir.glow}`}
              >
                <div>
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-brand-teal block mb-1">
                    {pir.level}
                  </span>
                  <h3 className="text-sm font-bold text-white leading-tight mb-3">
                    {pir.name}
                  </h3>
                  <p className="text-xs font-bold text-brand-indigo mb-3 leading-snug">
                    {pir.docs}
                  </p>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {pir.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Rol del Docente (with Image) & Prácticas Clave */}
        <section className="grid gap-8 lg:grid-cols-12 mb-16 items-start">
          
          {/* Docente / Garante (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card rounded-2xl overflow-hidden border border-white/5 shadow-2xl flex flex-col md:flex-row items-center gap-6 p-6">
              <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                {!docenteError ? (
                  <img
                    src="/images/docente-garante.jpg"
                    alt="Educador Garante de la Educación Inclusiva"
                    onError={() => setDocenteError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-brand-indigo/20 text-brand-indigo">
                    <UserCheck className="h-10 w-10" />
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <UserCheck className="h-5 w-5 text-brand-teal" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-brand-teal">
                    Rol del Docente Garante
                  </h3>
                </div>
                <blockquote className="text-xs italic leading-relaxed text-text-primary">
                  &ldquo;El educador peruano actual no solo imparte conocimientos, sino que es el garante operativo 
                  del derecho a la educación. Su misión legal y pedagógica es eliminar barreras mediante el DUA, 
                  articulando los apoyos específicos necesarios para asegurar el progreso de cada estudiante.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>

          {/* Prácticas Grid (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-2 block">
              Prácticas Inclusivas Clave
            </h3>
            
            <div className="space-y-3">
              {practicas.map((pr, idx) => (
                <div key={idx} className="glass-card rounded-xl p-4.5">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                    {idx + 1}. {pr.title}
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {pr.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* Section 4: Repositorio de Documentos */}
        <section className="mb-16" aria-labelledby="repositorio-title">
          <div className="flex items-center gap-2.5 mb-6">
            <FileText className="h-5 w-5 text-brand-teal" />
            <h2 id="repositorio-title" className="text-xs font-bold uppercase tracking-widest text-white">
              Repositorio de Documentos Oficiales (MINEDU)
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {documentos.map((doc, idx) => (
              <div
                key={idx}
                className="glass-card rounded-xl p-5 border border-white/5 flex flex-col justify-between hover:border-brand-indigo/20 transition-all"
              >
                <div>
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-text-muted">
                    {doc.subtitle}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-1.5 leading-tight">
                    {doc.title}
                  </h3>
                </div>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center gap-1.5 text-xs font-bold text-brand-teal hover:text-teal-400 transition-colors w-fit border-t border-white/5 pt-3.5 w-full cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  Descargar Documento PDF
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Caso Práctico Sofía (TEA + auditiva) */}
        <section className="glass-card rounded-2xl p-8 border border-white/5" aria-labelledby="caso-practico-title">
          <div className="flex items-center gap-2.5 mb-4">
            <ShieldCheck className="h-5 w-5 text-brand-teal" />
            <h2 id="caso-practico-title" className="text-xs font-bold uppercase tracking-widest text-white">
              Caso Práctico Inclusivo: Caso Sofía (TEA)
            </h2>
          </div>
          <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-6">
            Perfil: Sofía, 8 años, diagnóstico TEA + discapacidad auditiva moderada
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {pasosSofia.map((paso, idx) => (
              <div key={idx} className="rounded-xl border border-white/5 bg-white/[0.01] p-5">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-brand-teal px-2.5 py-1 rounded bg-brand-teal/5 border border-brand-teal/10 inline-block mb-3">
                  {paso.step}
                </span>
                <h3 className="text-sm font-bold text-white leading-tight mb-1">
                  {paso.title}
                </h3>
                <p className="text-[9px] font-bold text-brand-indigo mb-3 uppercase tracking-wider">
                  Base: {paso.base}
                </p>
                <div className="border-t border-white/5 pt-3.5">
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {paso.analysis}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
