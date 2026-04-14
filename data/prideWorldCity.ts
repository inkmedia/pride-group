export type TownshipStatus = "Completed" | "Ongoing" | "Upcoming";

export type TownshipHotspot = {
  title: string;
  status: TownshipStatus;
  category:
    | "Projects"
    | "Learning"
    | "Lifestyle"
    | "Convenience"
    | "Mobility"
    | "Work";
  description: string;
  detail: string;
  configuration?: string;
  ctaLabel?: string;
  href?: string;
  x: string;
  y: string;
};

export const prideWorldCityStats = [
  {
    value: "5M Sq. Ft.",
    label: "Completed",
    note: "Delivered and already shaping an active township community.",
  },
  {
    value: "400 Acres",
    label: "Township Spread",
    note: "A master-planned address built as one connected urban ecosystem.",
  },
  {
    value: "9000+",
    label: "Happy Families",
    note: "A lived-in neighbourhood with real momentum, not a distant promise.",
  },
  {
    value: "8M Sq. Ft.+",
    label: "Under Construction",
    note: "Future-ready scale that continues to expand the township story.",
  },
];

export const prideWorldCityNarrativePillars = [
  {
    title: "Self-sustained living",
    description:
      "Homes, retail, learning, recreation, and work are planned as one living environment rather than scattered urban fragments.",
  },
  {
    title: "Community-scale thinking",
    description:
      "The township is designed to feel socially alive, with public life, celebrations, and family movement built into its daily rhythm.",
  },
  {
    title: "Long-view infrastructure",
    description:
      "Roads, mobility touchpoints, social anchors, and future commercial layers support how the township grows over time.",
  },
];

