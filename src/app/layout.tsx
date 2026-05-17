import type { Metadata } from "next";
import "./globals.css";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { buildOpenGraph, homeDescription, homeTitle, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: homeTitle,
    template: `%s`,
  },
  description: homeDescription,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: buildOpenGraph(homeTitle, homeDescription),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#070b18] text-white">
        {children}
        <ScrollToTopButton />
      </body>
    </html>
  );
}
