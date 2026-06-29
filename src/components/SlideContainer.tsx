"use client";

import React from "react";

interface SlideContainerProps {
  children: React.ReactNode;
  isActive: boolean;
  slideIndex: number;
  orbConfig?: {
    orb1Color?: string;
    orb2Color?: string;
  };
}

export default function SlideContainer({
  children,
  isActive,
  slideIndex,
  orbConfig = {},
}: SlideContainerProps) {
  const {
    orb1Color = "bg-brand-violet/25",
    orb2Color = "bg-brand-teal/20",
  } = orbConfig;

  return (
    <section
      role="tabpanel"
      id={`slide-panel-${slideIndex}`}
      aria-labelledby={`slide-tab-${slideIndex}`}
      aria-hidden={!isActive}
      className={`slide-viewport ${
        isActive ? "slide-active" : "slide-enter"
      }`}
    >
      {/* Background orbs specific to this slide */}
      {isActive && (
        <>
          <div
            className={`orb orb-animate-1 top-[-20%] left-[-10%] h-[60vw] w-[60vw] max-w-[800px] ${orb1Color}`}
          />
          <div
            className={`orb orb-animate-2 bottom-[-20%] right-[-10%] h-[50vw] w-[50vw] max-w-[700px] ${orb2Color}`}
          />
          {/* Subtle grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </>
      )}

      {/* Slide main container */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-center">
        {children}
      </div>
    </section>
  );
}
