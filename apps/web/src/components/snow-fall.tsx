"use client";

import { useTheme } from "next-themes";
import Snowfall from "react-snowfall";

export default function SnowFall() {
  const { resolvedTheme } = useTheme();

  if (resolvedTheme === "dark")
    return <Snowfall snowflakeCount={30} radius={[0.5, 2.5]} />;
}
