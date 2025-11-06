import * as React from "react";

interface WritingLayoutProps {
  children: React.ReactNode;
}

const WritingLayout: React.FC<WritingLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default WritingLayout;
