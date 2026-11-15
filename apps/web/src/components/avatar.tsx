import { cn } from "~/lib/utils";

export interface AvatarProps extends Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt"
> {
  className?: string;
  alt?: string;
}

export default function Avatar({ className, alt, ...props }: AvatarProps) {
  return (
    <img
      src="/avatar.png"
      className={cn("", className)}
      alt={alt ?? ""}
      {...props}
    />
  );
}
