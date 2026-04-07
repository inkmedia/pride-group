"use client";

import Image from "next/image";
import Link from "next/link";

const linkedCards = [
  {
    title: "Projects across cities",
    description:
      "See how these principles appear in completed and ongoing work.",
    image: "/images/accordian.png",
    href: "/projects",
  },
  {
    title: "Awards & certifications",
    description:
      "Explore recognitions, standards, and proof points behind the work.",
    image: "/images/accordian.png",
    href: "/awards-and-certifications",
  },
  {
    title: "Blogs on design, cities, and community",
    description:
      "Read ideas, insights, and stories connected to the way we build.",
    image: "/images/accordian.png",
    href: "/blogs",
  },
];

export default function CtaSection() {
  return (
    <section className="bg-[#F3F3F3] pt-14 sm:pt-16 lg:pt-20">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 md:px-10 lg:px-16">
        <div className="max-w-[960px]">
          <h2 className="text-[28px] leading-tight text-[#222] sm:text-[34px] lg:text-[42px]">
            See the principles in practice
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#555] sm:text-base sm:leading-8">
            Do not end the page with philosophy alone. Route the visitor toward
            proof: projects, media room items, certifications, blogs, or city
            pages where the principles become visible in built form.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 lg:mt-12">
          {linkedCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group overflow-hidden rounded-[10px] border border-[#dfddd8] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
            >
              <div className="relative h-[220px] overflow-hidden sm:h-[240px]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
              </div>

              <div className="p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[22px] leading-snug text-[#222]">
                    {card.title}
                  </h3>

                  <span className="material-symbols-outlined text-[22px] text-[#666] transition duration-300 group-hover:translate-x-1 group-hover:text-[#222]">
                    arrow_forward
                  </span>
                </div>

                <p className="mt-3 text-sm leading-7 text-[#5d5d5d] sm:text-[15px]">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Full-width CTA strip */}
      <div className="mt-10 w-full border-y border-[#dfddd8] bg-[#17335F] lg:mt-12">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center justify-between gap-6 px-5 py-10 text-center sm:px-6 sm:py-12 md:px-10 lg:flex-row lg:items-center lg:px-20 lg:py-14 lg:text-left">
          <div className="max-w-[720px]">
            <p className="text-[22px] leading-snug text-white sm:text-[24px] lg:text-[28px]">
              Explore what these principles look like in practice.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center lg:w-auto lg:shrink-0">
            <Link
              href="/projects"
              className="inline-flex min-w-[170px] items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm tracking-wide text-black transition duration-300 hover:bg-white/90"
            >
              View Projects
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-w-[170px] items-center justify-center rounded-full border border-white px-6 py-3.5 text-sm tracking-wide text-white transition duration-300 hover:bg-white hover:text-[#17335F]"
            >
              Enquire
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
