import { Landmark } from "lucide-react";

export default function Footer() {
  return (
    <footer role="contentinfo" className="mt-auto border-t border-slate-200 bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex items-center gap-2 text-text-title font-bold text-sm">
            <Landmark className="h-4.5 w-4.5 text-brand-accent" />
            <span>Universidad Privada de Trujillo</span>
          </div>
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
            Grupo 3 | DIVERSIDAD E INCLUSIÓN SOCIAL
          </p>
          <p className="text-[10px] text-text-muted mt-2">
            © {new Date().getFullYear()} UPRIT. Todos los derechos reservados. Exposición Académica.
          </p>
        </div>
      </div>
    </footer>
  );
}
