"use client";

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

export default function CsrHero() {
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
            <TextReveal>{"CSR"}</TextReveal>
          </h1>

          <div className="mx-auto mt-5 max-w-[720px] text-[15px] leading-[1.9] text-black/65 sm:text-[16px] md:text-[17px]">
            <TextReveal>
              {`Corporate Social Responsibility (CSR) is a commitment to ethical business practices that contribute to sustainable development.`}
            </TextReveal>
          </div>
        </div>
      </section>
    </>
  );
}
