import type { Metadata } from "next";
import BuildingWithPrideNewPage from "@/components/buildingwithpride/BuildingWithPrideNewPage";
import HeroSection from "@/components/buildingwithpride/HeroSection";

export const metadata: Metadata = {
  title: "Building With Pride | Pride Group",
  description:
    "Discover how Pride Group approaches design, engineering, sustainability, responsibility, and community through the Building With Pride philosophy.",
  keywords: [
    "Building With Pride",
    "Pride Group",
    "Pride Group design philosophy",
    "Pride Group engineering",
    "Pride Group sustainability",
    "Pride Group community",
    "real estate quality standards",
    "construction excellence",
    "responsible development",
    "Pride Group values",
  ],
  alternates: {
    canonical: "https://www.pridegroup.net/buildingwithpride",
  },
  openGraph: {
    title: "Building With Pride | Pride Group",
    description:
      "Explore Pride Group’s philosophy around design, engineering, sustainability, and community-led development.",
    url: "https://www.pridegroup.net/buildingwithpride",
    siteName: "Pride Group",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Building With Pride | Pride Group",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Building With Pride | Pride Group",
    description:
      "Explore Pride Group’s philosophy around design, engineering, sustainability, and community-led development.",
    images: ["/images/logo.png"],
  },
};

export default function Page() {
  return (
    <>
      <HeroSection />
      <BuildingWithPrideNewPage />
    </>
  );
}
