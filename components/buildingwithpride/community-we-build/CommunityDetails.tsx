import Image from "next/image";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  body: string;
  align?: "left" | "center";
};

function SectionHeader({
  eyebrow,
  title,
  body,
  align = "left",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <div className={alignment}>
      <p className="text-[12px] font-[700] uppercase tracking-[0.18em] text-[#ef9e64]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-[32px] leading-[1.15] text-[#10203b]">
        {title}
      </h2>
      <p className="mt-4 mx-auto max-w-[860px] text-[15px] leading-[1.9] text-[#26344e]/78">
        {body}
      </p>
    </div>
  );
}

const celebrations = [
  "/images/celebrations/Gudi-Padwa.jpg",
  "/images/celebrations/Holi.jpg",
  "/images/celebrations/Christmas-Celebration.jpg",
  "/images/celebrations/Yoga-Day.jpg",
  "/images/celebrations/Tomatina.jpg",
];

export default function CommunityDetails() {
  return (
    <section
      id="community-we-build"
      className="bg-[#f8f8f8] py-10 sm:py-10 lg:py-10"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(360px,0.96fr)] lg:items-stretch">
          <div className="rounded-[10px] border border-[#ddd5c8] bg-white p-5 shadow-[0_18px_44px_rgba(15,31,58,0.06)] sm:p-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {celebrations.slice(0, 5).map((src, index) => (
                <div
                  key={src}
                  className={`relative overflow-hidden rounded-[10px] ${
                    index === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={src}
                    alt="Community celebration"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[10px] border border-[#ddd5c8] bg-[#173363] p-6 text-white shadow-[0_18px_44px_rgba(15,31,58,0.08)] sm:p-8">
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="text-[12px] font-[700] uppercase tracking-[0.18em] text-[#ef9e64]">
                  Events, festivals, shared life
                </p>
                <h3 className="mt-3 text-[30px] leading-[1.12]">
                  Cosmo communities need spaces and moments to connect.
                </h3>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  "Festivals that help a diverse community celebrate together",
                  "Spaces like Club Charholi, Town Plaza, and open grounds that keep social life visible",
                  "Events, marathons, shopping pop-ups, farmers markets, and match screenings that activate the township beyond static infrastructure",
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
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[10px] border border-[#ddd5c8] bg-white shadow-[0_18px_44px_rgba(15,31,58,0.06)]">
          <div className="relative overflow-hidden">
            <Image
              src="/images/Team-Hero.png"
              alt="Maintenance, security, and front desk support"
              width={1000}
              height={413}
              sizes="100vw"
              className="block h-[500px] w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10203b]/58 via-[#10203b]/10 to-transparent" />
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-[12px] font-[700] uppercase tracking-[0.18em] text-[#ef9e64]">
              Maintenance task force
            </p>
            <h3 className="mt-3 text-[30px] leading-[1.12] text-[#10203b]">
              Everyday support should feel visible, capable, and fast.
            </h3>
            <p className="mt-5 max-w-[940px] text-[15px] leading-[1.9] text-[#26344e]/78">
              The people behind resident support matter just as much as the
              physical infrastructure. Security, facility management, front-desk
              assistance, and issue resolution systems help turn a large
              development into a dependable living environment.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  value: "48 hrs",
                  label: "Queries resolved within the target window",
                },
                { value: "24/7", label: "Security presence and monitoring" },
                {
                  value: "Daily",
                  label: "Common-area upkeep and escalation review",
                },
                { value: "On-call", label: "Resident support coordination" },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[10px] bg-[#f8f5ef] px-4 py-4"
                >
                  <div className="text-[22px] leading-none text-[#173363]">
                    {metric.value}
                  </div>
                  <div className="mt-2 text-[12px] font-[700] uppercase tracking-[0.12em] text-[#26344e]/62">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
