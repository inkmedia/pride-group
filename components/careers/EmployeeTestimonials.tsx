"use client";

import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Project Manager",
    text: "Working at Pride has given me the opportunity to grow while contributing to meaningful developments.",
  },
  {
    name: "Sneha Patil",
    role: "Architect",
    text: "There is a strong focus on design quality and long-term thinking.",
  },
  {
    name: "Amit Verma",
    role: "Sales Head",
    text: "The leadership trusts people to take ownership.",
  },
  {
    name: "Priya Nair",
    role: "HR Manager",
    text: "Employee well-being reflects in everyday policies and culture.",
  },
  {
    name: "Karan Mehta",
    role: "Engineer",
    text: "Projects are executed with clarity and strong systems.",
  },
];

/* duplicate for smooth looping */
const looped = [...testimonials, ...testimonials];

export default function EmployeeTestimonials() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => prev + 1);
  const prev = () => setIndex((prev) => prev - 1);

  /* AUTO SCROLL */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  /* RESET LOOP (seamless) */
  useEffect(() => {
    if (index >= testimonials.length) {
      setTimeout(() => setIndex(0), 600);
    }

    if (index < 0) {
      setTimeout(() => setIndex(testimonials.length - 1), 600);
    }
  }, [index]);

  return (
    <section className="py-16 lg:py-20 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-16">
        {/* HEADING */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-[28px] md:text-[36px] text-[#222]">
              What our employees say
            </h2>
            <p className="mt-3 text-[#555] text-[15px]">
              Real experiences from our team.
            </p>
          </div>

          {/* ARROWS */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={prev}
              className="w-10 h-10 cursor-pointer rounded-full border text-[#172f55] border-[#172f55] hover:bg-[#172f55] hover:text-white transition"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="w-10 h-10 cursor-pointer rounded-full border text-[#172f55] border-[#172f55] hover:bg-[#172f55] hover:text-white transition"
            >
              ›
            </button>
          </div>
        </div>

        {/* SLIDER */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: `translateX(-${index * (100 / 3)}%)`,
            }}
          >
            {looped.map((item, i) => (
              <div
                key={i}
                className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
              >
                <div className="bg-[#f8f8f8] p-6 rounded-xl border border-[#eee] transition hover:shadow-md h-full">
                  <p className="text-[15px] leading-[1.8] text-[#444]">
                    “{item.text}”
                  </p>

                  <div className="mt-6">
                    <p className="text-[15px] font-medium text-[#172f55]">
                      {item.name}
                    </p>
                    <p className="text-[13px] text-[#777]">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DOTS */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full cursor-pointer transition-all ${
                i === index % testimonials.length
                  ? "w-6 bg-[#172f55]"
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
