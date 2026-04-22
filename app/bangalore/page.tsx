import BangaloreHero from "@/components/bangalore/BangaloreHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bangalore | Pride Group",
  description: "Explore Pride Group projects and presence in Bangalore.",
  alternates: {
    canonical: "https://www.pridegroup.net/bangalore",
  },
};

export default function BangaloreCity() {
  return (
    <>
      <BangaloreHero />
    </>
  );
}
