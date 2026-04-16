import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactSection from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us | Pride Group",
  description:
    "Get in touch with Pride Group for project inquiries, support, partnerships, and general questions. Reach out to our team through the Contact Us page.",
  keywords: [
    "Contact Pride Group",
    "Pride Group contact",
    "real estate contact page",
    "property inquiry",
    "customer support",
    "Pride Group office",
    "project inquiries",
    "contact real estate developer",
  ],
  alternates: {
    canonical: "https://www.pridegroup.net/contact",
  },
  openGraph: {
    title: "Contact Us | Pride Group",
    description:
      "Connect with Pride Group for inquiries, support, and partnership opportunities.",
    url: "https://www.pridegroup.net/contact",
    siteName: "Pride Group",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Contact Us | Pride Group",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Pride Group",
    description:
      "Connect with Pride Group for inquiries, support, and partnership opportunities.",
    images: ["/images/logo.png"],
  },
};

export default function Contact() {
  return (
    <>
      <ContactHero />
      <ContactSection />
    </>
  );
}
