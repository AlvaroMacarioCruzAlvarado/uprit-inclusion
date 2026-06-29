"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Users, User, ArrowUpRight, Award, Compass, Landmark } from "lucide-react";

export default function Home() {
  const [bannerError, setBannerError] = useState(false);
  const integrantes = [
    { name: "Sanchez Sanchez, Jorge", role: "Coordinador" },
    { name: "Tejada Grandes, Luis Alberto", role: "Investigación" },
    { name: "Saire Chipana, Javier", role: "Redacción" },
    { name: "Rengifo Reategui, Janeth Natalia", role: "Diseño" },
    { name: "Davila Huaman, Juan Carlos", role: "Edición" },
    { name: "Cardenas, Jose Luis", role: "Revisión" },
  ];

  return (
    <div className="relative overflow-hidden min-h-screen py-12 md:py-20 animate-fade-in-up">
      {/* Decorative Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Banner Image Container */}
        <div className="relative h-48 md:h-64 w-full rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent z-10" />
          {!bannerError ? (
            <img
              src="/images/uprit-banner.jpg"
              alt="Universidad Privada de Trujillo - Diversidad e Inclusión"
              onError={() => setBannerError(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-brand-indigo/30 via-bg-dark to-brand-teal/20 p-6 text-center">
              <Landmark className="h-12 w-12 text-brand-teal mb-3 animate-pulse" />
              <h3 className="text-lg font-bold uppercase tracking-widest text-slate-400">UPRIT Académico</h3>
            </div>
          )}
          
          {/* Overlay Text */}
          <div className="absolute bottom-6 left-6 md:left-10 z-20">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-teal/10 border border-brand-teal/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-teal mb-3">
              <GraduationCap className="h-3.5 w-3.5" />
              Universidad Privada de Trujillo
            </div>
            <h1 className="text-2xl md:text-4xl font-black uppercase text-white leading-tight">
              Atención a la Diversidad e Inclusión
            </h1>
          </div>
        </div>

        {/* Section 1: Intro Pathways Grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-16">
          <div className="glass-card glass-card-hover rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-indigo/10 border border-brand-indigo/20 text-brand-indigo mb-6">
                <Compass className="h-6 w-6" />
              </div>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-brand-teal block mb-2">
                Trabajo de Investigación Nro 1
              </span>
              <h2 className="text-xl font-bold text-white leading-tight">
                Epistemología y Paradigmas de la Discapacidad
              </h2>
              <p className="text-xs text-text-secondary mt-3 leading-relaxed">
                Estudio pormenorizado de los modelos de prescindencia, médico-rehabilitador y el actual enfoque 
                social de derechos humanos.
              </p>
            </div>
            <Link
              href="/inclusion"
              className="mt-8 group inline-flex w-fit items-center gap-2 rounded-xl bg-brand-indigo px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-brand-indigo/25 hover:bg-indigo-500 transition-all cursor-pointer"
            >
              Ver Paradigmas Históricos
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="glass-card glass-card-hover rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal/10 border border-brand-teal/20 text-brand-teal mb-6">
                <Award className="h-6 w-6" />
              </div>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-brand-teal block mb-2">
                Normativas Nacionales y Aplicación
              </span>
              <h2 className="text-xl font-bold text-white leading-tight">
                Marcos Jurídicos y Ajustes Razonables
              </h2>
              <p className="text-xs text-text-secondary mt-3 leading-relaxed">
                Análisis de la jerarquía normativa peruana (LGE, D.S. N° 007-2021) y el rol docente garante 
                a través del DUA, el SAE y el PEP.
              </p>
            </div>
            <Link
              href="/normativa"
              className="mt-8 group inline-flex w-fit items-center gap-2 rounded-xl bg-brand-teal px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-bg-dark shadow-lg shadow-brand-teal/20 hover:bg-teal-400 transition-all cursor-pointer"
            >
              Explorar Marco Legal
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Section 2: Group Information & Teacher Details */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          
          {/* Teacher Info (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-4">
                Cátedra Académica
              </h3>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-brand-teal flex-shrink-0">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-text-secondary">Docente a Cargo</h4>
                  <p className="text-base font-extrabold text-white mt-0.5 leading-tight">
                    Mag. Caballero Bardales Susana
                  </p>
                  <p className="text-[9px] text-text-muted mt-2 font-bold uppercase tracking-wider">
                    Facultad de Derecho y Ciencias Sociales
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-brand-indigo/20 bg-brand-indigo/5 p-6 text-xs leading-relaxed text-text-secondary">
              <h4 className="font-bold text-white uppercase tracking-wider mb-2 text-[10px]">
                Enfoque de la Investigación
              </h4>
              Esta plataforma expone los lineamientos jurídicos y técnicos áulicos obligatorios para 
              salvaguardar los derechos de inclusión frente a barreras operativas o físicas en el Perú.
            </div>
          </div>

          {/* Students Grid (8 cols) */}
          <div className="lg:col-span-8 glass-card rounded-2xl p-8">
            <div className="flex items-center gap-2.5 mb-6">
              <Users className="h-5 w-5 text-brand-teal" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-white">
                Integrantes del Grupo Académico
              </h3>
            </div>
            
            <div className="grid gap-3 sm:grid-cols-2">
              {integrantes.map((member, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-indigo/10 border border-brand-indigo/20 text-xs font-extrabold text-brand-indigo">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-white">{member.name}</span>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-brand-teal px-2 py-0.5 rounded bg-brand-teal/5 border border-brand-teal/10">
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
