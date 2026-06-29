"use client";

import { useState } from "react";
import {
  Send,
  User,
  Mail,
  Building2,
  MessageSquare,
  CheckCircle,
  Loader2,
  Calendar,
} from "lucide-react";

export default function Contacto() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">(
    "idle"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    setTimeout(() => {
      setFormState("sent");
      setTimeout(() => setFormState("idle"), 4000);
    }, 1200);
  };

  return (
    <div className="flex flex-col justify-between h-full pt-14 pb-4">
      {/* Slide Header */}
      <div className="reveal-item reveal-delay-1 flex items-center justify-between border-b border-white/5 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-brand-coral" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-teal">
            Únete a la Red
          </span>
        </div>
        <div className="text-[10px] font-semibold text-text-muted">
          SECCIÓN 05 • REGISTRO Y TALLERES
        </div>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Vision & Benefits (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="reveal-item reveal-delay-2 text-[clamp(1.5rem,3.2vw,2.5rem)] font-extrabold leading-tight text-white">
            Forma parte del{" "}
            <br />
            <span className="bg-gradient-to-r from-brand-teal via-brand-violet to-brand-coral bg-clip-text text-transparent">
              cambio inclusivo
            </span>
          </h2>
          <p className="reveal-item reveal-delay-2 text-sm text-text-secondary leading-relaxed">
            Registra tu institución o aula de clases para recibir capacitaciones, 
            asesorías especializadas y acceso completo a nuestras guías y materiales interactivos.
          </p>

          <div className="reveal-item reveal-delay-3 space-y-3 pt-2">
            {[
              "Capacitación pedagógica y adaptaciones.",
              "Auditorías de accesibilidad web e informática.",
              "Networking con centros de investigación social.",
            ].map((bullet, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <CheckCircle className="h-4.5 w-4.5 text-brand-teal flex-shrink-0" />
                <span className="text-xs text-text-secondary">{bullet}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Form Container (7 cols) */}
        <div className="reveal-item reveal-delay-3 lg:col-span-7">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl">
            {formState === "sent" ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal/20">
                  <CheckCircle className="h-6 w-6 text-brand-teal" />
                </div>
                <h3 className="mt-4 text-base font-bold text-white">
                  ¡Registro Recibido con Éxito!
                </h3>
                <p className="mt-1 text-xs text-text-secondary max-w-sm">
                  Evaluaremos la solicitud institucional y te enviaremos un correo a la brevedad.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="nombre"
                      className="block text-[10px] font-bold uppercase tracking-wider text-text-secondary"
                    >
                      Nombre completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted" />
                      <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        required
                        placeholder="Tu nombre completo"
                        className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-xs text-white placeholder-text-muted transition-all focus:border-brand-teal/50 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block text-[10px] font-bold uppercase tracking-wider text-text-secondary"
                    >
                      Correo institucional
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="correo@universidad.edu"
                        className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-xs text-white placeholder-text-muted transition-all focus:border-brand-teal/50 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Institution Input */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="institucion"
                    className="block text-[10px] font-bold uppercase tracking-wider text-text-secondary"
                  >
                    Universidad o Entidad
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted" />
                    <input
                      id="institucion"
                      name="institucion"
                      type="text"
                      required
                      placeholder="Nombre de la institución"
                      className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-xs text-white placeholder-text-muted transition-all focus:border-brand-teal/50 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="mensaje"
                    className="block text-[10px] font-bold uppercase tracking-wider text-text-secondary"
                  >
                    Motivo de contacto
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-2.5 h-3.5 w-3.5 text-text-muted" />
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={2}
                      placeholder="Detalla tu consulta o requerimiento de taller..."
                      className="w-full resize-none rounded-lg border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-xs text-white placeholder-text-muted transition-all focus:border-brand-teal/50 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-teal to-brand-violet py-2.5 text-xs font-bold text-bg-dark transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer"
                >
                  {formState === "sending" ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      Enviar Formulario de Colaboración
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
