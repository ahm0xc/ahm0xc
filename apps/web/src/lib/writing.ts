import fs from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "~/components/mdx-components";

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
        remarkPlugins: [remarkGfm],
      },
    },
    components: mdxComponents,
  });

  return {
    content,
    frontmatter,
    slug,
  };
}

export async function getAllWritings() {
  const slugs = await getWritingSlugs();
  const writings = await Promise.all(
    slugs.map(async (slug) => await getWritingBySlug(slug))
  );

  return writings;
}
