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
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍏</text></svg>"
        />
      </head>
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
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
