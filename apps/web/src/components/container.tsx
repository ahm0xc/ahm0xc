import React from "react";

import { cn } from "~/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Container({
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <div className={cn("mx-auto max-w-xl px-4", className)} {...props}>
      {children}
    </div>
  );
}
