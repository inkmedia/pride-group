"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const cities = [
  {
    name: "Pune",
    slug: "pune",
    image: "/images/Society.JPG",
    description:
      "Where Pride’s journey began, with large-scale communities and integrated townships.",
  },
  {
    name: "Mumbai",
    slug: "mumbai",
    image: "/images/Function-Gimmicks.jpg",
    description:
      "Built with clarity and discipline in one of the most demanding urban landscapes.",
  },
  {
    name: "Bangalore",
    slug: "bangalore",
    image: "/images/Design-For-Life.JPG",
    description:
      "Designed for evolving lifestyles in a fast-growing technology-driven city.",
  },
];

export default function ProjectsCities() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="bg-white p-20 md:p-20 lg:p-20">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {cities.map((city) => {
          const isActive = active === city.slug;

          return (
            <Link
              key={city.slug}
              href={`/projects/${city.slug}`}
              onMouseEnter={() => setActive(city.slug)}
              onMouseLeave={() => setActive(null)}
              className="group relative h-[65vh] min-h-[420px] overflow-hidden"
            >
              {/* IMAGE */}
              <Image
                src={city.image}
                alt={city.name}
                fill
                className={`object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive ? "scale-110" : "scale-100"
                }`}
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

              {/* CONTENT */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 text-white">
                <h3 className="text-[32px] md:text-[40px] leading-none">
                  {city.name}
                </h3>

                {/* DESCRIPTION */}
                <p
                  className={`mt-4 max-w-[420px] text-[15px] leading-[1.6] text-white/80 transition-all duration-500 ${
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  {city.description}
                </p>

                {/* CTA */}
                <span
                  className={`mt-6 inline-block text-[13px] uppercase tracking-wide transition-all duration-500 ${
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                >
                  Explore Projects →
                </span>
              </div>

              {/* SUBTLE DIVIDER */}
              <div className="absolute top-0 right-0 h-full w-[1px] bg-white/10 hidden lg:block" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
