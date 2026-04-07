"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Content", href: "/admin/content" },
  { label: "Media", href: "/admin/media" },
  { label: "Settings", href: "/admin/settings" },
];

const projectEditSectionLinks = [
  { id: "basic-info", label: "Basic Info" },
  { id: "seo", label: "SEO" },
  { id: "hero", label: "Hero" },
  { id: "overview", label: "Overview" },
  { id: "overview-arrays", label: "Overview Arrays" },
  { id: "features", label: "Features" },
  { id: "amenities", label: "Amenities" },
  { id: "specifications", label: "Specifications" },
  { id: "gallery-tabs", label: "Gallery" },
  { id: "connectivity", label: "Connectivity" },
  { id: "cta", label: "CTA" },
  { id: "rera", label: "RERA" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isProjectEditPage =
    pathname === "/admin/projects/new" ||
    /^\/admin\/projects\/[^/]+\/edit$/.test(pathname);

  return (
    <aside className="hidden w-[260px] shrink-0 self-start lg:block">
      <div className="fixed w-[260px] top-[76px] h-[calc(100vh-76px)] border-r border-black/10 bg-white">
        <div className="h-full overflow-y-auto p-5">
          <div className="rounded-2xl border border-black/10 bg-[#f8fafc] p-4">
            <p className="text-[11px] font-[700] uppercase tracking-[0.14em] text-black/45">
              Admin Panel
            </p>
          </div>

          <nav className="mt-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl px-3 py-2 text-[14px] font-[600] text-black/75 transition hover:bg-[#172f55] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {isProjectEditPage ? (
            <div className="mt-8 border-t border-black/10 pt-6">
              <p className="mb-3 px-1 text-[11px] font-[700] uppercase tracking-[0.14em] text-black/45">
                Edit Sections
              </p>

              <div className="space-y-2">
                {projectEditSectionLinks.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block rounded-xl px-3 py-2 text-[13px] font-[600] text-black/70 transition hover:bg-black hover:text-white"
                  >
                    {section.label}
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
