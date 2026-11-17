import { createElement } from "react";
import type { ComponentType } from "react";

import * as z from "zod/mini";

import { mdxComponents } from "~/components/mdx-components";

import { extractToc } from "./toc-utils";

interface MdxModule {
  default: ComponentType<{ components: typeof mdxComponents }>;
  frontmatter: unknown;
}

const writingModules = import.meta.glob<MdxModule>("../content/writing/*.mdx", {
  eager: true,
});
const writingSources = import.meta.glob<string>("../content/writing/*.mdx", {
  eager: true,
  import: "default",
  query: "?raw",
});

const projectModules = import.meta.glob<MdxModule>("../content/project/*.mdx", {
  eager: true,
});
const projectSources = import.meta.glob<string>("../content/project/*.mdx", {
  eager: true,
  import: "default",
  query: "?raw",
});

function slugFromPath(path: string) {
  return (
    path
      .split("/")
      .pop()
      ?.replace(/\.mdx$/, "") ?? path
  );
}

function findPath(modules: Record<string, MdxModule>, slug: string) {
  const path = Object.keys(modules).find((key) => slugFromPath(key) === slug);

  if (!path) throw new Error(`Content not found for ${slug}`);

  return path;
}

async function loadEntry(
  modules: Record<string, MdxModule>,
  sources: Record<string, string>,
  path: string
) {
  const module = modules[path];

  if (!module) throw new Error(`Content not found for ${path}`);

  const source = sources[path];

  return {
    content: createElement(module.default, { components: mdxComponents }),
    frontmatter: module.frontmatter,
    slug: slugFromPath(path),
    toc: source ? await extractToc(source) : [],
  };
}

export const WRITING_CATEGORIES = [
  "database",
  "backend",
  "frontend",
  "dev-tools",
  "others",
] as const;

export const writingFrontmatterSchema = z.object({
  title: z.string(),
  date: z.string(),
  categories: z.array(z.enum(WRITING_CATEGORIES)),
  description: z.optional(z.string()),
  draft: z.optional(z.boolean()),
});

export async function getWritingSlugs(): Promise<string[]> {
  return Object.keys(writingModules).map(slugFromPath);
}

export async function getWritingBySlug(slug: string) {
  const entry = await loadEntry(
    writingModules,
    writingSources,
    findPath(writingModules, slug)
  );
  const validatedFrontmatter = writingFrontmatterSchema.safeParse(
    entry.frontmatter
  );

  if (!validatedFrontmatter.success) {
    throw new Error(
      `Invalid frontmatter for ${slug} - ${validatedFrontmatter.error.message}`
    );
  }

  return { ...entry, frontmatter: validatedFrontmatter.data };
}

interface GetAllWritingsBlog {
  includeDraft?: boolean;
}

export async function getAllWritings(
  { includeDraft }: GetAllWritingsBlog = { includeDraft: false }
) {
  const writings = await Promise.all(
    Object.keys(writingModules).map(async (path) => {
      const parsed = writingFrontmatterSchema.safeParse(
        writingModules[path]?.frontmatter
      );

      if (!parsed.success) return null;
      if (parsed.data.draft && !includeDraft) return null;

      const entry = await loadEntry(writingModules, writingSources, path);

      return { ...entry, frontmatter: parsed.data };
    })
  );

  return writings
    .filter((writing) => writing !== null)
    .toSorted(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export const projectFrontmatterSchema = z.object({
  name: z.string(),
  banner: z.string(),
  bannerHash: z.optional(z.string()),
  dateStart: z.string(),
  dateEnd: z.optional(z.string()),
  overview: z.string(),
  shortDescription: z.optional(z.string()),
  team: z.optional(z.array(z.string())),
  tools: z.array(z.string()),
  type: z._default(z.string(), "Project"),
});

export async function getProjectSlugs(): Promise<string[]> {
  return Object.keys(projectModules).map(slugFromPath);
}

export async function getProjectBySlug(slug: string) {
  const entry = await loadEntry(
    projectModules,
    projectSources,
    findPath(projectModules, slug)
  );
  const validatedFrontmatter = projectFrontmatterSchema.safeParse(
    entry.frontmatter
  );

  if (!validatedFrontmatter.success) {
    throw new Error(
      `Invalid frontmatter for ${slug} - ${validatedFrontmatter.error.message}`
    );
  }

  return { ...entry, frontmatter: validatedFrontmatter.data };
}

export async function getAllProjects() {
  const projects = await Promise.all(
    Object.keys(projectModules).map(async (path) => {
      const parsed = projectFrontmatterSchema.safeParse(
        projectModules[path]?.frontmatter
      );

      if (!parsed.success) return null;

      const entry = await loadEntry(projectModules, projectSources, path);

      return { ...entry, frontmatter: parsed.data };
    })
  );

  return projects
    .filter((project) => project !== null)
    .toSorted(
      (a, b) =>
        new Date(b.frontmatter.dateStart).getTime() -
        new Date(a.frontmatter.dateStart).getTime()
    );
}
