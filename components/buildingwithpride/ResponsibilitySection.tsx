"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const responsibilityCards = [
  {
    title: "Labour welfare",
    description: "Camps, creches, hygiene, health support, and worker dignity.",
    image: "/images/Labour-Welfare.jpg",
  },
  {
    title: "Customer care",
    description:
      "Service orientation beyond handover; trust continues after possession.",
    image: "/images/Customer-Care.JPG",
  },
  {
    title: "Giving back",
    description:
      "Wider social contribution should be stated only where proof exists.",
    image: "/images/Giving-Back.jpg",
  },
];

export default function ResponsibilitySection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  /* ---------- SCROLL REVEAL ---------- */
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), 120);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#faf9f7] pt-14 pb-30 sm:pt-16 sm:pb-30 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 md:px-10 lg:px-16">
        {/* HEADER */}
        <div className="max-w-[920px]">
          <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] leading-tight text-[#222]">
            Responsibility is built into how we work
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-7 sm:leading-8 text-[#555]">
            Responsibility at Pride should be presented as part of the operating
            culture — visible in the way projects are run, workers are cared
            for, customers are supported, and trust is carried beyond
            possession.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {responsibilityCards.map((card, index) => (
            <article
              key={card.title}
              className={`group cursor-pointer relative overflow-hidden rounded-[14px] transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
              opacity-0 translate-y-[60px] scale-[0.96]
              ${visible ? "opacity-100 translate-y-0 scale-100" : ""}
              ${index === 1 ? "lg:mt-16" : ""}`}
              style={{
                transitionDelay: `${index * 160}ms`,
              }}
            >
              <div className="relative h-[450px] sm:h-[480px] lg:h-[500px] overflow-hidden rounded-[10px]">
                {/* IMAGE */}
                <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[160px]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

                  {/* TITLE ON IMAGE */}
                  <div className="absolute bottom-8 left-8 right-8 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-3">
                    <h3 className="text-[28px] sm:text-[26px] lg:text-[30px] leading-none text-white">
                      {card.title}
                    </h3>
                  </div>
                </div>

                {/* REVEAL PANEL */}
                <div className="absolute inset-x-0 bottom-0 z-10 bg-white px-7 pb-8 pt-7 opacity-0 translate-y-8 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 sm:px-8">
                  <h3 className="text-[28px] sm:text-[26px] lg:text-[30px] leading-none text-[#111]">
                    {card.title}
                  </h3>

                  <p className="mt-5 max-w-[420px] text-[15px] sm:text-base leading-8 text-[#333]">
                    {card.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
