"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, GraduationCap, Users, User, CheckCircle, Landmark } from "lucide-react";

export default function Home() {
  const [logoError, setLogoError] = useState(false);

  const integrantes = [
    { initials: "AS", name: "Alex Salvatierra", order: "01" },
    { initials: "CE", name: "Cruz Eder", order: "02" },
    { initials: "DC", name: "Dante Chavesta Rodriguez", order: "03" },
    { initials: "MF", name: "Marco Ferre Paulo Cesar", order: "04" },
    { initials: "RS", name: "Ramirez Sullca Charle Elmer", order: "05" },
    { initials: "RR", name: "Ricardo Antonio Rodriguez Montalvo", order: "06" },
    { initials: "SI", name: "Silvia Janina Iparraguirre Lecca", order: "07" },
  ];

  return (
    <div className="animate-fade-in-up">
      
      {/* HERO SECTION */}
      <section className="relative bg-[#1E2A5E] text-white py-4 md:py-4 overflow-hidden">
        {/* SVG Grid Pattern at 6% Opacity */}
        <div className="absolute inset-0 hero-grid-pattern opacity-6 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-8 flex flex-col items-center text-center">
          
          {/* Centered Logo (Previous request: logo in the center and of a good size) */}
          <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-3xl bg-white p-3.5 border border-white/20 shadow-xl flex items-center justify-center overflow-hidden mb-8">
            {!logoError ? (
              <img
                src="/images/logoUPRIT.png"
                alt="Logo UPRIT"
                onError={() => setLogoError(true)}
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-brand-indigo bg-brand-indigo/5">
                <Landmark className="h-16 w-16 text-[#1E2A5E]" />
              </div>
            )}
          </div>

          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/12 border border-white/20 px-4 py-1.5 text-xs font-semibold tracking-wider text-white mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2D9B6F] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2D9B6F]"></span>
            </span>
            Universidad Privada de Trujillo · Tarea N° 03
          </div>

          {/* H1 Title */}
          <h1 className="text-3xl md:text-5xl font-extrabold uppercase leading-tight tracking-tight text-white max-w-3xl mb-4">
            Atención a la <span className="text-[#E8A020]">Diversidad</span> e Inclusión Social
          </h1>

          {/* Subtitle/Paragraph */}
          <p className="text-sm md:text-base text-white/72 max-w-xl leading-relaxed mb-8">
            Análisis de casos prácticos con enfoque DUA y Marco Normativo Peruano.
            <br className="hidden sm:inline" /> Carrera: Educación Secundaria — Matemática e Informática.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              href="/caso-valeria"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2D9B6F] hover:bg-[#3BB882] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-colors"
            >
              Explorar Casos
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/bap-valeria"
              className="inline-flex items-center justify-center rounded-lg border border-white/25 hover:bg-white/5 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors"
            >
              Ver Matrices BAP
            </Link>
          </div>

          

        </div>
      </section>

      {/* MEMBERS SECTION */}
      <section className="py-16 md:py-24 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="eyebrow-label block mb-2">
            Presentación académica
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#1E2A5E] uppercase tracking-tight">
            Grupo 5 — Integrantes
          </h2>
          <p className="text-sm font-semibold text-[#1E2A5E] mt-2">
            Docente: Mgtr. Susana Caballero Bardales
          </p>
          
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] px-4 py-1.5 text-xs font-semibold text-[#3730A3] mt-4">
            <GraduationCap className="h-4 w-4" />
            Educación Secundaria — Matemática e Informática
          </div>
        </div>

        {/* Members Grid (auto-fit style using Tailwind classes) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-center">
          {integrantes.map((member) => (
            <div
              key={member.order}
              className="academic-card academic-card-hover flex flex-col items-center text-center p-6 bg-white justify-between min-h-[140px]"
            >
              <div>
                {/* Name */}
                <h3 className="text-[12px] font-semibold text-[#1A1A2E] leading-tight min-h-[32px] flex items-center justify-center">
                  {member.name}
                </h3>
              </div>
              
              {/* Order Number */}
              <span className="text-[10px] text-[#6B7280] font-medium mt-3 border-t border-[#F0F0F4] pt-2 w-full">
                Orden: {member.order}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
