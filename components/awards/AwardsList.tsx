"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type AwardItem = {
  id: string;
  title: string;
  year: string;
  awardee: string;
  awardedTo: string;
  department: string;
  image: string;
};

const ITEMS_PER_PAGE = 6;

const TAB_ORDER = ["Sales", "Engineering", "Leadership", "Design"] as const;

const normalizeDepartment = (department: string) => {
  if (department === "Head Office") return "Leadership";
  if (department === "Purple") return "Design";
  return department;
};

const awards: AwardItem[] = [
  {
    id: "sales-times-property-east-pune-1",
    title: "Times property east pune",
    year: "2015",
    awardee: "The times 0f india",
    awardedTo: "Pride bulder LLP",
    department: "Sales",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "construction-health-safety-environment-2",
    title: "For Construction Health, Safety & Environment",
    awardedTo: "Pride Builders LLP for Wellington",
    awardee: "16th CIDC Vishwakarma Medal",
    year: "2025",
    department: "Sales",
    image: "/images/awards/Award-2.jpg",
  },
  {
    id: "environment-friendly-project-residential",
    title: "Environment Friendly Project - Residential",
    awardedTo: "Pride Group for Pride Platinum",
    awardee: "Realty Excellence Awards, West",
    year: "2014",
    department: "Sales",
    image: "/images/awards/Award-4.jpg",
  },
  {
    id: "asias-greatest-brands",
    title: "Asia's Greatest Brands",
    awardedTo: "Pride Group",
    awardee: "Asia One",
    year: "2023-2024",
    department: "Sales",
    image: "/images/awards/Award-3.jpg",
  },
  {
    id: "occupational-health-safety-award",
    title: "Occupational Health & Safety Award",
    awardedTo: "Pride Builders LLP for Wellington",
    awardee: "Apex India Foundation",
    year: "2023",
    department: "Sales",
    image: "/images/awards/Award-5.jpg",
  },
  {
    id: "sales-times-property-expo-2",
    title: "Times property expo",
    year: "2015",
    awardee: "Times property",
    awardedTo: "Pride world city",
    department: "Sales",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "sales-times-property-showcase-3",
    title: "Times property showcase",
    year: "2015",
    awardee: "Times property",
    awardedTo: "Pride builder LLP",
    department: "Sales",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "sales-certificate-of-appreciation-4",
    title: "Certificate  of appreciation",
    year: "2021-2022",
    awardee: "HDFC SALES",
    awardedTo: "Business sourcing associate",
    department: "Sales",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "sales-lokmat-property-fest-2022-5",
    title: "Lokmat property fest 2022",
    year: "2022",
    awardee: "Lokmat",
    awardedTo: "Pride world city",
    department: "Sales",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "sales-appreciation-for-participation-6",
    title: "Appreciation for participation",
    year: "NA",
    awardee: "IREE",
    awardedTo: "Online partner,banking partner,consulting partner",
    department: "Sales",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "sales-home-expo-2019-7",
    title: "Home expo 2019",
    year: "2019",
    awardee: "Syndicate bank",
    awardedTo: "PridePurple",
    department: "Sales",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "sales-durotsav-2023-8",
    title: "Durotsav 2023",
    year: "2023",
    awardee: "Durotsav 2023",
    awardedTo: "Pride world city",
    department: "Sales",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "sales-iree-indian-real-estate-expo-9",
    title: "IREE Indian real estate expo",
    year: "2019",
    awardee: "IREE Indian real estate expo",
    awardedTo: "Pune IT city home expo",
    department: "Sales",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "sales-real-estate-icpons-of-pune-10",
    title: "Real estate icpons of pune",
    year: "2022",
    awardee: "Times property",
    awardedTo: "MR Arvind jain",
    department: "Sales",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "sales-pune-property-expo-kolhapur-11",
    title: "Pune property expo kolhapur",
    year: "2022",
    awardee: "Pune to kolhapur",
    awardedTo: "Pride world city",
    department: "Sales",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "sales-hdfc-12",
    title: "HDFC",
    year: "NA",
    awardee: "HDFC",
    awardedTo: "In Appreciation and recognition of contribution",
    department: "Sales",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "sales-times-realty-icons-maharashtra-13",
    title: "Times realty icons maharashtra",
    year: "2021",
    awardee: "Knest aluforms and verticalsl",
    awardedTo: "Pride world city",
    department: "Sales",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "sales-pune-property-expo-kolhapur-14",
    title: "Pune property expo kolhapur",
    year: "NA",
    awardee: "HDFC home loans",
    awardedTo: "Pride world city",
    department: "Sales",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "sales-2nd-realty-india-brand-leadership-conclave-and-aware-15",
    title: "2nd Realty india brand leadership conclave and aware",
    year: "2026",
    awardee: "Bombay realty",
    awardedTo: "SMARTAN Pride world city (Best print campaign of the year)",
    department: "Sales",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "sales-2nd-realty-india-brand-leadership-conclave-and-aware-16",
    title: "2nd Realty india brand leadership conclave and aware",
    year: "2026",
    awardee: "Bombay realty",
    awardedTo:
      "SMARTAN Pride world city (Most effective content marketing and strategy)",
    department: "Sales",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "sales-2nd-realty-india-brand-leadership-conclave-and-aware-17",
    title: "2nd Realty india brand leadership conclave and aware",
    year: "2026",
    awardee: "Bombay realty",
    awardedTo:
      "SMARTAN Pride world city (Best use of SEO in a marketing campaign)",
    department: "Sales",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "sales-super-marathi-film-festival-18",
    title: "Super marathi film festival",
    year: "2023",
    awardee: "Red FM",
    awardedTo: "Pride world city",
    department: "Sales",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "sales-pcmc-most-prestigious-property-exibition-19",
    title: "PCMC most prestigious property exibition",
    year: "2014",
    awardee: "The times of india",
    awardedTo: "Pride builder LLP",
    department: "Sales",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "sales-times-property-showcase-20",
    title: "Times property showcase",
    year: "2015",
    awardee: "The times of india",
    awardedTo: "Pride builder LLP",
    department: "Sales",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "sales-pcmc-mega-home-buying-festival-property-exibition-21",
    title: "PCMC mega home buying festival property exibition",
    year: "2023",
    awardee: "HDFC home loans",
    awardedTo: "Pride world city",
    department: "Sales",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "sales-times-property-showcase-22",
    title: "Times property showcase",
    year: "2015",
    awardee: "The times of india",
    awardedTo: "Pride builder LLP",
    department: "Sales",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "sales-dream-home-expo-23",
    title: "Dream home expo",
    year: "2022",
    awardee: "SBI",
    awardedTo: "Pride world city",
    department: "Sales",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "sales-times-realty-24",
    title: "Times realty",
    year: "2022",
    awardee: "Knest aluforms and verticalsl",
    awardedTo: "Pride world city",
    department: "Sales",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "sales-conclave-and-excellence-award-25",
    title: "Conclave and excellence award",
    year: "2023",
    awardee: "Realty+",
    awardedTo: "Pride world city for wellington",
    department: "Sales",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "sales-conclave-and-excellence-award-26",
    title: "Conclave and excellence award",
    year: "2023",
    awardee: "Realty+",
    awardedTo: "Pride world city for soho",
    department: "Sales",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "sales-conclave-and-excellence-award-27",
    title: "Conclave and excellence award",
    year: "2023",
    awardee: "Realty+",
    awardedTo: "Pride world city",
    department: "Sales",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "sales-certificate-of-excellence-28",
    title: "Certificate of excellence",
    year: "2023",
    awardee: "Pune property exposition",
    awardedTo: "Pride world city",
    department: "Sales",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "sales-certificate-of-excellence-29",
    title: "Certificate of excellence",
    year: "2023",
    awardee: "Pune property exposition",
    awardedTo: "Pride world city",
    department: "Sales",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "sales-certificate-of-appreciation-30",
    title: "Certificate of appreciation",
    year: "2023",
    awardee: "Pune property exposition",
    awardedTo: "Pride world city",
    department: "Sales",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "sales-property-fest-31",
    title: "Property fest",
    year: "2023",
    awardee: "Lokmat",
    awardedTo: "Pride world city",
    department: "Sales",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "sales-certificate-of-appreciation-32",
    title: "Certificate of appreciation",
    year: "2024",
    awardee: "Axiom 16",
    awardedTo: "Pride world city",
    department: "Sales",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "sales-certificate-of-appreciation-33",
    title: "Certificate of appreciation",
    year: "2024",
    awardee: "Times property",
    awardedTo: "Pride world city",
    department: "Sales",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "engineering-certificate-of-appreciation-34",
    title: "Certificate of appreciation",
    year: "2021",
    awardee: "Indian Green Building Council",
    awardedTo: "Pride Purple Group",
    department: "Engineering",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "engineering-best-design-and-architecture-township-project-35",
    title: "Best Design and Architecture Township Project",
    year: "2022",
    awardee: "ET Edge",
    awardedTo: "Pride World City",
    department: "Engineering",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "engineering-iconic-projects-of-the-year-36",
    title: "Iconic Projects of the Year",
    year: "2022",
    awardee: "Times Realty",
    awardedTo: "Pride World City",
    department: "Engineering",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "engineering-best-township-project-of-the-year-37",
    title: "Best Township Project of the Year",
    year: "2022",
    awardee: "National Awards",
    awardedTo: "Pride World City",
    department: "Engineering",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "engineering-real-estate-icon-of-pune-38",
    title: "Real Estate Icon of Pune",
    year: "2022",
    awardee: "Times Realty",
    awardedTo: "Pride World City",
    department: "Engineering",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "engineering-best-mixed-use-development-39",
    title: "Best Mixed Use Development",
    year: "2023",
    awardee: "ET Realty",
    awardedTo: "Pride World City",
    department: "Engineering",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "engineering-best-residential-project-of-the-year-40",
    title: "Best Residential Project of the Year",
    year: "2023",
    awardee: "Mid-Day",
    awardedTo: "Wellington at Pride World City",
    department: "Engineering",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "engineering-best-luxury-project-of-the-year-41",
    title: "Best Luxury Project of the Year",
    year: "2023",
    awardee: "Mid-Day",
    awardedTo: "Kingsbury at Pride World City",
    department: "Engineering",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "engineering-best-affordable-project-of-the-year-42",
    title: "Best Affordable Project of the Year",
    year: "2023",
    awardee: "Mid-Day",
    awardedTo: "Park Astra at Pride World City",
    department: "Engineering",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "engineering-best-township-project-43",
    title: "Best Township Project",
    year: "2023",
    awardee: "Pune Times Mirror",
    awardedTo: "Pride World City",
    department: "Engineering",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "engineering-best-township-project-of-the-year-44",
    title: "Best Township Project of the Year",
    year: "2024",
    awardee: "Mid-Day",
    awardedTo: "Pride World City",
    department: "Engineering",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "engineering-best-sustainable-development-45",
    title: "Best Sustainable Development",
    year: "2024",
    awardee: "ET Realty",
    awardedTo: "Pride World City",
    department: "Engineering",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "engineering-best-township-project-46",
    title: "Best Township Project",
    year: "2024",
    awardee: "Global Real Estate Congress",
    awardedTo: "Pride World City",
    department: "Engineering",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "purple-certificate-of-appreciation-47",
    title: "Certificate of appreciation",
    year: "2017",
    awardee: "Dream Home Exhibition",
    awardedTo: "Pride Purple Group",
    department: "Purple",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "purple-certificate-of-appreciation-48",
    title: "Certificate of appreciation",
    year: "2018",
    awardee: "Dream Home Exhibition",
    awardedTo: "Pride Purple Group",
    department: "Purple",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "purple-certificate-of-appreciation-49",
    title: "Certificate of appreciation",
    year: "2019",
    awardee: "Dream Home Exhibition",
    awardedTo: "Pride Purple Group",
    department: "Purple",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "purple-certificate-of-appreciation-50",
    title: "Certificate of appreciation",
    year: "2020",
    awardee: "Dream Home Exhibition",
    awardedTo: "Pride Purple Group",
    department: "Purple",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "purple-certificate-of-appreciation-51",
    title: "Certificate of appreciation",
    year: "2021",
    awardee: "Dream Home Exhibition",
    awardedTo: "Pride Purple Group",
    department: "Purple",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "purple-certificate-of-appreciation-52",
    title: "Certificate of appreciation",
    year: "2022",
    awardee: "Dream Home Exhibition",
    awardedTo: "Pride Purple Group",
    department: "Purple",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "purple-certificate-of-appreciation-53",
    title: "Certificate of appreciation",
    year: "2023",
    awardee: "Dream Home Exhibition",
    awardedTo: "Pride Purple Group",
    department: "Purple",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "purple-certificate-of-appreciation-54",
    title: "Certificate of appreciation",
    year: "2024",
    awardee: "Dream Home Exhibition",
    awardedTo: "Pride Purple Group",
    department: "Purple",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "ho-best-residential-project-of-the-year-55",
    title: "Best Residential Project of the Year",
    year: "2024",
    awardee: "Mid-Day",
    awardedTo: "Wellington at Pride World City",
    department: "Head Office",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "ho-best-commercial-project-of-the-year-56",
    title: "Best Commercial Project of the Year",
    year: "2024",
    awardee: "Mid-Day",
    awardedTo: "Pride Icon",
    department: "Head Office",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "ho-luxury-project-of-the-year-57",
    title: "Luxury Project of the Year",
    year: "2024",
    awardee: "Mid-Day",
    awardedTo: "Kingsbury at Pride World City",
    department: "Head Office",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "ho-best-township-project-of-the-year-58",
    title: "Best Township Project of the Year",
    year: "2024",
    awardee: "Mid-Day",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "ho-iconic-projects-of-the-year-59",
    title: "Iconic Projects of the Year",
    year: "2022",
    awardee: "Times Realty",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "ho-best-design-and-architecture-township-project-60",
    title: "Best Design and Architecture Township Project",
    year: "2022",
    awardee: "ET Edge",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "ho-best-township-project-of-the-year-61",
    title: "Best Township Project of the Year",
    year: "2022",
    awardee: "National Awards",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "ho-real-estate-icon-of-pune-62",
    title: "Real Estate Icon of Pune",
    year: "2022",
    awardee: "Times Realty",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "ho-best-mixed-use-development-63",
    title: "Best Mixed Use Development",
    year: "2023",
    awardee: "ET Realty",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "ho-best-residential-project-of-the-year-64",
    title: "Best Residential Project of the Year",
    year: "2023",
    awardee: "Mid-Day",
    awardedTo: "Wellington at Pride World City",
    department: "Head Office",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "ho-best-luxury-project-of-the-year-65",
    title: "Best Luxury Project of the Year",
    year: "2023",
    awardee: "Mid-Day",
    awardedTo: "Kingsbury at Pride World City",
    department: "Head Office",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "ho-best-affordable-project-of-the-year-66",
    title: "Best Affordable Project of the Year",
    year: "2023",
    awardee: "Mid-Day",
    awardedTo: "Park Astra at Pride World City",
    department: "Head Office",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "ho-best-township-project-67",
    title: "Best Township Project",
    year: "2023",
    awardee: "Pune Times Mirror",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "ho-best-township-project-of-the-year-68",
    title: "Best Township Project of the Year",
    year: "2024",
    awardee: "Mid-Day",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "ho-best-sustainable-development-69",
    title: "Best Sustainable Development",
    year: "2024",
    awardee: "ET Realty",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "ho-best-township-project-70",
    title: "Best Township Project",
    year: "2024",
    awardee: "Global Real Estate Congress",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "ho-pride-world-city-best-township-project-71",
    title: "Pride World City - Best Township Project",
    year: "2024",
    awardee: "Lokmat Property Awards",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "ho-kingsbury-best-luxury-project-72",
    title: "Kingsbury - Best Luxury Project",
    year: "2024",
    awardee: "Lokmat Property Awards",
    awardedTo: "Kingsbury at Pride World City",
    department: "Head Office",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "ho-wellington-best-residential-project-73",
    title: "Wellington - Best Residential Project",
    year: "2024",
    awardee: "Lokmat Property Awards",
    awardedTo: "Wellington at Pride World City",
    department: "Head Office",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "ho-certificate-of-appreciation-74",
    title: "Certificate of Appreciation",
    year: "2024",
    awardee: "Lokmat Property Awards",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "ho-certificate-of-appreciation-75",
    title: "Certificate of Appreciation",
    year: "2024",
    awardee: "Pune Property Exhibition",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "ho-certificate-of-appreciation-76",
    title: "Certificate of Appreciation",
    year: "2024",
    awardee: "Times Property",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "ho-certificate-of-appreciation-77",
    title: "Certificate of Appreciation",
    year: "2024",
    awardee: "Axiom 16",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "ho-certificate-of-appreciation-78",
    title: "Certificate of Appreciation",
    year: "2023",
    awardee: "Pune Property Exhibition",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "ho-certificate-of-excellence-79",
    title: "Certificate of Excellence",
    year: "2023",
    awardee: "Pune Property Exhibition",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "ho-conclave-and-excellence-award-80",
    title: "Conclave and Excellence Award",
    year: "2023",
    awardee: "Realty+",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "ho-conclave-and-excellence-award-81",
    title: "Conclave and Excellence Award",
    year: "2023",
    awardee: "Realty+",
    awardedTo: "Pride World City for Soho",
    department: "Head Office",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "ho-conclave-and-excellence-award-82",
    title: "Conclave and Excellence Award",
    year: "2023",
    awardee: "Realty+",
    awardedTo: "Pride World City for Wellington",
    department: "Head Office",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "ho-property-fest-83",
    title: "Property Fest",
    year: "2023",
    awardee: "Lokmat",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "ho-times-realty-84",
    title: "Times Realty",
    year: "2022",
    awardee: "Knest aluforms and verticalsl",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "ho-dream-home-expo-85",
    title: "Dream Home Expo",
    year: "2022",
    awardee: "SBI",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "ho-pcmc-mega-home-buying-festival-property-exibition-86",
    title: "PCMC Mega Home Buying Festival Property Exibition",
    year: "2023",
    awardee: "HDFC Home Loans",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "ho-times-property-showcase-87",
    title: "Times Property Showcase",
    year: "2015",
    awardee: "The Times of India",
    awardedTo: "Pride Builder LLP",
    department: "Head Office",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "ho-pcmc-most-prestigious-property-exibition-88",
    title: "PCMC Most Prestigious Property Exibition",
    year: "2014",
    awardee: "The Times of India",
    awardedTo: "Pride Builder LLP",
    department: "Head Office",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "ho-super-marathi-film-festival-89",
    title: "Super Marathi Film Festival",
    year: "2023",
    awardee: "Red FM",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "ho-2nd-realty-india-brand-leadership-conclave-and-aware-90",
    title: "2nd Realty India Brand Leadership Conclave and Aware",
    year: "2026",
    awardee: "Bombay Realty",
    awardedTo: "SMARTAN Pride World City (Best Print Campaign of the Year)",
    department: "Head Office",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "ho-2nd-realty-india-brand-leadership-conclave-and-aware-91",
    title: "2nd Realty India Brand Leadership Conclave and Aware",
    year: "2026",
    awardee: "Bombay Realty",
    awardedTo:
      "SMARTAN Pride World City (Most Effective Content Marketing and Strategy)",
    department: "Head Office",
    image: "/images/awards/Award-1.jpg",
  },
  {
    id: "ho-2nd-realty-india-brand-leadership-conclave-and-aware-92",
    title: "2nd Realty India Brand Leadership Conclave and Aware",
    year: "2026",
    awardee: "Bombay Realty",
    awardedTo:
      "SMARTAN Pride World City (Best Use of SEO in a Marketing Campaign)",
    department: "Head Office",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "ho-pune-property-expo-kolhapur-93",
    title: "Pune Property Expo Kolhapur",
    year: "2022",
    awardee: "Pune to Kolhapur",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "ho-real-estate-icons-of-pune-94",
    title: "Real Estate Icons of Pune",
    year: "2022",
    awardee: "Times Property",
    awardedTo: "Mr Arvind Jain",
    department: "Head Office",
    image: "/images/awards/Award-6.jpg",
  },
  {
    id: "ho-iree-indian-real-estate-expo-95",
    title: "IREE Indian Real Estate Expo",
    year: "2019",
    awardee: "IREE Indian Real Estate Expo",
    awardedTo: "Pune IT City Home Expo",
    department: "Head Office",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "ho-durotsav-2023-96",
    title: "Durotsav 2023",
    year: "2023",
    awardee: "Durotsav 2023",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "ho-home-expo-2019-97",
    title: "Home Expo 2019",
    year: "2019",
    awardee: "Syndicate Bank",
    awardedTo: "PridePurple",
    department: "Head Office",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "ho-appreciation-for-participation-98",
    title: "Appreciation for Participation",
    year: "NA",
    awardee: "IREE",
    awardedTo: "Online partner,banking partner,consulting partner",
    department: "Head Office",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "ho-lokmat-property-fest-2022-99",
    title: "Lokmat Property Fest 2022",
    year: "2022",
    awardee: "Lokmat",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "ho-certificate-of-appreciation-100",
    title: "Certificate of Appreciation",
    year: "2021-2022",
    awardee: "HDFC SALES",
    awardedTo: "Business sourcing associate",
    department: "Head Office",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "ho-times-property-showcase-101",
    title: "Times Property Showcase",
    year: "2015",
    awardee: "Times Property",
    awardedTo: "Pride Builder LLP",
    department: "Head Office",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "ho-times-property-expo-102",
    title: "Times Property Expo",
    year: "2015",
    awardee: "Times Property",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "ho-times-property-east-pune-103",
    title: "Times Property East Pune",
    year: "2015",
    awardee: "The Times of India",
    awardedTo: "Pride Builder LLP",
    department: "Head Office",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "ho-hdfc-104",
    title: "HDFC",
    year: "NA",
    awardee: "HDFC",
    awardedTo: "In Appreciation and Recognition of Contribution",
    department: "Head Office",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "ho-times-realty-icons-maharashtra-105",
    title: "Times Realty Icons Maharashtra",
    year: "2021",
    awardee: "Knest Aluforms and Verticalsl",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "ho-pune-property-expo-kolhapur-106",
    title: "Pune Property Expo Kolhapur",
    year: "NA",
    awardee: "HDFC Home Loans",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "ho-pride-world-city-awarded-for-csr-107",
    title: "Pride World City awarded for CSR",
    year: "2023",
    awardee: "Economic Times",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "ho-best-csr-impact-108",
    title: "Best CSR Impact",
    year: "2023",
    awardee: "ET Edge",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "ho-best-landscape-design-project-109",
    title: "Best Landscape Design Project",
    year: "2025",
    awardee: "Mid-Day",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "ho-best-township-project-110",
    title: "Best Township Project",
    year: "2025",
    awardee: "Mid-Day",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "ho-best-facility-award-2025-111",
    title: "Best facility Award-2025",
    year: "2025",
    awardee: "Credai pune metro",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "ho-pride-best-facility-award-2025-112",
    title: "Pride Best facility Award-2025",
    year: "2025",
    awardee: "Credai pune metro",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "ho-special-category-award-innovation-113",
    title: "Special Category award-innovation",
    year: "2022",
    awardee: "Credai pune metro",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "ho-special-category-award-creche-facility-114",
    title: "Special Category award-Creche Facility",
    year: "2022",
    awardee: "Credai pune metro",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "ho-special-category-award-health-hygiene-facility-115",
    title: "Special Category award-Health & Hygiene Facility",
    year: "2022",
    awardee: "Credai pune metro",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "ho-special-category-award-safety-116",
    title: "Special Category award-Safety",
    year: "2022",
    awardee: "Credai pune metro",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "ho-best-residential-project-of-the-year-117",
    title: "Best Residential Project of the Year",
    year: "2024",
    awardee: "Mid-Day",
    awardedTo: "Wellington at Pride World City",
    department: "Head Office",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "ho-best-commercial-project-of-the-year-118",
    title: "Best Commercial Project of the Year",
    year: "2024",
    awardee: "Mid-Day",
    awardedTo: "Pride Icon",
    department: "Head Office",
    image: "/images/awards/developer-of-year.jpg",
  },
  {
    id: "ho-luxury-project-of-the-year-119",
    title: "Luxury Project of the Year",
    year: "2024",
    awardee: "Mid-Day",
    awardedTo: "Kingsbury at Pride World City",
    department: "Head Office",
    image: "/images/awards/best-premium.jpg",
  },
  {
    id: "ho-best-township-project-of-the-year-120",
    title: "Best Township Project of the Year",
    year: "2024",
    awardee: "Mid-Day",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-premium-plotted.jpg",
  },
  {
    id: "ho-best-landscape-design-project-121",
    title: "Best Landscape Design Project",
    year: "2025",
    awardee: "Mid-Day",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/best-landscape.jpg",
  },
  {
    id: "ho-best-township-project-122",
    title: "Best Township Project",
    year: "2025",
    awardee: "Mid-Day",
    awardedTo: "Pride World City",
    department: "Head Office",
    image: "/images/awards/developer-of-year.jpg",
  },
];

