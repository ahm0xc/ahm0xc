import { Link, createFileRoute } from "@tanstack/react-router";

import Container from "~/components/container";
import { loadProjects } from "~/lib/route-content";

export const Route = createFileRoute("/projects/")({
  loader: () => loadProjects(),
  head: () => ({
    meta: [
      { title: "Projects | ahm0xc" },
      { name: "description", content: "A collection of my projects" },
      { property: "og:title", content: "Projects | ahm0xc" },
      { property: "og:description", content: "A collection of my projects" },
      { property: "og:image", content: "/og?title=Projects%20%7C%20ahm0xc" },
    ],
    links: [{ rel: "canonical", href: "https://www.ahm0xc.me/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const projects = Route.useLoaderData();

  return (
    <Container className="w-full pt-32">
      <ul className="grid grid-cols-1 gap-8">
        {projects.map((project) => (
          <li key={project.slug} className="group text-base md:text-lg">
            <Link to="/projects/$slug" params={{ slug: project.slug }}>
              <img
                src={project.frontmatter.banner.replace(
                  "/assets/project/",
                  "/assets/project/mini-"
                )}
                className="aspect-video h-auto w-full bg-muted"
                alt=""
              />
              <div className="mt-3">
                <p className="font-heading text-2xl font-medium">
                  <span className="group-hover:underline">
                    {project.frontmatter.name}
                  </span>{" "}
                  — {new Date(project.frontmatter.dateStart).getFullYear()}
                </p>
                <p className="text-sm text-foreground/80">
                  {project.frontmatter.shortDescription}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
