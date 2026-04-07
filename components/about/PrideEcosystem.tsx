"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ---------------- DATA ---------------- */

const ecosystem = [
  {
    title: "Abhyan Merchant Pvt Ltd",
    desc: "Abhiyan Merchant Pvt Ltd is an RBI-registered NBFC that provides capital support for real estate projects across Pune and Mumbai.",
    href: "#",
  },
  {
    title: "Accent Facility Management",
    desc: "Our dedicated facility management arm has been servicing clients for over 20 years and today operates with a turnover of ₹5 crore.",
    href: "#",
  },
  {
    title: "Hospitality",
    desc: "The Group has a strong portfolio across commercial assets and is now planning to expand into the super luxury hospitality segment.",
    href: "#",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function PrideEcosystem() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="pride-ecosystem"
      ref={ref}
      className="bg-[#f8f8f8] py-14 sm:py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        {/* HEADER */}
        <div
          className={`mb-10 max-w-[820px] transition-all duration-700 ease-out lg:mb-14 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="mt-3 text-[28px] leading-[1.15] text-[#1f2a44] sm:text-[34px] md:text-[38px] lg:text-[40px]">
            The Pride Ecosystem
          </h2>

          <p className="mt-5 text-[15px] leading-[1.9] text-[#1f3f6b]/75 sm:text-[16px]">
            Pride Group’s ecosystem extends beyond development itself — bringing
            together capital support, facility management, and hospitality-led
            growth to strengthen planning, execution, and long-term value
            creation.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
          {ecosystem.map((item, i) => (
            <article
              key={item.title}
              className={`group flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[10px] border border-[#1f3f6b]/10 bg-white transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(31,63,107,0.08)] ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 140}ms` }}
            >
              <div className="p-6 sm:p-7 lg:p-8">
                {/* NUMBER + ICON */}
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-[12px] font-[700] tracking-[0.14em] ">
                    {i + 1 < 10 ? `0${i + 1}` : i + 1}
                  </span>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f8f8f8]">
                    <span className="material-symbols-outlined text-[30px]!">
                      hub
                    </span>
                  </div>
                </div>

                {/* TITLE */}
                <h3 className="text-[20px] font-[500] leading-[1.2] tracking-[-0.02em] text-[#1f3f6b] sm:text-[22px] lg:text-[21px]">
                  {item.title}
                </h3>

                <div className="mt-5 h-[1px] w-14 bg-[#1f3f6b]/25" />

                {/* DESCRIPTION */}
                <p className="mt-5 text-[14px] leading-[1.9] text-[#1f3f6b]/75 sm:text-[15px]">
                  {item.desc}
                </p>
              </div>

              {/* FOOTER */}
              <div className="flex items-center justify-end border-t border-[#1f3f6b]/10 px-6 py-5 sm:px-7 lg:px-8">
                <Link
                  href={item.href}
                  className="text-[13px] font-[700] uppercase tracking-[0.12em] transition-opacity group-hover:opacity-70"
                >
                  Visit Website ↗
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
