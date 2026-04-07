"use client";

import { useEffect, useState } from "react";

const jobs = [
  {
    title: "Sales Manager",
    shortDescription:
      "Drive residential sales, client relationships and site visit conversions.",
    location: "Pune",
    experience: "5+ Years",
    qualification: "MBA / Graduate in Sales, Marketing or related field",
    fullDescription:
      "We are looking for a result-oriented Sales Manager to lead project sales, generate qualified leads, manage channel partners, and ensure strong customer engagement from inquiry to closure. The role requires a strong understanding of the real estate market, negotiation skills, and the ability to build lasting client relationships.",
    responsibilities: [
      "Manage end-to-end sales for assigned projects.",
      "Handle customer meetings, site visits and follow-ups.",
      "Build and maintain broker and channel partner relationships.",
      "Achieve monthly and quarterly sales targets.",
    ],
  },
  {
    title: "Architect",
    shortDescription:
      "Support design planning with a focus on quality, functionality and coordination.",
    location: "Pune",
    experience: "3+ Years",
    qualification: "B.Arch / M.Arch",
    fullDescription:
      "We are seeking a creative and detail-oriented Architect to contribute to residential and mixed-use developments. The role involves concept development, design coordination, consultant management, and ensuring alignment with project timelines and brand standards.",
    responsibilities: [
      "Develop architectural concepts and detailed design inputs.",
      "Coordinate with consultants and execution teams.",
      "Review drawings, materials and design quality.",
      "Ensure compliance with project and regulatory requirements.",
    ],
  },
  {
    title: "HR Executive",
    shortDescription:
      "Support hiring, employee engagement and people operations across teams.",
    location: "Pune",
    experience: "2+ Years",
    qualification: "MBA / PGDM in Human Resources",
    fullDescription:
      "We are looking for an HR Executive who can support recruitment, onboarding, employee engagement initiatives, and day-to-day HR coordination. The ideal candidate should be organized, people-focused, and comfortable working in a fast-paced environment.",
    responsibilities: [
      "Assist in talent acquisition and onboarding processes.",
      "Coordinate employee records and HR documentation.",
      "Support employee engagement initiatives.",
      "Work closely with teams on HR operations and communication.",
    ],
  },
  {
    title: "Project Engineer",
    shortDescription:
      "Oversee execution quality, coordination and on-site project delivery.",
    location: "Pune",
    experience: "4+ Years",
    qualification: "B.E. / B.Tech in Civil Engineering",
    fullDescription:
      "We are hiring a Project Engineer to support execution and monitoring of construction activities on site. The role includes vendor coordination, quality supervision, reporting, and ensuring work is completed as per approved plans and timelines.",
    responsibilities: [
      "Monitor daily site execution and progress.",
      "Coordinate with contractors, consultants and vendors.",
      "Ensure construction quality and safety compliance.",
      "Maintain reports, measurements and project updates.",
    ],
  },
];

