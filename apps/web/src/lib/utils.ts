import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { appUrl } from "~/env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  return appUrl;
}
