import { readdirSync } from "node:fs";

import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

const writingRoutes = readdirSync(
  new URL("./src/content/writing/", import.meta.url)
)
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => `/writing/${file.replace(/\.mdx$/, "")}`);
const projectRoutes = readdirSync(
  new URL("./src/content/project/", import.meta.url)
)
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => `/projects/${file.replace(/\.mdx$/, "")}`);

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true,
        autoStaticPathsDiscovery: false,
        crawlLinks: false,
      },
      pages: [
        ...["/", "/apps", "/projects", ...writingRoutes, ...projectRoutes].map(
          (path) => ({ path, prerender: { enabled: true } })
        ),
      ],
    }),
    nitro({ preset: process.env.VERCEL ? "vercel" : "node-server" }),
    react(),
    tailwindcss(),
  ],
});