export default function JobOpenings() {
  const [openIndex, setOpenIndex] = useState<number | null>(-1);
  const [applyOpen, setApplyOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const openApplyModal = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setApplyOpen(true);
  };

  const closeApplyModal = () => {
    setApplyOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = applyOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [applyOpen]);

  return (
    <>
      <section className="bg-white px-5 py-12 sm:px-8 sm:py-14 md:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8 max-w-[760px] sm:mb-10">
            <p className="mb-3 text-[11px] font-[700] uppercase text-[#172f55] sm:text-[12px]">
              Careers
            </p>

            <h2 className="text-[30px] font-[500] leading-[1.08] text-[#1f3f6b] sm:text-[36px] lg:text-[36px]">
              Job Openings
            </h2>

            <p className="mt-4 max-w-[680px] text-[15px] leading-[1.85] text-black/65 sm:text-[16px]">
              Explore current opportunities to grow with Pride Group and
              contribute to projects built with long-term vision and purpose.
            </p>
          </div>

          <div className="space-y-4">
            {jobs.map((job, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={job.title}
                  className="overflow-hidden rounded-[14px] border border-black/8 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    className="flex w-full cursor-pointer items-start justify-between gap-4 px-5 py-5 text-left transition hover:bg-black/[0.02] sm:px-6 sm:py-6"
                  >
                    <div>
                      <h3 className="text-[22px] font-[500] leading-[1.2] text-[#1f3f6b] sm:text-[24px]">
                        {job.title}
                      </h3>

                      <p className="mt-2 max-w-[760px] text-[14px] leading-[1.75] text-black/60 sm:text-[15px]">
                        {job.shortDescription}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full bg-[#f3f5f8] px-3 py-1.5 text-[12px] font-[600] text-[#1f3f6b]">
                          {job.location}
                        </span>
                        <span className="rounded-full bg-[#f3f5f8] px-3 py-1.5 text-[12px] font-[600] text-[#1f3f6b]">
                          {job.experience}
                        </span>
                      </div>
                    </div>

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#1f3f6b]/15 text-[22px] text-[#1f3f6b]">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-black/8 px-5 py-5 sm:px-6 sm:py-6">
                        <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
                          <div className="space-y-4">
                            <div>
                              <p className="text-[11px] font-[700] uppercase tracking-[0.16em] text-black/45">
                                Qualification
                              </p>
                              <p className="mt-2 text-[14px] leading-[1.75] text-black/70 sm:text-[15px]">
                                {job.qualification}
                              </p>
                            </div>

                            <div>
                              <p className="text-[11px] font-[700] uppercase tracking-[0.16em] text-black/45">
                                Experience
                              </p>
                              <p className="mt-2 text-[14px] leading-[1.75] text-black/70 sm:text-[15px]">
                                {job.experience}
                              </p>
                            </div>
                          </div>

                          <div>
                            <div>
                              <p className="text-[11px] font-[700] uppercase tracking-[0.16em] text-black/45">
                                Role Overview
                              </p>
                              <p className="mt-2 text-[14px] leading-[1.85] text-black/70 sm:text-[15px]">
                                {job.fullDescription}
                              </p>
                            </div>

                            <div className="mt-5">
                              <p className="text-[11px] font-[700] uppercase tracking-[0.16em] text-black/45">
                                Key Responsibilities
                              </p>

                              <ul className="mt-3 space-y-2">
                                {job.responsibilities.map((item) => (
                                  <li
                                    key={item}
                                    className="flex items-start gap-3 text-[14px] leading-[1.75] text-black/70 sm:text-[15px]"
                                  >
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1f3f6b]" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="mt-6">
                              <button
                                type="button"
                                onClick={() => openApplyModal(job.title)}
                                className="cursor-pointer rounded-full bg-[#1f3f6b] px-5 py-3 text-[12px] font-[700] uppercase tracking-[0.12em] text-white transition hover:opacity-90"
                              >
                                Apply Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* APPLY MODAL OVERLAY */}
      <button
        type="button"
        aria-label="Close apply form"
        onClick={closeApplyModal}
        className={`fixed inset-0 z-[100] bg-black/45 backdrop-blur-sm transition-opacity duration-300 ${
          applyOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* APPLY MODAL */}
      <div
        className={`fixed left-1/2 top-1/2 z-[101] w-[92%] max-w-[640px] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          applyOpen
            ? "visible scale-100 opacity-100"
            : "invisible scale-95 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-[18px] border border-black/10 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
          <div className="flex items-start justify-between gap-4 border-b border-black/8 px-5 py-5 sm:px-6">
            <div>
              <p className="text-[11px] font-[700] uppercase tracking-[0.18em] text-[#1f3f6b]/60">
                Careers
              </p>
              <h3 className="mt-2 text-[26px] font-[500] leading-none text-[#1f3f6b] sm:text-[30px]">
                Apply Now
              </h3>
              <p className="mt-2 text-[14px] leading-[1.7] text-black/60 sm:text-[15px]">
                Submit your details for{" "}
                <span className="font-[600] text-[#1f3f6b]">{selectedJob}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={closeApplyModal}
              className="cursor-pointer text-[26px] leading-none text-black/45 transition hover:text-black"
            >
              ✕
            </button>
          </div>

          <div className="px-5 py-5 sm:px-6 sm:py-6">
            <form className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[12px] font-[700] uppercase tracking-[0.08em] text-black/60">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="h-[52px] w-full rounded-[10px] border border-black/15 px-4 text-[15px] outline-none transition focus:border-[#1f3f6b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[12px] font-[700] uppercase tracking-[0.08em] text-black/60">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-[52px] w-full rounded-[10px] border border-black/15 px-4 text-[15px] outline-none transition focus:border-[#1f3f6b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[12px] font-[700] uppercase tracking-[0.08em] text-black/60">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="h-[52px] w-full rounded-[10px] border border-black/15 px-4 text-[15px] outline-none transition focus:border-[#1f3f6b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[12px] font-[700] uppercase tracking-[0.08em] text-black/60">
                  Applying For
                </label>
                <input
                  type="text"
                  value={selectedJob}
                  readOnly
                  className="h-[52px] w-full rounded-[10px] border border-black/15 bg-[#f7f8fa] px-4 text-[15px] text-black/70 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-[12px] font-[700] uppercase tracking-[0.08em] text-black/60">
                  Resume
                </label>
                <input
                  type="file"
                  className="block w-full rounded-[10px] border border-black/15 px-4 py-3 text-[15px] text-black/70 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-[#1f3f6b] file:px-4 file:py-2 file:text-[12px] file:font-[700] file:uppercase file:tracking-[0.08em] file:text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-[10px] bg-[#1f3f6b] px-5 py-3 text-[14px] font-[700] uppercase tracking-[0.12em] text-white transition hover:opacity-90"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
