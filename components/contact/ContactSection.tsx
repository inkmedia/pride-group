"use client";

import { useEffect, useState } from "react";

const offices = [
  {
    city: "PUNE OFFICE",
    address: [
      "Pride House, 5th Floor,",
      "108, Ganeshkhind Road, Near Pune University, Pune – 411016",
    ],
    phone: "8055538000 , 020 - 67091000",
    email: "pune@pridegroup.net",
  },
  {
    city: "BANGALORE OFFICE",
    address: [
      "Pride Hulkul, 901, 9th Floor,",
      "No.116 Lalbagh Road,",
      "Bangalore – 560027",
    ],
    phone: "080 2222 2424, 080 2222 2424",
    email: "bangalore@pridegroup.net",
  },
  {
    city: "MUMBAI OFFICE",
    address: [
      "601, Orbit Plaza,",
      "New Prabhadevi Road,",
      "Prabhadevi, Mumbai – 400 025",
    ],
    phone: "022 2421 8129, 022 2421 8130",
    email: "mumbai@pridegroup.net",
  },
  {
    city: "PRIDE WORLD CITY, PUNE",
    address: ["Pride World City,", "Charholi Bk,", "Pune - 411081"],
    phone: "+91 80555 46000",
    email: "digital@prideworldcity.com",
  },
];

export default function ContactSection() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="py-16 lg:py-20 overflow-hidden bg-white">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-10 lg:px-16">
        {/* ================= HEADING ================= */}
        <div
          className={`max-w-[700px] mb-14 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-[32px] md:text-[40px] font-medium text-[#1f3f6b] leading-tight">
            Get in touch with us
          </h2>

          <p className="mt-4 text-[15px] leading-[1.8] text-[#555]">
            Reach out to our offices across cities for project inquiries,
            partnerships, or support. Our teams are available to assist you.
          </p>
        </div>

        {/* ================= OFFICES GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {offices.map((office, index) => (
            <div
              key={office.city}
              className={`group bg-gray-50 border border-[#edf1f5] p-8 rounded-[16px] transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:shadow-lg hover:-translate-y-1 ${
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <h3 className="text-[16px] font-semibold tracking-wide text-[#1f3f6b]">
                {office.city}
              </h3>

              <div className="mt-5 space-y-1 text-[#6b7280] text-[15px] leading-[1.7]">
                {office.address.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>

              <div className="mt-5 text-[#111] text-[15px] space-y-1">
                <p>{office.phone}</p>
                <p className="text-[#1f3f6b] break-all">{office.email}</p>
              </div>

              <button className="mt-6 cursor-pointer text-[#172f55] font-semibold text-[14px] tracking-wide group-hover:underline">
                LOCATE US →
              </button>
            </div>
          ))}
        </div>

        {/* ================= SOCIAL ================= */}
        <div
          className={`mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-[#e5e7eb] pt-10 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <p className="text-[#555] text-[15px]">
            You can also connect with us on social platforms
          </p>

          <div className="flex flex-wrap gap-8 text-[14px] text-[#172f55] font-medium">
            <a href="#" className="hover:opacity-70 transition">
              Facebook
            </a>
            <a href="#" className="hover:opacity-70 transition">
              Instagram
            </a>
            <a href="#" className="hover:opacity-70 transition">
              Twitter
            </a>
            <a href="#" className="hover:opacity-70 transition">
              LinkedIn
            </a>
          </div>
        </div>

        {/* ================= FULL WIDTH CONTACT FORM ================= */}
        <div
          className={`mt-16 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <div className="w-full rounded-[10px] border border-[#e6eaf0] bg-[#f8fafc] p-6 md:p-8 lg:p-10 shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
            <div className="max-w-[900px] mb-8">
              <p className="text-[12px] font-semibold tracking-[0.18em] text-[#1f3f6b]/70 uppercase">
                Enquire Now
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                <div>
                  <label className="mb-2 block text-[13px] font-medium text-[#172f55]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="h-12 w-full rounded-[10px] border border-[#d8dee8] bg-white px-4 text-[14px] text-[#111] outline-none transition focus:border-[#1f3f6b] focus:ring-2 focus:ring-[#1f3f6b]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[13px] font-medium text-[#172f55]">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="h-12 w-full rounded-[10px] border border-[#d8dee8] bg-white px-4 text-[14px] text-[#111] outline-none transition focus:border-[#1f3f6b] focus:ring-2 focus:ring-[#1f3f6b]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[13px] font-medium text-[#172f55]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 w-full rounded-[10px] border border-[#d8dee8] bg-white px-4 text-[14px] text-[#111] outline-none transition focus:border-[#1f3f6b] focus:ring-2 focus:ring-[#1f3f6b]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[13px] font-medium text-[#172f55]">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your city"
                    className="h-12 w-full rounded-[10px] border border-[#d8dee8] bg-white px-4 text-[14px] text-[#111] outline-none transition focus:border-[#1f3f6b] focus:ring-2 focus:ring-[#1f3f6b]/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                <div>
                  <label className="mb-2 block text-[13px] font-medium text-[#172f55]">
                    Interested In
                  </label>
                  <select className="h-12 w-full rounded-[10px] border border-[#d8dee8] bg-white px-4 text-[14px] text-[#111] outline-none transition focus:border-[#1f3f6b] focus:ring-2 focus:ring-[#1f3f6b]/10">
                    <option value="">Select property type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="plots">Plots</option>
                    <option value="luxury">Luxury Homes</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[13px] font-medium text-[#172f55]">
                    Budget Range
                  </label>
                  <select className="h-12 w-full rounded-[10px] border border-[#d8dee8] bg-white px-4 text-[14px] text-[#111] outline-none transition focus:border-[#1f3f6b] focus:ring-2 focus:ring-[#1f3f6b]/10">
                    <option value="">Select budget</option>
                    <option value="50l">Below ₹50 Lakhs</option>
                    <option value="1cr">₹50 Lakhs - ₹1 Cr</option>
                    <option value="2cr">₹1 Cr - ₹2 Cr</option>
                    <option value="2crplus">Above ₹2 Cr</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[13px] font-medium text-[#172f55]">
                    Preferred Location
                  </label>
                  <input
                    type="text"
                    placeholder="Area / locality"
                    className="h-12 w-full rounded-[10px] border border-[#d8dee8] bg-white px-4 text-[14px] text-[#111] outline-none transition focus:border-[#1f3f6b] focus:ring-2 focus:ring-[#1f3f6b]/10"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[13px] font-medium text-[#172f55]">
                  Message
                </label>
                <textarea
                  rows={6}
                  placeholder="Tell us about your requirement"
                  className="w-full rounded-[10px] border border-[#d8dee8] bg-white px-4 py-3 text-[14px] text-[#111] outline-none transition focus:border-[#1f3f6b] focus:ring-2 focus:ring-[#1f3f6b]/10 resize-none"
                />
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pt-2">
                <p className="text-[12px] leading-[1.7] text-[#667085] max-w-[700px]">
                  By submitting this form, you agree to be contacted by our team
                  regarding your enquiry, project updates, pricing, and site
                  visit assistance.
                </p>

                <button
                  type="submit"
                  className="inline-flex h-12 cursor-pointer items-center justify-center rounded-[10px] bg-[#1f3f6b] px-8 text-[14px] font-semibold tracking-wide text-white transition hover:bg-[#172f55]"
                >
                  SUBMIT ENQUIRY
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
