import type { Metadata } from "next";
import CareersHero from "@/components/careers/CareersHero";
import EmployeeTestimonials from "@/components/careers/EmployeeTestimonials";
import JobOpenings from "@/components/careers/JobOpenings";
import LifeAtPride from "@/components/careers/LifeAtPride";

export const metadata: Metadata = {
  title: "Careers | Pride Group",
  description:
    "Explore career opportunities at Pride Group. Discover life at Pride, current job openings, and employee experiences shaping our workplace culture.",
  keywords: [
    "Pride Group careers",
    "Careers at Pride Group",
    "real estate jobs",
    "construction jobs",
    "job openings at Pride Group",
    "Life at Pride",
    "employee testimonials",
    "Pride Group hiring",
  ],
  alternates: {
    canonical: "https://www.pridegroup.net/careers",
  },
  openGraph: {
    title: "Careers | Pride Group",
    description:
      "Explore career opportunities, workplace culture, job openings, and employee stories at Pride Group.",
    url: "https://www.pridegroup.net/careers",
    siteName: "Pride Group",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Careers | Pride Group",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | Pride Group",
    description:
      "Explore career opportunities, workplace culture, job openings, and employee stories at Pride Group.",
    images: ["/images/logo.png"],
  },
};

export default function Careers() {
  return (
    <>
      <CareersHero />
      <LifeAtPride />
      <JobOpenings />
      <EmployeeTestimonials />
    </>
  );
}
