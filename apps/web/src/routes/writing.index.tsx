import { Link, createFileRoute } from "@tanstack/react-router";

import Container from "~/components/container";
import { loadWritings } from "~/lib/route-content";

export const Route = createFileRoute("/writing/")({
  loader: () => loadWritings(),
  head: () => ({
    meta: [
      { title: "Writings | ahm0xc" },
      { name: "description", content: "A collection of my writings" },
      { property: "og:title", content: "Writings | ahm0xc" },
      { property: "og:description", content: "A collection of my writings" },
      { property: "og:image", content: "/og?title=Writings%20%7C%20ahm0xc" },
    ],
    links: [{ rel: "canonical", href: "https://www.ahm0xc.me/writing" }],
  }),
  component: WritingPage,
});

function WritingPage() {
  const writings = Route.useLoaderData();

  return (
    <Container className="w-full pt-32 md:pt-48">
      <h1 className="mb-2 font-heading text-3xl font-bold">Writings</h1>
      <p className="mb-12 text-sm text-foreground/80 md:text-base">
        By <Link to="/">Ahmed</Link>
      </p>
      <p className="mb-4 text-foreground/80">Here's a list of my writing:</p>
      <ul className="list-inside list-disc space-y-2 text-foreground/90">
        {writings.map((writing) => (
          <li key={writing.slug} className="text-base md:text-lg">
            <Link to="/writing/$slug" params={{ slug: writing.slug }}>
              {writing.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
