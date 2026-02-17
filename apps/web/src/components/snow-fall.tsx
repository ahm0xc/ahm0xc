"use client";

import { Suspense, lazy } from "react";

import { useTheme } from "next-themes";

import useMounted from "~/hooks/use-mounted";
import { useSnowfallStore } from "~/store/snowfall-store";

const Snowfall = lazy(() => import("react-snowfall"));

export default function SnowFall() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const { isEnabled } = useSnowfallStore();

  if (!mounted) return null;

  if (!isEnabled) return null;

  if (resolvedTheme === "dark")
    return (
      <div className="pointer-events-none fixed top-0 left-0 h-full w-full">
        <Suspense fallback={null}>
          <Snowfall snowflakeCount={30} speed={[1, 3]} radius={[0.5, 2.5]} />
        </Suspense>
      </div>
    );

  return null;
}
