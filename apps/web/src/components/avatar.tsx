import Image from "next/image";

import Me from "~/../public/avatar.webp";
import { cn } from "~/lib/utils";

export interface AvatarProps
  extends Omit<
    Omit<React.ComponentPropsWithoutRef<typeof Image>, "src">,
    "alt"
  > {
  className?: string;
  alt?: string;
}

export default function Avatar({ className, alt, ...props }: AvatarProps) {
  return (
    <Image src={Me} className={cn("", className)} alt={alt ?? ""} {...props} />
  );
}
