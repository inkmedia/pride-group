"use client";

import Image from "next/image";
import { useState } from "react";
import TransitionLink from "../common/TransitionLink";

type Award = {
  title: string;
  company: string;
  source: string;
  year: string;
  image: string;
};

const awards: Award[] = [
  {
    title: "Developer of the Year",
    company: "Pride Group",
    source: "Economic Times Now",
    year: "2018",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    title: "Developer of the Year",
    company: "Pride Group",
    source: "Economic Times Now",
    year: "2018",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    title: "Developer of the Year",
    company: "Pride Group",
    source: "Economic Times Now",
    year: "2018",
    image: "/images/awards/best-premium.jpg",
  },
  {
    title: "Developer of the Year",
    company: "Pride Group",
    source: "Economic Times Now",
    year: "2018",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    title: "Developer of the Year",
    company: "Pride Group",
    source: "Economic Times Now",
    year: "2018",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    title: "Developer of the Year",
    company: "Pride Group",
    source: "Economic Times Now",
    year: "2018",
    image: "/images/awards/best-premium-plotted.jpg",
  },
];

export default function AwardsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState<number | null>(
    null,
  );

  const handleMobileToggle = (index: number) => {
    setActiveMobileIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative overflow-hidden bg-[#1f3f6b] py-10 sm:py-14 lg:overflow-visible lg:py-16">
      <div className="mx-auto px-5 sm:px-8 lg:px-20">
        {/* HEADER */}
        <div className=" text-white">
          <h2 className="text-[30px] leading-[1.15] sm:text-[36px] lg:text-[42px]">
            Awards & Recognition
          </h2>

          {/* <p className="mt-4 text-[14px] leading-[1.8] text-white/80 sm:text-[15px] lg:text-[16px] lg:leading-[1.6]">
            The numerous awards and the LEED Platinum certification that the
            Pride Group has won is a testimony to our unwavering focus on
            superlative quality and to delivering beyond expectations to all our
            stakeholders - customers, clients and partners. The untiring efforts
            of the leadership team and the entire workforce have helped us raise
            construction standards that are recognized by the authorities and
            the customers alike. Our deliverables stand out...
          </p> */}
        </div>

        {/* GRID */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-8 xl:gap-10">
          {awards.map((award, index) => {
            const isHovered = hoveredIndex === index;
            const isMobileOpen = activeMobileIndex === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative"
              >
                <button
                  type="button"
                  onClick={() => handleMobileToggle(index)}
                  className="relative min-h-[210px] rounded-[10px] w-full cursor-pointer bg-[#f1f1f1] p-5 text-left transition-all duration-300 hover:bg-[#ebebeb] sm:min-h-[220px] sm:p-6 lg:min-h-[230px]"
                >
                  <div className="orange">
                    <span className="material-symbols-outlined text-[42px]! sm:text-[46px]! lg:text-[50px]!">
                      workspace_premium
                    </span>
                  </div>

                  <h3 className="mt-2 text-[22px] leading-[1.2] text-[#1f3f6b] sm:text-[24px]">
                    {award.title}
                  </h3>

                  <p className="mt-3 text-[14px] text-[#444]">
                    {award.company}
                  </p>
                  <p className="text-[14px] text-[#444]">{award.source}</p>
                  <p className="text-[14px] text-[#444]">{award.year}</p>

                  {/* MOBILE / TABLET IMAGE */}
                  <div
                    className={`grid transition-all duration-500 lg:hidden ${
                      isMobileOpen
                        ? "mt-5 grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden rounded-[14px]">
                      <Image
                        src={award.image}
                        alt={award.title}
                        width={500}
                        height={340}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  </div>
                </button>

                {/* DESKTOP HOVER IMAGE */}
                <div
                  className={`pointer-events-none absolute -top-16 left-1/2 z-50 hidden w-[260px] -translate-x-1/2 transition-all duration-500 ease-out lg:block xl:w-[280px] ${
                    isHovered
                      ? "translate-y-0 scale-100 opacity-100"
                      : "translate-y-6 scale-95 opacity-0"
                  }`}
                >
                  <div className="rounded-[10px] bg-white p-2 shadow-2xl">
                    <div className="overflow-hidden rounded-[12px]">
                      <Image
                        src={award.image}
                        alt={award.title}
                        width={400}
                        height={300}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center ">
          <TransitionLink
            href="/awards"
            className="mt-7 cursor-pointer px-4 py-1 border orange-btn border-white rounded-full text-white hover:text-black transition-colors duration-300 text-[14px] sm:text-[15px] lg:text-[16px]"
          >
            View All Awards
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
