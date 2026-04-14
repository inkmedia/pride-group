"use client";

import Image from "next/image";
import { useState } from "react";

export default function EnquireCTA() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(form);
  };

  return (
    <section className="relative overflow-hidden py-20 text-white lg:py-28">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <Image
          src="/images/about-us.png"
          alt="Enquire Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-5 text-center sm:px-8 lg:px-10">
        {/* HEADING */}
        <h2 className="text-[32px] leading-[1.2] sm:text-[40px] lg:text-[46px]">
          Find Your Place in Pune’s Most
          <br /> Promising Address
        </h2>

        <p className="mt-4 text-[15px] text-white/80 sm:text-[16px]">
          Connect with our team to explore available residences, pricing and
          site visits at Pride World City.
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 grid max-w-[520px] gap-4 sm:grid-cols-2"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="rounded-full border border-white/30 bg-white/10 px-5 py-3 text-[14px] text-white placeholder-white/60 outline-none backdrop-blur-sm"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="rounded-full border border-white/30 bg-white/10 px-5 py-3 text-[14px] text-white placeholder-white/60 outline-none backdrop-blur-sm"
          />

          <button
            type="submit"
            className="cursor-pointer col-span-full mt-2 rounded-full bg-[#172f55] px-6 py-3 text-[13px] font-[700] uppercase tracking-[0.12em] text-white transition hover:opacity-90"
          >
            Request a Call Back
          </button>
        </form>

        {/* TRUST LINE */}
        <p className="mt-6 text-[12px] text-white/60">
          Our team will get back to you within 24 hours.
        </p>
      </div>
    </section>
  );
}
