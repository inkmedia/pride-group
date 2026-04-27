"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import TransitionLink from "../common/TransitionLink";

/* ---------------- TYPES ---------------- */

type SubNavItem = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href: string;
  subItems?: SubNavItem[];
};

type MenuGridItem = {
  title: string;
  desc: string;
  href: string;
};

type ProjectItem = {
  title: string;
  subtitle: string;
  description: string;
  location: string;
  image: string;
  href: string;
};

type City = {
  key: string;
  name: string;
  description: string;
  cta: string;
  ctaHref: string;
  cardBgImage: string;
  projects: ProjectItem[];
};

/* ---------------- NAV ---------------- */

const navItems: NavItem[] = [
  { label: "THE GROUP", href: "/about" },
  {
    label: "BUILDING WITH PRIDE",
    href: "/building-with-pride",
  },
  { label: "Projects", href: "/projects" },
];

const menuItems: MenuGridItem[] = [
  {
    title: "Our Team",
    desc: "Meet the talented individuals behind our success and innovation.",
    href: "/our-team",
  },
  {
    title: "Awards & Recognition",
    desc: "Explore Awards, accolades and industry recognition received by Pride Group.",
    href: "/awards",
  },
  {
    title: "Completed Projects",
    desc: "Discover our portfolio of completed projects.",
    href: "/completed-projects",
  },
  {
    title: "Partner With Us",
    desc: "Collaboration opportunities for businesses and builders.",
    href: "#",
  },
  {
    title: "Media Centre",
    desc: "Discover Pride news, press releases and visual stories.",
    href: "#",
  },
  {
    title: "Careers",
    desc: "Join our team and shape the future of real estate.",
    href: "/careers",
  },
  {
    title: "Contact Us",
    desc: "Get in touch for inquiries, support or feedback.",
    href: "/contact",
  },
];

/* ---------------- PROJECT DATA ---------------- */

const cityData: City[] = [
  {
    key: "pune",
    name: "Pune",
    description:
      "Where Pride’s journey took shape, and where it continues at its most ambitious scale.",
    cta: "Explore Projects in Pune",
    ctaHref: "/pune",
    cardBgImage: "/images/Pune.jpg",
    projects: [
      {
        title: "Wellington",
        subtitle: "2 & 3 BHK Apartments",
        description:
          "Wellington presents an extraordinary lifestyle with world-class amenities and superior craftsmanship at Pride World City Charholi.",
        location: "Pride World City, Charholi",
        image: "/images/projects/Wellington.png",
        href: "/projects/wellington",
      },
      {
        title: "Soho",
        subtitle: "2, 2.5 BHK Flats",
        description:
          "SOHO is a well-thought-out new cluster in Pride World City built with the idea of equality at Pride World City Charholi.",
        location: "Pride World City, Charholi",
        image: "/images/projects/soho.jpg",
        href: "/projects/soho",
      },
      {
        title: "Miami",
        subtitle: "2,3 & 4.5 BHK Flats",
        description:
          "Welcome to Miami, where every moment is picture-perfect, and every corner is designed for a life of elegance, comfort, and style at Pride World City Charholi.",
        location: "Pride World City, Charholi",
        image: "/images/projects/miami.jpg",
        href: "#",
      },
      {
        title: "Montreal",
        subtitle: "2 & 4 BHK Duplex",
        description:
          "Designed to elevate lifestyles and inspire ambition, it blends luxury, convenience, and sustainability into a self-sustaining ecosystem at Pride World City Charholi.",
        location: "Pride World City, Charholi",
        image: "/images/projects/montreal.jpg",
        href: "#",
      },
    ],
  },
  {
    key: "bangalore",
    name: "Bangalore",
    description:
      "In a fast-evolving city, we create homes designed for lasting value.",
    cta: "Explore Projects in Bangalore",
    ctaHref: "/bangalore",
    cardBgImage: "/images/Bangalore.jpg",
    projects: [
      {
        title: "Pride Cross Winds",
        subtitle: "Villa Plots starting from 2400sq.ft",
        description:
          "Spread over 25 acres of pristine land, Pride Crosswinds Villa Plots Phase II offers you the best of both worlds.",
        location: "Bannerghatta-Jigani Road, Bangalore",
        image: "/images/projects/pride-crosswinds.jpg",
        href: "#",
      },
      {
        title: "Pride Sunrise",
        subtitle: "1 & 2 BHK Smart Homes",
        description:
          "Pride Sunrise is a combination of visual delight with thoughtful touches that optimize space bringing alive the concept of smart homes brilliantly.",
        location: "Bannerghatta-Jigani Road, Bangalore",
        image: "/images/projects/pride-sunrise.jpg",
        href: "#",
      },
      {
        title: "Pride Altius",
        subtitle: "3 BHK Premium Lifestyle Homes",
        description:
          "We believe in something, only then we can translate into reality a bold & modern architectural icon combined with the best in living.",
        location: "Tumkur Road, Bangalore West",
        image: "/images/projects/pride-altius.jpg",
        href: "#",
      },
    ],
  },
  {
    key: "mumbai",
    name: "Mumbai",
    description:
      "In a city that values conviction, we build with clarity and discipline.",
    cta: "Explore Projects in Mumbai",
    ctaHref: "/mumbai",
    cardBgImage: "/images/Mumbai.png",
    projects: [
      {
        title: "Park Royale",
        subtitle: "2 & 3 BHK Apartments",
        description:
          "Park Royale comes loaded with attributes and amenities that add charm to your way of life and makes living an experience you will relish day after day, minute after minute at Marol.",
        location: "Andheri East, Mumbai",
        image: "/images/projects/park-royale.jpg",
        href: "/projects/park-royale",
      },
    ],
  },
];

