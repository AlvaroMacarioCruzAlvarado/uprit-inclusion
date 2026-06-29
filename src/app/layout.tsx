import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "UPRIT Grupo 5 — Atención a la Diversidad e Inclusión Social",
  description:
    "Trabajo académico sobre epistemología de la diversidad, evolución histórica de modelos de atención, casos de estudio y marco normativo peruano.",
  keywords: [
    "UPRIT",
    "diversidad",
    "inclusión social",
    "discapacidad",
    "BAP",
    "DUA",
    "SAE",
    "PEP",
    "MINEDU",
  ],
  authors: [{ name: "Grupo 5 - UPRIT" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-surface-bg text-text-body antialiased flex flex-col">
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        <Navbar />
        <main id="main-content" className="flex-1 w-full" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
