import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";

import { GeistSans } from "geist/font/sans";

import { Navbar } from "~/components/navbar";
import SnowFall from "~/components/snow-fall";
import { ThemeProvider } from "~/components/theme-provider";
import { cn } from "~/lib/utils";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";

const fontPixel = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "Ahmed",
  description:
    "Welcome to my portfolio! I'm Ahmed, a passionate developer crafting unique digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased min-h-screen font-sans",
          fontPixel.variable,
          GeistSans.variable
        )}
      >
        <TRPCReactProvider>
          <ThemeProvider>
            <Navbar />
            <SnowFall />
            <main className="h-full w-full">{children}</main>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
