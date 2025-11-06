import Link from "next/link";

import fs from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import remarkGfm from "remark-gfm";

import Container from "~/components/container";
import Dummy from "~/components/dummy";
import { cn } from "~/lib/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "src/content/writing");
  const fileNames = await fs.readdir(contentDir);

  return fileNames
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
    }));
}

const components = {
  Dummy,
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

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
    components,
  });

  return (
    <div>
      <Container className="pt-36 max-w-xl mx-auto">
        <div>
          <h1 className="font-pixel text-5xl font-semibold">
            {frontmatter.title as string}
          </h1>
          <p className="text-sm text-foreground/80 mt-2">
            By <Link href="/">Ahmed</Link>
          </p>
        </div>
        <article
          className={cn(
            "pt-6 prose dark:prose-invert prose-stone",
            "prose-h2:mt-12 prose-h2:mb-2"
          )}
        >
          {content}
        </article>
      </Container>
    </div>
  );
}
