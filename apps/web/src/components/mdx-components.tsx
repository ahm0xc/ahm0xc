import type { AnchorHTMLAttributes } from "react";

export function MdxAnchor({
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

export function MdxHr() {
  return <hr className="my-8 border-t border-foreground/5" />;
}

interface MdxImageProps {
  src: string;
  alt?: string;
}

export function MdxImage({ src, alt = "" }: MdxImageProps) {
  return <img src={src} className="rounded-2xl" alt={alt} loading="lazy" />;
}