export const prideWorldCityHotspots: TownshipHotspot[] = [
  {
    title: "Atlantic",
    status: "Completed",
    category: "Projects",
    description:
      "A completed residential cluster that helped establish the township's early momentum.",
    configuration: "3 & 4 BHK",
    detail:
      "Atlantic stands in for the lived, delivered phase of Pride World City and reinforces the township's proof-led growth story.",
    x: "21%",
    y: "34%",
  },
  {
    title: "Kingsbury",
    status: "Completed",
    category: "Projects",
    description:
      "A completed neighbourhood layer within the township's delivered residential fabric.",
    configuration: "2 & 3 BHK",
    detail:
      "Kingsbury adds to the sense of lived-in scale, showing that Pride World City has grown through multiple delivered communities.",
    x: "33%",
    y: "32%",
  },
  {
    title: "Notting Hill",
    status: "Completed",
    category: "Projects",
    description:
      "A completed cluster reinforcing the township's layered residential story.",
    configuration: "3 & 4 BHK",
    detail:
      "Notting Hill helps demonstrate that the township is already active at multiple scales, not waiting to become a community in the future.",
    x: "46%",
    y: "29%",
  },
  {
    title: "Long Island",
    status: "Completed",
    category: "Projects",
    description:
      "Part of the completed Pride World City residential footprint.",
    configuration: "1, 1.5 & 2 BHK",
    detail:
      "Long Island strengthens the delivered-township narrative and adds to the sense of mature, active neighbourhood life.",
    x: "56%",
    y: "32%",
  },
  {
    title: "Brooklyn",
    status: "Completed",
    category: "Projects",
    description:
      "Another completed address shaping the township's lived momentum.",
    configuration: "2 & 3 BHK",
    detail:
      "Brooklyn reflects how Pride World City has grown as a real community through delivered, occupied residential phases.",
    x: "67%",
    y: "35%",
  },
  {
    title: "Miami",
    status: "Ongoing",
    category: "Projects",
    description:
      "Premium apartment living inside the township's picture-perfect skyline.",
    configuration: "2, 3 & 4.5 BHK",
    detail:
      "A lively residential cluster offering 2, 3, and 4.5 BHK homes with a strong emphasis on open-air recreation and lifestyle amenities.",
    ctaLabel: "View Project",
    href: "https://www.prideworldcity.com/miami/",
    x: "28%",
    y: "43%",
  },
  {
    title: "Soho",
    status: "Ongoing",
    category: "Projects",
    description:
      "A more contemporary township expression aimed at new-generation buyers.",
    configuration: "2 & 2.5 BHK",
    detail:
      "Soho introduces a more compact, current product language while keeping full access to the township ecosystem around it.",
    x: "36%",
    y: "46%",
  },
  {
    title: "Wellington",
    status: "Ongoing",
    category: "Projects",
    description:
      "Family-first living with a strong podium and childhood-centred amenity story.",
    configuration: "2 & 3 BHK",
    detail:
      "Wellington brings together premium 2 and 3 BHK homes with broad play, wellness, and social spaces designed for multi-generational living.",
    ctaLabel: "View Project",
    href: "/projects/wellington",
    x: "45%",
    y: "48%",
  },
  {
    title: "Montreal",
    status: "Ongoing",
    category: "Projects",
    description:
      "A duplex-led enclave for larger families who want more space within the township.",
    configuration: "2, 3 & 4 BHK Duplexes",
    detail:
      "Montreal introduces spacious 2, 3, and 4 bed duplex homes for buyers seeking privacy, scale, and township convenience together.",
    ctaLabel: "View Project",
    href: "https://www.prideworldcity.com/montreal/",
    x: "56%",
    y: "41%",
  },
  {
    title: "Boston",
    status: "Ongoing",
    category: "Projects",
    description: "A newer ongoing residential layer within the township.",
    configuration: "2 BHK",
    detail:
      "Boston adds to the active pipeline of residential choices and helps communicate the township's continuing growth story.",
    x: "67%",
    y: "43%",
  },
  {
    title: "Learning Academy",
    status: "Completed",
    category: "Learning",
    description:
      "Education is part of the township fabric, not a distant afterthought.",
    detail:
      "A dedicated learning layer supports everyday family life and reinforces the township's long-term liveability for growing households.",
    x: "70%",
    y: "30%",
  },
  {
    title: "Play School & Day Care",
    status: "Completed",
    category: "Learning",
    description: "Early-childhood support built into the larger township plan.",
    detail:
      "Designed for working families and young children, the play-school layer adds convenience close to home and community life.",
    x: "76%",
    y: "44%",
  },
  {
    title: "Town Plaza",
    status: "Completed",
    category: "Convenience",
    description:
      "Retail, errands, and everyday essentials gathered into one familiar social hub.",
    detail:
      "Town Plaza brings together daily needs like supermarket, pharmacy, salon, café, clinic, boutique, and convenience-led retail.",
    x: "33%",
    y: "62%",
  },
  {
    title: "Club Charholi",
    status: "Completed",
    category: "Lifestyle",
    description:
      "A social and wellness anchor for celebrations, recreation, and everyday recharge.",
    detail:
      "Club Charholi is positioned as a lifestyle heart for the township, with dining, co-working, indoor recreation, guest-ready hosting, and event spaces.",
    href: "https://www.clubcharholi.com/",
    ctaLabel: "Explore Club",
    x: "49%",
    y: "67%",
  },
  {
    title: "Banks",
    status: "Completed",
    category: "Convenience",
    description:
      "Essential banking access integrated into the township routine.",
    detail:
      "A convenience-led layer that reduces daily friction and keeps important services within the township ecosystem.",
    x: "22%",
    y: "55%",
  },
  {
    title: "BRTS Bus Stop",
    status: "Completed",
    category: "Mobility",
    description:
      "Public transport access stitched into the township's movement logic.",
    detail:
      "A mobility marker that reinforces the township's balance between self-sufficiency and broader city access.",
    x: "16%",
    y: "40%",
  },
  {
    title: "School",
    status: "Ongoing",
    category: "Learning",
    description:
      "The next layer of family infrastructure inside Pride World City.",
    detail:
      "A school within the township will strengthen the live-near-everything promise and deepen long-term family confidence.",
    x: "68%",
    y: "55%",
  },
  {
    title: "Senior Citizen Living",
    status: "Ongoing",
    category: "Lifestyle",
    description:
      "Planned for multi-generational comfort within the township itself.",
    detail:
      "This future layer extends the township logic to ageing-in-community and family proximity across life stages.",
    x: "59%",
    y: "61%",
  },
  {
    title: "IT Building",
    status: "Ongoing",
    category: "Work",
    description:
      "A work-oriented layer that adds depth beyond pure residential use.",
    detail:
      "The IT building supports the idea of a township that can blend home, work, and everyday convenience in one larger environment.",
    x: "81%",
    y: "22%",
  },
  {
    title: "Mall & Multiplex",
    status: "Upcoming",
    category: "Convenience",
    description:
      "A future retail and leisure anchor for larger-format social activity.",
    detail:
      "Planned to widen the township's entertainment and convenience offering as the larger ecosystem matures.",
    x: "12%",
    y: "71%",
  },
  {
    title: "Project 1",
    status: "Upcoming",
    category: "Projects",
    description:
      "A future residential cluster placeholder within the township roadmap.",
    detail:
      "This placeholder project represents upcoming inventory that can later be replaced with final approved launch details.",
    x: "23%",
    y: "68%",
  },
  {
    title: "Project 2",
    status: "Upcoming",
    category: "Projects",
    description:
      "A future residential cluster placeholder within the township roadmap.",
    detail:
      "This placeholder project represents upcoming inventory that can later be replaced with final approved launch details.",
    x: "36%",
    y: "73%",
  },
  {
    title: "Project 3",
    status: "Upcoming",
    category: "Projects",
    description:
      "A future residential cluster placeholder within the township roadmap.",
    detail:
      "This placeholder project represents upcoming inventory that can later be replaced with final approved launch details.",
    x: "49%",
    y: "76%",
  },
  {
    title: "Project 4",
    status: "Upcoming",
    category: "Projects",
    description:
      "A future residential cluster placeholder within the township roadmap.",
    detail:
      "This placeholder project represents upcoming inventory that can later be replaced with final approved launch details.",
    x: "61%",
    y: "72%",
  },
  {
    title: "Multispeciality Hospital",
    status: "Upcoming",
    category: "Convenience",
    description:
      "Healthcare infrastructure planned as part of the township's next stage.",
    detail:
      "World-class healthcare access is part of the long-term township vision, supporting trust and everyday reassurance.",
    x: "27%",
    y: "77%",
  },
  {
    title: "5 Star Hotel",
    status: "Upcoming",
    category: "Lifestyle",
    description:
      "A hospitality layer that expands the township's profile and mix of uses.",
    detail:
      "This future component adds destination value and reinforces Pride World City's larger urban ambition.",
    x: "43%",
    y: "22%",
  },
  {
    title: "Fire Station",
    status: "Upcoming",
    category: "Mobility",
    description:
      "Critical infrastructure planned into the township's growth framework.",
    detail:
      "Proof that the long-range planning here extends beyond residences into practical, city-scale support systems.",
    x: "84%",
    y: "67%",
  },
  {
    title: "Fuel Station",
    status: "Upcoming",
    category: "Mobility",
    description:
      "Everyday support infrastructure layered into the future plan.",
    detail:
      "A simple but important signal of how the township is being planned as a complete, self-reliant urban address.",
    x: "72%",
    y: "76%",
  },
  {
    title: "Business & Tech Park",
    status: "Upcoming",
    category: "Work",
    description:
      "A larger commercial layer that expands the township beyond residential boundaries.",
    detail:
      "This future business layer supports the idea of Pride World City as a broader ecosystem for living, working, and long-term growth.",
    x: "90%",
    y: "49%",
  },
];

