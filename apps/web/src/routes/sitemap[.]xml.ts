import { createFileRoute } from "@tanstack/react-router";

import { getProjectSlugs, getWritingSlugs } from "~/lib/content";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = "https://www.ahm0xc.me";
        const paths = [
          "/",
          "/apps",
          "/writing",
          "/projects",
          ...(await getWritingSlugs()).map((slug) => `/writing/${slug}`),
          ...(await getProjectSlugs()).map((slug) => `/projects/${slug}`),
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths
          .map((path) => `<url><loc>${origin}${path}</loc></url>`)
          .join("")}</urlset>`;

        return new Response(body, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
