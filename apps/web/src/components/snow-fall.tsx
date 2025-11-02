"use client";

import { useTheme } from "next-themes";
import Snowfall from "react-snowfall";

import useMounted from "~/hooks/use-mounted";

export default function SnowFall() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) return null;

  if (resolvedTheme === "dark")
    return <Snowfall snowflakeCount={30} radius={[0.5, 2.5]} />;

  return null;
}
