import type { Metadata } from "next";
import ProjectsHero from "@/components/projectspage/ProjectsHero";
import CitiesProjectsSection from "@/components/home/CitiesProjectsSection";

export const metadata: Metadata = {
  title: "Projects | Pride Group",
  description:
    "Explore Pride Group projects across cities and discover residential and commercial developments designed with quality, innovation, and long-term value.",
  keywords: [
    "Pride Group projects",
    "real estate projects",
    "residential projects",
    "commercial projects",
    "property developments",
    "Pride Group properties",
    "projects by city",
    "real estate developer India",
  ],
  alternates: {
    canonical: "https://www.pridegroup.net/projects",
  },
  openGraph: {
    title: "Projects | Pride Group",
    description:
      "Discover Pride Group’s residential and commercial projects across cities, built with quality, trust, and thoughtful design.",
    url: "https://www.pridegroup.net/projects",
    siteName: "Pride Group",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Projects | Pride Group",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Pride Group",
    description:
      "Discover Pride Group’s residential and commercial projects across cities, built with quality, trust, and thoughtful design.",
    images: ["/images/logo.png"],
  },
};

export default function Projects() {
  return (
    <>
      <ProjectsHero />
      <CitiesProjectsSection />
    </>
  );
}
