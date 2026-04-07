"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

/* ---------------- DATA ---------------- */

type TimelineItem = {
  year: number;
  title: string;
  desc: string;
  image: string;
};

const timeline: TimelineItem[] = [
  {
    year: 1999,
    title: "First Commercial Project",
    desc: "Established and launched its 1st commercial project, Pride Corporate Plaza.",
    image: "/images/timeline.png",
  },
  {
    year: 2000,
    title: "Pune’s First Private IT Park",
    desc: "Developed Pune’s 1st Private IT Park, Pride Silicon Plaza.",
    image: "/images/timeline.png",
  },
  {
    year: 2002,
    title: "First Residential Project",
    desc: "Introduced Pride Panorama, our 1st residential project.",
    image: "/images/timeline.png",
  },
  {
    year: 2005,
    title: "Expansion into Bangalore and Mumbai",
    desc: "Expanded into Bangalore and Mumbai and launched Pride Vatika, a 100-acre plotted development.",
    image: "/images/timeline.png",
  },
  {
    year: 2006,
    title: "Park Street Launch",
    desc: "Launched Park Street — a 76-acre township and Pune’s then second-largest project.",
    image: "/images/timeline.png",
  },
  {
    year: 2008,
    title: "Aloma County",
    desc: "Launched Aloma County, a 40-acre township project.",
    image: "/images/timeline.png",
  },
  {
    year: 2011,
    title: "Bombay-Pune Highway Land Acquisition",
    desc: "Completed 325-acre land acquisition on the Bombay-Pune Highway.",
    image: "/images/timeline.png",
  },
  {
    year: 2013,
    title: "Charholi Land Acquisition",
    desc: "Completed 400-acre land acquisition for Pride World City in Charholi.",
    image: "/images/timeline.png",
  },
  {
    year: 2014,
    title: "Pride World City Launch",
    desc: "Launched Pride World City (PWC).",
    image: "/images/timeline.png",
  },
  {
    year: 2017,
    title: "First 1,000 Families at PWC",
    desc: "Welcomed the first 1,000 families to PWC.",
    image: "/images/timeline.png",
  },
  {
    year: 2019,
    title: "Park District Launch",
    desc: "Launched Park District, a 100-acre township in Pune’s IT hub, Hinjewadi.",
    image: "/images/timeline.png",
  },
  {
    year: 2022,
    title: "1000 Cr Annual Turnover",
    desc: "Reached an annual turnover of 1000 Cr.",
    image: "/images/timeline.png",
  },
  {
    year: 2024,
    title: "48 Towers Under Construction",
    desc: "Achieved a remarkable feat with 48 towers under construction in PWC, housing 4,000+ families, with 9,000 families as happy customers.",
    image: "/images/timeline.png",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function JourneyTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(3);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(4);
      } else {
        setVisibleCount(5);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const active = timeline[activeIndex];

  const { start, end } = useMemo(() => {
    let start = activeIndex - Math.floor(visibleCount / 2);
    let end = activeIndex + Math.floor(visibleCount / 2);

    if (visibleCount % 2 === 0) {
      end -= 1;
    }

    if (start < 0) {
      start = 0;
      end = visibleCount - 1;
    }

    if (end >= timeline.length) {
      end = timeline.length - 1;
      start = Math.max(0, end - (visibleCount - 1));
    }

    return { start, end };
  }, [activeIndex, visibleCount]);

  const visibleYears = timeline.slice(start, end + 1);

  const next = () => {
    setActiveIndex((prev) => (prev === timeline.length - 1 ? prev : prev + 1));
  };

  const prev = () => {
    setActiveIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  return (
    <section id="our-journey" className="bg-[#f8f8f8] py-10 sm:py-12 md:py-16 lg:py-20">
      <div className="mx-auto px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <p className="text-[11px] uppercase tracking-[2px] text-gray-500 sm:text-xs">
          Legacy Timeline
        </p>

        <h2 className="mt-3 text-[28px] leading-[1.15] text-[#1f2a44] sm:text-[34px] md:text-[38px] lg:text-[40px]">
          Our Journey
        </h2>

        {/* YEARS */}
        <div className="mt-6 sm:mt-8">
          <div className="relative w-full">
            {/* connector line */}
            <div className="pointer-events-none absolute left-0 right-0 top-1/2 hidden -translate-y-1/2 border-t border-gray-300 sm:block" />

            {/* left arrow */}
            <button
              onClick={prev}
              disabled={activeIndex === 0}
              aria-label="Show previous years"
              className={`absolute left-[-3%] top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white px-2 text-[30px] text-[#1f2a44] transition sm:block ${
                activeIndex === 0
                  ? "cursor-not-allowed opacity-30"
                  : "cursor-pointer opacity-100 hover:scale-110"
              }`}
            >
              ←
            </button>

            {/* right arrow */}
            <button
              onClick={next}
              disabled={activeIndex === timeline.length - 1}
              aria-label="Show next years"
              className={`absolute right-[-3%] top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white px-2 text-[30px] text-[#1f2a44] transition sm:block ${
                activeIndex === timeline.length - 1
                  ? "cursor-not-allowed opacity-30"
                  : "cursor-pointer opacity-100 hover:scale-110"
              }`}
            >
              →
            </button>

            {/* years */}
            <div className="relative z-10 flex items-center justify-between gap-3 sm:gap-4">
              {visibleYears.map((item, i) => {
                const realIndex = start + i;
                const isActive = realIndex === activeIndex;

                return (
                  <button
                    key={item.year}
                    onClick={() => setActiveIndex(realIndex)}
                    className={`relative cursor-pointer bg-[#f8f8f8] px-2 text-[28px] transition-all duration-300 sm:px-3 sm:text-[38px] md:text-[50px] lg:text-[64px] ${
                      isActive
                        ? "scale-105 text-[#1f2a44]"
                        : "text-gray-300 hover:text-gray-400"
                    }`}
                  >
                    {item.year}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="mt-8 grid items-center gap-8 sm:mt-10 sm:gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          {/* IMAGE */}
          <div className="relative h-[220px] w-full overflow-hidden sm:h-[300px] md:h-[360px] lg:h-[400px]">
            <Image
              key={active.year}
              src={active.image}
              alt={active.title}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-contain transition-all duration-700 ease-out"
            />
          </div>

          {/* TEXT */}
          <div className="space-y-5 sm:space-y-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#6b7280]">
              {active.year}
            </p>

            <h3 className="text-[24px] font-semibold leading-[1.15] text-[#1f2a44] sm:text-[28px] md:text-[32px] lg:text-[34px]">
              {active.title}
            </h3>

            <p className="max-w-[500px] text-[14px] leading-[1.8] text-gray-600 sm:text-[15px] md:text-[16px] md:leading-[1.7]">
              {active.desc}
            </p>

            <div className="flex gap-3 pt-2 sm:gap-4 sm:pt-4">
              <button
                onClick={prev}
                disabled={activeIndex === 0}
                aria-label="Previous year"
                className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 pb-[2px] text-[28px] transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11 sm:text-[32px] md:h-12 md:w-12 md:text-4xl"
              >
                ‹
              </button>

              <button
                onClick={next}
                disabled={activeIndex === timeline.length - 1}
                aria-label="Next year"
                className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 pb-[2px] text-[28px] transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11 sm:text-[32px] md:h-12 md:w-12 md:text-4xl"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
