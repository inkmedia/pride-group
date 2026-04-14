"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { GalleryTab, Project } from "@/types/project";

// specification section icons
const getSpecificationIcon = (title: string) => {
  const value = title.toLowerCase();

  if (value.includes("floor")) return "fa-solid fa-border-all";
  if (value.includes("bath")) return "fa-solid fa-bath";
  if (value.includes("door") || value.includes("window"))
    return "fa-solid fa-door-open";
  if (value.includes("electrical")) return "fa-solid fa-bolt";
  if (value.includes("kitchen")) return "fa-solid fa-kitchen-set";
  if (value.includes("finish")) return "fa-solid fa-paint-roller";
  if (value.includes("wall")) return "fa-solid fa-layer-group";
  if (value.includes("ceiling")) return "fa-solid fa-house";
  if (value.includes("security")) return "fa-solid fa-shield-halved";
  if (value.includes("plumbing")) return "fa-solid fa-faucet-drip";

  return "fa-solid fa-circle-check";
};

function getTabIndexFromHash(galleryTabs: GalleryTab[], hash: string) {
  const cleanHash = hash.replace("#", "");

  if (!cleanHash) return -1;

  return galleryTabs.findIndex((tab) => tab.anchorId === cleanHash);
}

export default function ProjectDetails({ project }: { project: Project }) {
  const details = project.details;
  const galleryTabs = details.galleryTabs;

  const [activeSpec, setActiveSpec] = useState(0);
  const [activeGalleryTab, setActiveGalleryTab] = useState(() => {
    if (typeof window === "undefined") return 0;

    const initialIndex = getTabIndexFromHash(galleryTabs, window.location.hash);
    return initialIndex >= 0 ? initialIndex : 0;
  });
  const [activeImage, setActiveImage] = useState(0);
  const [openConnectivityGroups, setOpenConnectivityGroups] = useState<
    Record<string, boolean>
  >({});
  const [isDesktopConnectivity, setIsDesktopConnectivity] = useState(false);

  const specTabs = details.specifications;
  const connectivityGroups = details.connectivity?.groups ?? [];

  const currentGallery = useMemo(() => {
    return galleryTabs[activeGalleryTab] || galleryTabs[0];
  }, [galleryTabs, activeGalleryTab]);

  useEffect(() => {
    if (!galleryTabs.length) return;

    const syncTabWithHash = () => {
      const tabIndex = getTabIndexFromHash(galleryTabs, window.location.hash);

      if (tabIndex >= 0) {
        setActiveGalleryTab(tabIndex);
        setActiveImage(0);
      }
    };

    window.addEventListener("hashchange", syncTabWithHash);

    return () => window.removeEventListener("hashchange", syncTabWithHash);
  }, [galleryTabs]);

  useEffect(() => {
    if (!connectivityGroups.length || typeof window === "undefined") return;

    const setDefaultConnectivityState = () => {
      const isDesktop = window.innerWidth >= 1280; // xl breakpoint
      setIsDesktopConnectivity(isDesktop);

      if (isDesktop) {
        const allOpen = connectivityGroups.reduce<Record<string, boolean>>(
          (acc, group) => {
            acc[group.title] = true;
            return acc;
          },
          {},
        );

        setOpenConnectivityGroups(allOpen);
      } else {
        setOpenConnectivityGroups({});
      }
    };

    setDefaultConnectivityState();

    window.addEventListener("resize", setDefaultConnectivityState);

    return () => {
      window.removeEventListener("resize", setDefaultConnectivityState);
    };
  }, [connectivityGroups]);

  const currentAsset = currentGallery?.images?.[activeImage];
  const totalAssets = currentGallery?.images?.length || 0;
  const isGridLayout = currentGallery?.layout === "grid";

  const handlePrev = () => {
    if (!totalAssets) return;
    setActiveImage((prev) => (prev === 0 ? totalAssets - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!totalAssets) return;
    setActiveImage((prev) => (prev === totalAssets - 1 ? 0 : prev + 1));
  };

  const handleGalleryTabChange = (index: number) => {
    setActiveGalleryTab(index);
    setActiveImage(0);

    const anchorId = galleryTabs[index]?.anchorId;

    if (anchorId) {
      window.history.replaceState(null, "", `#${anchorId}`);
    }
  };

  const toggleConnectivityGroup = (title: string) => {
    if (isDesktopConnectivity) return;

    setOpenConnectivityGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <section className="bg-gray-100 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {!!specTabs.length && (
          <div id="specifications" className="scroll-mt-36">
            <h2 className="text-[34px] font-[500] leading-none text-black sm:text-[42px]">
              Specifications
            </h2>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {specTabs.map((item, index) => {
                const active = index === activeSpec;

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveSpec(index)}
                    className={`min-w-[110px] cursor-pointer rounded-t-[8px] px-5 py-3 text-[16px] font-[500] transition sm:text-[18px] ${
                      active
                        ? "bg-[#173363] text-white"
                        : "bg-[#5d5d5d] text-white hover:bg-[#4f4f4f]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <i
                        className={`${getSpecificationIcon(item.title)} text-[14px] sm:text-[15px]`}
                      />
                      <span>{item.title}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="rounded-[16px] bg-white px-6 py-8 sm:px-8">
              <ul className="space-y-3 pl-5 text-[17px] leading-[1.9] text-black/70 sm:text-[19px]">
                {specTabs[activeSpec]?.content.map((point, index) => (
                  <li key={index} className="list-disc">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {!!galleryTabs.length && (
          <div className="mt-14 sm:mt-16">
            <div id="gallery" className="scroll-mt-36" />
            <div id="current-status" className="scroll-mt-36" />
            <div id="floorplans" className="scroll-mt-36" />

            <div className="flex flex-col items-center gap-3 text-center">
              <p className="text-[13px] font-[700] uppercase tracking-[0.14em] text-[#173363]/70">
                Project Visuals
              </p>
              <h2 className="text-[34px] font-[500] leading-none text-black sm:text-[42px]">
                Inside the Project
              </h2>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {galleryTabs.map((tab, index) => {
                const active = index === activeGalleryTab;

                return (
                  <button
                    key={tab.title}
                    type="button"
                    onClick={() => handleGalleryTabChange(index)}
                    className={`cursor-pointer rounded-t-[10px] border px-5 py-3 text-[18px] font-[500] transition sm:px-6 sm:text-[20px] ${
                      active
                        ? "border-[#1f75ff] bg-[#173363] text-white"
                        : "border-transparent bg-[#5d5d5d] text-white hover:bg-[#4f4f4f]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{tab.title}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {isGridLayout ? (
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {currentGallery.images.map((image, index) => (
                  <div
                    key={`${image.src}-${index}`}
                    className="overflow-hidden rounded-[22px] bg-white p-4 shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
                  >
                    <Image
                      src={image.src}
                      alt={
                        image.alt || `${project.title} floor plan ${index + 1}`
                      }
                      width={1200}
                      height={900}
                      className="h-auto w-full rounded-[18px] border border-black/8 bg-[#faf8f3] object-contain"
                    />
                    {image.caption && (
                      <div className="px-2 pb-2 pt-4 text-center text-[18px] font-[500] text-[#173363]">
                        {image.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : currentAsset ? (
              <>
                <div className="relative mt-4 overflow-hidden rounded-[20px] bg-white">
                  {currentAsset.type === "video" ? (
                    <video
                      key={`${activeGalleryTab}-${activeImage}-${currentAsset.src}`}
                      src={currentAsset.src}
                      poster={currentAsset.poster}
                      autoPlay
                      muted
                      loop
                      controls
                      playsInline
                      className="h-[320px] w-full object-cover sm:h-[460px] lg:h-[800px]"
                    />
                  ) : (
                    <Image
                      src={currentAsset.src}
                      alt={currentAsset.alt || `${project.title} gallery image`}
                      width={1600}
                      height={1000}
                      className="h-[320px] w-full object-cover sm:h-[460px] lg:h-[800px]"
                    />
                  )}

                  {totalAssets > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-2xl text-white transition hover:bg-black/75"
                        aria-label="Previous media"
                      >
                        ‹
                      </button>

                      <button
                        type="button"
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-2xl text-white transition hover:bg-black/75"
                        aria-label="Next media"
                      >
                        ›
                      </button>
                    </>
                  )}

                  {currentAsset.caption && (
                    <div className="absolute bottom-4 left-4 rounded-full bg-black/55 px-4 py-2 text-[16px] italic text-white sm:text-[18px]">
                      {currentAsset.caption}
                    </div>
                  )}

                  {totalAssets > 1 && (
                    <div className="absolute bottom-4 right-4 rounded-full bg-[#173363]/85 px-4 py-2 text-[18px] font-[500] text-white">
                      {activeImage + 1} / {totalAssets}
                    </div>
                  )}
                </div>

                {totalAssets > 1 && (
                  <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                    {currentGallery.images.map((image, index) => {
                      const active = index === activeImage;

                      return (
                        <button
                          key={`${image.src}-${index}`}
                          type="button"
                          onClick={() => setActiveImage(index)}
                          className={`overflow-hidden rounded-[12px] border-2 transition ${
                            active
                              ? "border-[#173363]"
                              : "border-transparent opacity-80 hover:opacity-100"
                          }`}
                        >
                          {image.type === "video" ? (
                            <div className="relative h-[78px] w-full bg-black sm:h-[96px] lg:h-[110px]">
                              <video
                                src={image.src}
                                poster={image.poster}
                                muted
                                playsInline
                                className="h-full w-full object-cover opacity-80"
                              />
                              <span className="absolute inset-0 flex items-center justify-center text-[24px] text-white">
                                ▶
                              </span>
                            </div>
                          ) : (
                            <Image
                              src={image.src}
                              alt={
                                image.alt ||
                                `${project.title} thumbnail ${index + 1}`
                              }
                              width={300}
                              height={220}
                              className="h-[78px] w-full object-cover sm:h-[96px] lg:h-[110px]"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </>
            ) : null}
          </div>
        )}

        {!!connectivityGroups.length && (
          <div className="mt-16 sm:mt-20">
            <h2 className="text-center text-[36px] font-[600] leading-none text-black sm:text-[50px]">
              {details.connectivity?.title || "Connectivity"}
            </h2>

            <div className="mt-10 space-y-6">
              <div className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-4 xl:items-stretch">
                {connectivityGroups.slice(0, 4).map((group) => {
                  const isOpen = !!openConnectivityGroups[group.title];

                  return (
                    <div
                      key={group.title}
                      className="rounded-[10px] bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:p-6 xl:h-full"
                    >
                      <button
                        type="button"
                        onClick={() => toggleConnectivityGroup(group.title)}
                        disabled={isDesktopConnectivity}
                        className={`flex w-full items-center justify-between gap-3 text-left ${
                          isDesktopConnectivity
                            ? "cursor-default"
                            : "cursor-pointer"
                        }`}
                      >
                        <h3 className="text-[20px] font-[600] text-[#173363]">
                          {group.title}
                        </h3>

                        {!isDesktopConnectivity && (
                          <span
                            className={`text-[22px] leading-none text-[#173363] transition-transform duration-300 ${
                              isOpen ? "rotate-45" : "rotate-0"
                            }`}
                          >
                            +
                          </span>
                        )}
                      </button>

                      {isOpen ? (
                        <div className="mt-5">
                          {group.items.map((item, index) => (
                            <div
                              key={`${item.name}-${index}`}
                              className={`flex items-center justify-between gap-2 py-2 ${
                                index !== group.items.length - 1
                                  ? "border-b border-black/8"
                                  : ""
                              }`}
                            >
                              <span className="text-[15px] text-black/80 sm:text-[15px]">
                                {item.name}
                              </span>
                              {item.distance ? (
                                <span className="shrink-0 text-[16px] font-[500] text-[#173363] sm:text-[18px]">
                                  {item.distance}
                                </span>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              {connectivityGroups.length > 4 && (
                <div className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3 xl:items-stretch">
                  {connectivityGroups.slice(4).map((group) => {
                    const isOpen = !!openConnectivityGroups[group.title];

                    return (
                      <div
                        key={group.title}
                        className="rounded-[10px] bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:p-6 xl:h-full"
                      >
                        <button
                          type="button"
                          onClick={() => toggleConnectivityGroup(group.title)}
                          disabled={isDesktopConnectivity}
                          className={`flex w-full items-center justify-between gap-3 text-left ${
                            isDesktopConnectivity
                              ? "cursor-default"
                              : "cursor-pointer"
                          }`}
                        >
                          <h3 className="text-[20px] font-[600] text-[#173363]">
                            {group.title}
                          </h3>

                          {!isDesktopConnectivity && (
                            <span
                              className={`text-[22px] leading-none text-[#173363] transition-transform duration-300 ${
                                isOpen ? "rotate-45" : "rotate-0"
                              }`}
                            >
                              +
                            </span>
                          )}
                        </button>

                        {isOpen ? (
                          <div className="mt-5">
                            {group.items.map((item, index) => (
                              <div
                                key={`${item.name}-${index}`}
                                className={`flex items-center justify-between gap-2 py-2 ${
                                  index !== group.items.length - 1
                                    ? "border-b border-black/8"
                                    : ""
                                }`}
                              >
                                <span className="text-[15px] text-black/80 sm:text-[15px]">
                                  {item.name}
                                </span>
                                {item.distance ? (
                                  <span className="shrink-0 text-[16px] font-[500] text-[#173363] sm:text-[18px]">
                                    {item.distance}
                                  </span>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
