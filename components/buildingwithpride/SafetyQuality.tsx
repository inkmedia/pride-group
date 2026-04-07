export default function SafetyQuality() {
  const tiles = [
    {
      icon: "event_available",
      title: (
        <>
          Timely <br /> completion
        </>
      ),
    },
    {
      icon: "verified",
      title: (
        <>
          Measurable quality
          <br />
          standards
        </>
      ),
    },
    {
      icon: "health_and_safety",
      title: (
        <>
          Safety and welfare
          <br />
          recognition
        </>
      ),
    },
    {
      icon: "monitoring",
      title: (
        <>
          Technology-enabled
          <br />
          monitoring & reporting
        </>
      ),
    },
  ];

  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 md:px-10 lg:px-16">
        <div className="max-w-[920px]">
          <h2 className="text-[28px] leading-tight text-[#222] sm:text-[34px] sm:text-[34px] lg:text-[42px]">
            Standards that stay on the ground
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#555] sm:text-base sm:leading-8">
            This section should frame safety and quality as on-ground
            discipline, not generic assurance language. The aim is to show that
            standards protect people, support build quality, and improve
            long-term performance.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 justify-items-start">
          {tiles.map((tile) => (
            <div
              key={tile.icon}
              className="flex items-center justify-center gap-4 text-left"
            >
              <span className="material-symbols-outlined shrink-0 text-[56px]! text-[#333]">
                {tile.icon}
              </span>

              <h3 className="text-[16px] font-medium leading-snug text-[#444] sm:text-[18px]">
                {tile.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
