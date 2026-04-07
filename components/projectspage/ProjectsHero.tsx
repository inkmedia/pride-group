"use client";

import { useEffect, useState } from "react";

export default function ProjectsHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section
      data-header="dark"
      className="relative h-[70vh] min-h-[520px] flex items-center justify-center overflow-hidden"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[#0f172a]" />

      {/* GRADIENT LIGHT */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-black opacity-90" />

      {/* CONTENT */}
      <div className="relative z-10 text-center max-w-[900px] px-6">
        {/* SUBTITLE */}
        <p
          className={`text-white/60 text-sm tracking-[0.2em] uppercase transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Our Developments
        </p>

        {/* HEADING */}
        <h1
          className={`mt-4 text-white text-[36px] sm:text-[48px] md:text-[56px] leading-tight transition-all duration-700 delay-150 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Cities we build in
        </h1>

        {/* DESCRIPTION */}
        <p
          className={`mt-6 text-white/70 text-[15px] sm:text-[17px] leading-7 transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Each city represents a different scale, context, and way of living.
          Explore developments across Pune, Mumbai, and Bangalore.
        </p>

        {/* LINE ANIMATION */}
        <div
          className={`mt-10 mx-auto h-[1px] bg-white/30 transition-all duration-700 delay-500 ${
            visible ? "w-[120px]" : "w-0"
          }`}
        />
      </div>
    </section>
  );
}
