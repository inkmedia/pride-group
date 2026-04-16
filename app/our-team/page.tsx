import type { Metadata } from "next";
import TeamDetails from "@/components/ourteam/TeamDetails";
import TeamHero from "@/components/ourteam/TeamHero";

export const metadata: Metadata = {
  title: "Our Team | Pride Group",
  description:
    "Meet the team behind Pride Group and discover the leadership, expertise, and people shaping our vision, projects, and growth.",
  keywords: [
    "Pride Group team",
    "Our Team Pride Group",
    "Pride Group leadership",
    "real estate leadership team",
    "property developer team",
    "management team",
    "Pride Group experts",
    "company leadership",
  ],
  alternates: {
    canonical: "https://www.pridegroup.net/our-team",
  },
  openGraph: {
    title: "Our Team | Pride Group",
    description:
      "Discover the people and leadership behind Pride Group’s vision, projects, and long-term growth.",
    url: "https://www.pridegroup.net/our-team",
    siteName: "Pride Group",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Our Team | Pride Group",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Team | Pride Group",
    description:
      "Discover the people and leadership behind Pride Group’s vision, projects, and long-term growth.",
    images: ["/images/logo.png"],
  },
};

export default function OurTeam() {
  return (
    <>
      <TeamHero />
      <TeamDetails />
    </>
  );
}
