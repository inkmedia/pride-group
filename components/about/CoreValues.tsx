"use client";

import { useEffect, useRef, useState } from "react";

const values = [
  {
    icon: "workspace_premium",
    title: "Design Excellence",
    text: "Each project is meticulously planned, from internal layouts to master planning. Continuous innovation drives each new project.",
  },
  {
    icon: "handshake",
    title: "Trust and Transparency",
    text: "Early delivery ensures projects are completed ahead of schedule. Strong quality standards build trust.",
  },
  {
    icon: "groups",
    title: "Customer-Centric Approach",
    text: "We place customer well-being at the forefront, crafting spaces that improve lives through practical design.",
  },
  {
    icon: "eco",
    title: "Sustainability",
    text: "We focus on sustainable development practices that balance growth with environmental responsibility.",
  },
];

export default function CoreValues() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="core-values" className="bg-white py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-10 max-w-[800px] lg:mb-14">
          <p className="mb-3 text-[11px] font-[700] uppercase tracking-[0.22em] sm:text-[12px]">
            Core Values
          </p>

          <h2 className="text-[20px] font-[500] leading-[1.08] tracking-[-0.03em] text-[#111] sm:text-[20px] lg:text-[24px]">
            The principles that shape how we think, build and deliver.
          </h2>

          <p className="mt-5 text-[15px] leading-[1.9] text-black/65 sm:text-[16px]">
            Our values guide every decision across planning, design, delivery
            and customer experience, helping us create spaces with long-term
            trust and lasting impact.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-7"
        >
          {values.map((item, index) => (
            <article
              key={item.title}
              className={`cursor-pointer group relative overflow-hidden rounded-[10px] border border-black/8 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)] sm:p-7 lg:p-8 ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {/* subtle top accent */}
              <div className="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-[#1f3f6b] via-[#F8F8F8] to-transparent opacity-80" />

              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F8F8F8] text-[#1f3f6b] sm:h-16 sm:w-16">
                  <span className="material-symbols-outlined text-[30px]! sm:text-[34px]!">
                    {item.icon}
                  </span>
                </div>

                <span className="text-[12px] font-[700] tracking-[0.14em] text-black/25">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </span>
              </div>

              <h3 className="text-[24px] font-[500] leading-[1.2] tracking-[-0.02em] text-[#111] sm:text-[26px]">
                {item.title}
              </h3>

              <div className="mt-5 h-[1px] w-14 bg-[#1f3f6b]" />

              <p className="mt-5 max-w-[520px] text-[14px] leading-[1.9] text-black/62 sm:text-[15px]">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
