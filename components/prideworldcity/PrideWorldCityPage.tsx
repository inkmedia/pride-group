"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  prideWorldCityClusters,
  prideWorldCityConnectivity,
  prideWorldCityExperiences,
  prideWorldCityHotspots,
  prideWorldCityLifeImages,
  prideWorldCityNarrativePillars,
  prideWorldCityProjects,
  prideWorldCityStats,
  type TownshipStatus,
} from "@/data/prideWorldCity";

type TownshipMapStatus = "All" | TownshipStatus;

const statusOptions: TownshipMapStatus[] = [
  "All",
  "Completed",
  "Ongoing",
  "Upcoming",
];

function SectionIntro({
  eyebrow,
  title,
  body,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
}) {
  const textAlign = align === "center" ? "text-center" : "text-left";
  const maxWidth =
    align === "center" ? "mx-auto max-w-[840px]" : "max-w-[760px]";

  return (
    <div className={`${maxWidth} ${textAlign}`}>
      {eyebrow ? (
        <p className="text-[12px] font-[700] uppercase tracking-[0.18em] text-[#173363]/70">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`${eyebrow ? "mt-3" : ""} text-[28px] leading-[1.12] text-[#0f1f3a] sm:text-[34px] lg:text-[40px]`}
      >
        {title}
      </h2>
      {body ? (
        <p className="mt-5 text-[15px] leading-[1.9] text-[#26344e]/75 sm:text-[17px]">
          {body}
        </p>
      ) : null}
    </div>
  );
}

function getStatusPalette(status: TownshipStatus) {
  if (status === "Completed") {
    return {
      icon: "text-[#173363]",
      pill: "bg-[#173363] text-white",
      border: "border-[#173363]/25",
    };
  }

  if (status === "Ongoing") {
    return {
      icon: "text-[#c9991a]",
      pill: "bg-[#fff2cf] text-[#8b6610]",
      border: "border-[#c9991a]/25",
    };
  }

  return {
    icon: "text-[#7f8ea8]",
    pill: "bg-[#eef2f7] text-[#51627f]",
    border: "border-[#7f8ea8]/25",
  };
}

function StatusIcon({
  status,
  active = false,
  className = "h-5 w-5",
}: {
  status: TownshipStatus;
  active?: boolean;
  className?: string;
}) {
  const base = active ? "text-white" : getStatusPalette(status).icon;

  if (status === "Completed") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`${className} ${base}`}
        fill="none"
      >
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" />
        <path
          d="M8.5 12.2l2.2 2.3 4.8-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (status === "Ongoing") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`${className} ${base}`}
        fill="currentColor"
      >
        <rect
          x="6"
          y="6"
          width="12"
          height="12"
          rx="1.5"
          transform="rotate(45 12 12)"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`${className} ${base}`}
      fill="currentColor"
    >
      <path d="M12 5.2L19 18H5L12 5.2Z" />
    </svg>
  );
}

