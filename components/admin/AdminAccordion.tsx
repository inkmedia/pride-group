"use client";

import { useEffect, useState } from "react";

type Props = {
  number: string;
  title: string;
  sectionId?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

export default function AdminAccordion({
  number,
  title,
  sectionId,
  defaultOpen = false,
  children,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    if (!sectionId) return;

    function syncWithHash() {
      const currentHash = window.location.hash.replace("#", "");

      if (currentHash === sectionId) {
        setOpen(true);

        const el = document.getElementById(sectionId);
        if (el) {
          const stickyOffset = 140;
          const y =
            el.getBoundingClientRect().top + window.scrollY - stickyOffset;

          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
        }
      }
    }

    syncWithHash();
    window.addEventListener("hashchange", syncWithHash);

    return () => {
      window.removeEventListener("hashchange", syncWithHash);
    };
  }, [sectionId]);

  return (
    <section
      id={sectionId}
      className="scroll-mt-[140px] rounded-[20px] border border-black/10 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
      >
        <div>
          <p className="text-[11px] font-[700] uppercase tracking-[0.14em] text-black/45">
            Section {number}
          </p>
          <h2 className="mt-2 text-[20px] font-[600] text-black">{title}</h2>
        </div>

        <span
          className={`text-[22px] leading-none text-black/55 transition-transform duration-300 ${
            open ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </span>
      </button>

      {open ? (
        <div className="border-t border-black/10 p-5 sm:p-6">{children}</div>
      ) : null}
    </section>
  );
}
