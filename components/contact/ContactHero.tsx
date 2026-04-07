"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ContactHero() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      data-header="dark"
      className="relative w-full h-[60vh] min-h-[420px] overflow-hidden"
    >
      {/* IMAGE */}
      <Image
        src="/images/Master-Planning.jpg"
        alt="Contact Us"
        fill
        priority
        className={`object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] ${
          show ? "scale-100" : "scale-110"
        }`}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* TEXT */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="overflow-hidden">
          <span
            className={`block text-white text-[40px] md:text-[60px] font-medium tracking-wide transition-all duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] ${
              show
                ? "translate-y-0 opacity-100"
                : "translate-y-[60px] opacity-0"
            }`}
          >
            Contact Us
          </span>
        </h1>
      </div>
    </section>
  );
}
