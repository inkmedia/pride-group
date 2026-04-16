import type { Metadata } from "next";
import CompletedProjectshero from "@/components/completedprojects/CompletedProjectshero";
import CompletedProjectsList from "@/components/completedprojects/CompletedProjectsList";

export const metadata: Metadata = {
  title: "Completed Projects | Pride Group",
  description:
    "Explore completed projects by Pride Group across residential and commercial developments, reflecting quality construction, thoughtful design, and trusted delivery.",
  keywords: [
    "Pride Group completed projects",
    "completed real estate projects",
    "delivered projects by Pride Group",
    "residential projects",
    "commercial projects",
    "Pride Group developments",
    "real estate portfolio",
    "trusted property developer",
  ],
  alternates: {
    canonical: "https://www.pridegroup.net/completed-projects",
  },
  openGraph: {
    title: "Completed Projects | Pride Group",
    description:
      "Discover completed residential and commercial projects by Pride Group, built with quality, trust, and long-term value.",
    url: "https://www.pridegroup.net/completed-projects",
    siteName: "Pride Group",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Completed Projects | Pride Group",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Completed Projects | Pride Group",
    description:
      "Discover completed residential and commercial projects by Pride Group, built with quality, trust, and long-term value.",
    images: ["/images/logo.png"],
  },
};

export default function PrideCTA() {
  return (
    <>
      <CompletedProjectshero />
      <CompletedProjectsList />
    </>
  );
}
