import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans } from "geist/font/sans";

import { Footer } from "~/components/footer";
import { Navbar } from "~/components/navbar";
import { ThemeProvider } from "~/components/theme-provider";
import { cn, getBaseUrl } from "~/lib/utils";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";

const fontHeading = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  preload: false,
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
          "flex min-h-screen flex-col font-sans antialiased",
          fontHeading.variable,
          GeistSans.variable
        )}
      >
        <Analytics />
        <SpeedInsights />
        <TRPCReactProvider>
          <ThemeProvider>
            <Navbar />
            <main className="w-full flex-1">{children}</main>
            <Footer />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
