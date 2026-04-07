"use client";

import { useMemo, useState } from "react";

type PillarItem = {
  title: string;
  subtitle: string;
  detailsTitle: string;
  detailsIntro: string;
  points: {
    title: string;
    text: string;
  }[];
};

const pillars: PillarItem[] = [
  {
    title: "CARE",
    subtitle: "Wellbeing matters",
    detailsTitle: "CARE",
    detailsIntro:
      "We believe your wellbeing is the foundation of success, because at Pride, care extends beyond the workplace.",
    points: [
      { title: "SAHYOG", text: "Children Education, Self Development" },
      { title: "WELLNESS @PRIDE", text: "Wellness session once a quarter" },
      { title: "RUN WITH PRIDE", text: "Marathon for employees" },
      {
        title: "PRIDE SUVIDHA",
        text: "PF, Insurance, Leaves, Marriage gift, Society Loan",
      },
    ],
  },
  {
    title: "CONNECT",
    subtitle: "Togetherness",
    detailsTitle: "CONNECT",
    detailsIntro:
      "Building moments that bring people together and strengthen trust, because togetherness is the heartbeat of our culture.",
    points: [
      { title: "PRIDE SAFAR", text: "Team Bonding Activities" },
      { title: "ABHINANDAN", text: "Onboarding and Induction" },
      { title: "PRIDE SAATHI", text: "Buddy at Pride" },
      {
        title: "TRIBE OF PRIDE",
        text: "Photography, Painting, Bikers, Trekkers, Social Work",
      },
    ],
  },
  {
    title: "COACH",
    subtitle: "Growth",
    detailsTitle: "COACH",
    detailsIntro:
      "We guide, mentor, and equip you with tools to achieve your full potential, because when you grow, we all grow.",
    points: [
      { title: "PLEDGE", text: "Pride Leadership Edge" },
      { title: "PRIDE UDAAN", text: "Training Programs linked to PMS" },
      { title: "PEHLA KADAM", text: "GET Program" },
      { title: "PARICHAY", text: "Know My Department" },
    ],
  },
  {
    title: "CONTRIBUTE",
    subtitle: "Your voice",
    detailsTitle: "CONTRIBUTE",
    detailsIntro:
      "Your voice matters in shaping our future. We create open spaces for ideas, feedback, and collaboration.",
    points: [
      { title: "SAMVAAD", text: "Open Forum, Strategy Meets" },
      { title: "MANCH", text: "HR skip level meetings" },
      { title: "PRIDE NEWS", text: "Employee newsletter" },
    ],
  },
  {
    title: "CONGRATULATE",
    subtitle: "Recognition",
    detailsTitle: "CONGRATULATE",
    detailsIntro:
      "We recognize and honor your contributions in driving organizational success while celebrating your achievement stories.",
    points: [
      { title: "PRIDE KE SITARE", text: "Annual Awards" },
      { title: "MADE A DIFFERENCE", text: "Spot Recognition" },
      { title: "PRIDE’S GOT TALENT", text: "Recognize talent" },
      { title: "LONG SERVICE AWARDS", text: "Loyalty Awards" },
      { title: "SABSE ACCHA SAATHI", text: "" },
    ],
  },
];

