"use client";

import { ArrowRight, BookOpen, Sparkles, Heart } from "lucide-react";

interface HeroProps {
  onExplore: () => void;
  onLearnMore: () => void;
}

export default function Hero({ onExplore, onLearnMore }: HeroProps) {
  return (
    <div className="flex flex-col items-center justify-between h-full pt-16 pb-6 text-center">
      {/* Spacer or upper section */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl px-4">
        {/* Badge */}
        <div className="reveal-item reveal-delay-1 mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 shadow-sm backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-brand-teal">
            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-brand-teal opacity-75" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-teal">
            Atención a la Diversidad e Inclusión Social
          </span>
        </div>

        {/* Heading */}
        <h1 className="reveal-item reveal-delay-2 text-balance font-extrabold leading-[1.1] tracking-tight text-white text-[clamp(2rem,6vw,4.5rem)]">
          Construyendo una sociedad{" "}
          <br />
          <span className="bg-gradient-to-r from-brand-teal via-brand-violet to-brand-coral bg-clip-text text-transparent">
            donde cada persona
          </span>
          {" "}pertenece
        </h1>

        {/* Subtitle */}
        <p className="reveal-item reveal-delay-3 mt-6 max-w-2xl text-balance text-[clamp(0.875rem,1.5vw,1.15rem)] leading-relaxed text-text-secondary">
          Una iniciativa universitaria dedicada a la investigación, promoción y
          diseño de soluciones que fomentan la igualdad de oportunidades, 
          eliminando las barreras del entorno educativo y social.
        </p>

        {/* Interactive Highlight Panel */}
        <div className="reveal-item reveal-delay-4 mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
          {[
            { label: "100% Accesible", desc: "Diseño universal integrado", color: "border-brand-teal/20 text-brand-teal" },
            { label: "Pedagogía Activa", desc: "Adaptación curricular continua", color: "border-brand-violet/20 text-brand-violet" },
            { label: "Comunidad Unida", desc: "Inclusión intercultural real", color: "border-brand-coral/20 text-brand-coral" },
          ].map((item, idx) => (
            <div key={idx} className={`glass-panel rounded-xl p-4 border border-white/5 text-left`}>
              <h3 className={`text-sm font-bold ${item.color.split(" ")[1]}`}>{item.label}</h3>
              <p className="text-xs text-text-muted mt-1 leading-normal">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="reveal-item reveal-delay-5 mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onExplore}
            className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-brand-teal to-brand-violet px-7 py-3.5 text-sm font-bold text-bg-dark shadow-lg shadow-brand-teal/20 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
          >
            Explorar Pilares
            <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1 text-bg-dark" />
          </button>
          <button
            onClick={onLearnMore}
            className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20 cursor-pointer"
          >
            <BookOpen className="h-4.5 w-4.5 text-brand-teal" />
            Sobre el Proyecto
          </button>
        </div>
      </div>

      {/* Decorative prompt */}
      <div className="reveal-item reveal-delay-5 text-[10px] font-semibold tracking-widest text-text-muted flex items-center gap-1.5 opacity-60">
        <Heart className="h-3 w-3 text-brand-coral fill-brand-coral" />
        <span>PROYECTO ACADÉMICO • FACULTAD DE EDUCACIÓN</span>
      </div>
    </div>
  );
}
