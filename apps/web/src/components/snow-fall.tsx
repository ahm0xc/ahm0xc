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
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <Suspense fallback={null}>
          <Snowfall snowflakeCount={30} radius={[0.5, 2.5]} />
        </Suspense>
      </div>
    );

  return null;
}
