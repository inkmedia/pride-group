import type { Metadata } from "next";
import "./globals.css";
import Preloader from "@/components/common/Preloader";
import TransitionProvider from "@/components/common/TransitionProvider";
import SmoothScroll from "@/components/common/SmoothScroll";
import LayoutShell from "@/components/layout/LayoutShell";

import localFont from "next/font/local";
import { Lora } from "next/font/google";

function getMetadataBase() {
  const fallbackUrl = "https://www.pridegroup.net";
  const configuredUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim();

  try {
    return new URL(configuredUrl || fallbackUrl);
  } catch {
    return new URL(fallbackUrl);
  }
}

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600"],
});

const proxima = localFont({
  src: [
    {
      path: "./fonts/Proxima-Nova-Regular.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Proxima-Nova-Semibold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-proxima",
});

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: "Pride Group",
  description:
    "The best Builder in India, Pride Group has marked its presence in Bangalore, Mumbai & Pune. It is one of the best builders in Bangalore with premium projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300,0,0"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
      </head>
      <body className={`${lora.variable} ${proxima.variable} antialiased`}>
        <TransitionProvider>
          <Preloader />
          <SmoothScroll>
            <LayoutShell>{children}</LayoutShell>
          </SmoothScroll>
        </TransitionProvider>
      </body>
    </html>
  );
}
