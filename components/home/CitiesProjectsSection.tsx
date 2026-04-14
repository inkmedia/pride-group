"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

/* ---------------- TYPES ---------------- */

type CityKey = "pune" | "mumbai" | "bangalore";

type Project = {
  title: string;
  subtitle: string;
  description: string;
  location: string;
  image: string;
  href: string;
};

type City = {
  key: CityKey;
  name: string;
  description: string;
  cta: string;
  ctaHref: string;
  cardBgImage: string;
  projects: Project[];
};

/* ---------------- DATA ---------------- */

const cityData: City[] = [
  {
    key: "pune",
    name: "Pune",
    description:
      "Where Pride’s journey took shape, and where it continues at its most ambitious scale.",
    cta: "Explore Projects in Pune",
    ctaHref: "/pune",
    cardBgImage: "/images/Pune.jpg",
    projects: [
      {
        title: "Wellington",
        subtitle: "2 & 3 BHK Apartments",
        description:
          "Wellington presents an extraordinary lifestyle with world-class amenities and superior craftsmanship at Pride World City Charholi.",
        location: "Pride World City, Charholi",
        image: "/images/projects/Wellington.png",
        href: "/projects/wellington",
      },
      {
        title: "Soho",
        subtitle: "2, 2.5 BHK Flats",
        description:
          "SOHO is a well-thought-out new cluster in Pride World City built with the idea of equality at Pride World City Charholi.",
        location: "Pride World City, Charholi",
        image: "/images/projects/soho.jpg",
        href: "/projects/soho",
      },
      {
        title: "Miami",
        subtitle: "2,3 & 4.5 BHK Flats",
        description:
          "Welcome to Miami, where every moment is picture-perfect, and every corner is designed for a life of elegance, comfort, and style at Pride World City Charholi.",
        location: "Pride World City, Charholi",
        image: "/images/projects/miami.jpg",
        href: "#",
      },
      {
        title: "Montreal",
        subtitle: "2 & 4 BHK Duplex",
        description:
          "Designed to elevate lifestyles and inspire ambition, it blends luxury, convenience, and sustainability into a self-sustaining ecosystem at Pride World City Charholi.",
        location: "Pride World City, Charholi",
        image: "/images/projects/montreal.jpg",
        href: "#",
      },
    ],
  },
  {
    key: "bangalore",
    name: "Bangalore",
    description:
      "In a fast-evolving city, we create homes designed for lasting value.",
    cta: "Explore Projects in Bangalore",
    ctaHref: "/bangalore",
    cardBgImage: "/images/Bangalore.jpg",
    projects: [
      {
        title: "Pride Cross Winds",
        subtitle: "Villa Plots starting from 2400sq.ft",
        description:
          "Spread over 25 acres of pristine land, Pride Crosswinds Villa Plots Phase II offers you the best of both worlds.",
        location: "Bannerghatta-Jigani Road, Bangalore",
        image: "/images/projects/pride-crosswinds.jpg",
        href: "#",
      },
      {
        title: "Pride Sunrise",
        subtitle: "1 & 2 BHK Smart Homes",
        description:
          "Pride Sunrise is a combination of visual delight with thoughtful touches that optimize space bringing alive the concept of smart homes brilliantly.",
        location: "Bannerghatta-Jigani Road, Bangalore",
        image: "/images/projects/pride-sunrise.jpg",
        href: "#",
      },
      {
        title: "Pride Altius",
        subtitle: "3 BHK Premium Lifestyle Homes",
        description:
          "We believe in something, only then we can translate into reality a bold & modern architectural icon combined with the best in living.",
        location: "Tumkur Road, Bangalore West",
        image: "/images/projects/pride-altius.jpg",
        href: "#",
      },
    ],
  },
  {
    key: "mumbai",
    name: "Mumbai",
    description:
      "In a city that values conviction, we build with clarity and discipline.",
    cta: "Explore Projects in Mumbai",
    ctaHref: "/mumbai",
    cardBgImage: "/images/Mumbai.png",
    projects: [
      {
        title: "Park Royale",
        subtitle: "2 & 3 BHK Apartments",
        description:
          "Park Royale comes loaded with attributes and amenities that add charm to your way of life and makes living an experience you will relish day after day, minute after minute at Marol.",
        location: "Andheri East, Mumbai",
        image: "/images/projects/park-royale.jpg",
        href: "#",
      },
    ],
  },
];

/* ---------------- ICON ---------------- */

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 sm:h-5 sm:w-5"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
    </svg>
  );
}

/* ---------------- COMPONENT ---------------- */

