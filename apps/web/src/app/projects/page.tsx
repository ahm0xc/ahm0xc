import { Metadata } from "next";
import Link from "next/link";

import Container from "~/components/container";
import { getAllProjects } from "~/lib/content";

export const metadata: Metadata = {
  title: "Projects | ahm0xc",
  description: "A collection of my projects",
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent("Projects | ahm0xc")}`,
        width: 1200,
        height: 630,
        alt: "Projects | ahm0xc",
      },
    ],
  },
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  function getMiniBanner(bannerUrl: string): string {
    const bannerSplit = bannerUrl.split("/assets/project/");
    return `/assets/project/mini-${bannerSplit[1]}`;
  }

  return (
    <Container className="w-full pt-32">
      <div>
        <ul className="grid grid-cols-1 gap-8">
          {projects.map((project) => {
            return (
              <li key={project.slug} className="group text-base md:text-lg">
                <Link href={`/projects/${project.slug}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getMiniBanner(project.frontmatter.banner)}
                    className="aspect-video h-auto w-full bg-muted"
                    alt=""
                  />
                  <div className="mt-3">
                    <p className="font-serif text-2xl font-medium">
                      <span className="group-hover:underline">
                        {project.frontmatter.name}
                      </span>{" "}
                      {" — "}
                      {new Date(project.frontmatter.dateStart).getFullYear()}
                    </p>
                    <p className="text-base text-foreground/80">
                      {project.frontmatter.shortDescription}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Container>
  );
}
