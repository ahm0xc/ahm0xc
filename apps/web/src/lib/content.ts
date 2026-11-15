import { createElement } from "react";
import * as runtime from "react/jsx-runtime";

import { evaluate } from "@mdx-js/mdx";
import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { highlight as remarkHighlight } from "remark-sugar-high";
import * as z from "zod/mini";

import { mdxComponents } from "~/components/mdx-components";

import { extractToc } from "./toc-utils";

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
  const contentDir = path.join(process.cwd(), "src/content/writing");
  const fileNames = await fs.readdir(contentDir);

  return fileNames.map((fileName) => fileName.replace(/\.mdx$/, ""));
}

export async function getWritingBySlug(slug: string) {
  const filePath = path.join(
    process.cwd(),
    "src/content/writing",
    `${slug}.mdx`
  );
  const source = await fs.readFile(filePath, "utf8");

  const { content, frontmatter } = await compileContent(source);
  const toc = await extractToc(source);

  const validatedFrontmatter = writingFrontmatterSchema.safeParse(frontmatter);

  if (!validatedFrontmatter.success || validatedFrontmatter.error) {
    throw new Error(
      `Invalid frontmatter for ${slug} - ${validatedFrontmatter.error.message}`
    );
  }

  return {
    content,
    frontmatter: validatedFrontmatter.data,
    slug,
    toc,
  };
}

interface GetAllWritingsBlog {
  includeDraft?: boolean;
}

export async function getAllWritings(
  { includeDraft }: GetAllWritingsBlog = { includeDraft: false }
) {
  const slugs = await getWritingSlugs();
  const writings = await Promise.all(
    slugs.map(async (slug) => await getWritingBySlug(slug))
  );

  const validatedWritings = writings.filter((writing) => {
    try {
      writingFrontmatterSchema.parse(writing.frontmatter);
      if (writing.frontmatter.draft && !includeDraft) return false;
      return true;
    } catch {
      return false;
    }
  });

  const sortedWritings = validatedWritings.sort((a, b) => {
    return (
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
    );
  });

  return sortedWritings;
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
  const contentDir = path.join(process.cwd(), "src/content/project");
  const fileNames = await fs.readdir(contentDir);

  return fileNames.map((fileName) => fileName.replace(/\.mdx$/, ""));
}

export async function getProjectBySlug(slug: string) {
  const filePath = path.join(
    process.cwd(),
    "src/content/project",
    `${slug}.mdx`
  );
  const source = await fs.readFile(filePath, "utf8");

  const { content, frontmatter } = await compileContent(source);
  const toc = await extractToc(source);

  const validatedFrontmatter = projectFrontmatterSchema.safeParse(frontmatter);

  if (!validatedFrontmatter.success || validatedFrontmatter.error) {
    throw new Error(
      `Invalid frontmatter for ${slug} - ${validatedFrontmatter.error.message}`
    );
  }

  return {
    content,
    frontmatter: validatedFrontmatter.data,
    slug,
    toc,
  };
}

async function compileContent(source: string) {
  const parsed = matter(source);
  const normalizedFrontmatter = Object.fromEntries(
    Object.entries(parsed.data).map(([key, value]) => [
      key,
      value instanceof Date ? value.toISOString().slice(0, 10) : value,
    ])
  );
  const { default: Content } = await evaluate(parsed.content, {
    ...runtime,
    remarkPlugins: [remarkGfm, remarkHighlight],
    rehypePlugins: [rehypeSlug],
  });

  return {
    content: createElement(Content, { components: mdxComponents }),
    frontmatter: normalizedFrontmatter,
  };
}

export async function getAllProjects() {
  const slugs = await getProjectSlugs();
  const projects = await Promise.all(
    slugs.map(async (slug) => await getProjectBySlug(slug))
  );

  const validatedProjects = projects.filter((project) => {
    try {
      projectFrontmatterSchema.parse(project.frontmatter);
      return true;
    } catch {
      return false;
    }
  });

  const sortedProjects = validatedProjects.sort((a, b) => {
    return (
      new Date(b.frontmatter.dateStart).getTime() -
      new Date(a.frontmatter.dateStart).getTime()
    );
  });

  return sortedProjects;
}