export default function CitiesProjectsSection() {
  const [activeCity, setActiveCity] = useState<CityKey>("pune");
  const [projectIndex, setProjectIndex] = useState<number>(0);
  const [animating, setAnimating] = useState<boolean>(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const activeData = useMemo(
    () => cityData.find((c) => c.key === activeCity)!,
    [activeCity],
  );

  const activeProject = activeData.projects[projectIndex];

  const handleCityChange = (key: CityKey) => {
    if (key === activeCity) return;

    setDirection("next");
    setAnimating(true);

    setTimeout(() => {
      setActiveCity(key);
      setProjectIndex(0);
      setAnimating(false);
    }, 300);
  };

  const nextProject = () => {
    setDirection("next");
    setAnimating(true);

    setTimeout(() => {
      setProjectIndex((prev) =>
        prev === activeData.projects.length - 1 ? 0 : prev + 1,
      );
      setAnimating(false);
    }, 300);
  };

  const prevProject = () => {
    setDirection("prev");
    setAnimating(true);

    setTimeout(() => {
      setProjectIndex((prev) =>
        prev === 0 ? activeData.projects.length - 1 : prev - 1,
      );
      setAnimating(false);
    }, 300);
  };

  const goToProject = (index: number) => {
    if (index === projectIndex) return;

    setDirection(index > projectIndex ? "next" : "prev");
    setAnimating(true);

    setTimeout(() => {
      setProjectIndex(index);
      setAnimating(false);
    }, 300);
  };

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto overflow-hidden bg-white">
        {/* TOP */}
        <div className="lg:grid lg:grid-cols-[1.8fr_repeat(3,minmax(0,1fr))]">
          {/* LEFT TEXT */}
          <div className="px-1 py-2 sm:px-0 lg:px-4 lg:py-12">
            <div className="px-4 py-5 sm:px-5 lg:px-0">
              <h2 className="max-w-[430px] text-[28px] leading-[1.3] text-[#38456a] sm:text-[34px] md:text-[35px]">
                Built across cities,
                <br />
                Guided by one standard.
              </h2>

              <div className="mt-6 max-w-[520px] space-y-5 text-[14px] leading-[1.75] text-[#4b4b4b] sm:mt-8 sm:space-y-6 sm:text-[15px] md:text-[16px]">
                <p>
                  Pride brings together the scale of modern living and the
                  warmth of connected communities. For decades, Pride Group has
                  been building across cities with careful planning and
                  long-term trust.
                </p>
              </div>
            </div>
          </div>

          {/* CITY CARDS */}
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 sm:px-6 lg:contents lg:px-0 lg:pb-0">
            {cityData.map((city) => {
              const isActive = activeCity === city.key;
              const hasBgImage = !!city.cardBgImage;

              return (
                <div
                  key={city.key}
                  onClick={() => {
                    if (!isActive) handleCityChange(city.key);
                  }}
                  onKeyDown={(e) => {
                    if (!isActive && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      handleCityChange(city.key);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={
                    isActive
                      ? `Go to ${city.name} page`
                      : `Show ${city.name} projects`
                  }
                  className={`relative min-w-[260px] snap-start overflow-hidden rounded-sm px-5 py-7 text-left transition-all duration-500 sm:min-w-[300px] sm:px-6 sm:py-8 lg:min-h-[320px] lg:min-w-0 lg:rounded-none lg:px-8 lg:py-12 ${
                    isActive
                      ? "scale-[1.01] cursor-pointer text-white"
                      : "cursor-pointer bg-[#f8f8f8] text-[#38456a] hover:bg-[#ececec]"
                  }`}
                >
                  {isActive && (
                    <>
                      <div className="absolute inset-0 bg-[#173566]" />
                      {hasBgImage && (
                        <>
                          <Image
                            src={city.cardBgImage}
                            alt={`${city.name} background`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40" />
                        </>
                      )}

                      <Link
                        href={city.ctaHref}
                        aria-label={`Explore projects in ${city.name}`}
                        className="absolute inset-0 z-20"
                      />
                    </>
                  )}

                  <div className="relative z-10 flex h-full min-h-[180px] flex-col justify-between">
                    <h3 className="text-[26px] sm:text-[30px] lg:text-[36px]">
                      {city.name}
                    </h3>

                    <span className="inline-block text-[12px] font-semibold uppercase sm:text-[13px] lg:text-[14px]">
                      {city.cta}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
          {/* IMAGE */}
          <div className="relative min-h-[260px] overflow-hidden sm:min-h-[360px] lg:min-h-[350px]">
            <Image
              key={`${activeCity}-${activeProject.image}`}
              src={activeProject.image}
              alt={activeProject.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className={`object-cover transition-all duration-700 ${
                animating ? "scale-110 opacity-70" : "scale-100 opacity-100"
              }`}
            />

            <div className="absolute bottom-4 right-4 flex gap-2 sm:bottom-6 sm:right-6 sm:gap-3">
              <button
                onClick={prevProject}
                aria-label="Previous project"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/85 text-[22px] text-[#173566] backdrop-blur-sm transition hover:bg-white sm:h-11 sm:w-11"
              >
                ‹
              </button>
              <button
                onClick={nextProject}
                aria-label="Next project"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/85 text-[22px] text-[#173566] backdrop-blur-sm transition hover:bg-white sm:h-11 sm:w-11"
              >
                ›
              </button>
            </div>
          </div>

          {/* TEXT PANEL */}
          <div className="overflow-hidden bg-[#173566] px-10 py-8 text-white sm:px-8 sm:py-10 lg:px-14 lg:py-16">
            <div
              className={`transition-all duration-500 ${
                animating
                  ? direction === "next"
                    ? "translate-y-6 opacity-0"
                    : "-translate-y-6 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              <h3 className="text-[28px] leading-[1.1] sm:text-[32px] lg:text-[36px]">
                {activeProject.title}
              </h3>

              <p className="mt-2 text-[12px] font-medium tracking-[0.06em] sm:text-[13px]">
                {activeProject.subtitle}
              </p>

              <p className="mt-5 text-[14px] leading-[1.8] text-white/90 sm:mt-6 sm:text-[15px] lg:text-[16px]">
                {activeProject.description}
              </p>

              <div className="mt-5 flex items-center gap-2 text-[14px] text-white/95 sm:mt-6 sm:text-[15px]">
                <LocationIcon />
                <span>{activeProject.location}</span>
              </div>

              <Link
                href={activeProject.href}
                className="mt-6 inline-block text-[14px] font-medium underline underline-offset-4"
              >
                View Project
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-2 sm:mt-8">
              {activeData.projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToProject(i)}
                  aria-label={`Go to project ${i + 1}`}
                  className={`h-2 cursor-pointer rounded-full transition-all ${
                    i === projectIndex ? "w-6 bg-[#f99d1c]" : "w-2 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
