"use client";

import { useEffect, useState } from "react";
import TransitionLink from "../common/TransitionLink";

export default function HeroSection() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      data-header="dark"
      className="relative sm:min-h-[80vh] overflow-hidden"
    >
      {/* IMAGE */}
      <img
        src="/images/Building-with-Pride-First-Image.jpg"
        alt="Building with Pride"
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ease-out ${
          show ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/55 sm:bg-gradient-to-l sm:from-black/90 sm:via-white/10 sm:to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex justify-center text-center md:justify-end md:text-right sm:min-h-[80vh] w-full max-w-[1400px] items-center px-5 sm:px-6 md:px-10 lg:px-16">
        <div className="w-full mt-[10%] max-w-[640px] py-16 sm:py-20 md:py-24">
          {/* TAG */}
          <p
            className={`mb-3 sm:mb-4 text-[11px] sm:text-sm uppercase tracking-[0.18em] text-white transition-all duration-700 ${
              show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Building with Pride
          </p>

          {/* TITLE */}
          <h1
            className={`font-serif text-[30px] leading-[1.15] text-white sm:text-[38px] md:text-[46px] lg:text-[40px] transition-all duration-700 delay-100 ${
              show ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            What we build begins with how people live.
          </h1>

          {/* DESCRIPTION */}
          {/* <p
            className={`mt-4 sm:mt-6 text-sm leading-7 text-white/85 sm:text-base sm:leading-8 md:text-lg transition-all duration-700 delay-200 ${
              show ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Thoughtful homes, well-planned communities, and everyday details
            designed for comfort, longevity, and real life.
          </p> */}

          {/* BUTTONS */}
          <div
            className={`mt-6 sm:mt-8 flex flex-col justify-end sm:flex-row sm:flex-wrap gap-3 sm:gap-4 transition-all duration-700 delay-300 ${
              show ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <a
              href="#principles"
              className="inline-flex w-full sm:w-auto items-center justify-center border border-white px-5 py-3 text-sm tracking-wide text-white transition duration-300 hover:bg-[#172f55] hover:text-white hover:border-[#172f55]"
            >
              Explore The Principles
            </a>

            <TransitionLink
              href="/building-with-pride/community-we-build"
              className="inline-flex w-full sm:w-auto items-center justify-center border border-white px-5 py-3 text-sm tracking-wide text-white transition duration-300 hover:bg-[#172f55] hover:text-white hover:border-[#172f55]"
            >
              Community We Build
            </TransitionLink>

            <TransitionLink
              href="/building-with-pride/csr"
              className="inline-flex w-full sm:w-auto items-center justify-center border border-white px-5 py-3 text-sm tracking-wide text-white transition duration-300 hover:bg-[#172f55] hover:text-white hover:border-[#172f55]"
            >
              Discover Our CSR
            </TransitionLink>
          </div>

          {/* FEATURES GRID */}
          <div
            className={`mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 gap-5 border-t border-white/20 pt-5 sm:pt-6 sm:grid-cols-3 transition-all duration-700 delay-500 ${
              show ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {[
              {
                title: "Design-led planning",
                desc: "Spaces shaped around everyday living.",
              },
              {
                title: "Quality benchmarks",
                desc: "Systems, checks, and standards that guide delivery.",
              },
              {
                title: "Long-term thinking",
                desc: "Communities built for use, care, and continuity.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`transition-all duration-700 ${
                  show ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${600 + i * 100}ms` }}
              >
                <p className="text-sm font-medium text-white">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-white/85">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
