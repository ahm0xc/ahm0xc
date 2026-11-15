"use client";

import type { ReactNode } from "react";

import { useForesight } from "@foresightjs/react";
import { Link, useRouter } from "@tanstack/react-router";

interface ForesightLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function ForesightLink({
  href,
  children,
  className,
}: ForesightLinkProps) {
  const router = useRouter();
  const { elementRef } = useForesight<HTMLAnchorElement>({
    callback: () => router.preloadRoute({ to: href as never }),
  });

  return (
    <Link
      to={href as never}
      ref={elementRef}
      preload={false}
      className={className}
    >
      {children}
    </Link>
  );
}
