import type { Metadata } from "next";
import EnquireCTA from "@/components/pune/EnquireCTA";
import PrideCTA from "@/components/pune/PrideCTA";
import PuneHero from "@/components/pune/PuneHero";
import PuneLifestyle from "@/components/pune/PuneLifestyle";
import PuneOverview from "@/components/pune/PuneOverview";
import PuneProjects from "@/components/pune/PuneProjects";

export const metadata: Metadata = {
  title: "Pune | Pride Group",
  description:
    "Explore Pride Group projects in Pune and discover thoughtfully designed developments, city insights, lifestyle advantages, and opportunities in one of India’s most dynamic real estate markets.",
  keywords: [
    "Pride Group Pune",
    "Pune projects",
    "real estate in Pune",
    "Pride Group Pune projects",
    "residential projects in Pune",
    "commercial projects in Pune",
    "Pune property developer",
    "Pune real estate",
  ],
  alternates: {
    canonical: "https://www.pridegroup.net/pune",
  },
  openGraph: {
    title: "Pune | Pride Group",
    description:
      "Discover Pride Group projects in Pune along with city insights, lifestyle highlights, and real estate opportunities.",
    url: "https://www.pridegroup.net/pune",
    siteName: "Pride Group",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Pune | Pride Group",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pune | Pride Group",
    description:
      "Discover Pride Group projects in Pune along with city insights, lifestyle highlights, and real estate opportunities.",
    images: ["/images/logo.png"],
  },
};

export default function PuneCity() {
  return (
    <>
      <PuneHero />
      <PuneProjects />
      <PuneOverview />
      <PrideCTA />
      <PuneLifestyle />
      <EnquireCTA />
    </>
  );
}
