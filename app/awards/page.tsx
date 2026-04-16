import type { Metadata } from "next";
import AwardsHero from "@/components/awards/AwardsHero";
import AwardsList from "@/components/awards/AwardsList";

export const metadata: Metadata = {
  title: "Awards & Recognition | Pride Group",
  description:
    "Explore the awards and recognitions received by Pride Group for excellence in real estate development, innovation, design, and customer trust.",
  keywords: [
    "Pride Group awards",
    "Pride Group recognition",
    "real estate awards",
    "award-winning real estate developer",
    "Pride Group achievements",
    "construction awards India",
    "property developer awards",
    "Pride Group accolades",
  ],
  alternates: {
    canonical: "https://www.pridegroup.net/awards",
  },
  openGraph: {
    title: "Awards & Recognition | Pride Group",
    description:
      "Discover the awards and recognitions earned by Pride Group for excellence in real estate and development.",
    url: "https://www.pridegroup.net/awards",
    siteName: "Pride Group",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Pride Group Awards & Recognition",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Awards & Recognition | Pride Group",
    description:
      "Discover the awards and recognitions earned by Pride Group for excellence in real estate and development.",
    images: ["/images/logo.png"],
  },
};

export default function Awards() {
  return (
    <>
      <AwardsHero />
      <AwardsList />
    </>
  );
}
