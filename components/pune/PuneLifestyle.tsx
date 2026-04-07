"use client";

import Image from "next/image";
import { useState } from "react";

const lifestyleBlocks = [
  {
    title: "Township Living",
    description:
      "A self-sustained ecosystem where everything you need is within reach — designed for convenience, scale and everyday comfort.",
    image: "/images/Society.JPG",
  },
  {
    title: "Green Spaces",
    description:
      "Open landscapes, tree-lined avenues and breathing spaces that create a healthier and more balanced lifestyle.",
    image: "/images/Society.JPG",
  },
  {
    title: "Community Life",
    description:
      "Spaces that bring people together — from social hubs to shared experiences that build a sense of belonging.",
    image: "/images/Society.JPG",
  },
];

export default function PuneLifestyle() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = lifestyleBlocks[activeIndex];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        {/* HEADER */}
        <div className="max-w-[700px]">
          <p className="text-[11px] font-[700] uppercase tracking-[0.22em] text-[#173363]/60">
            Lifestyle at Pride World City
          </p>

          <h2 className="mt-3 text-[32px] leading-[1.2] text-[#10203b] sm:text-[40px]">
            More than homes — a way of life.
          </h2>
        </div>

        {/* MAIN GRID */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[280px_1fr]">
          {/* LEFT NAV */}
          <div className="flex flex-col gap-6">
            {lifestyleBlocks.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={item.title}
                  onClick={() => setActiveIndex(index)}
                  className="text-left group cursor-pointer"
                >
                  <p
                    className={`text-[16px] font-[500] transition ${
                      isActive
                        ? "text-[#10203b]"
                        : "text-[#10203b]/40 group-hover:text-[#10203b]/70"
                    }`}
                  >
                    {item.title}
                  </p>

                  <div
                    className={`mt-2 h-[2px] transition-all duration-500 ${
                      isActive ? "w-16 bg-[#173363]" : "w-6 bg-[#173363]/20"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative h-[420px] overflow-hidden rounded-[14px] sm:h-[480px] lg:h-[540px]">
            <Image
              src={active.image}
              alt={active.title}
              fill
              className="object-cover transition-all duration-700"
            />

            {/* Lighter overlay for light UI */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

            {/* CONTENT */}
            <div className="absolute bottom-6 left-6 right-6 max-w-[520px] text-white">
              <h3 className="text-[26px] sm:text-[30px] leading-[1.2]">
                {active.title}
              </h3>

              <p className="mt-3 text-[15px] leading-[1.8] text-white/85">
                {active.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
