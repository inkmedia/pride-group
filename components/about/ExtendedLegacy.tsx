"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const legacyItems = [
  {
    title: "Pride Purple",
    imageSrc: "/images/Pride-Purple-Logo-New.png",
    imageAlt: "Pride Purple logo",
    copy: "Projects developed in collaboration with Purple Corp across Pune and other markets.",
  },
  {
    title: "Pride Hotels",
    imageSrc: "/images/Pride-Hotels.png",
    imageAlt: "Pride Hotels logo",
    copy: "Hospitality arm associated with the Pride Group, with business & leisure hotels across India.",
  },
];

export default function ExtendedLegacy() {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#f8f8f8] py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div
          className={`max-w-[980px] transition-all duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-[28px] leading-[1.15] text-[#1f2a44] sm:text-[34px] md:text-[38px] lg:text-[40px]">
            Our Extended Legacy
          </h2>

          <p className="mt-5 text-[15px] leading-[1.9] text-[#1f3f6b]/75 sm:text-[16px]">
            Over the years, Pride Group&apos;s journey has included
            collaborations and ventures that have shaped our experience and
            growth. Several landmark projects were developed under Pride Purple
            Properties through a collaboration with Purple Corp, while our
            association with Pride Hotels reflects our roots in hospitality and
            service. Together, these associations form part of the wider Pride
            ecosystem and legacy.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-14 lg:gap-6">
          {legacyItems.map((item, index) => (
            <article
              key={item.title}
              className={`rounded-[10px] border border-[#1f3f6b]/10 bg-white px-6 py-8 shadow-[0_20px_60px_rgba(31,63,107,0.06)] transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] sm:px-8 sm:py-9 ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 140}ms` }}
            >
              <div className="flex min-h-[120px] items-center justify-center rounded-[8px] bg-[#f8f8f8] px-6 py-8">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  width={260}
                  height={110}
                  className="h-auto w-auto max-h-[76px] max-w-full object-contain"
                />
              </div>

              <p className="mt-5 text-center text-[14px] leading-[1.85] text-[#1f3f6b]/78 sm:text-[15px]">
                {item.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
