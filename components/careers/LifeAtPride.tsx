"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type PillarItem = {
  title: string;
  subtitle: string;
  icon: string;
  detailsTitle: string;
  detailsIntro: string;
  points: {
    title: string;
    text: string;
  }[];
};

const pillars: PillarItem[] = [
  {
    title: "Care",
    subtitle: "Demonstrate to colleagues that their wellbeing matters",
    icon: "fa-solid fa-heart",
    detailsTitle: "Care",
    detailsIntro:
      "We believe your wellbeing is the foundation of success, because at Pride, care extends beyond the workplace.",
    points: [
      {
        title: "SAHYOG",
        text: "Children Education, Self Development",
      },
      {
        title: "WELLNESS @PRIDE",
        text: "Wellness session once a quarter",
      },
      {
        title: "RUN WITH PRIDE",
        text: "Marathon for employees",
      },
      {
        title: "PRIDE SUVIDHA",
        text: "Benefits : PF, Insurance, Leaves, Marriage gift, Society Loan",
      },
    ],
  },
  {
    title: "Connect",
    subtitle: "Build relationships that support togetherness",
    icon: "fa-solid fa-link",
    detailsTitle: "CONNECT",
    detailsIntro:
      "Building moments that bring people together and strengthen trust, because togetherness is the heartbeat of our culture.",
    points: [
      {
        title: "PRIDE SAFAR",
        text: "Team Bonding Activities/Fun events",
      },
      {
        title: "ABHINANDAN",
        text: "Onboarding and Induction",
      },
      {
        title: "PRIDE SAATHI",
        text: "Buddy at Pride",
      },
      {
        title: "TRIBE OF PRIDE",
        text: "Interest Groups: Photography, Painting, Bikers, Trekkers. Social Work",
      },
    ],
  },
  {
    title: "Coach",
    subtitle: "Guide colleagues to be the best version of themselves",
    icon: "fa-solid fa-person-chalkboard",
    detailsTitle: "COACH",
    detailsIntro:
      "We guide, mentor, and equip you with tools to achieve your full potential, because when you grow, we all grow.",
    points: [
      {
        title: "PLEDGE",
        text: "Pride Leadership Edge",
      },
      {
        title: "PRIDE UDAAN",
        text: "Employee Training Programs linked to PMS",
      },
      {
        title: "PEHLA KADAM",
        text: "GET Program",
      },
      {
        title: "PARICHAY",
        text: "Know My Department",
      },
    ],
  },
  {
    title: "Contribute",
    subtitle: "Encourage colleagues to contribute their thoughts",
    icon: "fa-solid fa-lightbulb",
    detailsTitle: "CONTRIBUTE",
    detailsIntro:
      "Your voice matters in shaping our future. We create open spaces for ideas, feedback, and collaboration.",
    points: [
      {
        title: "SAMVAAD",
        text: "Open Forum, Annual Meets, Strategy Meets",
      },
      {
        title: "MANCH",
        text: "Management & HR skip level meetings",
      },
      {
        title: "PRIDE NEWS",
        text: "an employee newsletter",
      },
    ],
  },
  {
    title: "Congratulate",
    subtitle: "Celebrate colleagues for the work they do",
    icon: "fa-solid fa-hands-clapping",
    detailsTitle: "CONGRATULATE",
    detailsIntro:
      "We recognize and honor your contributions in driving organizational success while celebrating your achievement stories.",
    points: [
      {
        title: "PRIDE KE SITARE",
        text: "Annual Shabhash Awards & RNR",
      },
      {
        title: "MADE A DIFFERENCE",
        text: "Spot Appreciation",
      },
      {
        title: "PRIDE’S GOT TALENT",
        text: "Recognize talent",
      },
      {
        title: "LONG SERVICE AWARDS",
        text: "Loyalty Awards",
      },
      {
        title: "SABSE ACCHA SAATHI",
        text: "",
      },
    ],
  },
];

const topRow = pillars.slice(0, 2);
const bottomRow = pillars.slice(2);

