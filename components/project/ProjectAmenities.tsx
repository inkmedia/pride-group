"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/types/project";

const getAmenityIcon = (item: string) => {
  const value = item.toLowerCase();

  if (value.includes("gym")) return "fa-solid fa-dumbbell";
  if (value.includes("yoga") || value.includes("meditation"))
    return "fa-solid fa-spa";
  if (value.includes("jogging") || value.includes("running"))
    return "fa-solid fa-person-running";
  if (value.includes("pool") || value.includes("swimming"))
    return "fa-solid fa-person-swimming";
  if (
    value.includes("kids") ||
    value.includes("play") ||
    value.includes("trampoline")
  )
    return "fa-solid fa-child-reaching";
  if (value.includes("club")) return "fa-solid fa-champagne-glasses";
  if (value.includes("cafe")) return "fa-solid fa-mug-saucer";
  if (value.includes("theatre")) return "fa-solid fa-film";
  if (value.includes("music") || value.includes("dance"))
    return "fa-solid fa-music";
  if (value.includes("art") || value.includes("craft"))
    return "fa-solid fa-palette";
  if (value.includes("library") || value.includes("study"))
    return "fa-solid fa-book-open";
  if (
    value.includes("working") ||
    value.includes("pod") ||
    value.includes("office")
  )
    return "fa-solid fa-briefcase";
  if (value.includes("cards") || value.includes("game"))
    return "fa-solid fa-gamepad";
  if (value.includes("senior")) return "fa-solid fa-user-group";
  if (value.includes("bbq")) return "fa-solid fa-fire-burner";
  if (
    value.includes("seating") ||
    value.includes("plaza") ||
    value.includes("pergola")
  )
    return "fa-solid fa-couch";
  if (value.includes("pet")) return "fa-solid fa-paw";
  if (
    value.includes("garden") ||
    value.includes("farming") ||
    value.includes("orchard") ||
    value.includes("tree")
  )
    return "fa-solid fa-leaf";
  if (value.includes("recycle")) return "fa-solid fa-recycle";
  if (value.includes("school")) return "fa-solid fa-school";
  if (value.includes("hospital")) return "fa-solid fa-hospital";
  if (value.includes("supermarket") || value.includes("mall"))
    return "fa-solid fa-cart-shopping";
  if (value.includes("bus")) return "fa-solid fa-bus";
  if (value.includes("security") || value.includes("cctv"))
    return "fa-solid fa-shield-halved";
  if (value.includes("lift")) return "fa-solid fa-elevator";
  if (value.includes("fire")) return "fa-solid fa-fire-extinguisher";
  if (value.includes("car charging")) return "fa-solid fa-charging-station";
  if (value.includes("solar")) return "fa-solid fa-solar-panel";
  if (value.includes("rainwater")) return "fa-solid fa-droplet";
  if (value.includes("laundry")) return "fa-solid fa-shirt";
  if (value.includes("changing room")) return "fa-solid fa-shirt";
  if (value.includes("amazon locker") || value.includes("locker"))
    return "fa-solid fa-box";
  if (value.includes("fountain")) return "fa-solid fa-water";
  if (value.includes("forest") || value.includes("jungle"))
    return "fa-solid fa-tree";
  if (value.includes("welcome")) return "fa-solid fa-door-open";

  return "fa-solid fa-circle-check";
};

export default function ProjectAmenities({ project }: { project: Project }) {
  const amenities = project.details.amenities;
  const [activeCategory, setActiveCategory] = useState(0);

  if (!amenities) return null;

  const tabCategories = useMemo(() => {
    const baseCategories = amenities.categories ?? [];

    const miscCategory = amenities.miscItems?.length
      ? [
          {
            title: amenities.miscTitle || "Misc",
            items: amenities.miscItems,
          },
        ]
      : [];

    return [...baseCategories, ...miscCategory];
  }, [amenities]);

  if (!tabCategories.length) return null;

  const currentCategory = tabCategories[activeCategory] || tabCategories[0];

  return (
    <section
      id="amenities"
      className="scroll-mt-36 bg-[#f8f8f8] py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-[820px]">
          <p className="text-[13px] font-[700] uppercase tracking-[0.14em] text-[#173363]/70">
            Lifestyle
          </p>

          <h2 className="mt-3 text-[34px] font-[500] leading-none text-black sm:text-[42px]">
            {amenities.title || "Amenities"}
          </h2>

          <p className="mt-4 text-[17px] leading-[1.8] text-black/65 sm:text-[18px]">
            Discover dedicated spaces for wellness, sports, family time, and
            open-air social moments across the Wellington community.
          </p>
        </div>

        <div className="mt-10 overflow-scroll grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
          <div className="rounded-[24px] bg-white p-4 shadow-[0_12px_32px_rgba(0,0,0,0.06)] sm:p-5">
            <div
              data-lenis-prevent
              className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
            >
              {tabCategories.map((category, index) => {
                const isActive = index === activeCategory;

                return (
                  <button
                    key={category.title}
                    type="button"
                    onClick={() => setActiveCategory(index)}
                    className={`cursor-pointer flex min-w-[220px] shrink-0 items-center justify-between rounded-[18px] px-4 py-4 text-left transition lg:min-w-0 ${
                      isActive
                        ? "bg-[#173363] text-white shadow-lg"
                        : "bg-[#f7f7f7] text-black hover:bg-[#ece7db]"
                    }`}
                  >
                    <span className="pr-3 text-[16px] font-[600] leading-snug sm:text-[18px]">
                      {category.title}
                    </span>

                    <span
                      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-[700] ${
                        isActive
                          ? "bg-white/15 text-white"
                          : "bg-white text-[#173363]"
                      }`}
                    >
                      {String(category.items.length).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            data-lenis-prevent
            className="max-h-[550px] overflow-y-auto rounded-[28px] bg-white p-5 shadow-[0_18px_40px_rgba(0,0,0,0.07)] sm:p-8"
          >
            <div className="flex flex-col gap-4 border-b border-black/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[13px] font-[700] uppercase tracking-[0.14em] text-[#173363]/70">
                  Curated Spaces
                </p>

                <h3 className="mt-2 text-[26px] font-[500] leading-none text-black sm:text-[34px]">
                  {currentCategory.title}
                </h3>
              </div>
            </div>

            <div className="mt-6 pr-1 sm:pr-2">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {currentCategory.items.map((item) => (
                  <div
                    key={`${currentCategory.title}-${item}`}
                    className="flex min-h-[68px] items-center rounded-[18px] border border-[#efe5d3] bg-[#fbf8f2] px-4 py-4 text-[15px] leading-snug text-black/80 sm:text-[16px]"
                  >
                    <span className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#173363] text-white">
                      <i className={`${getAmenityIcon(item)} text-[12px]`} />
                    </span>

                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
