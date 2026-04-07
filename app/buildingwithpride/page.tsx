import CtaSection from "@/components/buildingwithpride/CtaSection";
import DesignPlaybook from "@/components/buildingwithpride/DesignPlaybook";
import HeroSection from "@/components/buildingwithpride/HeroSection";
import PhilosophySection from "@/components/buildingwithpride/PhilosophySection";
import ResponsibilitySection from "@/components/buildingwithpride/ResponsibilitySection";
import SafetyQuality from "@/components/buildingwithpride/SafetyQuality";

export default function Page() {
  return (
    <>
      <HeroSection />
      <PhilosophySection />
      <DesignPlaybook />
      <ResponsibilitySection />
      <SafetyQuality />
      <CtaSection />
    </>
  );
}
