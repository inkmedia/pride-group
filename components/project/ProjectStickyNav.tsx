"use client";

import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Overview", target: "overview" },
  { label: "Amenities", target: "amenities" },
  { label: "Specifications", target: "specifications" },
  { label: "Floorplans", target: "floorplans" },
  { label: "Gallery", target: "gallery" },
  { label: "Contact Us", target: "contact-us" },
  { label: "RERA", target: "rera" },
];

export default function ProjectStickyNav() {
  const [showNav, setShowNav] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const overviewSection = document.getElementById("overview");

      if (!overviewSection) return;

      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollYRef.current;
      const overviewBottom =
        overviewSection.offsetTop + overviewSection.offsetHeight;
      const passedOverview = currentScrollY >= overviewBottom - 120;

      setShowNav(passedOverview && scrollingDown);
      lastScrollYRef.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (target: string) => {
    const section = document.getElementById(target);

    if (!section) return;

    window.history.replaceState(null, "", `#${target}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 top-0 z-[995] transition-all duration-300 ${
        showNav ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="border-b border-black/10 bg-white/96 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-md">
                <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="pointer-events-auto flex min-w-max items-center gap-2 sm:justify-center">
              {navItems.map((item) => (
                <button
                  key={item.target}
                  type="button"
                  onClick={() => handleScrollToSection(item.target)}
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
