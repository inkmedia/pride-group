import Image from "next/image";
import TransitionLink from "../common/TransitionLink";

export type PuneProjectCard = {
  title: string;
  subtitle: string;
  description: string;
  location: string;
  image: string;
  href: string;
};

type Props = {
  projects: PuneProjectCard[];
};

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
    </svg>
  );
}

export default function PuneProjects({ projects }: Props) {
  if (!projects.length) {
    return null;
  }

  return (
    <section className="bg-[#f8f8f8] py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="max-w-[760px]">
          <p className="text-[11px] font-[700] uppercase tracking-[0.22em] text-[#173363]/60">
            Projects in Pune
          </p>

          <h2 className="mt-3 text-[30px] leading-[1.15] text-[#10203b] sm:text-[38px] lg:text-[48px]">
            Crafted spaces that define modern living.
          </h2>

          <p className="mt-5 max-w-[620px] text-[15px] leading-[1.8] text-[#26344e]/75 sm:text-[16px]">
            Explore a curated collection of Pune developments designed with
            long-term value, thoughtful planning, and elevated living.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <TransitionLink
              key={project.href}
              href={project.href}
              className="group block h-full"
            >
              <article className="flex h-full flex-col overflow-hidden rounded-[12px] border border-[#173363]/10 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
                <div className="relative h-[320px] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-[700] uppercase tracking-[0.12em] text-[#173363]">
                    Pune
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div>
                    <div className="flex items-center gap-2 text-[#173363]/70">
                      <LocationIcon />
                      <p className="text-[12px] uppercase tracking-[0.12em]">
                        {project.location}
                      </p>
                    </div>

                    <h3 className="mt-3 text-[22px] font-[500] leading-[1.2] text-[#10203b]">
                      {project.title}
                    </h3>

                    <p className="mt-1 text-[12px] font-[600] uppercase tracking-[0.12em] navy">
                      {project.subtitle}
                    </p>

                    <p className="mt-4 mb-4 text-[14px] leading-[1.7] text-[#26344e]/75">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-[#173363]/10 pt-6">
                    <span className="text-[11px] uppercase tracking-[0.14em] text-[#173363]/40">
                      View Details
                    </span>

                    <span className="inline-flex items-center gap-2 text-[12px] font-[700] uppercase tracking-[0.12em] text-[#173363]">
                      Explore →
                    </span>
                  </div>
                </div>
              </article>
            </TransitionLink>
          ))}
        </div>

        <div className="mt-12 lg:mt-16">
          <div className="rounded-[14px] bg-[linear-gradient(135deg,#ffffff_0%,#f5f7fb_52%,#172f55_150%)] px-6 py-8 shadow-[0_16px_40px_rgba(0,0,0,0.05)] sm:px-8 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div className="max-w-[760px]">
              <p className="text-[11px] font-[700] uppercase tracking-[0.18em] text-[#173363]/55">
                Delivered Developments
              </p>

              <h3 className="mt-3 text-[26px] leading-[1.2] text-[#10203b] sm:text-[30px]">
                Explore our completed projects in Pune.
              </h3>

              <p className="mt-4 text-[15px] leading-[1.8] text-[#26344e]/75 sm:text-[16px]">
                View completed developments that reflect Pride Group’s delivered
                quality, design approach, and long-standing presence across
                Pune.
              </p>
            </div>

            <div className="mt-6 lg:mt-0 lg:shrink-0">
              <TransitionLink
                href="/completed-projects"
                className="inline-flex items-center justify-center rounded-full bg-[#173363] px-6 py-3 text-[12px] font-[700] uppercase tracking-[0.12em] text-white transition hover:bg-[#10284f]"
              >
                View Completed Projects
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
