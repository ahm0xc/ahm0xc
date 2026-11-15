import { createFileRoute, notFound } from "@tanstack/react-router";
import { formatDate } from "date-fns";

import Container from "~/components/container";
import { loadProject, loadProjectSlugs } from "~/lib/route-content";
import { cn } from "~/lib/utils";

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ params }) => {
    const slugs = await loadProjectSlugs();
    if (!slugs.includes(params.slug)) throw notFound();
    return loadProject({ data: { slug: params.slug } });
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.frontmatter.name ?? "Project | ahm0xc" },
      ...(loaderData?.frontmatter.shortDescription
        ? [
            {
              name: "description",
              content: loaderData.frontmatter.shortDescription,
            },
          ]
        : []),
      ...(loaderData
        ? [
            { property: "og:title", content: loaderData.frontmatter.name },
            {
              property: "og:description",
              content: loaderData.frontmatter.shortDescription ?? "",
            },
            { property: "og:image", content: loaderData.frontmatter.banner },
          ]
        : []),
    ],
    links: loaderData
      ? [
          {
            rel: "canonical",
            href: `https://www.ahm0xc.me/projects/${loaderData.slug}`,
          },
        ]
      : [],
  }),
  component: ProjectPage,
});

function ProjectPage() {
  const { html, frontmatter } = Route.useLoaderData();

  return (
    <div>
      <Container className="mx-auto max-w-3xl pt-36">
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-heading text-5xl font-semibold">
            {frontmatter.name}
          </h1>
          <p className="mt-2 text-xl text-foreground/80 italic">
            {frontmatter.type}, {new Date(frontmatter.dateStart).getFullYear()}
          </p>
        </div>
        <img
          src={frontmatter.banner}
          className="mt-8 aspect-video h-auto w-full bg-muted"
          alt=""
        />
        <div className="mt-4 flex flex-col gap-8 md:flex-row-reverse md:gap-6">
          <div className="space-y-6 md:flex-1">
            <p>Overview</p>
            <div className="mt-1 space-y-2 text-[15px] text-foreground/80">
              {frontmatter.overview.split("\\n").map((line, index) => (
                <p key={`${index}-${line}`}>{line}</p>
              ))}
            </div>
            {frontmatter.team && frontmatter.team.length > 1 && (
              <div>
                <p>Team</p>
                <ul className="mt-1 text-[15px] text-foreground/80">
                  {frontmatter.team.map((member) => {
                    const [name, href] = member.split("|");
                    return (
                      <li key={member}>
                        {href ? (
                          <a href={href} className="underline">
                            {name}
                          </a>
                        ) : (
                          name
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          <div className="space-y-6 md:flex-1">
            <p>Timeline</p>
            <p className="mt-1 text-[15px] text-foreground/80">
              {formatDate(new Date(frontmatter.dateStart), "d MMM, yyyy")}
              {frontmatter.dateEnd && " — "}
              {frontmatter.dateEnd &&
                formatDate(new Date(frontmatter.dateEnd), "d MMM, yyyy")}
            </p>
            <p>Tools</p>
            <ul className="mt-1 text-[15px] text-foreground/80">
              {frontmatter.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
      <Container className="mt-10">
        <article
          className={cn(
            "prose pt-6 prose-stone dark:prose-invert",
            "prose-h2:mt-12 prose-h2:mb-2"
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Container>
    </div>
  );
}
