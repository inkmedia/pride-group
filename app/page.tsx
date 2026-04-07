import HeroSlider from "@/components/home/HeroSlider";
import OutlookSection from "@/components/home/OutlookSection";
import CitiesProjectsSection from "@/components/home/CitiesProjectsSection";
import BuildingWithPride from "@/components/home/BuildingWithPride";
import AwardsSection from "@/components/home/AwardsSection";
import BlogHighlights from "@/components/home/BlogHighlights";

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
