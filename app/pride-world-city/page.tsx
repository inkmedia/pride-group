import type { Metadata } from "next";
import PrideWorldCityPage from "@/components/prideworldcity/PrideWorldCityPage";

export const metadata: Metadata = {
  title: "Pride World City | Pride Group",
  description:
    "Explore Pride World City, a 400-acre master-planned township in Charholi with premium residences, learning, retail, recreation, and future-ready urban infrastructure.",
};

export default function Page() {
  return <PrideWorldCityPage />;
}
