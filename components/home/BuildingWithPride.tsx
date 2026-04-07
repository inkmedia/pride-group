"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";

type AccordionItem = {
  title: string;
  content: string;
  image: string;
  imageAlt: string;
  video?: string;
};

const items: AccordionItem[] = [
  {
    title: "DESIGN FOR REAL LIFE",
    content:
      "We plan homes around how people actually live, not just how plans look on paper.",
    image: "/images/Design-For-Life.JPG",
    imageAlt: "Design for real life",
  },
  {
    title: "QUALITY ACROSS SEGMENTS",
    content:
      "Across every category, our focus stays consistent: thoughtful planning, strong execution, and dependable quality.",
    image: "/images/Quality-Across-Segments.jpg",
    imageAlt: "Quality across segments",
    video: "/video/Apartment-Video.mp4",
  },
  {
    title: "BUILT FOR THE LONG TERM",
    content:
      "We make decisions with longevity in mind, creating homes and spaces that continue to hold value over time.",
    image: "/images/Long-Term-Thinking.jpg",
    imageAlt: "Built for the long term",
  },
  {
    title: "COMMUNITIES, NOT JUST PROJECTS",
    content:
      "Our work goes beyond buildings. We create places that support everyday routines, connection, and community life.",
    image: "/images/Communities-not-Projects.jpg",
    imageAlt: "Communities not just projects",
  },
  {
    title: "RESPONSIBILITY IN THE WAY WE WORK",
    content:
      "From planning to execution, responsibility shapes how we build, collaborate, and deliver with care.",
    image: "/images/People-First.JPG",
    imageAlt: "Responsibility in the way we work",
  },
];

export default function BuildingWithPride() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [revealing, setRevealing] = useState(false);
  const [showVideoControls, setShowVideoControls] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleToggle = (index: number) => {
    setRevealing(true);
    setShowVideoControls(false);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setActiveIndex(index === activeIndex ? null : index);
      setCurrentImageIndex(index);
      setRevealing(false);
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const currentMedia = items[currentImageIndex];

  return (
    <section className="w-full overflow-hidden bg-white">
      <div className="grid grid-cols-1 lg:min-h-[760px] lg:grid-cols-[42%_58%]">
        {/* LEFT CONTENT */}
        <div className="flex items-center px-5 py-10 sm:px-8 sm:py-12 md:px-10 lg:px-14 lg:py-20 xl:px-20">
          <div className="w-full max-w-[520px]">
            <h2 className="text-[28px] leading-[1.15] text-slate-800 sm:text-[34px] md:text-[38px] lg:text-[40px] xl:text-[42px]">
              Building with Pride
            </h2>

            <p className="mt-5 text-[14px] leading-[1.8] text-slate-600 sm:mt-6 sm:text-[15px] lg:text-[15px] xl:text-[16px] xl:leading-8">
              This is an operating standard that has guided every project, every
              decision, and every delivery since day one.
            </p>

            {/* MOBILE MEDIA ONLY */}
            <div className="relative mt-8 h-[260px] overflow-hidden sm:h-[340px] lg:hidden">
              <div
                className={`absolute inset-0 z-10 bg-white transition-transform duration-[800ms] ease-in-out ${
                  revealing ? "translate-x-0" : "translate-x-full"
                }`}
              />

              {currentMedia.video ? (
                <video
                  src={currentMedia.video}
                  title={currentMedia.imageAlt}
                  className={`h-full w-full object-cover transition-transform duration-[1200ms] ease-out ${
                    revealing ? "scale-110" : "scale-100"
                  }`}
                  autoPlay
                  muted
                  playsInline
                  loop
                  controls={showVideoControls}
                  onMouseEnter={() => setShowVideoControls(true)}
                  onMouseLeave={() => setShowVideoControls(false)}
                />
              ) : (
                <Image
                  src={currentMedia.image}
                  alt={currentMedia.imageAlt}
                  fill
                  priority
                  sizes="100vw"
                  className={`object-cover transition-transform duration-[1200ms] ease-out ${
                    revealing ? "scale-110" : "scale-100"
                  }`}
                />
              )}
            </div>

            <div className="mt-8 sm:mt-10">
              {items.map((item, index) => {
                const isActive = activeIndex === index;

                return (
                  <div
                    key={item.title}
                    className="border-b border-b-gray-300 py-4 sm:py-5"
                  >
                    <button
                      onClick={() => handleToggle(index)}
                      className="flex w-full cursor-pointer items-start gap-3 text-left sm:items-center sm:gap-4"
                    >
                      <span className="mt-[2px] shrink-0 sm:mt-0">
                        {isActive ? (
                          <Minus className="orange" size={18} />
                        ) : (
                          <Plus className="orange" size={18} />
                        )}
                      </span>

                      <span className="text-[13px] font-semibold uppercase leading-[1.5] tracking-[0.03em] sm:text-[14px] lg:text-[15px]">
                        {item.title}
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ${
                        isActive
                          ? "mt-4 grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-80"
                      }`}
                    >
                      <div className="overflow-hidden pl-7 sm:pl-8">
                        <p className="text-[14px] leading-[1.8] text-slate-600 sm:text-[15px] sm:leading-7">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* DESKTOP MEDIA ONLY */}
        <div className="relative hidden overflow-hidden lg:block lg:min-h-full">
          <div
            className={`absolute inset-0 z-10 bg-white transition-transform duration-[800ms] ease-in-out ${
              revealing ? "translate-x-0" : "translate-x-full"
            }`}
          />

          {currentMedia.video ? (
            <video
              src={currentMedia.video}
              title={currentMedia.imageAlt}
              className={`h-full w-full object-cover transition-transform duration-[1200ms] ease-out ${
                revealing ? "scale-110" : "scale-100"
              }`}
              autoPlay
              muted
              playsInline
              loop
              controls={showVideoControls}
              onMouseEnter={() => setShowVideoControls(true)}
              onMouseLeave={() => setShowVideoControls(false)}
            />
          ) : (
            <Image
              src={currentMedia.image}
              alt={currentMedia.imageAlt}
              fill
              priority
              sizes="58vw"
              className={`object-cover transition-transform duration-[1200ms] ease-out ${
                revealing ? "scale-110" : "scale-100"
              }`}
            />
          )}
        </div>
      </div>
    </section>
  );
}
