import type { Root } from "mdast";
import { remark } from "remark";
import { visit } from "unist-util-visit";

export interface TocItem {
  id: string;
  text: string;
  depth: number;
}

export async function extractToc(source: string): Promise<TocItem[]> {
  const toc: TocItem[] = [];

  const processor = remark().use(() => {
    return (tree: Root) => {
      visit(tree, "heading", (node) => {
        // Extract text from heading nodes
        let text = "";
        visit(node, (child) => {
          if (child.type === "text") {
            text += child.value;
          }
          if (child.type === "inlineCode") {
            text += child.value;
          }
        });

        // Generate ID from heading text (simple slugify)
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "") // Remove special characters
          .replace(/\s+/g, "-") // Replace spaces with hyphens
          .replace(/-+/g, "-") // Replace multiple hyphens with single
          .trim();

        if (text && id) {
          toc.push({
            id,
            text,
            depth: node.depth,
          });
        }
      });
    };
  });

  await processor.process(source);
  return toc;
}
