import type { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";
import OutlookSection from "@/components/home/OutlookSection";
import CitiesProjectsSection from "@/components/home/CitiesProjectsSection";
import BuildingWithPride from "@/components/home/BuildingWithPride";
import AwardsSection from "@/components/home/AwardsSection";
import BlogHighlights from "@/components/home/BlogHighlights";

export const metadata: Metadata = {
  title: "Most Trusted Builders in Pune | Pride Group",
  description:
    "Pride Group is one of the most trusted builders and developers in Pune, offering thoughtfully designed residential and commercial projects with world-class amenities in prime locations.",
  keywords: [
    "builders in Pune",
    "trusted builders in Pune",
    "Pride Group",
    "Pride Group Pune",
    "real estate developer Pune",
    "best builder in Pune",
    "residential projects in Pune",
    "commercial projects in Pune",
    "property developer Pune",
    "world-class amenities",
  ],
  alternates: {
    canonical: "https://www.pridegroup.net/",
  },
  openGraph: {
    title: "Most Trusted Builders in Pune | Pride Group",
    description:
      "Explore Pride Group’s residential and commercial developments in Pune, built with thoughtful design, prime locations, and world-class amenities.",
    url: "https://www.pridegroup.net/",
    siteName: "Pride Group",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Pride Group",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Most Trusted Builders in Pune | Pride Group",
    description:
      "Explore Pride Group’s residential and commercial developments in Pune, built with thoughtful design, prime locations, and world-class amenities.",
    images: ["/images/logo.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <OutlookSection />
      <CitiesProjectsSection />
      <BuildingWithPride />
      <AwardsSection />
      <BlogHighlights />
    </>
  );
}
