import Image from "next/image";

const labourImages = [
  "/images/Labout-1.jpg",
  "/images/Labout-2.jpg",
  "/images/Labout-3.jpg",
  "/images/Labout-4.jpg",
];

const gharpanImages = [
  "/images/Gharpan-1.jpg",
  "/images/Gharpan-2.jpg",
  "/images/Gharpan-3.jpg",
  "/images/Gharpan-4.jpg",
];

function SectionHeader({
  title,
  body,
  eyebrow,
  align = "left",
}: {
  title: string;
  body?: string;
  eyebrow?: string;
  align?: "left" | "center";
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  const width = align === "center" ? "max-w-[880px]" : "max-w-[760px]";

  return (
    <div className={`${alignment} ${width}`}>
      {eyebrow ? (
        <p className="text-[12px] font-[700] uppercase tracking-[0.18em] text-[#ef9e64]">
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={`${eyebrow ? "mt-3" : ""} text-[28px] leading-[1.12] text-[#10203b] sm:text-[34px] lg:text-[40px]`}
      >
        {title}
      </h2>

      {body ? (
        <p className="mt-5 text-[15px] leading-[1.9] text-[#26344e]/78 sm:text-[17px]">
          {body}
        </p>
      ) : null}
    </div>
  );
}

export default function CsrDetails() {
  return (
    <section
      id="responsibility-to-give-back"
      className="bg-[#f8f8f8] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow="SECTION TITLE"
          title="Responsibility to give back"
          body="Responsibility needs to be visible both inside the construction ecosystem and beyond it. That includes labour welfare, long-standing social initiatives, and partnerships that strengthen dignity, safety, and resilience in the wider community."
        />

        <div className="mt-12 space-y-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="rounded-[10px] border border-[#ddd5c8] bg-[#173363] p-6 text-white shadow-[0_18px_44px_rgba(15,31,58,0.08)] sm:p-8">
              <p className="text-[12px] font-[700] uppercase tracking-[0.18em] text-[#ef9e64]">
                Labour Welfare
              </p>
              <h3 className="mt-3 text-[30px] leading-[1.12]">
                Going above baseline welfare expectations.
              </h3>
              <p className="mt-5 text-[15px] leading-[1.9] text-white/80">
                Labour welfare includes camp conditions, facilities, training,
                awareness, and support systems that go beyond minimum site
                requirements. The effort is to improve daily living conditions
                for the people who help build every project.
              </p>

              <div className="mt-8 grid gap-3">
                {[
                  "Improved camp infrastructure and hygiene support",
                  "Extra initiatives around awareness, care, and worker well-being",
                  "Training-led safety and welfare culture carried onto sites",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[10px] bg-white/8 px-4 py-3 text-[14px] leading-[1.75] text-white/84"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {labourImages.map((src) => (
                <div
                  key={src}
                  className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-[#ddd5c8]"
                >
                  <Image
                    src={src}
                    alt="Labour welfare initiative"
                    fill
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
            <div className="grid gap-4 sm:grid-cols-2">
              {gharpanImages.map((src) => (
                <div
                  key={src}
                  className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-[#ddd5c8]"
                >
                  <Image
                    src={src}
                    alt="Gharpan Foundation initiative"
                    fill
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center rounded-[10px] border border-[#ddd5c8] bg-white p-6 sm:p-8">
              <div className="w-full text-center">
                <p className="text-[12px] font-[700] uppercase tracking-[0.18em] text-[#ef9e64]">
                  Gharpan Foundation
                </p>
                <h3 className="mt-3 text-[30px] leading-[1.12] text-[#10203b]">
                  A care-led extension of the group’s social commitment.
                </h3>
                <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-[1.9] text-[#26344e]/78">
                  Gharpan reflects the idea that responsibility should extend
                  beyond the boundary wall of a project. It brings together
                  care, outreach, and structured giving in ways that are more
                  sustained than one-time gestures, with support that feels
                  patient, local, and continuous over time.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(260px,0.34fr)_minmax(0,0.66fr)]">
            <div className="rounded-[10px] border border-[#ddd5c8] bg-white p-6 shadow-[0_18px_44px_rgba(15,31,58,0.06)] sm:p-8">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <Image
                  src="/images/Mudita-Logo.webp"
                  alt="Mudita Foundation logo"
                  width={220}
                  height={160}
                  className="h-auto w-auto max-w-[180px] object-contain"
                />
                <p className="mt-5 text-[12px] font-[700] uppercase tracking-[0.18em] text-[#ef9e64]">
                  CSR Partner
                </p>
              </div>
            </div>

            <div className="rounded-[10px] border border-[#ddd5c8] bg-[#10203b] p-6 text-white shadow-[0_18px_44px_rgba(15,31,58,0.08)] sm:p-8">
              <p className="text-[12px] font-[700] uppercase tracking-[0.18em] text-[#ef9e64]">
                Mudita Foundation
              </p>
              <h3 className="mt-3 text-[30px] leading-[1.12]">
                Safety, dignity, and resilient communities.
              </h3>
              <p className="mt-5 text-[15px] leading-[1.9] text-white/80">
                Mudita Foundation’s work is centered on building resilient
                individuals and communities that can identify, prevent, and
                respond to abuse, violence, and exploitation. That focus on
                safety, dignity, and collective responsibility aligns strongly
                with how we think about responsible growth beyond construction.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Community resilience and safety awareness",
                  "Prevention-led support and response orientation",
                  "Work rooted in dignity, choice, and collective responsibility",
                  "A meaningful CSR extension of the wider Pride ecosystem",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[10px] bg-white/8 px-4 py-3 text-[14px] leading-[1.75] text-white/84"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <a
                href="https://muditafoundation.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex rounded-full border border-white/22 px-5 py-3 text-[13px] font-[700] uppercase tracking-[0.08em] text-white transition hover:bg-white/8"
              >
                Visit Mudita Foundation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
