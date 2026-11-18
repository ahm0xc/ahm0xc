import { useEffect, useRef } from "react";

import { useRouter } from "@tanstack/react-router";

interface MdxArticleProps {
  className?: string;
  html: string;
}

export function MdxArticle({ className, html }: MdxArticleProps) {
  const router = useRouter();
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;

      const anchor = (event.target as HTMLElement).closest("a");
      if (
        !anchor ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/")) return;

      event.preventDefault();
      void router.navigate({ href });
    }

    article.addEventListener("click", handleClick);

    return () => article.removeEventListener("click", handleClick);
  }, [router]);

  return (
    <article
      ref={articleRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
