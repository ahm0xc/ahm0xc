import { Metadata } from "next";
import Link from "next/link";

import Container from "~/components/container";
import { cn } from "~/lib/utils";
import { getWritingBySlug, getWritingSlugs } from "~/lib/writing";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getWritingSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const { frontmatter } = await getWritingBySlug(slug);

  return {
    title: frontmatter.title as string,
    description: frontmatter.description as string,
    openGraph: {
      title: frontmatter.title as string,
      description: frontmatter.description as string,
      images: [
        {
          url: `/og?title=${encodeURIComponent(frontmatter.title as string)}`,
          width: 1200,
          height: 630,
          alt: frontmatter.title as string,
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { content, frontmatter } = await getWritingBySlug(slug);

  return (
    <div>
      <Container className="pt-36 max-w-xl mx-auto">
        <div>
          <h1 className="font-pixel text-5xl font-semibold">
            {frontmatter.title as string}
          </h1>
          <p className="text-sm text-foreground/80 mt-2">
            By <Link href="/">Ahmed</Link>
          </p>
        </div>
        <article
          className={cn(
            "pt-6 prose dark:prose-invert prose-stone",
            "prose-h2:mt-12 prose-h2:mb-2"
          )}
        >
          {content}
        </article>
      </Container>
    </div>
  );
}
