import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";

const puneProjects = [
  { label: "Soho", href: "/projects/soho" },
  { label: "Miami", href: "/projects" },
  { label: "Montreal", href: "/projects" },
  { label: "Park Ivory", href: "/projects" },
];

export default function ProjectActionRera({ project }: { project: Project }) {
  const rera = project.rera;

  return (
    <>
      {rera?.items?.length ? (
        <section
          id="rera"
          className="scroll-mt-36 bg-white py-14 sm:py-16 lg:py-20"
        >
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            {(rera.note || rera.websiteUrl) && (
              <div className="mx-auto flex max-w-[900px] flex-wrap items-center justify-center gap-2 text-center text-[16px] leading-[1.7] text-black/70 sm:text-[18px]">
                {rera.note && <span>{rera.note}</span>}
                {rera.websiteUrl && (
                  <a
                    href={rera.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#173363] transition hover:opacity-80"
                  >
                    {rera.websiteUrl}
                  </a>
                )}
              </div>
            )}

            <div className="mx-auto mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:hidden">
              {rera.items.map((item) => (
                <div
                  key={`${item.title}-${item.number}`}
                  className="flex min-h-[240px] w-[210px] shrink-0 snap-center flex-col items-center rounded-[14px] border border-black/10 bg-white px-5 py-5 text-center shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex h-[110px] w-[110px] items-center justify-center overflow-hidden rounded-[8px] bg-white">
                    <Image
                      src={item.qrSrc}
                      alt={`${item.title} RERA QR`}
                      width={110}
                      height={110}
                      className="h-[110px] w-[110px] object-contain"
                    />
                  </div>

                  <h3 className="mt-5 text-[14px] font-[600] leading-none text-black">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[12px] text-black/60 sm:text-[16px]">
                    MahaRERA No.
                  </p>

                  <p className="mt-1 break-words text-[16px] font-[500] leading-snug text-black/80">
                    {item.number}
                  </p>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-10 hidden grid-cols-[repeat(auto-fit,minmax(210px,210px))] justify-center gap-6 sm:grid">
              {rera.items.map((item) => (
                <div
                  key={`${item.title}-${item.number}`}
                  className="flex min-h-[240px] w-[210px] flex-col items-center rounded-[14px] border border-black/10 bg-white px-5 py-5 text-center shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex h-[110px] w-[110px] items-center justify-center overflow-hidden rounded-[8px] bg-white">
                    <Image
                      src={item.qrSrc}
                      alt={`${item.title} RERA QR`}
                      width={110}
                      height={110}
                      className="h-[110px] w-[110px] object-contain"
                    />
                  </div>

                  <h3 className="mt-5 text-[14px] font-[600] leading-none text-black">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[12px] text-black/60 sm:text-[16px]">
                    MahaRERA No.
                  </p>

                  <p className="mt-1 break-words text-[16px] font-[500] leading-snug text-black/80">
                    {item.number}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-y border-[#dfddd8] bg-[#17335F]">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center justify-between gap-6 px-5 py-10 text-center sm:px-6 sm:py-12 md:px-10 lg:flex-row lg:px-20 lg:py-14 lg:text-left">
          <div className="max-w-[760px]">
            <p className="text-[22px] leading-snug text-white sm:text-[24px] lg:text-[28px]">
              Explore Our Other Ongoing Projects in Pune:
            </p>
          </div>

          <div className="flex w-full flex-wrap items-center justify-center gap-3 lg:w-auto lg:justify-end">
            {puneProjects.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex min-w-[150px] items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm tracking-wide text-white transition duration-300 hover:bg-white hover:text-[#17335F]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
