"use client";

import { useState } from "react";
import Image from "next/image";

type Tab = {
  id: string;
  label: string;
  description: string;
  image?: string;
  video?: string;
};

const tabs: Tab[] = [
  {
    id: "apartment",
    label: "Apartment",
    video: "/video/Apartment-Video.mp4",
    description:
      "Entrance lobby for privacy, efficient living-dining zoning, practical kitchens, wider balconies, better windows, bathroom privacy, storage logic.",
  },
  {
    id: "society",
    label: "Society",
    image: "/images/Society.JPG",
    description:
      "Vehicle-free podiums, safer arrival, resident-first parking, secured lift lobbies, low-maintenance useful amenities.",
  },
  {
    id: "master-planning",
    label: "Master Planning",
    image: "/images/Master-Planning.jpg",
    description:
      "Wind movement, open-space logic, community zones, access planning, everyday convenience.",
  },
  {
    id: "amenities",
    label: "Amenities",
    image: "/images/Amenities.jpg",
    description:
      "Features that earn their place through daily use, not brochure appeal.",
  },
];

export default function DesignPlaybook() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const activeTab = tabs[activeIndex];

  const handleTabChange = (index: number) => {
    if (index === activeIndex) return;

    setDirection(index > activeIndex ? "next" : "prev");
    setAnimating(true);

    setTimeout(() => {
      setActiveIndex(index);
      setAnimating(false);
    }, 300);
  };

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-4">
            <div className="mb-5 sm:mb-6">
              <h2 className="text-[26px] leading-tight text-[#222] sm:text-[34px] lg:text-[42px]">
                Design in practice
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#555] sm:text-base sm:leading-8">
                The design principles should not read as abstract statements.
                They should show up as visible, usable decisions — how an
                entrance protects privacy, how a kitchen works better, how
                podiums become safer without cars, or how planning allows wind
                and light to move well.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
              {tabs.map((tab, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabChange(index)}
                    className={`w-full cursor-pointer rounded-lg border px-4 py-3 text-left transition-all duration-300 ${
                      isActive
                        ? "border-[#222] bg-[#222] text-white"
                        : "border-[#dddddd] bg-[#f6f6f4] text-[#222] hover:bg-[#efefec]"
                    }`}
                  >
                    <span className="block break-words text-[14px] leading-snug sm:text-[15px] lg:text-[18px]">
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="min-w-0 lg:col-span-8">
            <div className="w-full overflow-hidden rounded-[10px] border border-[#dddddd] bg-[#fafaf8]">
              <div className="relative h-[220px] w-full overflow-hidden sm:h-[280px] md:h-[340px] lg:h-[420px]">
                <div
                  className={`absolute inset-0 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                    animating
                      ? direction === "next"
                        ? "translate-x-[8%] scale-105 opacity-0"
                        : "-translate-x-[8%] scale-105 opacity-0"
                      : "translate-x-0 scale-100 opacity-100"
                  }`}
                >
                  {activeTab.video ? (
                    <video
                      src={activeTab.video}
                      className="h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    activeTab.image && (
                      <Image
                        src={activeTab.image}
                        alt={activeTab.label}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 66vw"
                      />
                    )
                  )}
                </div>
              </div>

              <div className="p-5 sm:p-6 md:p-8">
                <div
                  className={`transition-all duration-500 ${
                    animating
                      ? direction === "next"
                        ? "translate-y-4 opacity-0"
                        : "-translate-y-4 opacity-0"
                      : "translate-y-0 opacity-100"
                  }`}
                >
                  <p className="break-words text-sm leading-7 text-[#555] sm:text-base sm:leading-8">
                    {activeTab.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
