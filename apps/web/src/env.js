import { z } from "zod";

const serverSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

export const env = serverSchema.parse({ NODE_ENV: process.env.NODE_ENV });
export const appUrl = z
  .string()
  .url()
  .parse(import.meta.env.VITE_APP_URL);
