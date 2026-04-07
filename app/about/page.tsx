import AboutHero from "@/components/about/AboutHero";
import AboutStickyNav from "@/components/about/AboutStickyNav";
import CoreValues from "@/components/about/CoreValues";
import ExtendedLegacy from "@/components/about/ExtendedLegacy";
import JourneyTimeline from "@/components/about/JourneyTimeline";
import ManagingDirector from "@/components/about/ManagingDirector";
import PrideEcosystem from "@/components/about/PrideEcosystem";
import Timeline from "@/components/about/Timeline";
import VisionMission from "@/components/about/VisionMission";

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