const getLatestYear = (year: string) => {
  if (!year || year === "NA") return -1;

  const matches = year.match(/\d{4}/g);
  if (!matches) return -1;

  return Math.max(...matches.map(Number));
};

function AwardCard({ award }: { award: AwardItem }) {
  const displayDepartment = normalizeDepartment(award.department);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[10px] border border-[#ddd5c8] bg-white shadow-[0_16px_40px_rgba(15,31,58,0.06)]">
      <div className="relative h-[200px]">
        <Image
          src={award.image}
          alt={award.title}
          fill
          className="object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10203b]/10 via-transparent to-transparent" />

        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[11px] font-[700] uppercase tracking-[0.14em] text-[#172f55]/60">
            {displayDepartment}
          </p>
          <p className="mt-1 text-[12px] font-[700] uppercase tracking-[0.12em] text-[#172f55]">
            {award.year}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[16px] font-[600] leading-[1.3] text-[#10203b]">
          {award.title}
        </h3>

        {award.awardedTo && (
          <>
            <p className="mt-3 text-[11px] font-[700] uppercase tracking-[0.12em] text-[#173363]/55">
              Awarded to
            </p>
            <p className="mt-1 text-[14px] leading-[1.5] text-[#10203b]">
              {award.awardedTo}
            </p>
          </>
        )}

        {award.awardee && (
          <>
            <p className="mt-4 text-[11px] font-[700] uppercase tracking-[0.12em] text-[#173363]/55">
              Awarded by
            </p>
            <p className="mt-1 text-[12px] font-[700] uppercase tracking-[0.12em] text-[#173363]/80">
              {award.awardee}
            </p>
          </>
        )}

        <div className="mt-auto" />
      </div>
    </article>
  );
}

export default function AwardsList() {
  const [activeDepartment, setActiveDepartment] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const allDepartments = useMemo(() => {
    const normalizedDepartments = Array.from(
      new Set(
        awards
          .map((award) => normalizeDepartment(award.department?.trim()))
          .filter((department): department is string => Boolean(department)),
      ),
    );

    return TAB_ORDER.filter((department) =>
      normalizedDepartments.includes(department),
    );
  }, []);

  const filteredAwards = useMemo(() => {
    const data =
      activeDepartment === "All"
        ? awards
        : awards.filter(
            (award) =>
              normalizeDepartment(award.department) === activeDepartment,
          );

    return [...data].sort((a, b) => {
      const yearA = getLatestYear(a.year);
      const yearB = getLatestYear(b.year);

      if (yearB !== yearA) return yearB - yearA;
      return a.title.localeCompare(b.title);
    });
  }, [activeDepartment]);

  const totalPages = Math.ceil(filteredAwards.length / ITEMS_PER_PAGE);

  const paginatedAwards = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAwards.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAwards, currentPage]);

  const handleDepartmentChange = (department: string) => {
    setActiveDepartment(department);
    setCurrentPage(1);
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="mt-10 border-b border-[#e0e0e0]">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-10">
            {["All", ...allDepartments].map((department) => {
              const isActive = activeDepartment === department;

              return (
                <button
                  key={department}
                  onClick={() => handleDepartmentChange(department)}
                  className="relative cursor-pointer pb-2 text-[12px] font-[600] uppercase transition sm:text-[14px]"
                >
                  <span
                    className={`transition ${
                      isActive
                        ? "text-[#172f55]"
                        : "text-[#10203b] hover:text-[#10203b]"
                    }`}
                  >
                    {department}
                  </span>

                  <span
                    className={`absolute bottom-0 left-0 h-[2px] w-full transition-all duration-300 ${
                      isActive ? "bg-[#172f55]" : "bg-transparent"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid h-auto gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedAwards.map((award) => (
            <AwardCard key={award.id} award={award} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-end gap-2 border-t border-[#e0e0e0] pt-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="h-10 w-10 cursor-pointer rounded-full border border-[#172f55] bg-white text-[#172f55] disabled:opacity-40"
            >
              ‹
            </button>

            {(() => {
              const pages: (number | string)[] = [];

              if (totalPages <= 7) {
                for (let i = 1; i <= totalPages; i++) pages.push(i);
              } else {
                if (currentPage <= 3) {
                  pages.push(1, 2, 3, "...", totalPages);
                } else if (currentPage >= totalPages - 2) {
                  pages.push(
                    1,
                    "...",
                    totalPages - 2,
                    totalPages - 1,
                    totalPages,
                  );
                } else {
                  pages.push(
                    1,
                    "...",
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    "...",
                    totalPages,
                  );
                }
              }

              return pages.map((page, index) => {
                if (page === "...") {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="px-2 text-[#172f55]"
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page as number)}
                    className={`h-10 w-10 cursor-pointer rounded-full text-[14px] font-[600] transition ${
                      currentPage === page
                        ? "bg-[#172f55] text-white"
                        : "border border-[#172f55] bg-white text-[#172f55] hover:border-[#172f55]"
                    }`}
                  >
                    {page}
                  </button>
                );
              });
            })()}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="h-10 w-10 cursor-pointer rounded-full border border-[#172f55] bg-white text-[#172f55] disabled:opacity-40"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
