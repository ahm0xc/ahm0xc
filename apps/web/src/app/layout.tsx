import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans } from "geist/font/sans";

import { Footer } from "~/components/footer";
import { Navbar } from "~/components/navbar";
import SnowFall from "~/components/snow-fall";
import { ThemeProvider } from "~/components/theme-provider";
import { cn, getBaseUrl } from "~/lib/utils";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";

const fontPixel = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
  preload: false,
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Ahmed",
  description:
    "Welcome to my portfolio! I'm Ahmed, a passionate developer crafting unique digital experiences.",
  metadataBase: getBaseUrl(),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased min-h-screen flex flex-col font-sans",
          fontPixel.variable,
          GeistSans.variable
        )}
      >
        <Analytics />
        <SpeedInsights />
        <TRPCReactProvider>
          <ThemeProvider>
            <Navbar />
            <SnowFall />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
