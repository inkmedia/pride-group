"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function CompletedProjectshero() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      data-header="dark"
      className="relative h-[60vh] min-h-[420px] w-full overflow-hidden"
    >
      {/* IMAGE */}
      <Image
        src="/images/Amenities.jpg"
        alt="Awards & Recognition"
        fill
        priority
        className={`object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] ${
          show ? "scale-100" : "scale-110"
        }`}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* TEXT */}
      <div className="absolute inset-0 flex items-center justify-center px-5 text-center sm:px-8 lg:px-10">
        <div>
          <h1 className="overflow-hidden">
            <span
              className={`block text-[36px] font-medium tracking-wide text-white transition-all duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] sm:text-[46px] md:text-[56px] lg:text-[60px] ${
                show
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[60px] opacity-0"
              }`}
            >
              Completed Projects
            </span>
          </h1>

          <p
            className={`mx-auto mt-5 max-w-[760px] text-[15px] leading-[1.9] text-white/85 transition-all duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] sm:text-[16px] md:text-[17px] ${
              show
                ? "translate-y-0 opacity-100"
                : "translate-y-[40px] opacity-0"
            }`}
          >
            Discover our portfolio of completed projects, showcasing our
            expertise.
          </p>
        </div>
      </div>
    </section>
  );
}
