"use client";

import { Suspense, lazy } from "react";

import { useTheme } from "next-themes";

import { useIsMobile } from "~/hooks/use-is-mobile";
import useMounted from "~/hooks/use-mounted";
import { useSnowfallStore } from "~/store/snowfall-store";

const Snowfall = lazy(() => import("react-snowfall"));

export default function SnowFall() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const { isEnabled } = useSnowfallStore();
  const isMobile = useIsMobile();

  if (!mounted) return null;

  if (!isEnabled) return null;

  if (resolvedTheme === "dark")
    return (
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <Suspense fallback={null}>
          <Snowfall
            snowflakeCount={30}
            speed={isMobile ? [0.3, 1.3] : [1, 3]}
            radius={[0.5, 2.5]}
          />
        </Suspense>
      </div>
    );

  return null;
}
