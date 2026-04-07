"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ---------------- TEXT REVEAL ---------------- */

function TextReveal({ children }: { children: string }) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {children.split("\n").map((line, i) => (
        <div key={i} className="overflow-hidden">
          <div
            className={`transform transition-transform duration-700 ease-out ${
              show ? "translate-y-0" : "translate-y-full"
            }`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            {line}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- IMAGE REVEAL ---------------- */

function ImageReveal() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative h-[240px] overflow-hidden sm:h-[320px] md:h-[420px] lg:h-[520px]"
    >
      <div
        className={`absolute inset-0 z-10 bg-white transition-transform duration-[1200ms] ease-in-out ${
          show ? "translate-x-full" : "translate-x-0"
        }`}
      />

      <Image
        src="/images/about-us.png"
        alt="Pride building"
        fill
        priority
        sizes="100vw"
        className={`object-cover transition-transform duration-[2000ms] ease-out ${
          show ? "scale-100" : "scale-110"
        }`}
      />
    </div>
  );
}

/* ---------------- MAIN SECTION ---------------- */

export default function AboutHero() {
  return (
    <section className="flex min-h-[75vh] flex-col justify-end md:min-h-[85vh] lg:min-h-screen">
      {/* TEXT AREA */}
      <div className="mt-[10%] px-5 pt-20 pb-8 md:mt-0 sm:px-8 sm:pt-24 sm:pb-10 md:px-10 md:pt-28 md:pb-12 lg:px-12 xl:px-16">
        <div className="max-w-[1200px]">
          <h1 className="text-[28px] leading-[1.4] text-[#1f3f6b] sm:text-[32px] md:text-[36px] lg:text-[40px]">
            <TextReveal>{"Building Tomorrow. Today."}</TextReveal>
          </h1>

          <div className="mt-5 text-[14px] leading-[1.8] text-[#444] sm:mt-6 sm:text-[15px] md:text-[16px] md:leading-[1.75]">
            <TextReveal>
              {`Pride Group builds across Pune, Mumbai, and Bangalore, with work spanning residential, commercial, and township development.
Its growth has been shaped by steady execution, design-led thinking, and a long-term approach to building.`}
            </TextReveal>
          </div>
        </div>
      </div>

      {/* IMAGE */}
      <ImageReveal />
    </section>
  );
}
