import GithubSlugger from "github-slugger";
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
  const slugger = new GithubSlugger();

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

        const id = slugger.slug(text);

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
