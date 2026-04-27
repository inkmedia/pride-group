import {
  generateCityProjectMetadata,
  StaticCityProjectPage,
} from "@/app/projects/city-project-page";

export const generateMetadata = generateCityProjectMetadata;

export default function BangaloreProjectPage(props: {
  params: Promise<{ slug: string }>;
}) {
  return <StaticCityProjectPage city="Bangalore" params={props.params} />;
}
