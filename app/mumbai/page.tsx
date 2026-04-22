import type { Metadata } from "next";
import MumbaiHero from "@/components/mumbai/MumbaiHero";

export const metadata: Metadata = {
  title: "Mumbai | Pride Group",
  description: "Explore Pride Group projects and presence in Mumbai.",
  alternates: {
    canonical: "https://www.pridegroup.net/mumbai",
  },
};

export default function MumbaiCity() {
  return (
    <>
      <MumbaiHero />
    </>
  );
}