export default function FiveCPillarsPremium() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = pillars[activeIndex];

  const activeLabel = useMemo(
    () => String(activeIndex + 1).padStart(2, "0"),
    [activeIndex],
  );

  return (
    <section className="relative overflow-hidden bg-[#09111f] py-12 text-white sm:py-14 lg:py-16">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-[220px] w-[220px] rounded-full bg-[#172f55]/10 blur-[80px] sm:h-[280px] sm:w-[280px]" />
        <div className="absolute bottom-[-10%] right-[-8%] h-[240px] w-[240px] rounded-full bg-white/[0.04] blur-[90px] sm:h-[300px] sm:w-[300px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_30%,transparent_70%,rgba(255,255,255,0.02))]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-5 lg:px-6">
        {/* Header */}
        <div className="mx-auto max-w-[820px] text-center">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/45 sm:text-[11px]">
            Life at Pride Group
          </p>
          <h2 className="mt-3 text-[28px] font-[500] leading-tight sm:text-[34px] lg:text-[44px]">
            The 5C Philosophy
          </h2>
          <p className="mx-auto mt-3 max-w-[680px] text-[13px] leading-6 text-white/65 sm:text-[14px] sm:leading-7 lg:text-[15px]">
            At Pride Group, culture is not a statement on a wall. It is shaped
            through the way we care, connect, coach, contribute and celebrate
            together.
          </p>
        </div>

        {/* Main layout */}
        <div className="mt-8 grid gap-5 lg:mt-10 xl:grid-cols-[260px_minmax(0,1fr)] xl:gap-6">
          {/* Left navigation */}
          <div className="xl:sticky xl:top-20 xl:self-start">
            <div className="rounded-[10px] border border-white/10 bg-white/[0.03] p-3 backdrop-blur-xl sm:p-4">
              <div className="mb-3 flex items-center justify-between px-1">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                  Pillars
                </p>
                <p className="text-[11px] text-[#172f55]">{activeLabel} / 05</p>
              </div>

              <div className="space-y-2">
                {pillars.map((pillar, index) => {
                  const isActive = index === activeIndex;
                  const indexLabel = String(index + 1).padStart(2, "0");

                  return (
                    <button
                      key={pillar.title}
                      onClick={() => setActiveIndex(index)}
                      className={`group relative w-full overflow-hidden rounded-[10px] border text-left transition-all duration-300 ${
                        isActive
                          ? "border-[#172f55]/40 bg-gradient-to-r from-[#172f55]/15 to-white/[0.04] shadow-[0_0_0_1px_rgba(202,164,108,0.08)]"
                          : "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-start gap-3 p-3">
                        <span
                          className={`mt-0.5 text-[11px] tracking-[0.18em] ${
                            isActive ? "text-[#ef9e64]" : "text-white/35"
                          }`}
                        >
                          {indexLabel}
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <h3
                              className={`text-[13px] font-[600] tracking-[0.12em] sm:text-[14px] ${
                                isActive ? "text-white" : "text-white/82"
                              }`}
                            >
                              {pillar.title}
                            </h3>

                            <span
                              className={`h-2 w-2 rounded-full transition-all ${
                                isActive
                                  ? "bg-[#ef9e64] shadow-[0_0_16px_rgba(202,164,108,0.65)]"
                                  : "bg-white/15 group-hover:bg-white/30"
                              }`}
                            />
                          </div>

                          <p
                            className={`mt-1 text-[12px] leading-5 ${
                              isActive ? "text-white/70" : "text-white/45"
                            }`}
                          >
                            {pillar.subtitle}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="relative">
            <div className="overflow-hidden rounded-[10px] border border-white/10 bg-white/[0.03] backdrop-blur-xl">
              {/* Hero band */}
              <div className="relative border-b border-white/10 px-4 py-5 sm:px-5 sm:py-6 lg:px-7 lg:py-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(202,164,108,0.16),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent)]" />

                <div
                  key={active.title}
                  className="relative animate-[fadeUp_500ms_ease_forwards]"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.24em] text-white/40 sm:text-[11px]">
                        Core Pillar {activeLabel}
                      </p>

                      <div className="mt-3 flex items-end gap-3">
                        <span className="text-[34px] font-[500] leading-none text-white/12 sm:text-[44px] lg:text-[60px]">
                          {activeLabel}
                        </span>

                        <div>
                          <h3 className="text-[24px] font-[500] leading-none sm:text-[28px] lg:text-[38px]">
                            {active.detailsTitle}
                          </h3>
                          <p className="mt-2 text-[13px] text-[#ef9e64] sm:text-[14px] lg:text-[15px]">
                            {active.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="mt-5 max-w-[820px] text-[13px] leading-6 text-white/72 sm:text-[14px] sm:leading-7 lg:text-[15px]">
                    {active.detailsIntro}
                  </p>
                </div>
              </div>

              {/* Cards */}
              <div className="p-4 sm:p-5 lg:p-6">
                <div
                  key={`${active.title}-cards`}
                  className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
                >
                  {active.points.map((point, index) => (
                    <div
                      key={point.title}
                      className="group relative overflow-hidden rounded-[10px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#ef9e64]/35 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.035))] sm:p-4.5 lg:p-5"
                      style={{
                        animation: `fadeUp 500ms ease forwards`,
                        animationDelay: `${index * 80}ms`,
                        opacity: 0,
                      }}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(202,164,108,0.12),transparent_30%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="relative">
                        <div className="flex items-start justify-between gap-3">
                          <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 text-[10px] tracking-[0.16em] text-white/45 sm:h-9 sm:min-w-9 sm:px-3 sm:text-[11px]">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="mt-1 h-2 w-2 rounded-full bg-[#ef9e64]/70 shadow-[0_0_14px_rgba(202,164,108,0.45)]" />
                        </div>

                        <h4 className="mt-4 text-[14px] font-[600] uppercase tracking-[0.04em] text-white sm:text-[15px] lg:text-[16px]">
                          {point.title}
                        </h4>

                        {point.text ? (
                          <p className="mt-2 text-[12px] leading-6 text-white/68 sm:text-[13px]">
                            {point.text}
                          </p>
                        ) : (
                          <p className="mt-2 text-[12px] leading-6 text-white/38 sm:text-[13px]">
                            Recognition initiative under this pillar.
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom rail */}
                <div className="mt-5 flex flex-col gap-3 rounded-[10px] border border-white/10 bg-black/20 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/35 sm:text-[11px]">
                      Active Pillar
                    </p>
                    <p className="mt-1 text-[15px] text-white sm:text-[16px]">
                      {active.title} —{" "}
                      <span className="text-white/60">{active.subtitle}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {pillars.map((pillar, index) => {
                      const isActive = index === activeIndex;

                      return (
                        <button
                          key={pillar.title}
                          aria-label={`Go to ${pillar.title}`}
                          onClick={() => setActiveIndex(index)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            isActive
                              ? "w-8 bg-[#ef9e64]"
                              : "w-2 bg-white/20 hover:bg-white/40"
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(14px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
