"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const sectionNav = [
  { label: "Design Principles", target: "design-principles" },
  { label: "Re-imagined Engineering", target: "reimagined-engineering" },
  { label: "Sustainability", target: "sustainability-initiatives" },
  { label: "Responsibility", target: "responsibility-to-give-back" },
  { label: "Community", target: "community-we-build" },
];

const designPrinciples = [
  {
    title: "Apartments",
    eyebrow: "Internal Layout, Floor Plans, Specifications",
    body: "Privacy starts at the threshold, circulation stays intuitive, and storage is designed into the plan rather than added later. Floor plans, specifications, ventilation, balcony depth, and kitchen workflow are treated as decisions that shape everyday comfort.",
    type: "video" as const,
    src: "/video/Apartment-Video.mp4",
  },
  {
    title: "Society",
    eyebrow:
      "Design Planning, Vehicular Movement Management, New Age Amenities",
    body: "Vehicle movement, arrival sequencing, podium safety, resident access, and useful amenities are planned together. The aim is a society that works better daily, not just a list of features that reads well in a brochure.",
    type: "image" as const,
    src: "/images/Society.JPG",
  },
  {
    title: "Township Level Master Planning",
    eyebrow: "Open-space logic, wind movement, community planning",
    body: "At township scale, master planning determines how education, leisure, mobility, convenience, and housing support each other. Wind, daylight, access, and social life are planned into the larger environment from the start.",
    type: "image" as const,
    src: "/images/Master-Planning.jpg",
  },
];

const engineeringHighlights = [
  {
    title: "Quality Parameters",
    subtitle:
      "Material selection, constant improvement, and testing discipline",
    image: "/images/QC-1.png",
    bullets: [
      "Material selection reviewed against performance, durability, and lifecycle value",
      "Testing checkpoints built into execution instead of being left to end-stage quality review",
      "Site-level quality monitoring used to improve process consistency across projects",
    ],
  },
  {
    title: "Tech Interventions",
    subtitle:
      "DigiQC and Site Manager Pro deliver sharper, faster, smarter field execution daily.",
    image: "/images/QC-2.png",
    bullets: [
      "Digital quality workflows that shorten reporting loops and improve traceability",
      "Site Manager Pro for clearer task visibility, escalation, and follow-through",
      "Systems used to improve both efficiency and on-ground responsiveness",
    ],
  },
  {
    title: "Safety First Parameters",
    subtitle:
      "Induction, mock-up based training, vertigo tests, and awareness drives",
    image: "/images/QC-3.png",
    bullets: [
      "Induction and repeated training for labour and supervisors across active sites",
      "Mock-up based awareness, vertigo checks, and recurring safety-week initiatives",
      "On-ground safety culture reinforced through visible statistics, reminders, and supervision",
    ],
  },
];

const sustainabilityCards = [
  {
    title: "Construction Waste Management",
    image: "/images/Quality-Across-Segments.jpg",
    stats: "Circular site practices",
    points: [
      "Reuse of steel wherever practical through tighter planning and reuse discipline",
      "Recycled blocks produced from waste streams to reduce disposal burden",
      "Waste handling designed as an efficiency and responsibility issue, not just a compliance task",
    ],
  },
  {
    title: "Water Management",
    image: "/images/landscape.png",
    stats: "Reuse before discharge",
    points: [
      "Recycled water reused in construction activity where appropriate",
      "Rainwater harvesting implemented at projects such as Marina Bay and reused after processing",
      "Water management tracked as an active construction input rather than a downstream facility issue",
    ],
  },
  {
    title: "Energy",
    image: "/images/Amenities.jpg",
    stats: "Solar-backed utilities",
    points: [
      "Solar power plant planning supports common-area and utility-side consumption",
      "Sample energy planning includes rooftop generation, service-area usage, and load offsetting",
      "The intent is to reduce recurring energy dependence across shared infrastructure wherever viable",
    ],
  },
];

const labourImages = [
  "/images/Labout-1.jpg",
  "/images/Labout-2.jpg",
  "/images/Labout-3.jpg",
  "/images/Labout-4.jpg",
];

const gharpanImages = [
  "/images/Gharpan-1.jpg",
  "/images/Gharpan-2.jpg",
  "/images/Gharpan-3.jpg",
  "/images/Gharpan-4.jpg",
];

const celebrations = [
  "/images/celebrations/Gudi-Padwa.jpg",
  "/images/celebrations/Holi.jpg",
  "/images/celebrations/Christmas-Celebration.jpg",
  "/images/celebrations/Yoga-Day.jpg",
  "/images/celebrations/Tomatina.jpg",
  "/images/celebrations/Groove-Terrace.jpg",
  "/images/celebrations/Lohari.jpg",
  "/images/celebrations/Childrens-Day.jpg",
];

