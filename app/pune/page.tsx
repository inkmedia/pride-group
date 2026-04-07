import EnquireCTA from "@/components/pune/EnquireCTA";
import PrideCTA from "@/components/pune/PrideCTA";
import PuneHero from "@/components/pune/PuneHero";
import PuneLifestyle from "@/components/pune/PuneLifestyle";
import PuneOverview from "@/components/pune/PuneOverview";
import PuneProjects from "@/components/pune/PuneProjects";

export default function PuneCity() {
  return (
    <>
      <PuneHero />
      <PuneProjects />
      <PuneOverview />
      <PrideCTA />
      <PuneLifestyle />
      <EnquireCTA />
    </>
  );
}
