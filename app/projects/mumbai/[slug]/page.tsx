import {
  generateCityProjectMetadata,
  StaticCityProjectPage,
} from "@/app/projects/city-project-page";

export const generateMetadata = generateCityProjectMetadata;

export default function MumbaiProjectPage(props: {
  params: Promise<{ slug: string }>;
}) {
  return <StaticCityProjectPage city="Mumbai" params={props.params} />;
}
