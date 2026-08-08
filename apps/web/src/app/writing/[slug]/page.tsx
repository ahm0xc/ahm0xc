import { Metadata } from "next";
import Link from "next/link";

import Container from "~/components/container";
import { Icons } from "~/components/icons";
import { getWritingBySlug, getWritingSlugs } from "~/lib/content";
import { cn } from "~/lib/utils";

import Aside from "./aside";

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

  const { content, frontmatter, toc } = await getWritingBySlug(slug);

  return (
    <div className="lg:flex">
      <div className="hidden flex-1 lg:block" />
      <Container className="mx-auto max-w-xl pt-36">
        <div>
          <button className="mb-4">
            <Link
              href="/writing"
              className="flex items-center gap-2 text-foreground/70"
            >
              <Icons.arrowMoveUpLeft className="size-4" />
              <span>Back</span>
            </Link>
          </button>
          <h1 className="font-heading text-5xl">
            {frontmatter.title as string}
          </h1>
          <p className="mt-2 text-sm text-foreground/80">
            By <Link href="/">Ahmed</Link>
          </p>
        </div>
        <article
          className={cn(
            "prose pt-6 prose-stone dark:prose-invert",
            "prose-headings:font-heading",
            "prose-h2:mt-12 prose-h2:mb-2"
          )}
        >
          {content}
        </article>
      </Container>
      <div className="hidden flex-1 lg:flex">
        <Aside toc={toc} />
      </div>
    </div>
  );
}
