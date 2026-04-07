"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/types/project";

export default function ProjectFeatures({ project }: { project: Project }) {
  const images = project.features?.images ?? [];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [images.length]);

  if (!images.length) return null;

  const goToPrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const getVisibleSlides = useMemo(() => {
    if (images.length === 1) {
      return [{ src: images[0], index: 0, position: "center" as const }];
    }

    const prevIndex = current === 0 ? images.length - 1 : current - 1;
    const nextIndex = (current + 1) % images.length;

    return [
      { src: images[prevIndex], index: prevIndex, position: "left" as const },
      { src: images[current], index: current, position: "center" as const },
      { src: images[nextIndex], index: nextIndex, position: "right" as const },
    ];
  }, [current, images]);

  return (
    <section className="overflow-hidden bg-[#173363] py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <h3 className="mb-8 text-center text-[30px] font-[500] leading-none text-white sm:mb-10 sm:text-[38px] lg:text-[44px]">
          Project Features
        </h3>

        <div className="relative">
          <div className="relative mx-auto flex h-[260px] items-center justify-center sm:h-[360px] lg:h-[520px] xl:h-[620px]">
            {getVisibleSlides.map((slide) => {
              const isCenter = slide.position === "center";
              const isSide =
                slide.position === "left" || slide.position === "right";

              return (
                <button
                  key={`${slide.position}-${slide.index}-${current}`}
                  type="button"
                  onClick={() => setCurrent(slide.index)}
                  aria-label={`Go to slide ${slide.index + 1}`}
                  className={`absolute cursor-pointer overflow-hidden bg-black shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform
                    ${isCenter ? "z-20" : "z-10"}
                    ${
                      isCenter
                        ? "h-[88%] w-[72%] sm:w-[74%] lg:w-[70%] xl:w-[69%]"
                        : "h-[72%] w-[28%] sm:w-[26%] lg:w-[23%] xl:w-[22%]"
                    }
                    ${
                      slide.position === "left"
                        ? "left-[-6%] sm:left-[-3%] lg:left-[-1%]"
                        : slide.position === "right"
                          ? "right-[-6%] sm:right-[-3%] lg:right-[-1%]"
                          : "left-1/2 -translate-x-1/2"
                    }
                    ${
                      isCenter
                        ? "scale-100 opacity-100"
                        : "scale-[0.92] opacity-80 hover:opacity-95"
                    }
                  `}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={slide.src}
                      alt={`${project.title} feature ${slide.index + 1}`}
                      fill
                      className={`object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                        isCenter
                          ? "scale-100 opacity-100 blur-0"
                          : "scale-[1.04] opacity-95 blur-[0.3px]"
                      }`}
                      sizes={
                        isCenter
                          ? "(max-width: 1024px) 74vw, 70vw"
                          : "(max-width: 1024px) 28vw, 22vw"
                      }
                      priority={slide.index === 0}
                    />

                    {isSide && (
                      <div className="absolute inset-0 bg-black/20 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                    )}
                  </div>
                </button>
              );
            })}

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goToPrev}
                  aria-label="Previous slide"
                  className="absolute left-[2px] top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:scale-105 sm:left-2 lg:left-4"
                >
                  <span className="text-[28px] leading-none">‹</span>
                </button>

                <button
                  type="button"
                  onClick={goToNext}
                  aria-label="Next slide"
                  className="absolute right-[2px] top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:scale-105 sm:right-2 lg:right-4"
                >
                  <span className="text-[28px] leading-none">›</span>
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-7 flex items-center justify-center gap-2 sm:mt-8">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrent(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    current === index
                      ? "w-8 bg-white"
                      : "w-2.5 bg-white/35 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
