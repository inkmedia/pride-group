"use client";

import Image from "next/image";
import { useState } from "react";
import TransitionLink from "../common/TransitionLink";

type Award = {
  title: string;
  projectAwardedTo: string;
  awardingParty: string;
  year: string;
  image: string;
};

const awards: Award[] = [
  {
    title: "2nd Realty india brand leadership conclave and aware",
    projectAwardedTo:
      "SMARTAN Pride world city (Most effective content marketing and strategy)",
    awardingParty: "Bombay realty",
    year: "2026",
    image: "/images/awards/Award-1.jpg",
  },
  {
    title: "For Construction Health, Safety & Environment",
    projectAwardedTo: "Pride Builders LLP for Wellington",
    awardingParty: "16th CIDC Vishwakarma Medal",
    year: "2025",
    image: "/images/awards/Award-2.jpg",
  },
  {
    title: "Asia's Greatest Brands",
    projectAwardedTo: "Pride Group",
    awardingParty: "Asia One",
    year: "2023-2024",
    image: "/images/awards/Award-3.jpg",
  },
  {
    title: "Environment Friendly Project - Residential",
    projectAwardedTo: "Pride Group for Pride Platinum",
    awardingParty: "Realty Excellence Awards, West",
    year: "2014",
    image: "/images/awards/Award-4.jpg",
  },
  {
    title: "Occupational Health & Safety Award",
    projectAwardedTo: "Pride Builders LLP for Wellington",
    awardingParty: "Apex India Foundation",
    year: "2023",
    image: "/images/awards/Award-5.jpg",
  },
  {
    title: "Real Estate Icons of Pune",
    projectAwardedTo: "Mr. Arvind Jain",
    awardingParty: "Times Property",
    year: "2022",
    image: "/images/awards/Award-6.jpg",
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
        <div className="text-white">
          <h2 className="text-[30px] leading-[1.15] sm:text-[36px] lg:text-[42px]">
            Awards & Recognition
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:gap-7">
          {awards.map((award, index) => {
            const isHovered = hoveredIndex === index;
            const isMobileOpen = activeMobileIndex === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative h-full"
              >
                <button
                  type="button"
                  onClick={() => handleMobileToggle(index)}
                  className="relative cursor-pointer flex h-full w-full flex-col rounded-[10px] border border-white/10 bg-[#f7f7f5] p-5 text-left shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_14px_40px_rgba(0,0,0,0.12)] sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="orange shrink-0">
                      <span className="material-symbols-outlined text-[40px]! sm:text-[44px]! lg:text-[46px]!">
                        workspace_premium
                      </span>
                    </div>

                    <p className="pt-1 text-right text-[14px] font-[700] leading-none text-[#1f3f6b] sm:text-[15px]">
                      {award.year}
                    </p>
                  </div>

                  <h3 className="mt-4 min-h-[52px] text-[18px] leading-[1.25] text-[#1f3f6b] sm:text-[18px] lg:text-[20px]">
                    {award.title}
                  </h3>

                  <div className="mt-4 flex flex-1 flex-col justify-between space-y-4">
                    <div>
                      <p className="text-[11px] font-[700] uppercase tracking-[0.12em] text-[#1f3f6b]/55">
                        Project Awarded to
                      </p>
                      <p className="mt-1 text-[14px] leading-[1.55] text-[#444]">
                        {award.projectAwardedTo}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] font-[700] uppercase tracking-[0.12em] text-[#1f3f6b]/55">
                        Awarding Party
                      </p>
                      <p className="mt-1 text-[14px] leading-[1.55] text-[#444]">
                        {award.awardingParty}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`grid transition-all duration-500 lg:hidden ${
                      isMobileOpen
                        ? "mt-5 grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden rounded-[12px]">
                      <Image
                        src={award.image}
                        alt={award.title}
                        width={500}
                        height={340}
                        className="h-[220px] w-full object-cover"
                      />
                    </div>
                  </div>
                </button>

                <div
                  className={`pointer-events-none absolute -top-14 left-1/2 z-50 hidden w-[250px] -translate-x-1/2 transition-all duration-400 ease-out lg:block xl:w-[270px] ${
                    isHovered
                      ? "translate-y-0 scale-100 opacity-100"
                      : "translate-y-4 scale-[0.98] opacity-0"
                  }`}
                >
                  <div className="rounded-[14px] bg-white p-2 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
                    <div className="overflow-hidden rounded-[10px]">
                      <Image
                        src={award.image}
                        alt={award.title}
                        width={400}
                        height={300}
                        className="h-[180px] w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <TransitionLink
            href="/awards"
            className="mt-7 cursor-pointer rounded-full border border-white px-4 py-1 text-[14px] text-white transition-colors duration-300 hover:bg-white hover:text-black  sm:text-[15px] lg:text-[16px]"
          >
            View All Awards
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
