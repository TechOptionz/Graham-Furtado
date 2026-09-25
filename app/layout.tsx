import type { Metadata } from "next";
import "./globals.css";
import "./mobile.css";
import { inter, inria } from "@/lib/fonts";
import SmoothScroll from "@/components/SmoothScroll";
import SiteChrome from "@/components/SiteChrome";
import PageMotion from "@/components/PageMotion";
import ChatWidget from "@/components/ChatWidget";
import { pageMeta } from "@/data/siteContent";

export const metadata: Metadata = pageMeta.home;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${inria.variable}`}>
      <body>
        <SmoothScroll />
        <SiteChrome />
        <PageMotion />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
