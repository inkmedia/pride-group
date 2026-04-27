"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

type RequestType = "Request Callback" | "Request Brochure";

export default function ProjectHero({ project }: any) {
  const [loaded, setLoaded] = useState(false);

  const [isModalMounted, setIsModalMounted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    requestType: "Request Callback" as RequestType,
  });

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isModalMounted) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isModalMounted]);

  const isVideo = project.hero?.type === "video";
  const isImage = project.hero?.type === "image";
  const isCarousel =
    project.hero?.type === "carousel" &&
    Array.isArray(project.hero?.images) &&
    project.hero.images.length > 0;

  const carouselImages: string[] = isCarousel ? project.hero.images : [];

  useEffect(() => {
    if (!isCarousel || carouselImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isCarousel, carouselImages.length]);

  const goToPrev = () => {
    if (!carouselImages.length) return;
    setCurrentSlide((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1,
    );
  };

  const goToNext = () => {
    if (!carouselImages.length) return;
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const heroRera = project.rera?.items?.[0];
  const reraWebsite = project.rera?.websiteUrl?.replace(/^https?:\/\//, "");

  const openModal = (type: RequestType) => {
    setFormData((prev) => ({
      ...prev,
      requestType: type,
    }));

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
    }, 300);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Form submitted:", formData);

    closeModal();

    setFormData({
      name: "",
      email: "",
      phone: "",
      requestType: "Request Callback",
    });
  };

  return (
    <>
      <section
        data-header="dark"
        className="relative h-[85vh] min-h-[500px] w-full overflow-hidden"
      >
        {/* MEDIA */}
        {isVideo ? (
          <video
            src={project.hero.src}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ease-out ${
              loaded ? "scale-100 opacity-100" : "scale-110 opacity-0"
            }`}
          />
        ) : isImage ? (
          <img
            src={project.hero.src}
            alt={project.title}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ease-out ${
              loaded ? "scale-100 opacity-100" : "scale-110 opacity-0"
            }`}
          />
        ) : isCarousel ? (
          <div className="absolute inset-0">
            {carouselImages.map((image: string, index: number) => (
              <img
                key={image}
                src={image}
                alt={`${project.title} banner ${index + 1}`}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-out ${
                  index === currentSlide
                    ? "scale-100 opacity-100"
                    : "scale-105 opacity-0"
                }`}
              />
            ))}

            {carouselImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goToPrev}
                  className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30"
                  aria-label="Previous slide"
                >
                  <span className="material-symbols-outlined">
                    chevron_left
                  </span>
                </button>

                <button
                  type="button"
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30"
                  aria-label="Next slide"
                >
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </button>

                <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                  {carouselImages.map((_: string, index: number) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      className={`h-2.5 rounded-full transition-all ${
                        index === currentSlide
                          ? "w-8 bg-white"
                          : "w-2.5 bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : null}

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/30" />

        {/* RERA BADGE */}
        {heroRera && (
          <div className="absolute right-3 top-24 z-20 sm:right-5 md:right-10 lg:right-10">
            <div className="flex items-center gap-3 rounded-[5px] bg-white/90 px-1 py-1 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:px-3 sm:py-2">
              <div className="min-w-0">
                <p className="text-[10px] font-[700] uppercase tracking-[0.08em] text-black/45">
                  MAHA RERA No.
                </p>
                <p className="mt-0.5 text-[14px] font-[700] leading-none text-[#1f2a44] sm:text-[15px]">
                  {heroRera.number}
                </p>
                {reraWebsite && (
                  <p className="mt-1 text-[11px] leading-none text-black/55 sm:text-[12px]">
                    {reraWebsite}
                  </p>
                )}
              </div>

              {heroRera.qrSrc && (
                <img
                  src={heroRera.qrSrc}
                  alt={`${project.title} RERA QR`}
                  className="h-10 w-10 rounded-[8px] object-cover sm:h-12 sm:w-12"
                />
              )}
            </div>
          </div>
        )}

        {/* CONTENT */}
        <div className="relative z-10 mx-auto flex justify-center mg:justify-start lg:justify-start h-full w-full max-w-[1400px] items-center px-5 sm:px-6 md:px-10 lg:px-16">
          <div
            className={`max-w-[650px] text-white transition-all duration-700 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {project.location && (
              <p className="mb-3 text-[12px] uppercase tracking-[0.18em] text-white">
                {project.location}
              </p>
            )}

            <h1 className="text-[36px] font-serif leading-[1.1] sm:text-[48px] md:text-[56px]">
              {project.hero.heading}
            </h1>

            <div className="mt-6 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => openModal("Request Callback")}
                className="cursor-pointer border border-white px-6 py-3 text-sm uppercase tracking-wide transition hover:bg-white hover:text-black"
              >
                Enquire Now
              </button>

              <button
                type="button"
                onClick={() => openModal("Request Brochure")}
                className="cursor-pointer text-sm underline underline-offset-4 transition hover:text-white/70"
              >
                View Brochure
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY SIDE BUTTONS */}
      <div className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        <button
          type="button"
          onClick={() => openModal("Request Callback")}
          className="group ml-auto flex h-12 w-12 cursor-pointer items-center overflow-hidden rounded-l-full bg-black text-white shadow-lg transition-all duration-300 ease-out hover:w-44"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">call</span>
          </span>
          <span className="whitespace-nowrap pr-4 text-sm font-medium opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">
            Enquire Now
          </span>
        </button>

        <button
          type="button"
          onClick={() => openModal("Request Brochure")}
          className="group ml-auto flex h-12 w-12 cursor-pointer items-center overflow-hidden rounded-l-full bg-white text-black shadow-lg transition-all duration-300 ease-out hover:w-48"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">
              description
            </span>
          </span>
          <span className="whitespace-nowrap pr-4 text-sm font-medium opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">
            Request Brochure
          </span>
        </button>
      </div>

      {/* MODAL */}
      {isModalMounted && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${
            isModalVisible ? "bg-black/60 opacity-100" : "bg-black/0 opacity-0"
          }`}
          onClick={closeModal}
        >
          <div
            className={`relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition-all duration-300 ease-out ${
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
              aria-label="Close form"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Get in touch
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-[#1f2a44]">
                {formData.requestType}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Fill in your details and our team will connect with you.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Select Option
                </label>
                <select
                  name="requestType"
                  value={formData.requestType}
                  onChange={handleChange}
                  className="w-full cursor-pointer rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
                >
                  <option value="Request Callback">Request Callback</option>
                  <option value="Request Brochure">Request Brochure</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1f2a44]"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
