"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Slide = {
  id: number;
  title: string;
  mobileTitle: string;
  description: string;
  mobileDescription: string;
  desktopImage: string;
  mobileImage: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: "Built on Conviction.\nRecognised by Results.",
    mobileTitle: "Built on Conviction.\nRecognised by Results.",
    description:
      "Pride Group is known to set the market standard — through fair dealing, meticulous planning, and an unbroken record of delivery.",
    mobileDescription:
      "Pride Group is known to set the market standard — through fair dealing, meticulous planning, and an unbroken record of delivery.",
    desktopImage: "/images/slide.png",
    mobileImage: "/images/Mobile-Slider.png",
  },
  {
    id: 2,
    title: "Built on Conviction.\nRecognised by Results.",
    mobileTitle: "Built on Conviction.\nRecognised by Results.",
    description:
      "Pride Group is known to set the market standard — through fair dealing, meticulous planning, and an unbroken record of delivery.",
    mobileDescription:
      "Pride Group is known to set the market standard — through fair dealing, meticulous planning, and an unbroken record of delivery.",
    desktopImage: "/images/Slide-2.png",
    mobileImage: "/images/Mobile-Slider.png",
  },
  {
    id: 3,
    title: "Built on Conviction.\nRecognised by Results.",
    mobileTitle: "Built on Conviction.\nRecognised by Results.",
    description:
      "Pride Group is known to set the market standard — through fair dealing, meticulous planning, and an unbroken record of delivery.",
    mobileDescription:
      "Pride Group is known to set the market standard — through fair dealing, meticulous planning, and an unbroken record of delivery.",
    desktopImage: "/images/Slide-4.png",
    mobileImage: "/images/Mobile-Slider.png",
  },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [animateText, setAnimateText] = useState<boolean>(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const restartTextAnimation = () => {
    setAnimateText(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setAnimateText(true);
    }, 80);
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    restartTextAnimation();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
      restartTextAnimation();
    }, 4000);

    return () => {
      clearInterval(timer);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* DESKTOP SLIDER */}
      <section className="relative hidden h-screen w-full overflow-hidden md:block">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeIndex ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            <Image
              src={slide.desktopImage}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover transition-transform duration-[4000ms] ease-out ${
                index === activeIndex ? "scale-105" : "scale-100"
              }`}
            />
            <div className="absolute inset-0 bg-black/5" />
          </div>
        ))}

        <div className="absolute right-6 top-1/3 z-20 max-w-[430px] -translate-y-1/2 text-right lg:right-12 xl:right-[80px]">
          <h1
            className={`whitespace-pre-line text-[30px] leading-[1.1] text-[#1f1f1f] transition-all duration-700 lg:text-[33px] ${
              animateText
                ? "translate-y-0 opacity-100"
                : "translate-y-[20px] opacity-0"
            }`}
          >
            {slides[activeIndex].title}
          </h1>

          <p
            className={`mt-4 text-[13px] leading-[1.7] text-[#3f3f3f] transition-all duration-700 delay-200 ${
              animateText
                ? "translate-y-0 opacity-100"
                : "translate-y-[20px] opacity-0"
            }`}
          >
            {slides[activeIndex].description}
          </p>
        </div>

        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-[8px] w-[8px] rounded-full transition-all cursor-pointer ${
                activeIndex === index
                  ? "bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
                  : "bg-white/55"
              }`}
            />
          ))}
        </div>
      </section>

      {/* MOBILE SLIDER */}
      <section className="relative mt-[72px] block min-h-[88svh] w-full overflow-hidden md:hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeIndex ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            <Image
              src={slide.mobileImage}
              alt={slide.mobileTitle || slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover object-[center_top] transition-transform duration-[4000ms] ease-out ${
                index === activeIndex ? "scale-105" : "scale-100"
              }`}
            />
            <div className="absolute inset-0" />
            {/* <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.18)_34%,rgba(6,12,22,0.62)_72%,rgba(6,12,22,0.9)_100%)]" /> */}
          </div>
        ))}

        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-[9px] w-[9px] cursor-pointer rounded-full transition-all ${
                activeIndex === index
                  ? "bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.2)]"
                  : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>
    </>
  );
}