function SectionHeader({
  title,
  body,
  eyebrow,
  align = "left",
}: {
  title: string;
  body?: string;
  eyebrow?: string;
  align?: "left" | "center";
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  const width = align === "center" ? "max-w-[880px]" : "max-w-[760px]";

  return (
    <div className={`${alignment} ${width}`}>
      {eyebrow ? (
        <p className="text-[12px] font-[700] uppercase tracking-[0.18em] text-[#ef9e64]">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`${eyebrow ? "mt-3" : ""} text-[28px] leading-[1.12] text-[#10203b] sm:text-[34px] lg:text-[40px]`}
      >
        {title}
      </h2>
      {body ? (
        <p className="mt-5 text-[15px] leading-[1.9] text-[#26344e]/78 sm:text-[17px]">
          {body}
        </p>
      ) : null}
    </div>
  );
}

function StickySectionNav() {
  const [show, setShow] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const trigger = document.getElementById("design-principles");
      if (!trigger) return;

      const current = window.scrollY;
      const triggerTop = trigger.offsetTop - 180;
      const scrollingDown = current > lastScrollY.current;

      setShow(current >= triggerTop && scrollingDown);
      lastScrollY.current = current;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jumpTo = (target: string) => {
    const section = document.getElementById(target);
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY - 108;
    window.history.replaceState(null, "", `#${target}`);
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 top-0 z-[995] transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="border-b border-black/10 bg-white/96 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-md">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="pointer-events-auto flex min-w-max items-center gap-2 sm:justify-center">
              {sectionNav.map((item) => (
                <button
                  key={item.target}
                  type="button"
                  onClick={() => jumpTo(item.target)}
                  className="shrink-0 rounded-full border border-[#173363]/15 px-4 py-2 text-[12px] font-[700] uppercase tracking-[0.08em] text-[#173363] transition hover:border-[#173363] hover:bg-[#173363] hover:text-white sm:px-5"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesignMedia({
  type,
  src,
  alt,
}: {
  type: "image" | "video";
  src: string;
  alt: string;
}) {
  return (
    <div className="relative aspect-[5/3] overflow-hidden rounded-[10px] bg-[#e9e3d8]">
      {type === "video" ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          aria-label={alt}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover"
        />
      )}
    </div>
  );
}

function EngineeringModal({
  item,
  onClose,
}: {
  item: (typeof engineeringHighlights)[number] | null;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!item) {
      setVisible(false);
      return;
    }

    const timer = setTimeout(() => setVisible(true), 10);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVisible(false);
        setTimeout(onClose, 250);
      }
    };

    const scrollY = window.scrollY;

    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);

      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      window.scrollTo(0, scrollY);
    };
  }, [item, onClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 250);
  };

  if (!item) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center px-4 py-8 transition-all duration-300 ${
        visible
          ? "bg-[#10203b]/60 opacity-100 backdrop-blur-[3px]"
          : "bg-[#10203b]/0 opacity-0 backdrop-blur-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative max-h-[90vh] w-full max-w-[700px] overflow-y-auto rounded-[16px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.18)] transition-all duration-300 ${
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-6 scale-[0.96] opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/5 text-[20px] text-[#10203b] transition hover:bg-black/10"
          aria-label="Close popup"
        >
          ×
        </button>

        <div>
          <div className="p-6 sm:p-8">
            <p className="text-[12px] font-[700] uppercase tracking-[0.18em] ">
              Re-imagined Engineering
            </p>

            <h3 className="mt-3 text-[30px] leading-[1.12] text-[#10203b]">
              {item.title}
            </h3>

            <p className="mt-4 text-[15px] leading-[1.85] text-[#26344e]/78">
              {item.subtitle}
            </p>

            <div className="mt-6 space-y-3">
              {item.bullets.map((bullet, bulletIndex) => (
                <div
                  key={bullet}
                  className={`rounded-[10px] bg-[#f8f5ef] px-4 py-3 text-[14px] leading-[1.75] text-[#26344e]/78 transition-all duration-300 ${
                    visible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0"
                  }`}
                  style={{ transitionDelay: `${bulletIndex * 70}ms` }}
                >
                  {bullet}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BuildingWithPrideNewPage() {
  const [activeDesign, setActiveDesign] = useState(0);
  const [selectedEngineering, setSelectedEngineering] = useState<
    (typeof engineeringHighlights)[number] | null
  >(null);

  const activePrinciple = useMemo(
    () => designPrinciples[activeDesign],
    [activeDesign],
  );

  return (
    <div className="bg-[#f8f5ef] text-[#10203b]">
      <StickySectionNav />

      <section
        id="design-principles"
        className="bg-[#f8f5ef] py-16 sm:py-20 lg:py-24"
      >
        <div id="principles" className="relative -top-28" />
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
          <SectionHeader
            eyebrow="SECTION TITLE"
            title="Design Principles"
            body="The design principles by Arvind Jain are not abstract statements. They need to show up as visible, usable decisions that shape how people arrive, move, live, gather, and feel at home. We call this Value Engineering: working closely with architect teams to translate design thinking into real everyday advantage."
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-10">
            <div className="space-y-3">
              {designPrinciples.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveDesign(index)}
                  className={`flex w-full cursor-pointer flex-col rounded-[10px] border px-5 py-5 text-left transition ${
                    index === activeDesign
                      ? "border-[#172f55] bg-[#172f55] text-white"
                      : "border-[#ddd5c8] bg-white text-[#10203b] hover:border-[#172f55]/30"
                  }`}
                >
                  <span className="text-[12px] font-[700] uppercase tracking-[0.14em] opacity-70">
                    0{index + 1}
                  </span>
                  <span className="mt-3 text-[22px] leading-[1.15]">
                    {item.title}
                  </span>
                  <span className="mt-3 text-[13px] font-[700] uppercase tracking-[0.08em] opacity-75">
                    {item.eyebrow}
                  </span>
                </button>
              ))}
            </div>

            <div className="rounded-[10px] border border-[#ddd5c8] bg-white p-5 shadow-[0_18px_44px_rgba(15,31,58,0.06)] sm:p-6 lg:p-8">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)]">
                <div>
                  <DesignMedia
                    type={activePrinciple.type}
                    src={activePrinciple.src}
                    alt={activePrinciple.title}
                  />
                </div>
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-[12px] font-[700] uppercase tracking-[0.18em] ">
                      Value Engineering
                    </p>
                    <h3 className="mt-3 text-[28px] leading-[1.12] text-[#10203b]">
                      {activePrinciple.title}
                    </h3>
                    <p className="mt-5 text-[15px] leading-[1.9] text-[#26344e]/78">
                      {activePrinciple.body}
                    </p>
                  </div>

                  <div className="grid gap-3">
                    {designPrinciples.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-[10px] bg-[#f8f5ef] px-4 py-4 text-[14px] leading-[1.75] text-[#26344e]/76"
                      >
                        <span className="font-[700] text-[#173363]">
                          {item.title}:
                        </span>{" "}
                        {item.eyebrow}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="reimagined-engineering"
        className="bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
          <SectionHeader
            eyebrow="SECTION TITLE"
            title="Re-imagined Engineering"
            body="Engineering has to improve both confidence and execution. This section frames how material checks, digital tools, and safety systems support quality on the ground rather than staying as generic assurance language."
          />

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {engineeringHighlights.map((item, index) => (
              <div
                key={item.title}
                className={`rounded-[10px] border p-5 shadow-[0_18px_44px_rgba(15,31,58,0.06)] sm:p-6 ${
                  index === 1
                    ? "border-[#173363]/18 bg-[#173363] text-white"
                    : "border-[#ddd5c8] bg-[#f8f5ef] text-[#10203b]"
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[10px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <p
                  className={`mt-5 text-[12px] font-[700] uppercase tracking-[0.18em] ${
                    index === 1 ? "text-[#ef9e64]" : "text-[#ef9e64]"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </p>

                <h3 className="mt-3 text-[26px] leading-[1.12]">
                  {item.title}
                </h3>

                <p
                  className={`mt-4 text-[15px] leading-[1.85] ${
                    index === 1 ? "text-white/78" : "text-[#26344e]/78"
                  }`}
                >
                  {item.subtitle}
                </p>

                <button
                  type="button"
                  onClick={() => setSelectedEngineering(item)}
                  className={`mt-5 inline-flex cursor-pointer rounded-full px-5 py-2.5 text-[12px] font-[700] uppercase tracking-[0.08em] transition ${
                    index === 1
                      ? "border border-white/20 bg-white/10 text-white hover:bg-white/16"
                      : "border border-[#173363]/14 bg-white text-[#173363] hover:bg-[#173363] hover:text-white"
                  }`}
                >
                  View More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="sustainability-initiatives"
        className="bg-[#f8f5ef] py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
          <SectionHeader
            eyebrow="SECTION TITLE"
            title="Sustainability Initiatives"
            body="Sustainability is treated as a practical construction and operations question. The emphasis is on reusable systems, resource discipline, and infrastructure decisions that continue to matter after handover."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {sustainabilityCards.map((card) => (
              <div
                key={card.title}
                className="overflow-hidden rounded-[10px] border border-[#ddd5c8] bg-white shadow-[0_18px_44px_rgba(15,31,58,0.06)]"
              >
                <div className="relative aspect-[5/3] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10203b]/62 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <p className="text-[12px] font-[700] uppercase tracking-[0.16em] text-[#ef9e64]">
                    {card.stats}
                  </p>
                  <h3 className="mt-3 text-[28px] leading-[1.12] text-[#10203b]">
                    {card.title}
                  </h3>
                  <div className="mt-6 space-y-3">
                    {card.points.map((point) => (
                      <div
                        key={point}
                        className="rounded-[10px] bg-[#f8f5ef] px-4 py-3 text-[14px] leading-[1.75] text-[#26344e]/78"
                      >
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="community-we-build"
        className="bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
          <SectionHeader
            eyebrow="SECTION TITLE"
            title="Community We build"
            body="The community story is not only about apartments delivered. It is about festivals, events, public spaces, response systems, and the people who help residents feel supported every day."
            align="center"
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(360px,0.96fr)] lg:items-stretch">
            <div className="rounded-[10px] border border-[#ddd5c8] bg-white p-5 shadow-[0_18px_44px_rgba(15,31,58,0.06)] sm:p-6">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {celebrations.slice(0, 5).map((src, index) => (
                  <div
                    key={src}
                    className={`relative overflow-hidden rounded-[10px] ${
                      index === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={src}
                      alt="Community celebration"
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[10px] border border-[#ddd5c8] bg-[#173363] p-6 text-white shadow-[0_18px_44px_rgba(15,31,58,0.08)] sm:p-8">
              <div className="flex h-full flex-col justify-between">
                <p className="text-[12px] font-[700] uppercase tracking-[0.18em] text-[#ef9e64]">
                  Events, festivals, shared life
                </p>
                <h3 className="mt-3 text-[30px] leading-[1.12]">
                  Cosmo communities need spaces and moments to connect.
                </h3>
                <div className="mt-6 space-y-3">
                  {[
                    "Festivals that help a diverse community celebrate together",
                    "Spaces like Club Charholi, Town Plaza, and open grounds that keep social life visible",
                    "Events, marathons, shopping pop-ups, farmers markets, and match screenings that activate the township beyond static infrastructure",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[10px] bg-white/8 px-4 py-3 text-[14px] leading-[1.75] text-white/84"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-[10px] border border-[#ddd5c8] bg-white shadow-[0_18px_44px_rgba(15,31,58,0.06)]">
            <div className="relative overflow-hidden">
              <Image
                src="/images/Team-Hero.png"
                alt="Maintenance, security, and front desk support"
                width={1000}
                height={413}
                sizes="100vw"
                className="block h-[500px] w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10203b]/58 via-[#10203b]/10 to-transparent" />
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-[12px] font-[700] uppercase tracking-[0.18em] text-[#ef9e64]">
                Maintenance task force
              </p>
              <h3 className="mt-3 text-[30px] leading-[1.12] text-[#10203b]">
                Everyday support should feel visible, capable, and fast.
              </h3>
              <p className="mt-5 max-w-[940px] text-[15px] leading-[1.9] text-[#26344e]/78">
                The people behind resident support matter just as much as the
                physical infrastructure. Security, facility management,
                front-desk assistance, and issue resolution systems help turn a
                large development into a dependable living environment.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    value: "48 hrs",
                    label: "Queries resolved within the target window",
                  },
                  { value: "24/7", label: "Security presence and monitoring" },
                  {
                    value: "Daily",
                    label: "Common-area upkeep and escalation review",
                  },
                  { value: "On-call", label: "Resident support coordination" },
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[10px] bg-[#f8f5ef] px-4 py-4"
                  >
                    <div className="text-[22px] leading-none text-[#173363]">
                      {metric.value}
                    </div>
                    <div className="mt-2 text-[12px] font-[700] uppercase tracking-[0.12em] text-[#26344e]/62">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="responsibility-to-give-back"
        className="bg-[#f8f5ef] py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
          <SectionHeader
            eyebrow="SECTION TITLE"
            title="Responsibility to give back"
            body="Responsibility needs to be visible both inside the construction ecosystem and beyond it. That includes labour welfare, long-standing social initiatives, and partnerships that strengthen dignity, safety, and resilience in the wider community."
          />

          <div className="mt-12 space-y-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              <div className="rounded-[10px] border border-[#ddd5c8] bg-[#173363] p-6 text-white shadow-[0_18px_44px_rgba(15,31,58,0.08)] sm:p-8">
                <p className="text-[12px] font-[700] uppercase tracking-[0.18em] text-[#ef9e64]">
                  Labour Welfare
                </p>
                <h3 className="mt-3 text-[30px] leading-[1.12]">
                  Going above baseline welfare expectations.
                </h3>
                <p className="mt-5 text-[15px] leading-[1.9] text-white/80">
                  Labour welfare includes camp conditions, facilities, training,
                  awareness, and support systems that go beyond minimum site
                  requirements. The effort is to improve daily living conditions
                  for the people who help build every project.
                </p>
                <div className="mt-8 grid gap-3">
                  {[
                    "Improved camp infrastructure and hygiene support",
                    "Extra initiatives around awareness, care, and worker well-being",
                    "Training-led safety and welfare culture carried onto sites",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[10px] bg-white/8 px-4 py-3 text-[14px] leading-[1.75] text-white/84"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {labourImages.map((src) => (
                  <div
                    key={src}
                    className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-[#ddd5c8]"
                  >
                    <Image
                      src={src}
                      alt="Labour welfare initiative"
                      fill
                      sizes="(max-width: 1024px) 100vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
              <div className="grid gap-4 sm:grid-cols-2">
                {gharpanImages.map((src) => (
                  <div
                    key={src}
                    className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-[#ddd5c8]"
                  >
                    <Image
                      src={src}
                      alt="Gharpan Foundation initiative"
                      fill
                      sizes="(max-width: 1024px) 100vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center rounded-[10px] border border-[#ddd5c8] bg-white p-6 sm:p-8">
                <div className="w-full text-center">
                  <p className="text-[12px] font-[700] uppercase tracking-[0.18em] text-[#ef9e64]">
                    Gharpan Foundation
                  </p>
                  <h3 className="mt-3 text-[30px] leading-[1.12] text-[#10203b]">
                    A care-led extension of the group’s social commitment.
                  </h3>
                  <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-[1.9] text-[#26344e]/78">
                    Gharpan reflects the idea that responsibility should extend
                    beyond the boundary wall of a project. It brings together
                    care, outreach, and structured giving in ways that are more
                    sustained than one-time gestures, with support that feels
                    patient, local, and continuous over time.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(260px,0.34fr)_minmax(0,0.66fr)]">
              <div className="rounded-[10px] border border-[#ddd5c8] bg-white p-6 shadow-[0_18px_44px_rgba(15,31,58,0.06)] sm:p-8">
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <Image
                    src="/images/Mudita-Logo.webp"
                    alt="Mudita Foundation logo"
                    width={220}
                    height={160}
                    className="h-auto w-auto max-w-[180px] object-contain"
                  />
                  <p className="mt-5 text-[12px] font-[700] uppercase tracking-[0.18em] text-[#ef9e64]">
                    CSR Partner
                  </p>
                </div>
              </div>

              <div className="rounded-[10px] border border-[#ddd5c8] bg-[#10203b] p-6 text-white shadow-[0_18px_44px_rgba(15,31,58,0.08)] sm:p-8">
                <p className="text-[12px] font-[700] uppercase tracking-[0.18em] text-[#ef9e64]">
                  Mudita Foundation
                </p>
                <h3 className="mt-3 text-[30px] leading-[1.12]">
                  Safety, dignity, and resilient communities.
                </h3>
                <p className="mt-5 text-[15px] leading-[1.9] text-white/80">
                  Mudita Foundation’s work is centered on building resilient
                  individuals and communities that can identify, prevent, and
                  respond to abuse, violence, and exploitation. That focus on
                  safety, dignity, and collective responsibility aligns strongly
                  with how we think about responsible growth beyond
                  construction.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    "Community resilience and safety awareness",
                    "Prevention-led support and response orientation",
                    "Work rooted in dignity, choice, and collective responsibility",
                    "A meaningful CSR extension of the wider Pride ecosystem",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[10px] bg-white/8 px-4 py-3 text-[14px] leading-[1.75] text-white/84"
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <a
                  href="https://muditafoundation.in/"
                  className="mt-8 inline-flex rounded-full border border-white/22 px-5 py-3 text-[13px] font-[700] uppercase tracking-[0.08em] text-white transition hover:bg-white/8"
                >
                  Visit Mudita Foundation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EngineeringModal
        item={selectedEngineering}
        onClose={() => setSelectedEngineering(null)}
      />
    </div>
  );
}
