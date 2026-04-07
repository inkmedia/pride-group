import Image from "next/image";
import type { Project } from "@/types/project";

export default function ProjectOverview({ project }: { project: Project }) {
  const overview = project.overview;
  const heroImageSrc =
    project.hero.type === "image" || project.hero.type === "video"
      ? project.hero.src
      : project.hero.images?.[0] || "";

  const imageSrc =
    overview.imageSrc || heroImageSrc || "/images/Wellington.png";

  return (
    <section
      id="overview"
      className="scroll-mt-36 bg-white py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_430px] xl:gap-10">
          <div>
            <div className="grid gap-6 xl:grid-cols-[170px_minmax(0,1fr)] xl:gap-8">
              {overview.logoSrc ? (
                <div className="flex items-center border border-gray-200 rounded justify-center">
                  <Image
                    src={overview.logoSrc}
                    alt={`${project.title} logo`}
                    width={150}
                    height={150}
                    className="h-auto w-[110px] sm:w-[130px] xl:w-[150px]"
                  />
                </div>
              ) : (
                <div />
              )}

              <div>
                <div className="text-[14px] text-black/65 sm:text-[15px]">
                  <span>{overview.category}</span>
                  <span className="mx-1.5">{">"}</span>
                  <span className="text-[#173363]">{overview.status}</span>
                </div>

                <h2 className="mt-2 text-[34px] font-[500] leading-none text-black sm:text-[42px]">
                  {project.title}
                </h2>

                <p className="mt-3 text-[18px] font-[500] leading-snug text-black/80 sm:text-[22px]">
                  {overview.subtitle}
                </p>

                <p className="mt-2 text-[16px] text-black/70 sm:text-[18px]">
                  {overview.location}
                </p>
              </div>
            </div>

            <p className="mt-8 max-w-[1100px] text-[17px] leading-[1.9] text-black/70 sm:text-[18px]">
              {overview.description}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {overview.stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[18px] border border-[#e7dac0] bg-transparent px-5 py-5 sm:px-6 sm:py-6"
                >
                  <div className="text-[22px] font-[400] leading-none text-[#173363] sm:text-[26px]">
                    {item.value}
                  </div>
                  <div className="mt-2 text-[16px] text-black/75 sm:text-[18px]">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="text-[34px] font-[500] leading-none text-black sm:text-[42px]">
                Key Highlights
              </h3>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {overview.highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-[12px] bg-[#eceae6] px-4 py-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#173363] text-[14px] text-[#173363]">
                      ✓
                    </span>
                    <span className="text-[16px] leading-snug text-black/80 sm:text-[17px]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="mt-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-[34px] font-[500] leading-none text-black sm:text-[42px]">
                    Amenities
                  </h3>
                </div>

                <a
                  href="#amenities"
                  className="inline-flex items-center justify-center rounded-full border border-[#173363] px-5 py-3 text-[13px] font-[700] uppercase tracking-[0.08em] text-[#173363] transition hover:bg-[#173363] hover:text-white"
                >
                  View All
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {overview.amenities.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-[10px] bg-[#d9d9d9] px-4 py-2 text-[15px] font-[500] text-black/80"
                  >
                    <span className="text-[#173363]">★</span>
                    {item}
                  </span>
                ))}
              </div>
            </div> */}
          </div>

          <div className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
            <div className="relative overflow-visible rounded-[22px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
              <div className="overflow-hidden rounded-[22px]">
                <Image
                  src={imageSrc}
                  alt={overview.imageAlt || project.title}
                  width={900}
                  height={700}
                  className="h-[280px] w-full object-cover sm:h-[340px] lg:h-[300px] xl:h-[340px]"
                />
              </div>

              {overview.mediaBadges?.map((badge, index) => {
                const isTopRight = badge.position === "top-right";
                const isBottomLeft = badge.position === "bottom-left";

                return (
                  <div
                    key={`${badge.label}-${index}`}
                    className={`absolute rounded-[12px] px-4 py-4 text-center text-white shadow-lg ${
                      isTopRight
                        ? "right-[-14px] top-[-20px] bg-black/80"
                        : isBottomLeft
                          ? "bottom-[-20px] left-[-14px] bg-[#173363]"
                          : "right-4 top-4 bg-black/80"
                    }`}
                  >
                    <div className="text-[24px] font-[600] leading-none">
                      {badge.value}
                    </div>
                    <div className="mt-1 text-[12px] uppercase tracking-[0.08em]">
                      {badge.label}
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              id="contact-us"
              className="scroll-mt-36 rounded-[10px] border border-black/10 bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:p-6"
            >
              <h3 className="text-[22px] font-[500] text-black sm:text-[26px]">
                Enquiry Form
              </h3>

              <form className="mt-5 grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Name"
                  className="h-[54px] rounded-[10px] border border-black/20 px-4 text-[15px] outline-none transition focus:border-black"
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="h-[54px] rounded-[10px] border border-black/20 px-4 text-[15px] outline-none transition focus:border-black"
                />

                <input
                  type="tel"
                  placeholder="Contact No."
                  className="h-[54px] rounded-[10px] border border-black/20 px-4 text-[15px] outline-none transition focus:border-black "
                />

                <input
                  type="message"
                  placeholder="Message"
                  className="h-[54px] rounded-[10px] border border-black/20 px-4 text-[15px] outline-none transition focus:border-black"
                />

                <select
                  defaultValue=""
                  className="h-[54px] rounded-[10px] border border-black/20 bg-white px-4 text-[15px] text-black/70 outline-none transition focus:border-black sm:col-span-2"
                >
                  <option value="" disabled>
                    Select Configuration
                  </option>
                  <option value="3 BHK">3 BHK</option>
                </select>

                <button
                  type="submit"
                  className="h-[52px] rounded-[10px] bg-[#173363] text-[18px] font-[500] text-white transition hover:opacity-90 sm:col-span-2"
                >
                  Submit Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
