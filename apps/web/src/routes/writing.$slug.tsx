import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import Container from "~/components/container";
import { Icons } from "~/components/icons";
import { Toc } from "~/components/toc";
import { loadWriting, loadWritingSlugs } from "~/lib/route-content";
import { cn } from "~/lib/utils";

export const Route = createFileRoute("/writing/$slug")({
  loader: async ({ params }) => {
    const slugs = await loadWritingSlugs();
    if (!slugs.includes(params.slug)) throw notFound();
    return loadWriting({ data: { slug: params.slug } });
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.frontmatter.title ?? "Writing | ahm0xc" },
      ...(loaderData?.frontmatter.description
        ? [{ name: "description", content: loaderData.frontmatter.description }]
        : []),
      ...(loaderData
        ? [
            { property: "og:title", content: loaderData.frontmatter.title },
            {
              property: "og:description",
              content: loaderData.frontmatter.description ?? "",
            },
            {
              property: "og:image",
              content: `/og?title=${encodeURIComponent(loaderData.frontmatter.title)}`,
            },
          ]
        : []),
    ],
    links: loaderData
      ? [
          {
            rel: "canonical",
            href: `https://www.ahm0xc.me/writing/${loaderData.slug}`,
          },
        ]
      : [],
  }),
  component: WritingArticle,
});

function WritingArticle() {
  const { html, frontmatter, toc } = Route.useLoaderData();

  return (
    <div className="lg:flex">
      <div className="hidden flex-1 lg:block" />
      <Container className="mx-auto max-w-xl pt-36">
        <Link
          to="/writing"
          className="mb-4 flex items-center gap-2 text-foreground/70"
        >
          <Icons.arrowMoveUpLeft className="size-4" />
          <span>Back</span>
        </Link>
        <h1 className="font-heading text-5xl">{frontmatter.title}</h1>
        <p className="mt-2 text-sm text-foreground/80">
          By <Link to="/">Ahmed</Link>
        </p>
        <article
          className={cn(
            "prose pt-6 prose-stone dark:prose-invert",
            "prose-headings:font-heading",
            "prose-h2:mt-12 prose-h2:mb-2"
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Container>
      <div className="hidden flex-1 lg:flex">
        <Toc items={toc} className="sticky top-24 mt-36 ml-8 h-fit" />
      </div>
    </div>
  );
}