export const prideWorldCityClusters = [
  {
    eyebrow: "Learn & Grow",
    title: "Education is built into the township story.",
    body: "From play school and day care to the learning academy and planned school infrastructure, family life here is designed around proximity, confidence, and daily ease.",
    proof: [
      "Learning Academy already anchors the current township fabric",
      "Play School & Day Care support younger households",
      "School infrastructure extends the long-term family-living proposition",
    ],
  },
  {
    eyebrow: "Shop & Convene",
    title: "Township convenience without everyday friction.",
    body: "Town Plaza is positioned as the day-to-day support layer of Pride World City, making errands, quick purchases, and casual meetups part of the neighbourhood itself.",
    proof: [
      "Convenience retail for groceries, essentials, and services",
      "Banks and clinics built into the township routine",
      "Café and social spaces that keep public life local",
    ],
  },
  {
    eyebrow: "Play, Celebrate, Belong",
    title: "Social infrastructure, not just amenity count.",
    body: "The township is designed to feel alive, with celebration, recreation, and wellness integrated into how families gather, move, and build community over time.",
    proof: [
      "Club Charholi as a major lifestyle anchor",
      "Festival-led public life and event spaces across the community",
      "Open-air recreation and family-friendly destinations throughout the township",
    ],
  },
  {
    eyebrow: "Work Nearby",
    title: "Residential calm with a stronger urban ecosystem.",
    body: "Commercial and tech-oriented layers expand Pride World City beyond pure residential use, bringing a more complete idea of township living into view.",
    proof: [
      "BRTS and access routes support city movement",
      "IT building and business/tech park deepen the work layer",
      "The township's value grows with its broader ecosystem, not just its homes",
    ],
  },
];

