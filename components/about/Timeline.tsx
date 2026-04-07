"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type TimelineItem = {
  year: string;
  title?: string;
  subtitle?: string;
  description?: string;
  image: string;
  size?: "sm" | "md" | "lg" | "tall";
  tone?: "blue" | "mono";
  rotateYear?: boolean;
  yearPosition?: "left" | "right" | "top" | "bottom";
};

const timelineData: TimelineItem[] = [
  {
    year: "1999",
    title: "1st",
    description:
      "Established and launched our first commercial project, Pride Corporate Plaza.",
    image: "/images/timeline.png",
    size: "md",
    tone: "mono",
    rotateYear: false,
    yearPosition: "bottom",
  },
  {
    year: "2000",
    title: "1st",
    description: "Developed Pune’s first private IT park, Pride Silicon Plaza.",
    image: "/images/timeline.png",
    size: "md",
    tone: "mono",
    rotateYear: false,
    yearPosition: "bottom",
  },
  {
    year: "2002",
    title: "1st",
    description: "Introduced Pride Panorama, our first residential project.",
    image: "/images/timeline.png",
    size: "md",
    tone: "mono",
    rotateYear: false,
    yearPosition: "bottom",
  },
  {
    year: "2005",
    title: "Building Tomorrow Today",
    description: "Expanded into Bengaluru and Mumbai. Launched Pride Vatika.",
    image: "/images/timeline.png",
    size: "tall",
    tone: "blue",
    yearPosition: "bottom",
  },
  {
    year: "2006",
    title: "Expanded",
    description:
      "Launched Pride Park Street, 76 acres township. Pune’s second-largest project.",
    image: "/images/timeline.png",
    size: "md",
    tone: "mono",
    yearPosition: "bottom",
  },
  {
    year: "2008",
    title: "Second Largest",
    description: "Launched Avalon County, a 40-acre township project.",
    image: "/images/timeline.png",
    size: "md",
    tone: "mono",
    yearPosition: "bottom",
  },
  {
    year: "2011",
    title: "Acquisition",
    description: "Completed 125-acre land acquisition on Bombay-Pune Highway.",
    image: "/images/timeline.png",
    size: "md",
    tone: "mono",
    yearPosition: "bottom",
  },
  {
    year: "2015",
    title: "",
    description:
      "Completed 400-acre land acquisition for Pride World City in Charholi.",
    image: "/images/timeline.png",
    size: "tall",
    tone: "mono",
    yearPosition: "bottom",
  },
  {
    year: "2017",
    title: "1,000 Families",
    description: "Welcomed the first 1,000 families to PWC.",
    image: "/images/timeline.png",
    size: "tall",
    tone: "mono",
    yearPosition: "bottom",
  },
  {
    year: "2019",
    title: "",
    description: "Launched the second township in Pune’s IT hub, Hinjawadi.",
    image: "/images/timeline.png",
    size: "md",
    yearPosition: "bottom",
  },
  {
    year: "2022",
    title: "1000 Cr.",
    description: "Reached annual turnover of 1000 Cr.",
    image: "/images/timeline.png",
    size: "md",
    tone: "mono",
    yearPosition: "bottom",
  },
  {
    year: "2024",
    title: "900 Families",
    description:
      "48 towers simultaneously under construction. Welcomed 900 families into Pride World City.",
    image: "/images/timeline.png",
    size: "md",
    tone: "mono",
    yearPosition: "bottom",
  },
];

const blockSizeMap = {
  sm: "w-[180px]",
  md: "w-[230px]",
  lg: "w-[280px]",
  tall: "w-[170px]",
};

const imageHeightMap = {
  sm: "h-[180px]",
  md: "h-[220px]",
  lg: "h-[260px]",
  tall: "h-[280px]",
};

