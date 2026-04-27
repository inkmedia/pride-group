import { PROJECT_CITIES, type ProjectCity } from "@/types/project";

const CITY_SLUGS: Record<ProjectCity, string> = {
  Pune: "pune",
  Mumbai: "mumbai",
  Bangalore: "bangalore",
};

const SLUG_TO_CITY = Object.fromEntries(
  Object.entries(CITY_SLUGS).map(([city, slug]) => [slug, city]),
) as Record<string, ProjectCity>;

const CITY_MATCHERS: Array<{ city: ProjectCity; pattern: RegExp }> = [
  { city: "Pune", pattern: /\bpune\b/i },
  { city: "Mumbai", pattern: /\bmumbai\b/i },
  { city: "Bangalore", pattern: /\b(bangalore|bengaluru)\b/i },
];

export function isProjectCity(value: string): value is ProjectCity {
  return PROJECT_CITIES.includes(value as ProjectCity);
}

export function normalizeProjectCity(value?: string | null): ProjectCity | null {
  if (!value) {
    return null;
  }

  const normalized = value.trim().toLowerCase();

  if (normalized === "bengaluru") {
    return "Bangalore";
  }

  const matchedCity = PROJECT_CITIES.find(
    (city) => city.toLowerCase() === normalized,
  );

  return matchedCity ?? null;
}

export function inferProjectCity(
  ...values: Array<string | null | undefined>
): ProjectCity | null {
  for (const value of values) {
    if (!value) {
      continue;
    }

    for (const { city, pattern } of CITY_MATCHERS) {
      if (pattern.test(value)) {
        return city;
      }
    }
  }

  return null;
}

export function getProjectCityPath(city: ProjectCity): string {
  return `/${CITY_SLUGS[city]}`;
}

export function getProjectCitySlug(city: ProjectCity): string {
  return CITY_SLUGS[city];
}

export function getProjectCityFromSlug(slug: string): ProjectCity | null {
  return SLUG_TO_CITY[slug] ?? null;
}

export function getProjectPath({
  city,
  slug,
}: {
  city?: ProjectCity | null;
  slug: string;
}): string {
  const normalizedCity = city ? normalizeProjectCity(city) : null;

  if (!normalizedCity) {
    return `/projects/${slug}`;
  }

  return `/projects/${getProjectCitySlug(normalizedCity)}/${slug}`;
}
