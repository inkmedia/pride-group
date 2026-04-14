import TransitionLink from "../common/TransitionLink";

export default function PrideCTA() {
  return (
    <section className="bg-white">
      <div className="mx-auto">
        <div className="relative overflow-hidden shadow-[0_20px_60px_rgba(16,37,68,0.12)]">
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="/images/Building-with-Pride-First-Image.jpg"
              alt="Pride CTA Background"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/35" />
          </div>

          {/* Content */}
          <div className="relative flex min-h-[500px] items-center justify-center px-6 py-12 text-center sm:px-10 lg:min-h-[500px]">
            <div className="max-w-4xl">
              <h2 className="text-[30px] mb-10 font-[500] leading-[1.2] text-white sm:text-[38px] lg:text-[42px]">
                Experience the Pride of Living in Pune
              </h2>
              <TransitionLink
                href="/pride-world-city"
                className="cursor-pointer rounded-full bg-[#172f55] px-7 py-3 text-[13px] font-[700] uppercase tracking-[0.12em] text-white transition hover:opacity-90"
              >
                Visit Pride World City
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
