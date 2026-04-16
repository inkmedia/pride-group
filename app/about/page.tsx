import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutStickyNav from "@/components/about/AboutStickyNav";
import CoreValues from "@/components/about/CoreValues";
import ExtendedLegacy from "@/components/about/ExtendedLegacy";
import JourneyTimeline from "@/components/about/JourneyTimeline";
import ManagingDirector from "@/components/about/ManagingDirector";
import PrideEcosystem from "@/components/about/PrideEcosystem";
import Timeline from "@/components/about/Timeline";
import VisionMission from "@/components/about/VisionMission";

export const metadata: Metadata = {
  title: "About Us | Pride Group",
  description:
    "Learn about Pride Group’s journey, vision, mission, leadership, and ecosystem. Explore our legacy, milestones, and the values shaping our real estate developments.",
  keywords: [
    "About Pride Group",
    "Pride Group",
    "real estate developer",
    "Pride Group vision",
    "Pride Group mission",
    "Pride Group leadership",
    "Pride Group journey",
    "Pride Group legacy",
    "real estate company India",
    "Pride Group About Us",
  ],
  alternates: {
    canonical: "https://www.pridegroup.net/about",
  },
  openGraph: {
    title: "About Us | Pride Group",
    description:
      "Discover Pride Group’s story, leadership, values, and real estate legacy.",
    url: "https://www.pridegroup.net/about",
    siteName: "Pride Group",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "About Pride Group",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Pride Group",
    description:
      "Discover Pride Group’s story, leadership, values, and real estate legacy.",
    images: ["/images/logo.png"],
  },
};

export default function AboutUs() {
  return (
    <>
      <AboutHero />
      <AboutStickyNav />
      <VisionMission />
      {/* <CoreValues /> */}
      <JourneyTimeline />
      <Timeline />
      <ManagingDirector />
      <PrideEcosystem />
      {/* <ExtendedLegacy /> */}
    </>
  );
}
