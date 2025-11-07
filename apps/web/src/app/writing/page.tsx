import { Metadata } from "next";
import Link from "next/link";

import Container from "~/components/container";
import { getAllWritings } from "~/lib/writing";

export const metadata: Metadata = {
  title: "Writings | ahm0xc",
  description: "A collection of my writings",
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent("Writings | ahm0xc")}`,
        width: 1200,
        height: 630,
        alt: "Writings | ahm0xc",
      },
    ],
  },
};

export default async function WritingPage() {
  const writings = await getAllWritings();

  return (
    <Container className="max-w-2xl w-full pt-32">
      <div>
        <h1 className="text-3xl font-bold font-pixel mb-2 text-foreground">
          Writings
        </h1>
        <p className="text-sm md:text-base mb-12 text-foreground/80">
          By <Link href="/">Ahmed</Link>
        </p>
        <p className="mb-4 text-foreground/80">
          Here&apos;s a list of my writing:
        </p>
        <ul className="list-disc list-inside space-y-2 text-foreground/90">
          {writings.map((writing) => (
            <li key={writing.slug} className="text-base md:text-lg">
              <Link
                href={`/writing/${writing.slug}`}
                className="underline hover:opacity-80 transition-opacity"
              >
                {writing.frontmatter.title as string}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
