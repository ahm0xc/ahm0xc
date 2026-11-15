"use client";

import type { ReactNode } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForesight } from "@foresightjs/react";

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
    callback: () => router.prefetch(href),
  });

  return (
    <Link href={href} ref={elementRef} prefetch={false} className={className}>
      {children}
    </Link>
  );
}
