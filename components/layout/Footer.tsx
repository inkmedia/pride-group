"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type ChangeEvent,
  type ReactNode,
  type FormEvent,
  useMemo,
  useState,
} from "react";

const quickLinks = [
  { label: "About Pride Group", href: "#" },
  { label: "Cities", href: "#" },
  { label: "Media & Awards", href: "#" },
  { label: "Careers", href: "#" },
];

const footerTypologies = [
  "2 BHK Apartments",
  "3 BHK Apartments",
  "4 BHK Premium Homes",
  "Duplex Residences",
  "Villa Plots",
  "Township Living",
  "Luxury Residences",
  "Family-Centric Homes",
  "Ready-to-Move Homes",
  "Ongoing Developments",
];

const footerQuickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Building With Pride", href: "/buildingwithpride" },
  { label: "Awards", href: "/awards" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const footerProjects = [
  { label: "Pride World City", href: "/pride-world-city" },
  {
    label: "Wellington",
    href: "/projects/pune/wellington",
  },
  { label: "Miami", href: "/pride-world-city" },
  { label: "Montreal", href: "/pride-world-city" },
  {
    label: "Park Royale",
    href: "/projects/mumbai/park-royale",
  },
  { label: "Pride Crosswinds", href: "/projects" },
  { label: "Pride Sunrise", href: "/projects" },
  { label: "Pride Altius", href: "/projects" },
];

const fieldClass =
  "mt-2 w-full border-b border-b-2 border-[#1f3d72] bg-transparent pb-2 text-s outline-none placeholder:text-[#6b7280]";

const cityProjects: Record<string, string[]> = {
  Pune: ["Wellington", "SoHo", "Miami", "Boston", "Montreal"],
  Mumbai: ["Park Royale"],
  Bangalore: ["Park Euphora"],
};

const projectLocations: Record<string, { label: string; backend: string }> = {
  Wellington: { label: "Pride World City, Charholi", backend: "Charholi" },
  SoHo: { label: "Pride World City, Charholi", backend: "Charholi" },
  Miami: { label: "Pride World City, Charholi", backend: "Charholi" },
  Boston: { label: "Pride World City, Charholi", backend: "Charholi" },
  Montreal: { label: "Pride World City, Charholi", backend: "Charholi" },
  "Park Royale": { label: "Andheri East", backend: "Andheri East" },
  "Park Euphora": { label: "Old Madras Road", backend: "Old Madras Road" },
};

const officeData = [
  {
    title: "PUNE OFFICE",
    address: [
      "Pride House, 5th Floor,",
      "108, Ganeshkhind Road, Near Pune University, Pune – 411016",
    ],
    phones: ["8055538000", "020 - 67091000"],
    email: "pune@pridegroup.net",
    mapLink: "https://share.google/3G0yWCjm5eiHenCK8",
  },
  {
    title: "BANGALORE OFFICE",
    address: [
      "Pride Hulkul, 901, 9th Floor,",
      "No.116 Lalbagh Road,",
      "Bangalore – 560027",
    ],
    phones: ["080 2222 2424", "080 2222 2424"],
    email: "bangalore@pridegroup.net",
    mapLink: "https://share.google/ZVrvhNs8rZhBFeQsP",
  },
  {
    title: "MUMBAI OFFICE",
    address: [
      "601, Orbit Plaza,",
      "New Prabhadevi Road,",
      "Prabhadevi, Mumbai – 400 025",
    ],
    phones: ["022 2421 8129", "022 2421 8130"],
    email: "mumbai@pridegroup.net",
    mapLink: "https://share.google/pqmXFiuWIYjW60ISs",
  },
  {
    title: "PRIDE WORLD CITY, PUNE",
    address: ["Pride World City, Charholi Bk, Pune - 411081"],
    phones: ["+91 80555 46000"],
    email: "digital@prideworldcity.com",
    mapLink: "https://share.google/trmz8G3qv0jmquaKU",
  },
];

type FooterFormState = {
  name: string;
  isd: string;
  phone: string;
  email: string;
  city: string;
  project: string;
  message: string;
};

const initialForm: FooterFormState = {
  name: "",
  isd: "91",
  phone: "",
  email: "",
  city: "",
  project: "",
  message: "",
};

export default function Footer() {
  const pathname = usePathname();
  const [form, setForm] = useState<FooterFormState>(initialForm);
  const [openOffice, setOpenOffice] = useState<number>(-1);
  const [footerExpanded, setFooterExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const hideEnquirySection =
    pathname?.startsWith("/projects/") ||
    pathname?.startsWith("/careers") ||
    pathname?.startsWith("/pune") ||
    pathname?.startsWith("/contact") ||
    false;

  const projects = useMemo(() => {
    return form.city ? (cityProjects[form.city] ?? []) : [];
  }, [form.city]);

  const selectedLocation = form.project ? projectLocations[form.project] : null;

  function handleFieldChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "city" ? { project: "" } : {}),
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    const name = form.name.trim();
    const isd = form.isd.replace(/\D/g, "");
    const phone = form.phone.replace(/\D/g, "");
    const city = form.city.trim();
    const project = form.project.trim();
    const location = selectedLocation?.backend ?? "";

    if (!name) {
      setSubmitError("Name is required.");
      return;
    }

    if (!isd) {
      setSubmitError("Country code is required.");
      return;
    }

    if (!phone) {
      setSubmitError("Phone number is required.");
      return;
    }

    if (!city) {
      setSubmitError("City is required.");
      return;
    }

    if (!project) {
      setSubmitError("Project is required.");
      return;
    }

    if (!location) {
      setSubmitError("Location is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const pageUrl =
        typeof window !== "undefined"
          ? `${window.location.host}${window.location.pathname}`
          : pathname?.replace(/^\//, "") ?? "";

      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          isd,
          phone,
          email: form.email.trim(),
          city,
          project,
          location,
          message: form.message.trim(),
          pageUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to submit enquiry.");
      }

      setSubmitSuccess("Enquiry submitted successfully.");
      setForm(initialForm);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to submit enquiry.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <footer className="w-full">
      {!hideEnquirySection && (
        <section className="bg-[#f3f3f3]">
          <div className="mx-auto px-5 py-10 sm:px-8 sm:py-12 md:px-10 lg:px-14 lg:py-[60px]">
            <h2 className="text-[32px] leading-[1.15] text-[#364166] sm:text-[30px]">
              Enquire Now
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.6fr)] lg:items-start lg:gap-[56px]">
              <div>
                <p className="text-[16px] font-semibold uppercase tracking-[0.04em] text-black">
                  Let’s Start the Conversation
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:mt-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8"
                >
                  <Input
                    label="Name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleFieldChange}
                    required
                  />

                  <div>
                    <label className="text-s text-[#1f1f1f]">Number</label>
                    <div className="mt-2 grid grid-cols-[84px_minmax(0,1fr)] gap-4">
                      <input
                        name="isd"
                        type="text"
                        inputMode="numeric"
                        value={form.isd}
                        onChange={handleFieldChange}
                        required
                        className={fieldClass.replace('mt-2 ', '')}
                      />
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleFieldChange}
                        required
                        className={fieldClass.replace('mt-2 ', '')}
                      />
                    </div>
                  </div>

                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleFieldChange}
                  />

                  <div>
                    <label className="text-s text-[#1f1f1f]">City</label>
                    <select
                      name="city"
                      className={`${fieldClass} pb-3`}
                      value={form.city}
                      onChange={handleFieldChange}
                      required
                    >
                      <option value="">--select--</option>
                      <option value="Pune">Pune</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bangalore">Bangalore</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-s text-[#1f1f1f]">Project</label>
                    <select
                      name="project"
                      className={`${fieldClass} pb-3`}
                      value={form.project}
                      onChange={handleFieldChange}
                      required
                      disabled={!form.city}
                    >
                      <option value="">--select project--</option>
                      {projects.map((project) => (
                        <option key={`${form.city}-${project}`} value={project}>
                          {project}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-s text-[#1f1f1f]">Location</label>
                    <input
                      type="text"
                      value={selectedLocation?.label ?? ""}
                      readOnly
                      className={`${fieldClass} cursor-default text-[#1f1f1f]/75`}
                    />
                  </div>

                  <div className="md:col-span-2 lg:col-span-3">
                    <label className="text-s text-[#1f1f1f]">Message</label>
                    <textarea
                      name="message"
                      rows={1}
                      className={fieldClass}
                      value={form.message}
                      onChange={handleFieldChange}
                    />
                  </div>

                  <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-h-[22px] text-[13px] leading-[1.6]">
                      {submitError ? (
                        <p className="text-[#b42318]">{submitError}</p>
                      ) : null}
                      {submitSuccess ? (
                        <p className="text-[#0f7a42]">{submitSuccess}</p>
                      ) : null}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex h-11 cursor-pointer items-center justify-center rounded-full bg-[#173566] px-7 text-[12px] font-[700] uppercase tracking-[0.14em] text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                    </button>
                  </div>
                </form>
              </div>

              <div>
                <h2 className="text-[32px] leading-[1.15] text-[#364166] sm:text-[30px]">
                  Reach Us
                </h2>
                <p className="mt-6 text-[16px] font-semibold uppercase tracking-[0.04em] text-black">
                  Our Offices
                </p>

                <div className="mt-4 border-[#d9d9d9]">
                  {officeData.map((office, index) => {
                    const isOpen = openOffice === index;

                    return (
                      <div
                        key={office.title}
                        className="border-b border-[#d9d9d9]"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenOffice(isOpen ? -1 : index)}
                          className="flex w-full cursor-pointer items-center justify-between py-4 text-left transition"
                        >
                          <span className="pr-4 text-[14px] font-semibold uppercase text-[#173566] sm:text-[14px]">
                            {office.title}
                          </span>

                          <span className="text-[22px] leading-none text-[#173566]">
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>

                        <div
                          className={`grid transition-all duration-300 ease-in-out ${
                            isOpen
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="pb-5">
                              <div className="space-y-2 text-[14px] leading-[1.75] text-[#333] sm:text-[15px]">
                                <div>
                                  <p className="font-medium text-[#173566]">
                                    Address
                                  </p>
                                  <p className="mt-1">
                                    {office.address.map((line, i) => (
                                      <span key={i}>
                                        {line}
                                        <br />
                                      </span>
                                    ))}
                                  </p>
                                </div>

                                <div>
                                  <p className="font-medium text-[#173566]">
                                    Contact - <span> {office.phones.join(" , ")}</span>
                                  </p>
                                </div>

                                <div>
                                  <p className="font-medium text-[#173566]">
                                    Email -{" "}
                                    <span>
                                      <a
                                        href={`mailto:${office.email}`}
                                        className="mt-1 inline-block break-all transition hover:text-[#173566]"
                                      >
                                        {office.email}
                                      </a>
                                    </span>
                                  </p>
                                </div>

                                <div>
                                  <a
                                    href={office.mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.06em] text-[#173566] underline underline-offset-4"
                                  >
                                    Locate Us <span aria-hidden="true">→</span>
                                  </a>
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
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#173566] text-white">
        <div className="mx-auto px-5 py-10 sm:px-8 sm:py-12 md:px-10 lg:px-14 lg:py-[50px]">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr]">
            <div>
              <div className="flex items-center gap-4">
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  width={90}
                  height={90}
                  className="h-auto w-[78px] sm:w-[90px]"
                />
                <Image
                  src="/images/gptw-logo.png"
                  alt="badge"
                  width={60}
                  height={90}
                  className="h-auto w-[50px] sm:w-[60px]"
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-white/90">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-[18px] transition hover:bg-white hover:text-[#173566]"
                >
                  <i className="fa-brands fa-linkedin-in" aria-hidden="true" />
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-[18px] transition hover:bg-white hover:text-[#173566]"
                >
                  <i className="fa-brands fa-youtube" aria-hidden="true" />
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-[18px] transition hover:bg-white hover:text-[#173566]"
                >
                  <i className="fa-brands fa-instagram" aria-hidden="true" />
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-[18px] transition hover:bg-white hover:text-[#173566]"
                >
                  <i className="fa-brands fa-facebook-f" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.04em]">
                Quick Links
              </p>

              <div className="mt-4 space-y-3 text-sm">
                {quickLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block transition hover:opacity-70"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.04em]">
                Contact
              </p>

              <div className="mt-4 space-y-4 text-sm">
                <Contact icon="call">020 - 67091000</Contact>
                <Contact icon="mail">info@pridegroup.net</Contact>
                <Contact icon="location_on">
                  Pride House, 5th Floor,
                  <br />
                  108, Ganeshkhind Road, Pune - 411016
                </Contact>
              </div>
            </div>
          </div>

          <div className="relative mt-10 border-t border-white/30">
            <button
              type="button"
              onClick={() => setFooterExpanded((prev) => !prev)}
              aria-label={
                footerExpanded ? "Collapse footer links" : "Expand footer links"
              }
              className="absolute left-1/2 top-0 flex h-6 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-[#173566] text-white/75 transition hover:text-white"
            >
              <span className="text-[18px] leading-none">
                {footerExpanded ? "⌃" : "⌄"}
              </span>
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                footerExpanded
                  ? "mt-10 grid-rows-[1fr] opacity-100"
                  : "mt-0 grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="grid grid-cols-1 gap-10 pb-8 pt-8 md:grid-cols-2 xl:grid-cols-[1.2fr_0.7fr_1fr]">
                  <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    <div>
                      <p className="text-[15px] font-[700] text-white">
                        Typology
                      </p>
                      <div className="mt-4 space-y-3 text-[15px] text-white/78">
                        {footerTypologies.slice(0, 5).map((item) => (
                          <p key={item}>{item}</p>
                        ))}
                      </div>
                    </div>

                    <div className="pt-0 sm:pt-[34px]">
                      <div className="space-y-3 text-[15px] text-white/78">
                        {footerTypologies.slice(5).map((item) => (
                          <p key={item}>{item}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-[15px] font-[700] text-white">
                      Quick Links
                    </p>
                    <div className="mt-4 space-y-3 text-[15px] text-white/78">
                      {footerQuickLinks.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block transition hover:text-white"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[15px] font-[700] text-white">
                      Projects
                    </p>
                    <div className="mt-4 space-y-3 text-[15px] text-white/78">
                      {footerProjects.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block transition hover:text-white"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 pt-4 text-[11px] text-white/80 sm:text-xs lg:flex-row lg:items-center lg:justify-between">
            <p>© Pride Group 2026 | Privacy Policy | Disclaimer</p>
            <p>Designed & Developed by Ink Media</p>
          </div>
        </div>
      </section>
    </footer>
  );
}

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-s text-[#1f1f1f]">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className={fieldClass}
      />
    </div>
  );
}

function Contact({ icon, children }: { icon: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="material-symbols-outlined text-[18px]">{icon}</span>
      <p className="leading-[1.6]">{children}</p>
    </div>
  );
}
