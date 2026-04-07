"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

export default function CareersHero() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ================= PAGE TITLE ================= */}
      <section className="bg-white px-5 pb-12 pt-28 text-center sm:px-8 sm:pb-14 sm:pt-32 md:pb-16 md:pt-36 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[900px]">
          <h1 className="text-[28px] leading-[1.4] text-[#1f3f6b] sm:text-[32px] md:text-[36px] lg:text-[40px]">
            <TextReveal>{"Careers at Pride Group"}</TextReveal>
          </h1>

          <div className="mx-auto mt-5 max-w-[720px] text-[15px] leading-[1.9] text-black/65 sm:text-[16px] md:text-[17px]">
            <TextReveal>
              {`Join an organization where ambition is supported, contribution is valued, and every role helps shape places that create lasting impact.`}
            </TextReveal>
          </div>
        </div>
      </section>

      {/* ================= GREAT PLACE SECTION ================= */}
      <section
        ref={ref}
        className="bg-[#f8f8f8] px-5 py-12 sm:px-8 sm:py-14 md:py-16 lg:px-10 lg:py-20"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="overflow-hidden rounded-[10px] border border-black/6 bg-white shadow-[0_24px_70px_rgba(0,0,0,0.06)]">
            <div className="grid items-center gap-0 lg:grid-cols-2">
              {/* LEFT CONTENT */}
              <div
                className={`order-2 px-6 py-8 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] sm:px-8 sm:py-10 md:px-10 lg:order-1 lg:px-12 lg:py-14 xl:px-16 ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <p className="mb-3 text-[11px] font-[700] uppercase tracking-[0.2em] text-[#172f55] sm:text-[12px]">
                  Workplace Culture
                </p>

                <h2 className="max-w-[560px] text-[25px] font-[500] leading-[1.1] tracking-[-0.03em] text-[#1f3f6b] sm:text-[25px] md:text-[25px] lg:text-[25px]">
                  Recognized as a Great Place to Work
                </h2>

                <div className="mt-6 h-[1px] w-16 bg-[#172f55]" />

                <p className="mt-6 text-[15px] leading-[1.9] text-black/65 sm:text-[16px]">
                  At Pride Group, our workplace culture is built on trust,
                  collaboration, and continuous growth. Being recognized as a
                  Great Place to Work reflects our commitment to creating an
                  environment where people feel valued, supported, and empowered
                  to perform at their best.
                </p>

                <p className="mt-4 text-[15px] leading-[1.9] text-black/65 sm:text-[16px]">
                  We believe strong teams build strong communities, and every
                  individual plays a meaningful role in shaping our journey
                  forward.
                </p>
              </div>

              {/* RIGHT IMAGE */}
              <div
                className={`order-1 transition-all duration-1000 ease-[cubic-bezier(.22,1,.36,1)] lg:order-2 ${
                  visible
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-10 scale-[0.96] opacity-0"
                }`}
              >
                <div className="relative h-[320px] w-full overflow-hidden bg-[#f3f3f3] sm:h-[420px] md:h-[500px] lg:h-full lg:min-h-[620px]">
                  <Image
                    src="/images/Function-Gimmicks.jpg"
                    alt="Great Place to Work Certificate"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 rounded-full bg-[#172f55] px-4 py-2 text-[11px] font-[700] uppercase tracking-[0.14em] text-white shadow-md backdrop-blur-sm sm:bottom-6 sm:left-6 sm:text-[12px]">
                    Pride Group Culture
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
