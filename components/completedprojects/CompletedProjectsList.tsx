"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

/* ---------------- TYPES ---------------- */

type Project = {
  name: string;
  location: string;
  city: "Pune" | "Mumbai" | "Bangalore";
  type: "Residential" | "Commercial";
  image?: string;
  configuration?: string;
  totalBuiltUp?: string;
  units?: string;
};

type City = "Pune" | "Mumbai" | "Bangalore";
type ProjectType = "All" | "Residential" | "Commercial";

/* ---------------- DATA ---------------- */

const projects: Project[] = [
  // Pune Residential
  {
    name: "Park Turquoise",
    location: "Wakad",
    city: "Pune",
    type: "Residential",
    configuration: "2 & 3 BHK",
    totalBuiltUp: "4,200 sq. ft.",
    units: "8",
  },
  {
    name: "Ruby Park",
    location: "Ravet",
    city: "Pune",
    type: "Residential",
    configuration: "2 BHK",
    totalBuiltUp: "3,100 sq. ft.",
    units: "6",
  },
  {
    name: "Emerald Park",
    location: "Baner",
    city: "Pune",
    type: "Residential",
    configuration: "2 & 3 BHK",
    totalBuiltUp: "4,800 sq. ft.",
    units: "10",
  },
  {
    name: "Diamond Park",
    location: "Balewadi",
    city: "Pune",
    type: "Residential",
    configuration: "3 BHK",
    totalBuiltUp: "3,900 sq. ft.",
    units: "5",
  },
  {
    name: "Sapphire Park",
    location: "Hinjewadi",
    city: "Pune",
    type: "Residential",
    configuration: "2, 3 & 4 BHK",
    totalBuiltUp: "5,200 sq. ft.",
    units: "9",
  },
  {
    name: "Topaz Park",
    location: "Pashan",
    city: "Pune",
    type: "Residential",
    configuration: "2 & 3 BHK",
    totalBuiltUp: "3,600 sq. ft.",
    units: "7",
  },
  {
    name: "Aloma County",
    location: "Aundh Gaon",
    city: "Pune",
    type: "Residential",
    configuration: "Villas",
    totalBuiltUp: "6,000 sq. ft.",
    units: "4",
  },
  {
    name: "Pride Platinum",
    location: "Viman Nagar",
    city: "Pune",
    type: "Residential",
    configuration: "2 & 3 BHK",
    totalBuiltUp: "4,100 sq. ft.",
    units: "8",
  },
  {
    name: "Pride Aashiyana",
    location: "Dhanori",
    city: "Pune",
    type: "Residential",
    configuration: "1 & 2 BHK",
    totalBuiltUp: "2,800 sq. ft.",
    units: "10",
  },

  // Pune Commercial
  {
    name: "Park Purple Square",
    location: "Aundh Chest Hospital Road",
    city: "Pune",
    type: "Commercial",
    configuration: "Retail & Office",
    totalBuiltUp: "5,500 sq. ft.",
    units: "6",
  },
  {
    name: "Pride House",
    location: "Gokhalenagar",
    city: "Pune",
    type: "Commercial",
    configuration: "Office Spaces",
    totalBuiltUp: "4,300 sq. ft.",
    units: "5",
  },
  {
    name: "Pride Icon",
    location: "Kharadi",
    city: "Pune",
    type: "Commercial",
    configuration: "Office Spaces",
    totalBuiltUp: "4,800 sq. ft.",
    units: "7",
  },
  {
    name: "Pride Purple Accord",
    location: "Baner Road",
    city: "Pune",
    type: "Commercial",
    configuration: "Commercial Offices",
    totalBuiltUp: "5,100 sq. ft.",
    units: "4",
  },
  {
    name: "Pride Gateway",
    location: "Baner Road",
    city: "Pune",
    type: "Commercial",
    configuration: "Retail & Business",
    totalBuiltUp: "4,600 sq. ft.",
    units: "5",
  },

  // Bangalore Residential
  {
    name: "Pride Pavilion",
    location: "West of Chord Road, Bangalore West",
    city: "Bangalore",
    type: "Residential",
    image: "/images/completed-projects/pride-pavilion.jpg",
    configuration: "2, 3 & 4 BHK",
    totalBuiltUp: "5,800 sq. ft.",
    units: "9",
  },
  {
    name: "Pride Pristine",
    location: "Electronic City, Bangalore South",
    city: "Bangalore",
    type: "Residential",
    image: "/images/completed-projects/pride-pristine.jpg",
    configuration: "2 & 3 BHK",
    totalBuiltUp: "4,900 sq. ft.",
    units: "8",
  },
  {
    name: "Pride Vatika",
    location: "On Bannerghatta - Jigani Road, Bangalore South",
    city: "Bangalore",
    type: "Residential",
    image: "/images/completed-projects/pride-vatika.jpg",
    configuration: "Plots & Villas",
    totalBuiltUp: "6,200 sq. ft.",
    units: "5",
  },
  {
    name: "Valley View",
    location: "Bukkasagara, Bangalore South",
    city: "Bangalore",
    type: "Residential",
    image: "/images/completed-projects/valley-view.jpg",
    configuration: "2 & 3 BHK",
    totalBuiltUp: "4,200 sq. ft.",
    units: "7",
  },
  {
    name: "Rolling Hills",
    location: "On Bannerghatta - Jigani Road, Bangalore South",
    city: "Bangalore",
    type: "Residential",
    image: "/images/completed-projects/rolling-hills.jpg",
    configuration: "Plots",
    totalBuiltUp: "5,700 sq. ft.",
    units: "6",
  },
  {
    name: "Pride Springfields",
    location: "Off Kanakapura Road, Bangalore South",
    city: "Bangalore",
    type: "Residential",
    image: "/images/completed-projects/pride-springfields.jpg",
    configuration: "2 & 3 BHK",
    totalBuiltUp: "4,500 sq. ft.",
    units: "8",
  },

  // Bangalore Commercial
  {
    name: "Pride Hulkul",
    location: "Lalbagh Road",
    city: "Bangalore",
    type: "Commercial",
    image: "/images/completed-projects/pride-hulkul.jpg",
    configuration: "Office Spaces",
    totalBuiltUp: "5,400 sq. ft.",
    units: "5",
  },
  {
    name: "Pride Elite",
    location: "Ashok Nagar",
    city: "Bangalore",
    type: "Commercial",
    image: "/images/completed-projects/pride-elite.jpg",
    configuration: "Corporate Offices",
    totalBuiltUp: "4,700 sq. ft.",
    units: "4",
  },
  {
    name: "Pride Quadra",
    location: "Anandnagar",
    city: "Bangalore",
    type: "Commercial",
    image: "/images/completed-projects/pride-quadra.jpg",
    configuration: "Business Suites",
    totalBuiltUp: "4,100 sq. ft.",
    units: "6",
  },
];

