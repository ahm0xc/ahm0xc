import { readFileSync, readdirSync } from "node:fs";

import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import matter from "gray-matter";
import { defineConfig } from "vite";

import { mdx } from "./vite-mdx-plugin";

function readEntryFrontmatter(dir: string, file: string) {
  return matter(
    readFileSync(
      new URL(`./src/content/${dir}/${file}`, import.meta.url),
      "utf8"
    )
  ).data;
}

const writingRoutes = readdirSync(
  new URL("./src/content/writing/", import.meta.url)
)
  .filter((file) => file.endsWith(".mdx"))
  .filter((file) => !readEntryFrontmatter("writing", file).draft)
  .map((file) => `/writing/${file.replace(/\.mdx$/, "")}`);
const projectRoutes = readdirSync(
  new URL("./src/content/project/", import.meta.url)
)
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => `/projects/${file.replace(/\.mdx$/, "")}`);

export default defineConfig({
  server: {
    allowedHosts: [".ts.net", "localhost", "127.0.0.1"],
  },
  resolve: { tsconfigPaths: true },
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true,
        autoStaticPathsDiscovery: false,
        crawlLinks: false,
      },
      pages: [
        ...[
          "/",
          "/apps",
          "/writing",
          "/projects",
          ...writingRoutes,
          ...projectRoutes,
        ].map((path) => ({ path, prerender: { enabled: true } })),
      ],
    }),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    mdx(),
    react(),
    tailwindcss(),
  ],
});
