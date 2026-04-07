import Image from "next/image";

export default function ProjectFloatingBadge() {
  return (
    <a
      href="/pride-world-city/"
      className="fixed bottom-5 right-3 z-[994] inline-flex flex-col items-center gap-2 rounded-[24px] border border-[#173363]/15 bg-white/96 px-4 py-4 text-center shadow-[0_14px_36px_rgba(0,0,0,0.12)] backdrop-blur-md transition hover:-translate-y-1 sm:right-4"
    >
      <Image
        src="/images/projects/wellington/PWC-Logo.png"
        alt="Pride World City"
        width={120}
        height={120}
        className="h-auto w-[150px]"
      />
    </a>
  );
}
