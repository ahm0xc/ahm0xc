import { compile } from "@mdx-js/mdx";
import matter from "gray-matter";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { highlight } from "remark-sugar-high";
import type { Plugin } from "vite";

export function mdx(): Plugin {
  return {
    name: "mdx",
    enforce: "pre",
    async transform(code, id) {
      if (!id.endsWith(".mdx")) return;

      const { data, content } = matter(code);
      const frontmatter = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          value instanceof Date ? value.toISOString().slice(0, 10) : value,
        ])
      );
      const source = `export const frontmatter = ${JSON.stringify(frontmatter)};\n\n${content}`;

      const compiled = await compile(source, {
        remarkPlugins: [remarkGfm, highlight],
        rehypePlugins: [rehypeSlug],
      });

      return { code: compiled.value.toString(), map: null };
    },
  };
}
