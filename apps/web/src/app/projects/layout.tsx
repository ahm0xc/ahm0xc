import * as React from "react";

import { cn } from "~/lib/utils";

interface WritingLayoutProps {
  children: React.ReactNode;
}

const WritingLayout: React.FC<WritingLayoutProps> = ({ children }) => {
  return <div className={cn("min-h-screen bg-background")}>{children}</div>;
};

export default WritingLayout;