export default function Timeline() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const updateProgress = () => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const current = el.scrollLeft;
    const value = maxScroll > 0 ? (current / maxScroll) * 100 : 0;

    setProgress(value);
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;

    isDownRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const stopDragging = () => {
    isDownRef.current = false;
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || !isDownRef.current) return;

    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.2;
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = scrollRef.current;
    if (!el) return;

    const value = Number(e.target.value);
    const maxScroll = el.scrollWidth - el.clientWidth;

    el.scrollTo({
      left: (value / 100) * maxScroll,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => updateProgress();

    updateProgress();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <section className="overflow-hidden bg-[#efefef] py-14 lg:py-20">
      <div className="mb-3 px-4 sm:px-6 lg:px-10">
        <p className="text-[12px] font-[700] uppercase tracking-[0.16em] orange">
          Journey
        </p>
        <h2 className="mt-2 text-[28px] leading-[1.15] text-[#1f2a44] sm:text-[34px] md:text-[38px] lg:text-[40px]">
          Our Growth Story
        </h2>
      </div>

      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseLeave={stopDragging}
        onMouseUp={stopDragging}
        onMouseMove={onMouseMove}
        className="cursor-grab pt-4 h-[600px] px-10 overflow-x-auto overflow-y-hidden touch-pan-x select-none active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex min-w-max items-end gap-14 px-6 pb-10 pt-8 sm:px-8 lg:gap-30 lg:px-12">
          {timelineData.map((item, index) => (
            <TimelineBlock
              key={`${item.year}-${index}`}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-4">
          <span className="shrink-0 text-[12px] font-[700] uppercase tracking-[0.12em] text-[#1f4f9b]/70">
            Early Years
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleRangeChange}
            className="h-[2px] w-full cursor-pointer appearance-none bg-[#1f4f9b]/20 accent-[#1f4f9b]"
          />

          <span className="shrink-0 text-[12px] font-[700] uppercase tracking-[0.12em] text-[#1f4f9b]/70">
            Today
          </span>
        </div>
      </div>
    </section>
  );
}

function TimelineBlock({ item, index }: { item: TimelineItem; index: number }) {
  const widthClass = blockSizeMap[item.size || "md"];
  const heightClass = imageHeightMap[item.size || "md"];

  const stagger =
    index % 5 === 0
      ? "translate-y-[20px]"
      : index % 5 === 1
        ? "translate-y-[-22px]"
        : index % 5 === 2
          ? "translate-y-[34px]"
          : index % 5 === 3
            ? "translate-y-[-36px]"
            : "translate-y-[10px]";

  const isBlue = item.tone === "blue";

  return (
    <article className={`relative shrink-0 ${widthClass} ${stagger}`}>
      <YearLabel
        year={item.year}
        rotate={item.rotateYear}
        position={item.yearPosition}
      />

      <div className="relative">
        <div
          className={`relative overflow-hidden border-[4px] border-[#edd2bc] bg-white ${heightClass}`}
        >
          <Image
            src={item.image}
            alt={item.title || item.year}
            fill
            draggable={false}
            className={`object-cover ${isBlue ? "mix-blend-multiply" : ""}`}
          />

          {isBlue ? <div className="absolute inset-0 bg-[#1f4f9b]/85" /> : null}

          {item.title === "Building Tomorrow Today" ? (
            <div className="absolute inset-0 flex flex-col justify-end px-5 pb-5 text-white">
              <span className="text-[18px] font-[700] uppercase leading-none">
                Building
              </span>
              <span className="mt-1 text-[18px] font-[700] uppercase leading-none">
                Tomorrow
              </span>
              <span className="mt-1 text-[18px] font-[700] uppercase leading-none">
                Today
              </span>
            </div>
          ) : null}
        </div>

        {(item.title && item.title !== "Building Tomorrow Today") ||
        item.description ? (
          <div className="mt-4">
            {item.title ? (
              <h3 className="text-[20px] font-[800] uppercase leading-none tracking-tight orange ">
                {item.title}
              </h3>
            ) : null}

            {item.description ? (
              <p className="mt-3 max-w-[220px] text-[11px] font-[700] leading-[1.35] text-[#1f4f9b]">
                {item.description}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function YearLabel({
  year,
  rotate,
  position = "bottom",
}: {
  year: string;
  rotate?: boolean;
  position?: "left" | "right" | "top" | "bottom";
}) {
  const base =
    "pointer-events-none absolute z-10 text-[50px] font-[800] leading-none tracking-[-0.04em] text-[#3d73bd] ";

  const posMap = {
    left: "-left-23 top-1/2 -translate-y-1/2",
    right: "-right-25 top-1/2 -translate-y-1/2",
    top: "left-0 -top-27",
    bottom: "left-0 -bottom-16",
  };

  return (
    <div
      className={`${base} ${posMap[position]} ${rotate ? "-rotate-90 origin-center" : ""}`}
    >
      {year}
    </div>
  );
}
