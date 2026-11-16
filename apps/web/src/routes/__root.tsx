import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/geist";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import { Footer } from "~/components/footer";
import { Navbar } from "~/components/navbar";
import { ThemeProvider } from "~/components/theme-provider";
import { TooltipProvider } from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
import "~/styles/globals.css";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { title: "Ahmed" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "description",
        content:
          "Welcome to my portfolio! I'm Ahmed, a passionate developer crafting unique digital experiences.",
      },
      { property: "og:image", content: "/opengraph-template.png" },
    ],
    links: [
      { rel: "canonical", href: "https://www.ahm0xc.me/" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  notFoundComponent: () => (
    <main className="mx-auto max-w-xl pt-36">Page not found</main>
  ),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body
        className={cn(
          "flex min-h-screen flex-col font-sans antialiased",
          "font-heading-variable"
        )}
        style={
          {
            "--font-geist-sans": "'Geist Variable', sans-serif",
            "--font-heading": "'Bricolage Grotesque Variable', sans-serif",
          } as React.CSSProperties
        }
      >
        <Analytics />
        <SpeedInsights />
        <ThemeProvider>
          <TooltipProvider>
            <Navbar />
            <main className="w-full flex-1">
              <Outlet />
            </main>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
