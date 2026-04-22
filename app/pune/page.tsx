import type { Metadata } from "next";
import EnquireCTA from "@/components/pune/EnquireCTA";
import PrideCTA from "@/components/pune/PrideCTA";
import PuneHero from "@/components/pune/PuneHero";
import PuneLifestyle from "@/components/pune/PuneLifestyle";
import PuneOverview from "@/components/pune/PuneOverview";
import PuneProjects, {
  type PuneProjectCard,
} from "@/components/pune/PuneProjects";
import { listProjectsByCity } from "@/lib/project-store";

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

function mapProjectsForPunePage(
  projects: Awaited<ReturnType<typeof listProjectsByCity>>,
): PuneProjectCard[] {
  return projects.map((project) => {
    const image =
      project.overview.imageSrc ||
      (project.hero.type === "image" ? project.hero.src : "") ||
      (project.hero.type === "carousel" ? project.hero.images[0] : "") ||
      "/images/logo.png";

    return {
      title: project.hero.heading || project.title,
      subtitle: project.title,
      description: project.overview.description,
      location: project.overview.location || project.location,
      image,
      href: `/projects/${project.slug}`,
    };
  });
}

export default async function PuneCity() {
  const puneProjects = mapProjectsForPunePage(
    await listProjectsByCity("Pune"),
  );

  return (
    <>
      <PuneHero />
      <PuneProjects projects={puneProjects} />
      <PuneOverview />
      <PrideCTA />
      <PuneLifestyle />
      <EnquireCTA />
    </>
  );
}
