"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const timeline = [
  { year: 1996 },
  { year: 1999 },
  { year: 2002 },
  { year: 2006 },
  { year: 2010 },
  { year: 2012 },
  { year: 2016 },
  { year: 2020 },
  { year: 2023 },
  { year: 2026 },
];

export default function OurStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  /* ---- CENTER ACTIVE ---- */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const child = container.children[activeIndex] as HTMLElement;
    if (!child) return;

    container.scrollTo({
      left:
        child.offsetLeft - container.offsetWidth / 2 + child.offsetWidth / 2,
      behavior: "smooth",
    });
  }, [activeIndex]);

  const next = () =>
    setActiveIndex((prev) => Math.min(prev + 1, timeline.length - 1));

  const prev = () => setActiveIndex((prev) => Math.max(prev - 1, 0));

  return (
    <section className="bg-[#f5f5f5] pb-20">
      {/* FULL WIDTH HEADER */}
      <div className="bg-[#1f3f6b] text-white px-10 py-15">
        <div className="mx-auto max-w-[1350px] grid md:grid-cols-2 gap-6">
          <h2 className="text-[36px]">Our Story</h2>

          <p className="text-[15px] leading-[1.7] text-white/90">
            Pride Group began in Pune in the mid-1990s and grew into a
            multi-city real estate group with projects across Pune, Mumbai, and
            Bangalore.
          </p>
        </div>
      </div>

      {/* TIMELINE CONTAINER */}
      <div className="mx-auto max-w-[1400px] mt-16 relative px-6">
        {/* ARROWS */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 z-20 -translate-y-1/2 bg-[#1f3f6b] text-white w-12 h-12 rounded-full cursor-pointer"
        >
          ‹
        </button>

        <button
          onClick={next}
          className="absolute right-0 top-1/2 z-20 -translate-y-1/2 bg-[#1f3f6b] text-white w-12 h-12 rounded-full cursor-pointer"
        >
          ›
        </button>

        {/* ITEMS WRAP */}
        <div className="relative">
          {/* MAIN HORIZONTAL LINE */}
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-[4px] -translate-y-1/2 bg-[#cfd3da]" />

          {/* ITEMS */}
          <div ref={containerRef} className="flex overflow-hidden gap-24 px-16">
            {timeline.map((item, index) => {
              const isActive = index === activeIndex;
              const isTop = index % 2 === 0;

              return (
                <div
                  key={item.year}
                  className="relative min-w-[220px] h-[420px] shrink-0"
                >
                  {/* TOP IMAGE + BRANCH */}
                  {isTop && (
                    <>
                      <div
                        className={`absolute left-1/2 top-0 -translate-x-1/2 w-[200px] h-[160px] bg-white flex items-center justify-center shadow transition-all duration-500 ${
                          isActive
                            ? "scale-100 opacity-100"
                            : "scale-90 opacity-60"
                        }`}
                      >
                        <Image
                          src="/images/timeline.png"
                          alt="project"
                          width={140}
                          height={140}
                        />
                      </div>

                      <div className="absolute left-1/2 top-[160px] -translate-x-1/2 w-[2px] h-[18px] bg-[#cfd3da]" />
                    </>
                  )}

                  {/* YEAR DOT - ALWAYS IN ONE LINE */}
                  <button
                    onClick={() => setActiveIndex(index)}
                    className={`cursor-pointer absolute left-1/2 top-1/2 z-10 flex items-center justify-center w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-[#1f3f6b] text-white scale-110"
                        : "bg-[#9aa3b2] text-white"
                    }`}
                  >
                    {item.year}
                  </button>

                  {/* BOTTOM IMAGE + BRANCH */}
                  {!isTop && (
                    <>
                      <div className="absolute left-1/2 top-[242px] -translate-x-1/2 w-[2px] h-[18px] bg-[#cfd3da]" />

                      <div
                        className={`absolute left-1/2 bottom-0 -translate-x-1/2 w-[200px] h-[160px] bg-white flex items-center justify-center shadow transition-all duration-500 ${
                          isActive
                            ? "scale-100 opacity-100"
                            : "scale-90 opacity-60"
                        }`}
                      >
                        <Image
                          src="/images/timeline.png"
                          alt="project"
                          width={140}
                          height={140}
                        />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
