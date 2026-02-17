"use client";

import Link from "next/link";

import type { TocItem } from "~/lib/toc-utils";
import { cn } from "~/lib/utils";

interface TocProps {
  items: TocItem[];
  className?: string;
}

export function Toc({ items, className }: TocProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      className={cn("max-h-[calc(100vh-8rem)] overflow-y-auto", className)}
      aria-label="Table of contents"
    >
      <h2 className="mb-3 text-sm font-semibold text-foreground/70">
        On this page
      </h2>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={`#${item.id}`}
              className={cn(
                "block text-foreground/60 transition-colors hover:text-foreground",
                "hover:underline",
                item.depth === 2 && "font-medium",
                item.depth === 3 && "pl-4 text-foreground/50",
                item.depth === 4 && "pl-8 text-foreground/40"
              )}
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
