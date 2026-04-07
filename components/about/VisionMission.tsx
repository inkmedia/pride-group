"use client";

import Image from "next/image";
import { useState } from "react";

type SectionKey = "vision" | "mission";

const data: Record<
  SectionKey,
  {
    label: string;
    title: string;
    text: string;
    image: string;
    stat: string;
    statLabel: string;
  }
> = {
  vision: {
    label: "Guiding Perspective",
    title: "Our Vision",
    text: "We strive to empower individuals across all social strata by enhancing their standard of living. Our commitment is to top-notch infrastructure and fulfilling dreams through our creations.",
    image: "/images/vision-mission.png",
    stat: "Elevated Living",
    statLabel: "Built around aspiration & long-term value",
  },
  mission: {
    label: "Strategic Direction",
    title: "Our Mission",
    text: "We aim to establish ourselves among the top 5 real estate developers in India. By 2028, we strive to complete 200M+ sq. ft. of construction, showcasing our commitment to quality and innovation.",
    image: "/images/vision-mission.png",
    stat: "Top 5 by 2028",
    statLabel: "Focused on scale, quality & innovation",
  },
};

const tabs: SectionKey[] = ["vision", "mission"];

export default function VisionMission() {
  const [active, setActive] = useState<SectionKey>("vision");
  const activeData = data[active];

  const handleChange = (key: SectionKey) => {
    if (key === active) return;
    setActive(key);
  };

  return (
    <section id="vision-mission" className="py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[10px] border border-black/8 bg-white shadow-[0_28px_70px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
            {/* CONTENT */}
            <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-14">
              <div>
                {/* TABS */}
                <div className="mb-10 flex flex-wrap gap-3">
                  {tabs.map((key, index) => {
                    const isActive = active === key;

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleChange(key)}
                        // onMouseEnter={() => handleChange(key)}
                        onFocus={() => handleChange(key)}
                        className={`cursor-pointer hover:bg-[#f8f8f8] rounded-[5px] border-b-4 px-5 py-2 text-[11px] font-[700] uppercase tracking-[0.16em] transition-all duration-500 sm:text-[12px] ${
                          isActive
                            ? "border-[#1f3f6b] font-900 "
                            : "border-black/0 bg-white text-black/65 hover:border-[#1f3f6b]/30 hover:text-black"
                        }`}
                      >
                        {index + 1 < 10 ? `0${index + 1}` : index + 1} /{" "}
                        {data[key].title}
                      </button>
                    );
                  })}
                </div>

                {/* ACTIVE CONTENT */}
                <div
                  key={active}
                  className="animate-[fadeUp_.7s_cubic-bezier(.22,1,.36,1)]"
                >
                  <p className="mb-4 text-[11px] font-[700] uppercase tracking-[0.18em] sm:text-[12px]">
                    {activeData.label}
                  </p>

                  <h3 className="max-w-[540px] text-[30px] font-[500] leading-[1.05] tracking-[-0.03em] text-[#111] sm:text-[30px] lg:text-[34px]">
                    {activeData.title}
                  </h3>

                  <div className="mt-6 h-[1px] w-16 bg-[#1f3f6b]" />

                  <p className="mt-6 max-w-[560px] text-[15px] leading-[1.95] text-black/68 sm:text-[16px]">
                    {activeData.text}
                  </p>
                </div>
              </div>

              {/* BOTTOM META */}
              <div
                key={`${active}-meta`}
                className="mt-10 grid gap-5 border-t border-black/8 pt-6 sm:grid-cols-2 sm:pt-8 animate-[fadeUp_.8s_cubic-bezier(.22,1,.36,1)]"
              >
                <div>
                  <p className="text-[28px] font-[500] leading-none sm:text-[34px]">
                    {activeData.stat}
                  </p>
                  <p className="mt-2 text-[13px] leading-[1.8] text-black/55 sm:text-[14px]">
                    {activeData.statLabel}
                  </p>
                </div>

                {/* <div className="flex items-end sm:justify-end">
                  <button
                    type="button"
                    className="cursor-pointer rounded-full border border-black/10 px-5 py-3 text-[11px] font-[700] uppercase tracking-[0.14em] text-black transition hover:border-[#1f3f6b] hover:text-[#1f3f6b] sm:text-[12px]"
                  >
                    Pride Group
                  </button>
                </div> */}
              </div>
            </div>

            {/* IMAGE */}
            <div className="relative min-h-[340px] overflow-hidden sm:min-h-[460px]">
              {tabs.map((key) => {
                const isActive = active === key;

                return (
                  <div
                    key={key}
                    className={`absolute inset-0 will-change-transform will-change-opacity transition-all duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] ${
                      isActive
                        ? "scale-100 opacity-100"
                        : "scale-[1.05] opacity-0"
                    }`}
                  >
                    <Image
                      src={data[key].image}
                      alt={data[key].title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover"
                    />
                  </div>
                );
              })}

              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
