import { Metadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";

import Container from "~/components/container";
import { getAllWritings } from "~/lib/content";

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
  const draft = await draftMode();
  const writings = await getAllWritings({ includeDraft: draft.isEnabled });

  return (
    <Container className="w-full max-w-2xl pt-32">
      <div>
        <h1 className="mb-2 font-heading text-3xl font-bold text-foreground">
          Writings
        </h1>
        <p className="mb-12 text-sm text-foreground/80 md:text-base">
          By <Link href="/">Ahmed</Link>
        </p>
        <p className="mb-4 text-foreground/80">
          Here&apos;s a list of my writing:
        </p>
        <ul className="list-inside list-disc space-y-2 text-foreground/90">
          {writings.map((writing) => (
            <li key={writing.slug} className="text-base md:text-lg">
              <Link
                href={`/writing/${writing.slug}`}
                className="transition-opacity hover:underline hover:underline-offset-2 hover:opacity-80"
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
