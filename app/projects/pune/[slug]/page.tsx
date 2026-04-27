import {
  generateCityProjectMetadata,
  StaticCityProjectPage,
} from "@/app/projects/city-project-page";

export const generateMetadata = generateCityProjectMetadata;

export default function PuneProjectPage(props: {
  params: Promise<{ slug: string }>;
}) {
  return <StaticCityProjectPage city="Pune" params={props.params} />;
}
