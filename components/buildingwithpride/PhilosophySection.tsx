"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

const philosophyCards = [
  {
    title: "Design for life",
    description:
      "Spaces should feel intuitive, useful, and comfortable from day one.",
    image: "/images/Design-For-Life.JPG",
  },
  {
    title: "Function over gimmicks",
    description:
      "Planning begins with everyday use, not with distracting visual noise or clutter.",
    image: "/images/Function-Gimmicks.jpg",
  },
  {
    title: "Quality across segments",
    description:
      "Quality is not treated as a feature reserved only for premium users.",
    image: "/images/Quality-Across-Segments.jpg",
    videoUrl: "https://www.youtube.com/watch?v=0cWsRGd7NvY",
  },
  {
    title: "Long-term thinking",
    description:
      "Decisions should hold up over time, not just in launch communication.",
    image: "/images/Long-Term-Thinking.jpg",
  },
  {
    title: "People first",
    description:
      "Customers, employees, partners, and workers are all part of the same ecosystem of responsibility.",
    image: "/images/People-First.JPG",
  },
  {
    title: "Communities, not just projects",
    description:
      "The goal is to create places where people can live, connect, and belong.",
    image: "/images/Communities-not-Projects.jpg",
  },
];

const getCardsPerView = (width: number) => {
  if (width < 640) return 1;
  if (width < 1280) return 2;
  return 3;
};

const getYoutubeEmbedUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const videoId = parsedUrl.searchParams.get("v");

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }

    return url;
  } catch {
    return url;
  }
};

export default function PhilosophySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [playingVideoTitle, setPlayingVideoTitle] = useState<string | null>(
    null,
  );

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  useEffect(() => {
    const updateCardsPerView = () => {
      setCardsPerView(getCardsPerView(window.innerWidth));
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);

    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const maxIndex = Math.max(philosophyCards.length - cardsPerView, 0);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, maxIndex]);

  const totalDots = useMemo(() => maxIndex + 1, [maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;

    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  return (
    <section className="bg-[#f6f6f4] py-12 sm:py-14 md:py-16 xl:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 md:mb-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-[820px]">
            <h2 className="text-[24px] leading-tight text-[#222] sm:text-[30px] md:text-[34px] xl:text-[42px]">
              The thinking behind the work
            </h2>

            <p className="mt-3 max-w-[920px] text-sm leading-7 text-[#555] sm:mt-4 sm:text-base sm:leading-8">
              Our philosophy is simple: build for real life, not just for
              display. Every decision is expected to serve a purpose — whether
              that means better privacy, more light and ventilation, easier
              daily movement, or stronger long-term liveability.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:mt-1">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous cards"
              className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border border-[#d8d8d8] bg-white text-[#222] transition duration-300 hover:border-[#bfbfbf] hover:bg-[#f0f0ee] disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M15 6L9 12L15 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
              aria-label="Next cards"
              className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border border-[#d8d8d8] bg-white text-[#222] transition duration-300 hover:border-[#bfbfbf] hover:bg-[#f0f0ee] disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="-mx-2 sm:-mx-3">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  (currentIndex * 100) / cardsPerView
                }%)`,
              }}
            >
              {philosophyCards.map((card) => {
                const isPlaying =
                  playingVideoTitle === card.title && !!card.videoUrl;

                return (
                  <div
                    key={card.title}
                    className="w-full shrink-0 px-2 sm:w-1/2 sm:px-3 xl:w-1/3"
                  >
                    <article className="h-full overflow-hidden rounded-[10px] border border-[#dddddd] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
                      <div className="relative h-[220px] sm:h-[240px] md:h-[250px] lg:h-[270px] xl:h-[280px]">
                        {isPlaying && card.videoUrl ? (
                          <iframe
                            src={getYoutubeEmbedUrl(card.videoUrl)}
                            title={card.title}
                            className="h-full w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : card.videoUrl ? (
                          <button
                            type="button"
                            onClick={() => setPlayingVideoTitle(card.title)}
                            className="group relative h-full w-full"
                            aria-label={`Play video for ${card.title}`}
                          >
                            <Image
                              src={card.image}
                              alt={card.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
                            />

                            <div className="absolute inset-0 bg-black/20 transition duration-300 group-hover:bg-black/30" />

                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition duration-300 group-hover:scale-105">
                                <svg
                                  width="22"
                                  height="22"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M8 6.5V17.5L17 12L8 6.5Z"
                                    fill="#222"
                                  />
                                </svg>
                              </div>
                            </div>
                          </button>
                        ) : (
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
                          />
                        )}
                      </div>

                      <div className="p-5 sm:p-6 md:p-7">
                        <h3 className="text-[20px] font-semibold leading-snug text-[#2a2a2a] sm:text-[21px] md:text-[22px]">
                          {card.title}
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-[#5f5f5f] sm:text-[15px]">
                          {card.description}
                        </p>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {totalDots > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2 sm:mt-8">
            {Array.from({ length: totalDots }).map((_, index) => {
              const isActive = index === currentIndex;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`cursor-pointer h-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-8 bg-[#222]"
                      : "w-2.5 bg-[#cfcfcf] hover:bg-[#a9a9a9]"
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
