import type { MouseEvent } from "react";

import { useRouter } from "@tanstack/react-router";

interface MdxArticleProps {
  className?: string;
  html: string;
}

export function MdxArticle({ className, html }: MdxArticleProps) {
  const router = useRouter();

  function handleClick(event: MouseEvent<HTMLElement>) {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;

    const anchor = (event.target as HTMLElement).closest("a");
    const href = anchor?.getAttribute("href");

    if (
      !anchor ||
      !href ||
      !href.startsWith("/") ||
      anchor.target === "_blank" ||
      anchor.hasAttribute("download")
    ) {
      return;
    }

    event.preventDefault();
    void router.navigate({ href });
  }

  return (
    <article
      className={className}
      onClick={handleClick}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