/* ---------------- CUSTOM SELECT ---------------- */

function TypeSelect({
  value,
  onChange,
}: {
  value: ProjectType;
  onChange: (value: ProjectType) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const options: ProjectType[] = ["All", "Residential", "Commercial"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative min-w-[210px]">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-[54px] w-full items-center justify-between rounded-full border bg-white px-5 text-left transition-all duration-300 ${
          open
            ? "border-[#173363] shadow-[0_10px_25px_rgba(23,51,99,0.10)]"
            : "border-[#e3ddd3] hover:border-[#173363]/30 hover:shadow-[0_8px_18px_rgba(23,51,99,0.06)]"
        }`}
      >
        <div className="flex flex-col">
          <span className="text-[10px] font-[700] uppercase tracking-[0.14em] text-[#173363]/45">
            Project Type
          </span>
          <span className="mt-0.5 text-[14px] font-[600] text-[#173363] transition-colors duration-300">
            {value}
          </span>
        </div>

        <svg
          className={`h-4 w-4 text-[#173363] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        className={`absolute left-0 right-0 top-[calc(100%+10px)] z-30 origin-top overflow-hidden rounded-[20px] border border-[#e8e1d7] bg-white shadow-[0_18px_40px_rgba(16,32,59,0.10)] transition-all duration-200 ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-[0.98] opacity-0"
        }`}
      >
        <div className="p-2">
          {options.map((option, index) => {
            const active = value === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`cursor-pointer flex w-full items-center justify-between rounded-[14px] px-4 py-3 text-left transition duration-300 ${
                  active
                    ? "bg-[#173363] text-white"
                    : "text-[#173363] hover:bg-[#f5f1ea]"
                }`}
                style={{
                  transitionDelay: `${index * 30}ms`,
                }}
              >
                <span className="text-[14px] font-[600]">{option}</span>

                {active ? (
                  <span className="text-[11px] font-[700] uppercase tracking-[0.12em] text-white/75">
                    Selected
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------- PROJECT INFO ---------------- */

function ProjectInfo({ project }: { project: Project }) {
  return (
    <div className="mt-3">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-2">
        <h3 className="min-w-0 text-[18px] font-[600] leading-[1.3] text-[#172f55]">
          {project.name}
        </h3>

        <p className="whitespace-nowrap text-right text-[12px] font-[600] leading-[1.4] text-[#172f55]/75">
          {project.configuration || "—"}
        </p>

        <p className="min-w-0 text-[12px] uppercase tracking-[0.08em] text-[#173363]/55">
          {[project.location, project.city].filter(Boolean).join(", ")}
        </p>

        <p className="whitespace-nowrap text-right text-[12px] font-[600] leading-[1.4] text-[#172f55]/75">
          {project.totalBuiltUp || "—"}
        </p>
      </div>

      <p className="mt-2 border-t border-[#172f55]/10 pt-3 text-[12px] font-[600] leading-[1.5] text-[#172f55]/80">
        No. of Units - {project.units || "—"}
      </p>
    </div>
  );
}

/* ---------------- COMPONENT ---------------- */

export default function CompletedProjectsList() {
  const [activeCity, setActiveCity] = useState<City>("Pune");
  const [activeType, setActiveType] = useState<ProjectType>("All");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const cityMatch = project.city === activeCity;
      const typeMatch =
        activeType === "All" ? true : project.type === activeType;

      return cityMatch && typeMatch;
    });
  }, [activeCity, activeType]);

  const isBangalore = activeCity === "Bangalore";
  const isPune = activeCity === "Pune";
  const animationKey = `${activeCity}-${activeType}`;

  return (
    <section className="bg-[#f8f8f8] py-12 lg:py-12">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-8">
        <div className="border-b-2 border-[#e1e1e1] pb-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-center">
            <div className="flex flex-wrap justify-between rounded-full bg-[#ebebeb] p-1.5 transition-all duration-300">
              {(["Pune", "Bangalore", "Mumbai"] as City[]).map((city) => {
                const active = activeCity === city;

                return (
                  <button
                    key={city}
                    onClick={() => {
                      setActiveCity(city);
                      setActiveType("All");
                    }}
                    className={`relative cursor-pointer rounded-full px-10 py-3 text-[13px] font-[700] uppercase tracking-[0.12em] transition-all duration-300 ease-out ${
                      active
                        ? "bg-[#173363] text-white shadow-[0_8px_18px_rgba(23,51,99,0.22)] scale-100"
                        : "text-[#173363]/65 hover:text-[#173363] hover:scale-[1.02]"
                    }`}
                  >
                    <span className="transition-transform duration-300">
                      {city}
                    </span>
                  </button>
                );
              })}
            </div>

            <TypeSelect value={activeType} onChange={setActiveType} />
          </div>
        </div>

        <div
          key={`summary-${animationKey}`}
          className="animate-fade-in-up mt-8 flex items-center justify-end gap-4"
        >
          <p className="text-[13px] font-[600] text-[#173363]/65">
            Showing{" "}
            <span className="font-[700] text-[#173363]">
              {filteredProjects.length}
            </span>{" "}
            project{filteredProjects.length !== 1 ? "s" : ""} in{" "}
            <span className="font-[700] text-[#173363]">{activeCity}</span>
            {activeType !== "All" ? (
              <>
                {" "}
                for{" "}
                <span className="font-[700] text-[#173363]">{activeType}</span>
              </>
            ) : null}
          </p>
        </div>

        {/* Bangalore layout with images */}
        {isBangalore ? (
          <div
            key={`bangalore-${animationKey}`}
            className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.map((project, index) => (
              <div
                key={`${project.name}-${index}`}
                className="animate-stagger-in group overflow-hidden rounded-[10px] border border-[#172f55]/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(16,32,59,0.08)]"
                style={{
                  animationDelay: `${index * 70}ms`,
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  ) : null}

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                    <p className="text-[7px] font-[600] uppercase tracking-[0.14em] text-white/80">
                      Artistic Impression
                    </p>
                  </div>
                </div>

                <div className="p-4 transition-all duration-300">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <span className="rounded-full bg-[#f8f8f8] px-3 py-1 text-[10px] font-[700] uppercase tracking-[0.14em] text-black transition-all duration-300 group-hover:bg-[#eef2f7]">
                      {project.type}
                    </span>
                  </div>

                  <ProjectInfo project={project} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Default layout for Pune/Mumbai */
          <div
            key={`default-${animationKey}`}
            className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
          >
            {filteredProjects.map((project, index) => (
              <div
                key={`${project.name}-${index}`}
                className="animate-stagger-in group flex min-h-[220px] flex-col justify-between rounded-[10px] border border-[#172f55]/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#172f55]/30 hover:shadow-[0_14px_30px_rgba(16,32,59,0.08)]"
                style={{
                  animationDelay: `${index * 70}ms`,
                }}
              >
                <div>
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span className="rounded-full bg-[#f8f8f8] px-3 py-1 text-[10px] font-[700] uppercase tracking-[0.14em] text-black transition-all duration-300 group-hover:bg-[#eef2f7]">
                      {project.type}
                    </span>
                  </div>

                  <ProjectInfo project={project} />
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[11px] font-[700] uppercase tracking-[0.14em] text-[#173363]/45 transition-opacity duration-300">
                    {project.city}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {isPune && (
          <div className="mt-8 overflow-hidden rounded-[10px] border border-[#172f55]/10 bg-white shadow-[0_14px_30px_rgba(16,32,59,0.08)]">
            <iframe
              data-lenis-prevent
              src="https://my.atlist.com/map/18e50b08-73aa-4946-8910-6f7bd00048e6?share=true"
              allow="geolocation 'self' https://my.atlist.com"
              width="100%"
              height="500"
              loading="lazy"
              frameBorder="0"
              scrolling="no"
              allowFullScreen
              id="atlist-embed"
              className="block w-full"
            />
          </div>
        )}

        {isBangalore && (
          <div className="mt-8 overflow-hidden rounded-[10px] border border-[#172f55]/10 bg-white shadow-[0_14px_30px_rgba(16,32,59,0.08)]">
            <iframe
              data-lenis-prevent
              src="https://my.atlist.com/map/bdf1b903-4d60-4549-98c3-8001b670c795?share=true"
              allow="geolocation 'self' https://my.atlist.com"
              width="100%"
              height="500"
              loading="lazy"
              frameBorder="0"
              scrolling="no"
              allowFullScreen
              id="atlist-embed"
              className="block w-full"
            />
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="mt-16 rounded-[10px] border border-dashed border-[#d8d1c4] bg-white px-6 py-14 text-center">
            <p className="text-[16px] font-[600] text-[#173363]">
              No projects available
            </p>
            <p className="mt-2 text-[14px] text-[#173363]/60">
              Try switching the city or selecting another project type.
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.45s ease-out both;
        }

        .animate-stagger-in {
          opacity: 0;
          animation: staggerIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
          will-change: transform, opacity;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 14px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes staggerIn {
          from {
            opacity: 0;
            transform: translate3d(0, 22px, 0) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}
