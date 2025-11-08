import fs from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import remarkGfm from "remark-gfm";
import { highlight as remarkHighlight } from "remark-sugar-high";
import * as z from "zod/mini";

import { mdxComponents } from "~/components/mdx-components";

export const writingFrontmatterSchema = z.object({
  title: z.string(),
  date: z.string(),
  description: z.optional(z.string()),
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

  const { content, frontmatter } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkHighlight],
      },
    },
    components: mdxComponents,
  });

  const validatedFrontmatter = writingFrontmatterSchema.safeParse(frontmatter);

  if (!validatedFrontmatter.success || validatedFrontmatter.error) {
    throw new Error(`Invalid frontmatter for ${slug}`);
  }

  return {
    content,
    frontmatter: validatedFrontmatter.data,
    slug,
  };
}

export async function getAllWritings() {
  const slugs = await getWritingSlugs();
  const writings = await Promise.all(
    slugs.map(async (slug) => await getWritingBySlug(slug))
  );

  const validatedWritings = writings.filter((writing) => {
    try {
      writingFrontmatterSchema.parse(writing.frontmatter);
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
