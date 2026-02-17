import { Metadata } from "next";
import Link from "next/link";

import { formatDate } from "date-fns";

import Container from "~/components/container";
import { getProjectBySlug, getProjectSlugs } from "~/lib/content";
import { cn } from "~/lib/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const { frontmatter } = await getProjectBySlug(slug);

  return {
    title: frontmatter.name as string,
    description: frontmatter.shortDescription as string,
    openGraph: {
      title: frontmatter.name as string,
      description: frontmatter.shortDescription as string,
      images: [
        {
          url: frontmatter.banner,
          width: 1200,
          height: 630,
          alt: frontmatter.name as string,
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

  const { content, frontmatter } = await getProjectBySlug(slug);

  return (
    <div>
      <Container className="mx-auto max-w-3xl pt-36">
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-serif text-5xl font-semibold">
            {frontmatter.name as string}
          </h1>
          <p className="mt-2 text-xl text-foreground/80 italic">
            {frontmatter.type}, {new Date(frontmatter.dateStart).getFullYear()}
          </p>
        </div>
        <div className="mt-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={frontmatter.banner}
            className="aspect-video h-auto w-full bg-muted"
            alt=""
          />
        </div>
        <div className="mt-4 flex flex-col gap-8 md:flex-row-reverse md:gap-6">
          <div className="space-y-6 md:flex-1">
            <div>
              <p>Overview</p>
              <div className="mt-1 space-y-2 text-[15px] text-foreground/80">
                {frontmatter.overview.split("\\n").map((x, idx) => (
                  <p
                    key={`${frontmatter.name}-overview-block-${idx}`}
                    className=""
                  >
                    {x}
                  </p>
                ))}
              </div>
            </div>
            {frontmatter.team && frontmatter.team.length > 1 && (
              <div>
                <p>Team</p>
                <ul className="mt-1 text-[15px] text-foreground/80">
                  {frontmatter.team?.map((team) => {
                    const link = team.includes("|") && team.split("|")[1];
                    const cleanTeamMemberName = team.includes("|")
                      ? team.split("|")[0]
                      : team;
                    return (
                      <li key={`${frontmatter.name}-team-${team}`}>
                        {link ? (
                          <Link href={link} className="underline">
                            {cleanTeamMemberName}
                          </Link>
                        ) : (
                          cleanTeamMemberName
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          <div className="space-y-6 md:flex-1">
            <div>
              <p>Timeline</p>
              <p className="mt-1 text-[15px] text-foreground/80">
                {formatDate(new Date(frontmatter.dateStart), "d MMM, yyyy")}
                {frontmatter.dateEnd && " — "}
                {frontmatter.dateEnd &&
                  formatDate(new Date(frontmatter.dateEnd), "d MMM, yyyy")}
              </p>
            </div>
            <div>
              <p>Tools</p>
              <ul className="mt-1 text-[15px] text-foreground/80">
                {frontmatter.tools.map((tool) => (
                  <li key={`${frontmatter.name}-tool-${tool}`}>{tool}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      <Container className="mt-10">
        <article
          className={cn(
            "prose pt-6 prose-stone dark:prose-invert",
            "prose-h2:mt-12 prose-h2:mb-2"
          )}
        >
          {content}
        </article>
      </Container>
    </div>
  );
}