function PillarCard({
  item,
  index,
  visible,
  onOpen,
}: {
  item: PillarItem;
  index: number;
  visible: boolean;
  onOpen: (pillar: PillarItem) => void;
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-[14px] border border-black/8 bg-white p-4 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#172f55] text-white">
        <i className={`${item.icon} text-[14px]`} />
      </div>

      <h3 className="mt-3 text-[18px] font-[600] leading-[1.2] text-[#1f3f6b]">
        {item.title}
      </h3>

      <p className="mt-2 text-[13px] leading-[1.7] text-black/62 sm:text-[14px]">
        {item.subtitle}
      </p>

      <div className="mt-auto pt-4">
        <button
          type="button"
          onClick={() => onOpen(item)}
          className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[#1f3f6b] px-4 py-2 text-[12px] font-[700] uppercase tracking-[0.08em] text-[#1f3f6b] transition hover:bg-[#172f55] hover:border-[#172f55] hover:text-white"
        >
          Know More
        </button>
      </div>
    </div>
  );
}

export default function LifeAtPrideGroup() {
  const [visible, setVisible] = useState(false);
  const [isModalMounted, setIsModalMounted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activePillar, setActivePillar] = useState<PillarItem | null>(null);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isModalMounted) return;

    const scrollY = window.scrollY;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isModalMounted]);

  const openModal = (pillar: PillarItem) => {
    setActivePillar(pillar);
    setIsModalMounted(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsModalVisible(true);
      });
    });
  };

  const closeModal = () => {
    setIsModalVisible(false);

    setTimeout(() => {
      setIsModalMounted(false);
      setActivePillar(null);
    }, 300);
  };

  return (
    <>
      <section className="bg-white px-5 py-8 sm:px-8 sm:py-10 md:py-12 lg:px-10 lg:py-14">
        <div ref={ref} className="mx-auto max-w-[1440px]">
          <div className="grid items-stretch gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6">
            <div
              className={`h-full transition-all duration-1000 ease-[cubic-bezier(.22,1,.36,1)] ${
                visible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-10 scale-[0.97] opacity-0"
              }`}
            >
              <div className="h-full overflow-hidden rounded-[10px] border border-black/8 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
                <div className="relative h-[280px] sm:h-[360px] lg:h-full lg:min-h-[520px] xl:min-h-[560px]">
                  <Image
                    src="/images/Function-Gimmicks.jpg"
                    alt="Life at Pride Group"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 rounded-[16px] border border-white/15 bg-white/10 p-4 text-white backdrop-blur-xl sm:bottom-5 sm:left-5 sm:right-5 sm:p-5">
                    <p className="text-[10px] font-[700] uppercase tracking-[0.18em] text-[#f8f8f8] sm:text-[11px]">
                      Careers at Pride Group
                    </p>

                    <h3 className="mt-2 text-[22px] font-[500] leading-[1.15] tracking-[-0.02em] sm:text-[26px]">
                      Grow with teams that value ownership, empathy and shared
                      success.
                    </h3>

                    <p className="mt-2 max-w-[520px] text-[13px] leading-[1.7] text-white/80 sm:text-[14px]">
                      We believe strong workplaces are built when people feel
                      supported, appreciated and empowered to bring their best
                      selves to work every day.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`h-full transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <div className="flex h-full flex-col rounded-[10px] border border-black/8 bg-[#f8f8f8] p-4 sm:p-5 lg:p-6">
                <p className="mb-2 text-[10px] font-[700] uppercase tracking-[0.22em] text-[#172f55] sm:text-[11px]">
                  Life at Pride Group
                </p>

                <h2 className="max-w-[700px] text-[22px] font-[500] leading-[1.25] tracking-[-0.03em] text-[#1f3f6b] sm:text-[23px] lg:text-[24px]">
                  The 5C Philosophy
                </h2>

                <div className="mt-4 h-[1px] w-14 bg-[#1f3f6b]/20" />

                <p className="mt-4 max-w-[680px] text-[14px] leading-[1.75] text-black/65 sm:text-[15px]">
                  At Pride Group, culture is not a statement on a wall. It is
                  shaped through the way we care, connect, coach, contribute and
                  celebrate together.
                </p>

                <div className="mt-5 space-y-3">
                  <div className="grid gap-3 md:grid-cols-2">
                    {topRow.map((item, index) => (
                      <PillarCard
                        key={item.title}
                        item={item}
                        index={index}
                        visible={visible}
                        onOpen={openModal}
                      />
                    ))}
                  </div>

                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {bottomRow.map((item, index) => (
                      <PillarCard
                        key={item.title}
                        item={item}
                        index={index + 2}
                        visible={visible}
                        onOpen={openModal}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isModalMounted && activePillar && (
        <div
          className={`fixed inset-0 z-9999 flex items-center justify-center p-4 transition-all duration-300 ease-out ${
            isModalVisible
              ? "bg-black/60 backdrop-blur opacity-100"
              : "bg-black/0 opacity-0"
          }`}
          onClick={closeModal}
        >
          <div
            className={`relative w-full max-w-3xl rounded-[20px] bg-white p-6 shadow-2xl transition-all duration-300 ease-out sm:p-8 ${
              isModalVisible
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-6 scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 cursor-pointer text-gray-500 transition hover:text-black"
              aria-label="Close popup"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <p className="text-[11px] font-[700] uppercase tracking-[0.18em] text-[#172f55]">
              Life at Pride Group
            </p>

            <h3 className="mt-2 text-[28px] font-[600] leading-[1.2] text-[#1f3f6b] sm:text-[34px]">
              {activePillar.detailsTitle}
            </h3>

            <p className="mt-4 max-w-[860px] text-[15px] leading-[1.8] text-black/70 sm:text-[16px]">
              {activePillar.detailsIntro}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {activePillar.points.map((point) => (
                <div
                  key={point.title}
                  className="rounded-[14px] border border-black/8 bg-[#f8f8f8] p-4"
                >
                  <h4 className="text-[20px] font-[700] leading-[1.2] text-[#1f3f6b]">
                    {point.title}
                  </h4>

                  {point.text ? (
                    <p className="mt-2 text-[14px] leading-[1.7] text-black/68 sm:text-[15px]">
                      {point.text}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
