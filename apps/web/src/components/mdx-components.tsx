import type { AnchorHTMLAttributes } from "react";

export const mdxComponents = {
  a: Anchor,
  hr: () => <hr className="my-8 border-t border-foreground/5" />,
  Image,
};

function Anchor({
  href = "",
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}

interface ImageProps {
  src: string;
  alt?: string;
}

function Image({ src, alt = "" }: ImageProps) {
  return <img src={src} className="rounded-2xl" alt={alt} loading="lazy" />;
}
