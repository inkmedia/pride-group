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
    address: ["Pride World City, ", "Charholi Bk,", "Pune - 411081"],
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
    <section className="py-16 lg:py-20 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-10 lg:px-16">
        {/* ================= HEADING ================= */}
        <div
          className={`max-w-[700px] mb-14 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-[32px] md:text-[40px] text-[#1f3f6b]">
            Get in touch with us
          </h2>

          <p className="mt-4 text-[15px] leading-[1.7] text-[#555]">
            Reach out to our offices across cities for project inquiries,
            partnerships, or support. Our teams are available to assist you.
          </p>
        </div>

        {/* ================= OFFICES GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {offices.map((office, index) => (
            <div
              key={office.city}
              className={`group bg-gray-50 p-8 rounded-[12px] transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:shadow-lg ${
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              {/* TITLE */}
              <h3 className="text-[16px] font-semibold tracking-wide text-[#1f3f6b]">
                {office.city}
              </h3>

              {/* ADDRESS */}
              <div className="mt-5 space-y-1 text-[#6b7280] text-[15px] leading-[1.7]">
                {office.address.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>

              {/* CONTACT */}
              <div className="mt-5 text-[#111] text-[15px] space-y-1">
                <p>{office.phone}</p>
                <p className="text-[#1f3f6b]">{office.email}</p>
              </div>

              {/* CTA */}
              <button className="mt-6 cursor-pointer text-[#172f55] font-semibold text-[14px] tracking-wide group-hover:underline">
                LOCATE US →
              </button>
            </div>
          ))}
        </div>

        {/* ================= SOCIAL ================= */}
        <div
          className={`mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t pt-10 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <p className="text-[#555] text-[15px]">
            You can also connect with us on social platforms
          </p>

          <div className="flex gap-8 text-[14px] text-[#172f55] font-medium">
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
      </div>
    </section>
  );
}
