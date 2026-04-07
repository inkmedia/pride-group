"use client";

import Image from "next/image";

export default function PuneOverview() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          {/* LEFT IMAGE */}
          <div className="relative h-[320px] overflow-hidden rounded-[12px] sm:h-[420px] lg:h-[520px]">
            <Image
              src="/images/about-us.png"
              alt="Pune City Overview"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 text-white">
              <p className="text-[11px] font-[700] uppercase tracking-[0.18em] text-white/70">
                Pune City
              </p>
              <h3 className="mt-2 text-[22px] leading-[1.2] sm:text-[26px]">
                A thriving hub of growth, innovation and opportunity.
              </h3>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <p className="text-[11px] font-[700] uppercase tracking-[0.22em] text-[#173363]/60">
              Pune Overview
            </p>

            <h2 className="mt-3 text-[28px] leading-[1.2] text-[#10203b] sm:text-[34px] lg:text-[38px]">
              A city that balances rapid growth with quality of life.
            </h2>

            <p className="mt-5 max-w-[640px] text-[15px] leading-[1.8] text-[#26344e]/75">
              Pune has evolved into one of India’s most dynamic real estate
              markets, driven by strong infrastructure, thriving IT corridors
              and a culture that blends tradition with modern living. With
              continuous expansion and strategic connectivity, the city offers
              long-term value for both homeowners and investors.
            </p>

            {/* HIGHLIGHTS */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-[28px] font-[600] text-[#173363]">8M+</p>
                <p className="mt-1 text-[13px] uppercase tracking-[0.12em] text-[#173363]/70">
                  Population Growth
                </p>
              </div>

              <div>
                <p className="text-[28px] font-[600] text-[#173363]">Top 3</p>
                <p className="mt-1 text-[13px] uppercase tracking-[0.12em] text-[#173363]/70">
                  IT & Tech Hub
                </p>
              </div>

              <div>
                <p className="text-[28px] font-[600] text-[#173363]">Strong</p>
                <p className="mt-1 text-[13px] uppercase tracking-[0.12em] text-[#173363]/70">
                  Infrastructure Pipeline
                </p>
              </div>

              <div>
                <p className="text-[28px] font-[600] text-[#173363]">High</p>
                <p className="mt-1 text-[13px] uppercase tracking-[0.12em] text-[#173363]/70">
                  Investment Potential
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