/* ---------------- COMPONENT ---------------- */

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const isHomePage = pathname === "/";
  const isProjectPage = pathname?.startsWith("/projects/") ?? false;

  const [scrolled, setScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [enquireOpen, setEnquireOpen] = useState(false);

  const [projectsMegaOpen, setProjectsMegaOpen] = useState(false);
  const [activeCityKey, setActiveCityKey] = useState<string>(cityData[0].key);
  const [hoveredProject, setHoveredProject] = useState<ProjectItem | null>(
    cityData[0].projects[0] ?? null,
  );
  const [previewImage, setPreviewImage] = useState<string>(
    cityData[0].projects[0]?.image || cityData[0].cardBgImage,
  );
  const [previewMeta, setPreviewMeta] = useState<{
    title: string;
    subtitle: string;
    location: string;
  }>({
    title: cityData[0].projects[0]?.title || cityData[0].name,
    subtitle: cityData[0].projects[0]?.subtitle || cityData[0].description,
    location: cityData[0].projects[0]?.location || "",
  });
  const [previewVisible, setPreviewVisible] = useState(true);

  const getDefaultMobileOpenCities = () => ({
    [cityData[0].key]: true,
  });

  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [mobileActiveCityKey, setMobileActiveCityKey] = useState<string>(
    cityData[0].key,
  );
  const [mobileOpenCities, setMobileOpenCities] = useState<
    Record<string, boolean>
  >(getDefaultMobileOpenCities());

  const resetMobileProjectsMenu = () => {
    setMobileProjectsOpen(false);
    setMobileActiveCityKey(cityData[0].key);
    setMobileOpenCities(getDefaultMobileOpenCities());
  };

  const closeAllMenus = () => {
    setMenuOpen(false);
    setProjectsMegaOpen(false);
    setEnquireOpen(false);
    resetMobileProjectsMenu();
  };

  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollYRef = useRef(0);
  const lockScrollYRef = useRef(0);
  const skipRestoreRef = useRef(false);

  const activeCity =
    cityData.find((city) => city.key === activeCityKey) ?? cityData[0];

  const clearBodyScrollLock = () => {
    document.documentElement.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
  };

  const setPreviewFromProject = (project: ProjectItem | null, city: City) => {
    const nextImage = project?.image || city.cardBgImage;
    const nextMeta = {
      title: project?.title || city.name,
      subtitle: project?.subtitle || city.description,
      location: project?.location || "",
    };

    if (
      previewImage === nextImage &&
      previewMeta.title === nextMeta.title &&
      previewMeta.subtitle === nextMeta.subtitle &&
      previewMeta.location === nextMeta.location
    ) {
      return;
    }

    setPreviewVisible(false);

    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);

    fadeTimeoutRef.current = setTimeout(() => {
      setPreviewImage(nextImage);
      setPreviewMeta(nextMeta);
      setPreviewVisible(true);
    }, 160);
  };

  /* ---------- RESET ON ROUTE CHANGE ---------- */
  useEffect(() => {
    skipRestoreRef.current = true;

    setMenuOpen(false);
    setEnquireOpen(false);
    setProjectsMegaOpen(false);
    resetMobileProjectsMenu();

    clearBodyScrollLock();
    window.scrollTo(0, 0);
  }, [pathname]);

  /* ---------- HOME PAGE HEADER STATE ---------- */
  useEffect(() => {
    if (isHomePage) {
      setShowHeader(true);
    }
  }, [isHomePage]);

  /* ---------- SYNC CITY SELECTOR WITH CURRENT ROUTE ---------- */
  useEffect(() => {
    if (pathname === "/pune") {
      setSelectedCity("Pune");
    } else if (pathname === "/mumbai") {
      setSelectedCity("Mumbai");
    } else if (pathname === "/bangalore") {
      setSelectedCity("Bangalore");
    } else {
      setSelectedCity("");
    }
  }, [pathname]);

  /* ---------- PREVIEW IMAGE SYNC ---------- */
  useEffect(() => {
    setPreviewFromProject(hoveredProject, activeCity);

    return () => {
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredProject, activeCityKey]);

  /* ---------- SCROLL ---------- */
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const last = lastScrollYRef.current;

      if (Math.abs(current - last) < 10) return;

      setScrolled(current > 80);

      if (!isHomePage) {
        if (current < 50) {
          setShowHeader(true);
        } else if (current > last) {
          setShowHeader(false);
        } else {
          setShowHeader(true);
        }
      } else {
        setShowHeader(true);
      }

      lastScrollYRef.current = current;
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  /* ---------- AUTO HEADER THEME ---------- */
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-header]");

    if (!sections.length) {
      setDarkMode(false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries.find((entry) => entry.isIntersecting);
        const mode = activeEntry?.target
          ? (activeEntry.target as HTMLElement).getAttribute("data-header")
          : null;

        setDarkMode(mode === "dark");
      },
      {
        threshold: 0.6,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

  /* ---------- LOCK SCROLL FOR MENU + ENQUIRE ---------- */
  useEffect(() => {
    const shouldLockScroll = menuOpen || enquireOpen;

    if (!shouldLockScroll) {
      return;
    }

    skipRestoreRef.current = false;
    lockScrollYRef.current = window.scrollY;

    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${lockScrollYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      clearBodyScrollLock();

      if (!skipRestoreRef.current) {
        window.scrollTo(0, lockScrollYRef.current);
      }

      skipRestoreRef.current = false;
    };
  }, [menuOpen, enquireOpen]);

  const textColor = darkMode && !scrolled ? "text-white" : "text-black";
  const lineColor = darkMode && !scrolled ? "bg-white" : "bg-black";

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className={`fixed left-0 top-0 z-[999] w-full transition-all duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        } ${
          scrolled ? "bg-white/85 backdrop-blur-lg shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[2048px] items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 lg:px-10">
          <TransitionLink href="/" className="shrink-0">
            <Image
              src="/images/logo.png"
              alt="Pride Logo"
              width={90}
              height={90}
              className="h-auto w-[56px] sm:w-[64px] lg:w-[72px]"
              priority
            />
          </TransitionLink>

          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
            <nav className="hidden items-center gap-10 lg:flex xl:gap-10">
              {navItems.map((item) => {
                const isProjects = item.label === "Projects";

                if (isProjects) {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => {
                        setProjectsMegaOpen(true);
                        const firstCity = cityData[0];
                        setActiveCityKey(firstCity.key);
                        setHoveredProject(firstCity.projects[0] ?? null);
                      }}
                      onMouseLeave={() => {
                        setProjectsMegaOpen(false);
                      }}
                    >
                      <button
                        type="button"
                        className={`inline-flex cursor-pointer items-center gap-1.5 text-[11px] font-[700] uppercase tracking-[0.06em] transition hover:opacity-80 xl:text-[12px] ${textColor}`}
                      >
                        {item.label}
                        <span className="material-symbols-outlined text-[18px] leading-none">
                          keyboard_arrow_down
                        </span>
                      </button>

                      <div
                        className={`absolute right-0 top-full z-[100] pt-4 transition-all duration-300 xl:right-[-60px] ${
                          projectsMegaOpen
                            ? "pointer-events-auto visible translate-y-0 opacity-100"
                            : "pointer-events-none invisible translate-y-2 opacity-0"
                        }`}
                        style={{
                          width: "min(1080px, calc(100vw - 24px))",
                        }}
                      >
                        <ProjectsMegaMenu
                          cityData={cityData}
                          activeCity={activeCity}
                          activeCityKey={activeCityKey}
                          previewImage={previewImage}
                          previewMeta={previewMeta}
                          previewVisible={previewVisible}
                          setActiveCityKey={setActiveCityKey}
                          setHoveredProject={setHoveredProject}
                        />
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={item.label} className="group relative">
                    <TransitionLink
                      href={item.href}
                      className={`inline-flex items-center gap-2 text-[12px] font-[700] uppercase tracking-[0.08em] transition hover:opacity-80 xl:text-[13px] ${textColor}`}
                    >
                      {item.label}
                      {item.subItems?.length ? (
                        <span className="material-symbols-outlined text-[18px] leading-none">
                          keyboard_arrow_down
                        </span>
                      ) : null}
                    </TransitionLink>

                    {item.subItems?.length ? (
                      <div className="pointer-events-none absolute left-0 top-full z-50 pt-4 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
                        <div className="min-w-[240px] rounded-[10px] border border-[#e7dfd2] bg-white p-2 shadow-[0_16px_40px_rgba(16,32,59,0.10)]">
                          {item.subItems.map((subItem) => (
                            <TransitionLink
                              key={subItem.label}
                              href={subItem.href}
                              className="block rounded-[10px] px-4 py-3 text-[11px] font-[700] uppercase tracking-[0.08em] text-[#10203b] transition hover:bg-[#f8f5ef]"
                            >
                              {subItem.label}
                            </TransitionLink>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>

            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => {
                  const city = e.target.value;
                  setSelectedCity(city);

                  const citySlugMap: Record<string, string> = {
                    Pune: "pune",
                    Mumbai: "mumbai",
                    Bangalore: "bangalore",
                  };

                  const slug = citySlugMap[city];

                  if (slug) {
                    router.push(`/${slug}`);
                  }
                }}
                className={`cursor-pointer appearance-none rounded-full border px-3 py-1.5 pr-8 text-[10px] font-[700] uppercase tracking-[0.06em] outline-none transition xl:text-[11px] ${
                  darkMode && !scrolled
                    ? "border-white/50 bg-white/10 text-white"
                    : "border-black/20 bg-white/70 text-black"
                }`}
              >
                <option value="" disabled hidden>
                  Select City
                </option>
                <option value="Pune" className="text-black">
                  Pune
                </option>
                <option value="Mumbai" className="text-black">
                  Mumbai
                </option>
                <option value="Bangalore" className="text-black">
                  Bangalore
                </option>
              </select>
              <span
                className={`material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] ${
                  darkMode && !scrolled ? "text-white" : "text-black"
                }`}
              >
                keyboard_arrow_down
              </span>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex cursor-pointer flex-col gap-1 p-1.5"
              aria-label="Open menu"
            >
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`block h-[2px] w-[24px] rounded-full sm:w-[30px] lg:w-[34px] ${lineColor}`}
                />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* ================= MENU OVERLAY ================= */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-[999] cursor-pointer bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* ================= MENU DRAWER ================= */}
      <aside
        className={`fixed right-0 top-0 z-[1000] flex h-[100dvh] w-full flex-col overflow-hidden bg-black/90 text-white transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] sm:w-[86%] md:w-[68%] lg:w-[54%] xl:w-[46%] ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full min-h-0 flex-col">
          <div className="shrink-0 flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-10 lg:py-8">
            <TransitionLink href="/" onClick={closeAllMenus}>
              <Image
                src="/images/logo.png"
                alt="Pride Logo"
                width={70}
                height={70}
                className="h-auto w-[58px] opacity-90 sm:w-[64px] lg:w-[70px]"
              />
            </TransitionLink>

            <div className="flex items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer text-2xl text-white/70 transition duration-300 hover:text-[#f8f8f8]"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
          </div>

          <div
            data-lenis-prevent
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
          >
            {/* Mobile nav + projects accordion */}
            <div className="border-t border-white/10 px-5 py-5 sm:px-8 lg:hidden">
              <nav className="grid gap-4">
                {navItems.map((item, index) => {
                  const isProjects = item.label === "Projects";

                  if (isProjects) {
                    return (
                      <div
                        key={item.label}
                        className={`overflow-hidden rounded-[10px] border border-white/10 bg-white/[0.04] transform transition-all duration-500 ease-out ${
                          menuOpen
                            ? "translate-y-0 opacity-100"
                            : "translate-y-4 opacity-0"
                        }`}
                        style={{
                          transitionDelay: menuOpen
                            ? `${80 + index * 70}ms`
                            : "0ms",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setMobileProjectsOpen((prev) => !prev)}
                          className="flex w-full items-center justify-between px-4 py-4 text-left"
                        >
                          <span className="text-[13px] font-[700] uppercase tracking-[0.08em] text-white/90">
                            {item.label}
                          </span>
                          <span
                            className={`material-symbols-outlined text-[20px] text-white/80 transition-transform duration-300 ${
                              mobileProjectsOpen ? "rotate-180" : ""
                            }`}
                          >
                            keyboard_arrow_down
                          </span>
                        </button>

                        <div
                          className={`grid transition-all duration-300 ${
                            mobileProjectsOpen
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="border-t border-white/10 px-4 py-4">
                              <div className="space-y-3">
                                {cityData.map((city) => {
                                  const isCityOpen =
                                    !!mobileOpenCities[city.key];
                                  const isCityActive =
                                    mobileActiveCityKey === city.key;

                                  return (
                                    <div
                                      key={city.key}
                                      className="overflow-hidden rounded-[10px] border border-white/10 bg-white/[0.03]"
                                    >
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setMobileActiveCityKey(city.key);
                                          setMobileOpenCities((prev) => ({
                                            ...prev,
                                            [city.key]: !prev[city.key],
                                          }));
                                        }}
                                        className="flex w-full items-center justify-between px-4 py-4 text-left"
                                      >
                                        <div>
                                          <p
                                            className={`text-[13px] font-[700] uppercase tracking-[0.08em] ${
                                              isCityActive
                                                ? "text-white"
                                                : "text-white/85"
                                            }`}
                                          >
                                            {city.name}
                                          </p>
                                          <p className="mt-1 text-[12px] leading-5 text-white/55">
                                            {city.projects.length} Projects
                                          </p>
                                        </div>

                                        <span
                                          className={`material-symbols-outlined text-[20px] text-white/75 transition-transform duration-300 ${
                                            isCityOpen ? "rotate-180" : ""
                                          }`}
                                        >
                                          keyboard_arrow_down
                                        </span>
                                      </button>

                                      <div
                                        className={`grid transition-all duration-300 ${
                                          isCityOpen
                                            ? "grid-rows-[1fr] opacity-100"
                                            : "grid-rows-[0fr] opacity-0"
                                        }`}
                                      >
                                        <div className="overflow-hidden">
                                          <div className="border-t border-white/10 px-4 pb-4 pt-3">
                                            <div className="mb-4 overflow-hidden rounded-[10px]">
                                              <div className="relative h-[180px] w-full">
                                                <Image
                                                  src={city.cardBgImage}
                                                  alt={city.name}
                                                  fill
                                                  className="object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                                                <div className="absolute inset-x-0 bottom-0 p-4">
                                                  <p className="text-[11px] font-[700] uppercase tracking-[0.12em] text-white/70">
                                                    {city.name}
                                                  </p>
                                                  <p className="mt-2 text-[12px] leading-5 text-white/80">
                                                    {city.description}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>

                                            <div className="grid gap-2">
                                              {city.projects.map((project) => (
                                                <TransitionLink
                                                  key={project.title}
                                                  href={project.href}
                                                  onClick={closeAllMenus}
                                                  className="rounded-[10px] border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:bg-white/[0.06]"
                                                >
                                                  <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                      <h4 className="text-[13px] font-[700] uppercase tracking-[0.04em] text-white">
                                                        {project.title}
                                                      </h4>
                                                      <p className="mt-1 text-[12px] text-[#d8b07b]">
                                                        {project.subtitle}
                                                      </p>
                                                      <p className="mt-2 text-[12px] leading-5 text-white/55">
                                                        {project.location}
                                                      </p>
                                                    </div>
                                                    <span className="material-symbols-outlined text-[18px] text-white/70">
                                                      north_east
                                                    </span>
                                                  </div>
                                                </TransitionLink>
                                              ))}
                                            </div>

                                            <TransitionLink
                                              href={city.ctaHref}
                                              onClick={closeAllMenus}
                                              className="mt-4 inline-flex rounded-full border border-white/20 px-4 py-2 text-[11px] font-[700] uppercase tracking-[0.08em] text-white transition hover:bg-white hover:text-black"
                                            >
                                              View All {city.name}
                                            </TransitionLink>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}

                                <TransitionLink
                                  href="/completed-projects"
                                  onClick={closeAllMenus}
                                  className="flex items-center justify-between rounded-[10px] border border-white/10 bg-white/[0.03] px-4 py-4 transition hover:bg-white/[0.06]"
                                >
                                  <div>
                                    <p className="text-[13px] font-[700] uppercase tracking-[0.08em] text-white/90">
                                      Completed Projects
                                    </p>
                                    <p className="mt-1 text-[12px] text-white/55">
                                      Explore our completed portfolio
                                    </p>
                                  </div>
                                  <span className="material-symbols-outlined text-[18px] text-white/70">
                                    north_east
                                  </span>
                                </TransitionLink>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={item.label}
                      className={`grid gap-2 transform transition-all duration-500 ease-out ${
                        menuOpen
                          ? "translate-y-0 opacity-100"
                          : "translate-y-4 opacity-0"
                      }`}
                      style={{
                        transitionDelay: menuOpen
                          ? `${80 + index * 70}ms`
                          : "0ms",
                      }}
                    >
                      <TransitionLink
                        href={item.href}
                        onClick={closeAllMenus}
                        className="text-[13px] font-[700] uppercase tracking-[0.08em] text-white/90 transition duration-300 hover:text-white"
                      >
                        {item.label}
                      </TransitionLink>

                      {item.subItems?.length ? (
                        <div className="ml-4 grid gap-2 border-l border-white/15 pl-4">
                          {item.subItems.map((subItem) => (
                            <TransitionLink
                              key={subItem.label}
                              href={subItem.href}
                              onClick={closeAllMenus}
                              className="text-[11px] font-[600] uppercase tracking-[0.08em] text-white/65 transition duration-300 hover:text-white"
                            >
                              {subItem.label}
                            </TransitionLink>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Main menu items */}
            <div className="px-5 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-8 lg:px-10 lg:pb-12 lg:pt-10">
              <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2 md:gap-y-8">
                {menuItems.map((item, index) => (
                  <MenuItem
                    key={item.title}
                    title={item.title}
                    desc={item.desc}
                    href={item.href}
                    index={index}
                    menuOpen={menuOpen}
                    onClick={closeAllMenus}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="shrink-0 border-t border-white/10 px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-[12px] uppercase text-white/70">
                Follow Us
              </span>

              <div className="flex flex-wrap gap-4 text-white">
                <a href="#">facebook</a>
                <a href="#">instagram</a>
                <a href="#">twitter</a>
                <a href="#">linkedin</a>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ================= ENQUIRE NOW STICKY BUTTON ================= */}
      {!isProjectPage && (
        <>
          <button
            type="button"
            onClick={() => setEnquireOpen(true)}
            className={`fixed right-0 top-1/2 z-[998] -translate-y-1/2 cursor-pointer rounded-l-xl bg-[#172f55] px-5 py-3 text-[11px] font-[700] uppercase tracking-[0.12em] text-white shadow-lg transition-all duration-300 sm:text-[12px] [writing-mode:vertical-rl] ${
              enquireOpen
                ? "translate-x-full opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            Enquire Now
          </button>

          <button
            type="button"
            aria-label="Close enquiry form"
            onClick={() => setEnquireOpen(false)}
            className={`fixed inset-0 z-[1001] cursor-pointer bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
              enquireOpen ? "visible opacity-100" : "invisible opacity-0"
            }`}
          />

          <aside
            className={`fixed right-0 top-0 z-[1002] h-full w-full max-w-[420px] overflow-y-auto bg-white text-black shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
              enquireOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex min-h-full flex-col">
              <div className="flex items-center justify-between border-b border-black/10 px-5 py-5 sm:px-6">
                <div>
                  <p className="text-[11px] font-[700] uppercase tracking-[0.12em] text-black/50">
                    Get in touch
                  </p>
                  <h2 className="mt-1 text-[24px] font-[500] sm:text-[28px]">
                    Enquire Now
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setEnquireOpen(false)}
                  className="cursor-pointer text-2xl text-black/60 transition hover:text-black"
                  aria-label="Close enquiry form"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 px-5 py-6 sm:px-6">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="grid gap-4"
                >
                  <div>
                    <label className="mb-2 block text-[12px] font-[700] uppercase tracking-[0.08em] text-black/70">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-black/15 px-4 py-3 text-[14px] outline-none transition focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[12px] font-[700] uppercase tracking-[0.08em] text-black/70">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      className="w-full rounded-xl border border-black/15 px-4 py-3 text-[14px] outline-none transition focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[12px] font-[700] uppercase tracking-[0.08em] text-black/70">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full rounded-xl border border-black/15 px-4 py-3 text-[14px] outline-none transition focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[12px] font-[700] uppercase tracking-[0.08em] text-black/70">
                      City
                    </label>
                    <select
                      name="city"
                      className="w-full rounded-xl border border-black/15 px-4 py-3 text-[14px] outline-none transition focus:border-black"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select City
                      </option>
                      <option value="Pune">Pune</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bangalore">Bangalore</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-[12px] font-[700] uppercase tracking-[0.08em] text-black/70">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Tell us about your requirement"
                      className="w-full rounded-xl border border-black/15 px-4 py-3 text-[14px] outline-none transition focus:border-black"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 cursor-pointer rounded-full bg-[#172f55] px-6 py-3 text-[12px] font-[700] uppercase tracking-[0.08em] text-white transition hover:opacity-90"
                  >
                    Submit Enquiry
                  </button>
                </form>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}

/* ---------------- PROJECTS MEGA MENU ---------------- */

type ProjectsMegaMenuProps = {
  cityData: City[];
  activeCity: City;
  activeCityKey: string;
  previewImage: string;
  previewMeta: {
    title: string;
    subtitle: string;
    location: string;
  };
  previewVisible: boolean;
  setActiveCityKey: (key: string) => void;
  setHoveredProject: (project: ProjectItem | null) => void;
};

function ProjectsMegaMenu({
  cityData,
  activeCity,
  activeCityKey,
  previewImage,
  previewMeta,
  previewVisible,
  setActiveCityKey,
  setHoveredProject,
}: ProjectsMegaMenuProps) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#e8dfd2] bg-white shadow-[0_24px_60px_rgba(16,32,59,0.12)]">
      <div className="grid grid-cols-[180px_minmax(0,1fr)] xl:grid-cols-[205px_minmax(0,1fr)_500px]">
        {/* Column 1 */}
        <div className="border-r border-[#eee7dc] bg-[#f8f8f8] p-4 xl:p-5">
          <p className="mb-3 text-[9px] font-[700] uppercase tracking-[0.14em] text-[#172f77]">
            Cities
          </p>

          <div className="space-y-1.5">
            {cityData.map((city) => {
              const isActive = city.key === activeCityKey;

              return (
                <button
                  key={city.key}
                  type="button"
                  onMouseEnter={() => {
                    setActiveCityKey(city.key);
                    setHoveredProject(city.projects[0] ?? null);
                  }}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-[10px] px-3 py-2.5 text-left transition ${
                    isActive
                      ? "bg-[#10203b] text-white shadow-[0_8px_24px_rgba(16,32,59,0.12)]"
                      : "text-[#10203b] hover:bg-white"
                  }`}
                >
                  <span className="text-[13px] font-[600]">{city.name}</span>
                  <span className="material-symbols-outlined text-[14px]!">
                    arrow_outward
                  </span>
                </button>
              );
            })}

            <TransitionLink
              href="/completed-projects"
              className="flex items-center justify-between rounded-[10px] px-3 py-2.5 text-left text-[#10203b] transition hover:bg-white"
            >
              <span className="text-[13px] font-[600]">Completed Projects</span>
              <span className="material-symbols-outlined text-[14px]!">
                arrow_outward
              </span>
            </TransitionLink>
          </div>
        </div>

        {/* Column 2 */}
        <div className="p-4 xl:p-5">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[9px] font-[700] uppercase tracking-[0.14em] text-[#172f77]">
                Upcoming Projects
              </p>
              <h3 className="mt-1.5 text-[20px] font-[500] text-[#10203b] xl:text-[22px]">
                {activeCity.name}
              </h3>
              <p className="mt-1.5 max-w-[440px] text-[12px] leading-5 text-[#5f6b7a]">
                {activeCity.description}
              </p>
            </div>

            <TransitionLink
              href={activeCity.ctaHref}
              className="shrink-0 rounded-full border border-[#d8cdbc] px-3 py-1.5 text-[10px] font-[700] uppercase tracking-[0.06em] text-[#10203b] transition hover:bg-[#10203b] hover:text-white"
            >
              View All
            </TransitionLink>
          </div>

          <div className="grid gap-1.5">
            {activeCity.projects.map((project) => (
              <TransitionLink
                key={project.title}
                href={project.href}
                onMouseEnter={() => setHoveredProject(project)}
                className="group rounded-[10px] border border-transparent px-3 py-3 transition hover:border-[#ece4d8] hover:bg-[#f8f8f8]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="text-[15px] font-[600] text-[#10203b]">
                      {project.title}
                    </h4>
                    <p className="mt-0.5 text-[11px] font-[600] uppercase tracking-[0.04em] text-[#172f77]/80">
                      {project.subtitle}
                    </p>
                    <p className="mt-1.5 text-[12px] leading-5 text-[#627081]">
                      {project.location}
                    </p>
                  </div>

                  <span className="material-symbols-outlined mt-0.5 shrink-0 text-[16px] text-[#10203b] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    north_east
                  </span>
                </div>
              </TransitionLink>
            ))}
          </div>
        </div>

        {/* Column 3 */}
        <div className="hidden border-l border-[#eee7dc] bg-[#f8f5ef] xl:block">
          <div className="relative h-full min-h-[320px] overflow-hidden ">
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${
                previewVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={previewImage}
                alt={previewMeta.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            </div>

            <div className="absolute inset-x-0 bottom-6 left-6 z-10 p-4 text-white">
              <p className="text-[9px] font-[700] uppercase tracking-[0.14em] text-white/70">
                Preview
              </p>

              <h4
                className={`mt-2 text-[20px] font-[500] leading-tight transition-all duration-300 ${
                  previewVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
              >
                {previewMeta.title}
              </h4>

              <p
                className={`mt-1.5 text-[12px] leading-5 text-white/85 transition-all delay-75 duration-300 ${
                  previewVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
              >
                {previewMeta.subtitle}
              </p>

              <p
                className={`mt-2 text-[11px] text-white/70 transition-all delay-100 duration-300 ${
                  previewVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
              >
                {previewMeta.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- MENU ITEM ---------------- */

function MenuItem({
  title,
  desc,
  href,
  index,
  menuOpen,
  onClick,
}: {
  title: string;
  desc: string;
  href: string;
  index: number;
  menuOpen: boolean;
  onClick?: () => void;
}) {
  return (
    <TransitionLink
      href={href}
      onClick={onClick}
      className={`group block transform transition-all duration-500 ease-out ${
        menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{
        transitionDelay: menuOpen ? `${120 + index * 70}ms` : "0ms",
      }}
    >
      <h3 className="text-[20px] transition duration-300 hover:text-white/70 sm:text-[24px]">
        {title}
      </h3>
      <p className="mt-2 text-sm text-white/60 transition group-hover:text-white/70">
        {desc}
      </p>
    </TransitionLink>
  );
}
