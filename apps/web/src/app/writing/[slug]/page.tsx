import fs from "fs/promises";
import path from "path";

export const dynamicParams = false;

export async function generateStaticParams() {
  const fileNames = await getWritings();

  return fileNames
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
    }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Writing, frontmatter } = await import(
    `~/content/writing/${slug}.mdx`
  );

  return <Writing />;
}

async function getWritings() {
  const contentDir = path.join(process.cwd(), "src/content/writing");
  const fileNames = await fs.readdir(contentDir);

  return fileNames;
}