export const prideWorldCityExperiences = [
  {
    title: "Club Charholi",
    subtitle: "The township's social and wellness anchor",
    description:
      "Positioned as a high-energy community heart, Club Charholi brings together recreation, dining, co-working, hosting, and family time inside one lifestyle destination.",
    bullets: [
      "Banquet hall and party lawn",
      "Family restaurant and fine dine restaurant & bar",
      "Co-working, library, and guest-ready hospitality spaces",
      "Indoor recreation including billiards and snooker",
    ],
  },
  {
    title: "Town Plaza",
    subtitle: "Daily life made easier within the township",
    description:
      "Town Plaza is the convenience layer that helps the township function like a lived city, not just a residential cluster.",
    bullets: [
      "Supermarket, fruits and vegetable shop, and dairy",
      "Pharmacy, clinic, dental clinic, and laundry",
      "Salon, boutique, café, and gift shop",
      "A daily-use destination for errands, meetups, and essentials",
    ],
  },
  {
    title: "Learning Layer",
    subtitle: "A high-trust family signal across the ecosystem",
    description:
      "The education story here supports the idea of staying, growing, and planning life stages within the township rather than outgrowing it too early.",
    bullets: [
      "Learning Academy already active",
      "Play School & Day Care for early years",
      "School infrastructure planned into the township roadmap",
      "A family-first signal that deepens long-term liveability",
    ],
  },
];

export const prideWorldCityProjects = [
  {
    title: "Wellington",
    subtitle: "2 & 3 BHK Apartments",
    description:
      "Your childhood 2.0 is here, with dedicated podium amenities and a family-living lens inside Pride World City.",
    image: "/images/projects/Wellington.png",
    href: "/projects/wellington",
    isExternal: false,
  },
  {
    title: "Miami",
    subtitle: "2, 3 & 4.5 BHK Flats",
    description:
      "Picture-perfect homes offering 2, 3 & 4.5 BHK apartments within the township's more premium, lifestyle-led apartment expression.",
    image: "/images/projects/miami.jpg",
    href: "https://www.prideworldcity.com/miami/",
    isExternal: true,
  },
  {
    title: "Montreal",
    subtitle: "2, 3 & 4 BHK Duplexes",
    description:
      "Stay together, independently. Exclusive duplex homes designed for larger and multi-generational living inside the township.",
    image: "/images/projects/montreal.jpg",
    href: "https://www.prideworldcity.com/montreal/",
    isExternal: true,
  },
];

export const prideWorldCityLifeImages = [
  "/images/celebrations/Childrens-Day.jpg",
  "/images/celebrations/Christmas-Celebration.jpg",
  "/images/celebrations/Christmas.jpg",
  "/images/celebrations/Groove-Terrace.jpg",
  "/images/celebrations/Grrove.jpg",
  "/images/celebrations/Gudi-Padwa-2.jpg",
  "/images/celebrations/Gudi-Padwa.jpg",
  "/images/celebrations/Holi.jpg",
  "/images/celebrations/Lohari-2.jpg",
  "/images/celebrations/Lohari.jpg",
  "/images/celebrations/Tomatina.jpg",
  "/images/celebrations/Yoga-Day-2.jpg",
  "/images/celebrations/Yoga-Day.jpg",
];

export const prideWorldCityConnectivity = {
  intro:
    "Pride World City sits within the Charholi growth corridor, positioned between airport access routes, major city connectors, and expanding employment districts. The promise here is not only connection, but connected calm.",
  primary: [
    { title: "Pune International Airport", value: "7 km" },
    { title: "Kalyani Nagar", value: "12 km" },
    { title: "Koregaon Park", value: "13 km" },
    { title: "Kharadi", value: "14 km" },
    { title: "Wagholi", value: "11 km" },
    { title: "EON IT Park", value: "14 km" },
  ],
  secondary: [
    { title: "Yerwada", value: "11 km" },
    { title: "Bhosari MIDC", value: "12 km" },
    { title: "Moshi", value: "12 km" },
    { title: "Alandi", value: "9 km" },
    { title: "Chakan", value: "30 km" },
    { title: "Hinjewadi", value: "28 km" },
  ],
  growthSignals: [
    "15 km from Pune International Airport",
    "Proximity to Nagar Road and 90-feet Airport Road",
    "Close to Talawade IT Park and Weikfield IT Citi Info Park",
    "Commercial connectivity toward Kalyani Nagar and Hadapsar via Alandi Road",
    "Long-view mobility supported by the Charholi growth corridor and proposed network upgrades",
  ],
};
