import * as React from "react";

import { cn } from "~/lib/utils";

interface WritingLayoutProps {
  children: React.ReactNode;
}

const WritingLayout: React.FC<WritingLayoutProps> = ({ children }) => {
  return (
    <div
      className={cn(
        "h-full prose dark:prose-invert prose-stone mx-auto",
        "prose-headings:max-w-xl prose-headings:mx-auto",
        "prose-p:max-w-xl prose-p:mx-auto",
        "prose-ul:max-w-xl prose-ul:mx-auto"
      )}
    >
      {children}
    </div>
  );
};

export default WritingLayout;