function ProjectCard({
  title,
  subtitle,
  description,
  image,
  href,
  isExternal,
}: {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
  isExternal: boolean;
}) {
  const content = (
    <>
      <div className="relative h-[260px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1930] via-[#0d1930]/20 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 text-white">
          <p className="text-[12px] font-[700] uppercase tracking-[0.14em] text-white/70">
            Ongoing Project
          </p>
          <h3 className="mt-2 text-[30px] leading-none">{title}</h3>
        </div>
      </div>

      <div className="p-6 sm:p-7">
        <p className="text-[12px] font-[700] uppercase tracking-[0.14em] text-[#173363]/70">
          {subtitle}
        </p>
        <p className="mt-4 text-[16px] leading-[1.8] text-[#26344e]/75">
          {description}
        </p>
        <span className="mt-6 inline-flex items-center text-[14px] font-[700] uppercase tracking-[0.08em] text-[#173363]">
          View Project
        </span>
      </div>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className="group overflow-hidden rounded-[10px] border border-[#d8d9df] bg-white shadow-[0_18px_44px_rgba(15,31,58,0.08)] transition duration-300 hover:-translate-y-1"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-[10px] border border-[#d8d9df] bg-white shadow-[0_18px_44px_rgba(15,31,58,0.08)] transition duration-300 hover:-translate-y-1"
    >
      {content}
    </Link>
  );
}

export default function PrideWorldCityPage() {
  const [activeStatus, setActiveStatus] = useState<TownshipMapStatus>("All");
  const [activeTitle, setActiveTitle] = useState("Wellington");
  const [lifeVisible, setLifeVisible] = useState(false);
  const brandFilmRef = useRef<HTMLVideoElement | null>(null);
  const brandFilmSectionRef = useRef<HTMLElement | null>(null);
  const lifeSectionRef = useRef<HTMLElement | null>(null);

  const filteredHotspots =
    activeStatus === "All"
      ? prideWorldCityHotspots
      : prideWorldCityHotspots.filter(
          (hotspot) => hotspot.status === activeStatus,
        );

  const filteredProjects = filteredHotspots.filter(
    (hotspot) => hotspot.category === "Projects",
  );

  const filteredAmenities = filteredHotspots.filter(
    (hotspot) => hotspot.category !== "Projects",
  );

  const activeHotspot =
    filteredHotspots.find((hotspot) => hotspot.title === activeTitle) ||
    filteredHotspots[0];

  useEffect(() => {
    if (!activeHotspot && filteredHotspots.length > 0) {
      setActiveTitle(filteredHotspots[0].title);
    }
  }, [activeHotspot, filteredHotspots]);

  useEffect(() => {
    const videoElement = brandFilmRef.current;
    const sectionElement = brandFilmSectionRef.current;

    if (!videoElement || !sectionElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoElement.play().catch(() => {});
        } else {
          videoElement.pause();
        }
      },
      { threshold: 0.55 },
    );

    observer.observe(sectionElement);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sectionElement = lifeSectionRef.current;

    if (!sectionElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLifeVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(sectionElement);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#f6f1e7] text-[#10203b]">
      <section className="relative overflow-hidden">
        <video
          src="https://www.prideworldcity.com/wp-content/uploads/2025/03/freecompress-PRIDE_WORLD_CITY_cinematic_screen.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-[56vh] w-full object-cover sm:h-[70vh] lg:h-[82vh]"
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/80 via-white/25 to-transparent sm:h-40 lg:h-52" />
      </section>
      <section className="relative overflow-hidden bg-[#10203b] pb-18 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(201,153,26,0.22),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.1),_transparent_28%)]" />
        <div className="mx-auto grid max-w-[1500px] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:px-10">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-white/82 backdrop-blur">
              <span className="text-[11px] font-[700] uppercase tracking-[0.16em]">
                400 Acre Global Living
              </span>
            </div>

            <div className="mt-7">
              <Image
                src="/images/PWC-Logo-White.png"
                alt="Pride World City"
                width={420}
                height={160}
                className="h-auto w-[180px] sm:w-[240px] lg:w-[300px]"
                priority
              />
            </div>
            <p className="mt-6 max-w-[700px] text-[18px] leading-[1.85] text-white/78 sm:text-[20px]">
              A township designed as a living ecosystem. Spread across 400 acres
              in Charholi, Pride World City brings homes, education, retail,
              recreation, work, and everyday convenience into one master-planned
              environment.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#ongoing-projects"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-[13px] font-[700] uppercase tracking-[0.08em] text-white transition hover:bg-white/10"
              >
                View Ongoing Projects
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-[#c9991a] bg-[#c9991a]/12 px-6 py-3 text-[13px] font-[700] uppercase tracking-[0.08em] text-[#f0d89a] transition hover:bg-[#c9991a]/18"
              >
                Enquire
              </Link>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {prideWorldCityStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex min-h-[118px] flex-col items-start justify-center rounded-[10px] border border-white/10 bg-white/6 px-5 py-5 backdrop-blur-md"
                >
                  <div className="whitespace-nowrap text-[24px] leading-none text-white sm:text-[28px]">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-[12px] font-[700] uppercase tracking-[0.12em] text-[#f0d89a]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <div className="relative overflow-hidden rounded-[10px] border border-white/10 bg-white/6 p-3 shadow-[0_22px_60px_rgba(0,0,0,0.28)] backdrop-blur-md">
              <div className="relative aspect-[4/4.5] overflow-hidden rounded-[10px]">
                <Image
                  src="/images/Master-Planning.jpg"
                  alt="Pride World City master planning"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10203b]/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <a
                    href="#township-map"
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-[12px] font-[700] uppercase tracking-[0.08em] text-[#10203b] transition hover:bg-[#f4efe6]"
                  >
                    View Township Plan
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f9f5ed] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:px-10">
          <div>
            <SectionIntro
              eyebrow="Township At A Glance"
              title="Why Pride World City exists"
              body="Pride World City was conceived as more than a residential address. It brings together the things modern families usually seek separately, homes, learning, everyday convenience, recreation, business activity, and connected mobility, within one coherent township plan."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {prideWorldCityNarrativePillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-[10px] border border-[#ddd5c8] bg-white px-5 py-6 shadow-[0_16px_40px_rgba(15,31,58,0.06)]"
              >
                <div className="h-1.5 w-14 rounded-full bg-[#c9991a]" />
                <h3 className="mt-5 text-[24px] leading-[1.1] text-[#10203b]">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.85] text-[#26344e]/76">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <SectionIntro
            eyebrow="Signature Experiences"
            title="Memorable anchors beyond scale and map logic."
            body="Beyond the township diagram, Pride World City needs a few experiences that visitors can immediately remember: the social heart, the daily-life convenience layer, and the high-trust family infrastructure story."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {prideWorldCityExperiences.map((experience, index) => (
              <div
                key={experience.title}
                className={`rounded-[10px] border p-6 shadow-[0_18px_44px_rgba(15,31,58,0.06)] sm:p-8 ${
                  index === 0
                    ? "border-[#173363]/18 bg-[#173363] text-white"
                    : "border-[#e4ddd2] bg-[#f9f5ed] text-[#10203b]"
                }`}
              >
                <p
                  className={`text-[12px] font-[700] uppercase tracking-[0.16em] ${
                    index === 0 ? "text-[#f0d89a]" : "text-[#173363]/60"
                  }`}
                >
                  {experience.subtitle}
                </p>
                <h3 className="mt-4 text-[26px] leading-none sm:text-[30px]">
                  {experience.title}
                </h3>
                <p
                  className={`mt-5 text-[15px] leading-[1.85] ${
                    index === 0 ? "text-white/78" : "text-[#26344e]/75"
                  }`}
                >
                  {experience.description}
                </p>
                <div className="mt-6 space-y-3">
                  {experience.bullets.map((item) => (
                    <div
                      key={item}
                      className={`rounded-[10px] px-4 py-3 text-[14px] leading-[1.7] ${
                        index === 0
                          ? "bg-white/8 text-white/84"
                          : "bg-white text-[#26344e]/75"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="township-map"
        className="bg-[#efe8da] py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
          <SectionIntro align="center" title="Explore the Township" />

          <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] xl:items-stretch">
            <div className="space-y-6">
              <div className="rounded-[10px] border border-[#d7d0c3] bg-white p-4 shadow-[0_18px_44px_rgba(15,31,58,0.08)] sm:p-5 xl:flex xl:h-[744px] xl:flex-col">
                <div className="flex flex-wrap items-center justify-between gap-3 px-1 pb-4">
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((status) => {
                      const active = status === activeStatus;

                      return (
                        <button
                          key={status}
                          type="button"
                          onClick={() => {
                            setActiveStatus(status);

                            const hotspotsForStatus =
                              status === "All"
                                ? prideWorldCityHotspots
                                : prideWorldCityHotspots.filter(
                                    (hotspot) => hotspot.status === status,
                                  );

                            if (hotspotsForStatus.length > 0) {
                              setActiveTitle(hotspotsForStatus[0].title);
                            }
                          }}
                          className={`cursor-pointer rounded-full px-4 py-2 text-[12px] font-[700] uppercase tracking-[0.08em] transition ${
                            active
                              ? "bg-[#173363] text-white"
                              : "bg-[#f4efe6] text-[#173363] hover:bg-[#e7e0d2]"
                          }`}
                        >
                          {status}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-3 text-[11px] font-[700] uppercase tracking-[0.1em] text-[#173363]/60">
                    {(
                      ["Completed", "Ongoing", "Upcoming"] as TownshipStatus[]
                    ).map((status) => {
                      return (
                        <span
                          key={status}
                          className="inline-flex items-center gap-2"
                        >
                          <StatusIcon status={status} className="h-4 w-4" />
                          {status}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[10px] bg-[#fbf8f2] xl:flex-1">
                  <div className="relative aspect-square xl:h-full xl:min-h-0 xl:aspect-auto">
                    <Image
                      src="/images/PWC-Plan.png"
                      alt="Pride World City township map"
                      fill
                      sizes="(max-width: 1280px) 100vw, 60vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#10203b]/14 via-transparent to-[#c9991a]/12" />

                    {filteredHotspots.map((hotspot) => {
                      const active = activeHotspot?.title === hotspot.title;
                      const palette = getStatusPalette(hotspot.status);

                      return (
                        <button
                          key={hotspot.title}
                          type="button"
                          onClick={() => setActiveTitle(hotspot.title)}
                          style={{ left: hotspot.x, top: hotspot.y }}
                          className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border-2 border-white bg-white p-1.5 shadow-lg transition ${
                            active
                              ? "scale-110 bg-[#173363] text-white"
                              : `text-[#10203b] ${palette.border}`
                          }`}
                          aria-label={`View ${hotspot.title}`}
                        >
                          <StatusIcon
                            status={hotspot.status}
                            active={active}
                            className="h-5 w-5"
                          />
                        </button>
                      );
                    })}

                    {activeHotspot ? (
                      <div
                        style={{ left: activeHotspot.x, top: activeHotspot.y }}
                        className="absolute z-20 -translate-x-1/2 [-translate-y:calc(100%+20px)]"
                      >
                        <div className="min-w-[170px] rounded-[10px] border border-white/80 bg-white/96 px-4 py-3 text-left shadow-[0_18px_36px_rgba(15,31,58,0.16)] backdrop-blur-sm">
                          <p className="text-[15px] font-[700] leading-snug text-[#10203b]">
                            {activeHotspot.title}
                          </p>
                          {activeHotspot.category === "Projects" &&
                          activeHotspot.configuration ? (
                            <p className="mt-1 text-[12px] font-[600] uppercase tracking-[0.08em] text-[#173363]/72">
                              {activeHotspot.configuration}
                            </p>
                          ) : null}

                          {activeHotspot.category === "Projects" &&
                          activeHotspot.href ? (
                            activeHotspot.href.startsWith("/") ? (
                              <Link
                                href={activeHotspot.href}
                                className="mt-2 inline-block text-[12px] font-[700] uppercase tracking-[0.08em] text-[#173363] underline underline-offset-4"
                              >
                                View Project
                              </Link>
                            ) : (
                              <a
                                href={activeHotspot.href}
                                className="mt-2 inline-block text-[12px] font-[700] uppercase tracking-[0.08em] text-[#173363] underline underline-offset-4"
                              >
                                View Project
                              </a>
                            )
                          ) : null}
                        </div>
                        <div className="mx-auto h-3 w-3 rotate-45 border-b border-r border-white bg-white/96 shadow-[8px_8px_18px_rgba(15,31,58,0.06)]" />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 xl:sticky xl:top-28 xl:h-fit">
              <div
                data-lenis-prevent
                className="h-[360px] overflow-y-auto rounded-[10px] border border-[#d9d7d0] bg-white p-6 shadow-[0_18px_44px_rgba(15,31,58,0.08)] sm:p-8"
              >
                <p className="text-[12px] font-[700] uppercase tracking-[0.16em] text-[#173363]/70">
                  {activeStatus === "All"
                    ? "All Projects"
                    : `${activeStatus} Projects`}
                </p>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {filteredProjects.map((hotspot) => (
                    <button
                      key={hotspot.title}
                      type="button"
                      onClick={() => setActiveTitle(hotspot.title)}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-[10px] border px-4 py-4 text-left transition ${
                        activeHotspot?.title === hotspot.title
                          ? "border-[#173363] bg-[#173363] text-white"
                          : "border-[#e5dfd4] bg-[#fbf8f3] text-[#10203b] hover:border-[#173363]/30"
                      }`}
                    >
                      <span>
                        <span className="block text-[16px] font-[600] leading-snug">
                          {hotspot.title}
                        </span>
                        <span className="mt-1 block text-[12px] leading-[1.6] opacity-75">
                          {hotspot.category}
                        </span>
                      </span>
                      <span className="text-[18px]">›</span>
                    </button>
                  ))}
                </div>
              </div>

              <div
                data-lenis-prevent
                className="h-[360px] overflow-y-auto rounded-[10px] border border-[#d9d7d0] bg-white p-6 shadow-[0_18px_44px_rgba(15,31,58,0.08)] sm:p-8"
              >
                <p className="text-[12px] font-[700] uppercase tracking-[0.16em] text-[#173363]/70">
                  {activeStatus === "All"
                    ? "All Township Amenities"
                    : `${activeStatus} Township Amenities`}
                </p>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {filteredAmenities.map((hotspot) => (
                    <button
                      key={hotspot.title}
                      type="button"
                      onClick={() => setActiveTitle(hotspot.title)}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-[10px] border px-4 py-4 text-left transition ${
                        activeHotspot?.title === hotspot.title
                          ? "border-[#173363] bg-[#173363] text-white"
                          : "border-[#e5dfd4] bg-[#fbf8f3] text-[#10203b] hover:border-[#173363]/30"
                      }`}
                    >
                      <span>
                        <span className="block text-[16px] font-[600] leading-snug">
                          {hotspot.title}
                        </span>
                        <span className="mt-1 block text-[12px] leading-[1.6] opacity-75">
                          {hotspot.category}
                        </span>
                      </span>
                      <span className="text-[18px]">›</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <SectionIntro
            eyebrow="Within The Township"
            title="Everything that makes township life work within one larger address."
            body="The township logic becomes clearer when you break it into everyday clusters: learning, convenience, celebration, and work-supportive infrastructure."
            align="center"
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {prideWorldCityClusters.map((cluster, index) => (
              <div
                key={cluster.title}
                className={`overflow-hidden rounded-[10px] border border-[#e4ddd2] p-6 shadow-[0_18px_44px_rgba(15,31,58,0.06)] sm:p-8 ${
                  index % 2 === 0 ? "bg-[#f9f5ed]" : "bg-[#f3f6fb]"
                }`}
              >
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                  <div className="lg:w-[58%]">
                    <p className="text-[12px] font-[700] uppercase tracking-[0.16em] text-[#173363]/65">
                      {cluster.eyebrow}
                    </p>
                    <h3 className="mt-3 text-[24px] leading-[1.15] text-[#10203b] sm:text-[28px]">
                      {cluster.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-[1.85] text-[#26344e]/75">
                      {cluster.body}
                    </p>
                  </div>

                  <div className="lg:w-[42%]">
                    <div className="rounded-[10px] bg-white/75 p-5">
                      <p className="text-[11px] font-[700] uppercase tracking-[0.16em] text-[#c9991a]">
                        Proof Points
                      </p>
                      <div className="mt-4 space-y-3">
                        {cluster.proof.map((item) => (
                          <div
                            key={item}
                            className="rounded-[10px] border border-[#ece3d4] bg-white px-4 py-3 text-[14px] leading-[1.7] text-[#26344e]/76"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section
        ref={brandFilmSectionRef}
        className="bg-[#10203b] py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-[840px] text-center">
            <p className="text-[12px] font-[700] uppercase tracking-[0.18em] text-white/60">
              BRAND FILM
            </p>
            <h2 className="mt-3 text-[28px] leading-[1.12] text-white sm:text-[34px] lg:text-[40px]">
              See the township in motion.
            </h2>
          </div>

          <div className="mt-10 overflow-hidden rounded-[10px] border border-white/10 bg-white/6 p-3 shadow-[0_24px_64px_rgba(0,0,0,0.28)]">
            <video
              ref={brandFilmRef}
              src="https://www.prideworldcity.com/wp-content/uploads/2025/03/freecompress-PRIDE_WORLD_CITY_cinematic_screen.mp4"
              autoPlay
              controls
              muted
              loop
              playsInline
              preload="metadata"
              className="aspect-video w-full rounded-[10px] object-cover"
            />
          </div>
        </div>
      </section> */}

      <section
        id="ongoing-projects"
        className="bg-[#f9f5ed] py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <SectionIntro
            eyebrow="Pride World City"
            title="Ongoing Projects"
            align="center"
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {prideWorldCityProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>

      <section
        ref={lifeSectionRef}
        className="bg-[#efe8da] py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
          <SectionIntro
            eyebrow="Communities, not just projects"
            title="Life at Pride World City"
            align="center"
          />

          <div className="relative mt-12">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {prideWorldCityLifeImages.map((src, index) => (
                <div
                  key={src}
                  className={`relative overflow-hidden rounded-[10px] transition-all duration-700 ${
                    lifeVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  } ${
                    index % 5 === 0 || index % 5 === 4
                      ? "sm:col-span-1 sm:row-span-2"
                      : ""
                  }`}
                  style={{ transitionDelay: `${index * 90}ms` }}
                >
                  <div
                    className={`relative ${
                      index % 5 === 0 || index % 5 === 4
                        ? "aspect-[3/4]"
                        : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={src}
                      alt="Life at Pride World City celebration"
                      fill
                      sizes="(max-width: 1024px) 50vw, 20vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#10203b] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-[840px] text-center">
            <p className="text-[12px] font-[700] uppercase tracking-[0.18em] text-white/60">
              Connected without feeling compressed.
            </p>
            <h2 className="mt-3 text-[28px] leading-[1.12] text-white sm:text-[34px] lg:text-[40px]">
              Connectivity &amp; Growth
            </h2>
            <p className="mt-5 text-[15px] leading-[1.9] text-white/76 sm:text-[17px]">
              {prideWorldCityConnectivity.intro}
            </p>
          </div>

          <div className="mt-12 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(340px,0.9fr)]">
            <div className="rounded-[10px] border border-white/10 bg-white/6 p-6 shadow-[0_18px_44px_rgba(0,0,0,0.2)] backdrop-blur-md sm:p-8">
              <p className="text-[12px] font-[700] uppercase tracking-[0.16em] text-[#f0d89a]">
                Primary Access
              </p>
              <div className="mt-6 space-y-4">
                {prideWorldCityConnectivity.primary.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between gap-4 rounded-[10px] bg-white/6 px-4 py-4"
                  >
                    <span className="text-[15px] leading-snug text-white/82">
                      {item.title}
                    </span>
                    <span className="shrink-0 text-[16px] font-[700] text-[#f0d89a]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[10px] border border-white/10 bg-white/6 p-6 shadow-[0_18px_44px_rgba(0,0,0,0.2)] backdrop-blur-md sm:p-8">
              <p className="text-[12px] font-[700] uppercase tracking-[0.16em] text-[#f0d89a]">
                Growth Corridor
              </p>
              <div className="mt-6 space-y-4">
                {prideWorldCityConnectivity.secondary.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between gap-4 rounded-[10px] bg-white/6 px-4 py-4"
                  >
                    <span className="text-[15px] leading-snug text-white/82">
                      {item.title}
                    </span>
                    <span className="shrink-0 text-[16px] font-[700] text-[#f0d89a]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[10px] border border-white/10 bg-white shadow-[0_18px_44px_rgba(0,0,0,0.2)]">
              <iframe
                title="Pride World City satellite map"
                src="https://maps.google.com/maps?q=Pride%20World%20City%20Charholi%20Pune&t=k&z=15&output=embed"
                className="h-full min-h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
          <div className="rounded-[10px] border border-[#ddd6ca] bg-[linear-gradient(135deg,#f8f1e1_0%,#ffffff_52%,#f2f5fb_100%)] px-6 py-10 text-center shadow-[0_20px_48px_rgba(15,31,58,0.08)] sm:px-8 sm:py-14">
            <h2 className="mx-auto max-w-[720px] text-[22px] leading-[1.18] text-[#10203b] sm:text-[26px] lg:text-[28px]">
              Explore Pride World City as a township first,
              <br />
              then choose the project expression that fits your life.
            </h2>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#ongoing-projects"
                className="inline-flex items-center justify-center rounded-full bg-[#173363] px-6 py-3 text-[13px] font-[700] uppercase tracking-[0.08em] text-white transition hover:opacity-92"
              >
                View Ongoing Projects
              </a>
              <a
                href="#township-map"
                className="inline-flex items-center justify-center rounded-full border border-[#173363] px-6 py-3 text-[13px] font-[700] uppercase tracking-[0.08em] text-[#173363] transition hover:bg-[#173363] hover:text-white"
              >
                Return To Township Map
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-[#c9991a] bg-[#fff8e8] px-6 py-3 text-[13px] font-[700] uppercase tracking-[0.08em] text-[#8b6610] transition hover:bg-[#f7e6b7]"
              >
                Enquire
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
