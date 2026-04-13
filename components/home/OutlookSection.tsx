"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* -------------------- STATS -------------------- */

const stats = [
  { value: 35, suffix: "+", label: "YEARS OF EXPERIENCE" },
  { value: 14000, suffix: "+", label: "HAPPY FAMILIES" },
  { value: 30, suffix: "+", label: "COMPLETED PROJECTS" },
  // { value: 17, suffix: "+", label: "ONGOING PROJECTS" },
  { value: 40, suffix: " Million", label: "SQ. FT. DELIVERED" },
  { value: 10, suffix: " Million", label: "SQ. FT. UNDER CONSTRUCTION" },
];

function formatNumber(value: number) {
  if (value >= 1000) {
    return new Intl.NumberFormat("en-IN").format(value);
  }

  return Number.isInteger(value) ? value.toString() : value.toFixed(1);
}

/* -------------------- COUNTER -------------------- */

function Counter({
  end,
  suffix = "",
  duration = 1800,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let startTime: number | null = null;
    let frame = 0;

    const animate = (time: number) => {
      if (!startTime) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(end * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [started, end, duration]);

  return (
    <div ref={ref}>
      {formatNumber(count)}
      {suffix}
    </div>
  );
}

/* -------------------- TEXT REVEAL -------------------- */

function TextReveal({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {text.split("\n").map((line, i) => (
        <div key={i} className="overflow-hidden">
          <div
            className={`transform transition-transform duration-700 ease-out ${
              show ? "translate-y-0" : "translate-y-full"
            }`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            {line}
          </div>
        </div>
      ))}
    </div>
  );
}

/* -------------------- FADE UP -------------------- */

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="overflow-hidden">
      <div
        className={`transform transition-all duration-700 ease-out ${
          show ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        } ${className}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  );
}

/* -------------------- IMAGE REVEAL -------------------- */

function ImageReveal() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative h-[240px] overflow-hidden sm:h-[320px] md:h-[400px] lg:h-[50vh]"
    >
      <div
        className={`absolute inset-0 z-10 bg-white transition-transform duration-[1200ms] ease-in-out ${
          show ? "translate-x-full" : "translate-x-0"
        }`}
      />

      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Pride Group film"
        className={`object-cover transition-transform duration-[2000ms] ease-out ${
          show ? "scale-100" : "scale-110"
        }`}
      >
        <source src="/video/Pride-Group-Film.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

/* -------------------- MAIN SECTION -------------------- */

export default function OutlookSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_305px]">
      {/* LEFT SIDE */}
      <div>
        <div className="flex flex-col justify-center bg-[#173566] px-5 py-10 text-white sm:px-8 sm:py-12 md:px-10 lg:min-h-[50vh] lg:px-[60px] lg:py-[34px]">
          <div className="max-w-[610px]">
            <h2 className="text-[30px] leading-[1.3] sm:text-[36px] md:text-[40px] lg:text-[40px]">
              <TextReveal text={"Where We Build,\nWe Build to Last."} />
            </h2>

            <FadeUp delay={120} className="mt-4">
              <p className="text-[14px] leading-[1.8] text-white/90 sm:text-[15px] lg:text-[16px] lg:leading-[1.75]">
                Across three of India's fastest-growing urban markets, Pride
                Group brings the same planning discipline, delivery record, and
                design rigour to every project it undertakes.
              </p>
            </FadeUp>
          </div>

          <Link
            href="/about/"
            className="mt-6 self-start text-[12px] text-white font-semibold underline underline-offset-[3px] lg:self-end"
          >
            Read More...
          </Link>
        </div>

        <ImageReveal />
      </div>

      {/* RIGHT SIDE (STATS) */}
      <aside className="grid grid-cols-2 gap-8 bg-[#f7f8fb] px-4 py-5 sm:grid-cols-3 sm:px-6 sm:py-6 lg:flex lg:flex-col lg:justify-center lg:gap-8 lg:bg-[#fbfbfb] lg:px-[28px]">
        {stats.map((item, index) => (
          <div
            key={item.label}
            className={`rounded-sm bg-white px-3 py-4 text-center shadow-sm lg:bg-transparent lg:px-0 lg:py-[20px] lg:shadow-none ${
              index === stats.length - 1 ? "hidden sm:block" : ""
            }`}
          >
            <div className="text-[30px] font-semibold orange sm:text-[28px] lg:text-[30px]">
              <Counter end={item.value} suffix={item.suffix} />
            </div>

            <div className="mt-[8px] text-[10px] font-[700] tracking-[0.04em] text-[#1f1f1f] sm:text-[11px]">
              {item.label}
            </div>

            {index !== stats.length - 1 && (
              <div className="mx-auto mt-[16px] hidden h-px w-[108px] bg-[#b8becb] lg:block" />
            )}
          </div>
        ))}
      </aside>
    </section>
  );
}
