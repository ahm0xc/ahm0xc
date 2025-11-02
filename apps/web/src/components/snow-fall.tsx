"use client";

import { Suspense, lazy } from "react";

import { useTheme } from "next-themes";

import useMounted from "~/hooks/use-mounted";

const Snowfall = lazy(() => import("react-snowfall"));

export default function SnowFall() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) return null;

  if (resolvedTheme === "dark")
    return (
      <Suspense fallback={null}>
        <Snowfall snowflakeCount={30} radius={[0.5, 2.5]} />
      </Suspense>
    );

  return null;
}
