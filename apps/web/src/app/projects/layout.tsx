import * as React from "react";

import { Crimson_Text } from "next/font/google";

import { cn } from "~/lib/utils";

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

interface WritingLayoutProps {
  children: React.ReactNode;
}

const WritingLayout: React.FC<WritingLayoutProps> = ({ children }) => {
  return (
    <div className={cn("min-h-screen bg-background", crimsonText.variable)}>
      {children}
    </div>
  );
};

export default WritingLayout;
