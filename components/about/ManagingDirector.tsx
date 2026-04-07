"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import TransitionLink from "../common/TransitionLink";

/* ---------- TEXT REVEAL ---------- */
function TextReveal({ children }: { children: ReactNode }) {
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
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="overflow-hidden">
      <div
        className={`transition-all duration-700 ease-out ${
          show ? "translate-y-0 opacity-100" : "translate-y-[30px] opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

/* ---------- IMAGE REVEAL ---------- */
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
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden">
      <div
        className={`absolute inset-0 z-10 bg-[#f5f5f5] transition-transform duration-[1200ms] ease-in-out ${
          show ? "translate-x-full" : "translate-x-0"
        }`}
      />

      <Image
        src="/images/md.png"
        alt="Managing Director"
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className={`object-cover object-top transition-transform duration-[1800ms] ${
          show ? "scale-100" : "scale-110"
        }`}
      />
    </div>
  );
}

/* ---------- DATA ---------- */
const boardOfDirectors = [
  { name: "Arvind Jain", role: "MD" },
  { name: "DP Jain", role: "" },
  { name: "Nidhi Jain", role: "MBA Finance" },
  { name: "ML Saraogi", role: "" },
];

const managementTeam = {
  Pune: [
    { name: "Rishabh Jain", role: "VP / Director of Business Development" },
    { name: "CB Kulkarni", role: "VP Engineering" },
    { name: "Sarika Taori", role: "VP Legal" },
    { name: "Vivek Singh", role: "VP Sales and CRM" },
    { name: "Sushant Kokate", role: "AVP Marketing and Strategy" },
    { name: "Raj Gupta", role: "CFO" },
  ],
  Bangalore: [
    { name: "Mahesh Goyal", role: "Director / Partner" },
    { name: "Ravi", role: "Director / Partner" },
    { name: "Siddhart Rajgharia", role: "Director / Partner" },
  ],
  Mumbai: [
    { name: "Rajesh Jain", role: "" },
    { name: "Gulamnabi Kumthe", role: "" },
    { name: "Gautam Bharill", role: "" },
    { name: "Sonali", role: "HR Head" },
  ],
};

type TeamMember = {
  name: string;
  role?: string;
};

/* ---------- UTIL ---------- */
function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* ---------- MEMBER CARD ---------- */
function MemberCard({ member, index }: { member: TeamMember; index: number }) {
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
      { threshold: 0.15 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        show ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="group h-full rounded-[10px] border border-[#1f3f6b]/10 bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)]">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1f3f6b]/8 text-[14px] font-semibold tracking-[0.06em] text-[#1f3f6b]">
            {getInitials(member.name)}
          </div>

          <div className="min-w-0">
            <h3 className="text-[20px] leading-[1.3] text-[#1f2a44] sm:text-[22px]">
              {member.name}
            </h3>

            {member.role ? (
              <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#1f3f6b]/80 sm:text-[13px]">
                {member.role}
              </p>
            ) : (
              <p className="mt-2 text-[13px] text-[#6b7280]">—</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- TEAM GRID ---------- */
function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {members.map((member, index) => (
        <MemberCard
          key={`${member.name}-${index}`}
          member={member}
          index={index}
        />
      ))}
    </div>
  );
}

/* ---------- MAIN COMPONENT ---------- */
export default function ManagingDirector() {
  const [activeTab, setActiveTab] = useState<"board" | "management">("board");
  const [activeLocation, setActiveLocation] =
    useState<keyof typeof managementTeam>("Pune");

  return (
    <>
      {/* ================= MD SECTION ================= */}
      <section id="mds-desk" className="py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-10 lg:px-6">
          <div className="grid grid-cols-1 overflow-hidden rounded-[10px] lg:grid-cols-2">
            {/* LEFT CONTENT */}
            <div className="flex flex-col justify-center bg-[#f1f1f1] px-5 py-10 sm:px-8 sm:py-12 md:px-10 lg:px-12 lg:py-14 xl:px-16">
              <div className="mb-[-8%] sm:mb-[-10%] lg:mb-[-13%]">
                <span className="text-[110px] leading-none sm:text-[140px] md:text-[170px] lg:text-[200px]">
                  “
                </span>
              </div>

              <div className="space-y-4 text-[14px] leading-[1.8] text-[#444] sm:space-y-5 sm:text-[15px] lg:text-[16px]">
                <TextReveal>
                  When I travelled abroad, I noticed that cities were built to
                  serve communities; spaces were designed to allow people to
                  walk to work and have everything they needed close.
                </TextReveal>

                <TextReveal>
                  At Pride World City, we create well-ventilated, spacious homes
                  and build a lifestyle fostering connection and convenience —
                  because a great city isn’t just where you live, it’s how you
                  live.
                </TextReveal>
              </div>

              <div className="mt-8 sm:mt-10">
                <TextReveal>
                  <p className="text-[22px] sm:text-[24px]">- Arvind Jain</p>
                </TextReveal>

                <TextReveal>
                  <p className="mt-2 text-[11px] font-semibold tracking-[0.14em] text-[#1f3f6b] sm:text-[12px]">
                    MANAGING DIRECTOR
                  </p>
                </TextReveal>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative h-[280px] sm:h-[360px] md:h-[460px] lg:h-full lg:min-h-[620px]">
              <ImageReveal />
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <TransitionLink
            href="/our-team"
            className="cursor-pointer px-4 py-1 border border-[#1f3f6b] rounded-full text-[#1f3f6b] hover:bg-[#1f3f6b] hover:text-white hover:border-[#1f3f6b] transition-colors duration-300 text-[14px] sm:text-[15px] lg:text-[16px]"
          >
            View Leadership
          </TransitionLink>
        </div>
      </section>
    </>
  );
}
