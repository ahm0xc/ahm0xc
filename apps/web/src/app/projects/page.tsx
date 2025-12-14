import { Metadata } from "next";
import Image from "next/image";
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

  return (
    <Container className="w-full pt-32">
      <div>
        <ul className="grid grid-cols-1 gap-8">
          {projects.map((project) => (
            <li key={project.slug} className="text-base md:text-lg group">
              <Link href={`/projects/${project.slug}`}>
                <Image
                  src={project.frontmatter.banner}
                  width={600}
                  height={350}
                  alt=""
                />
                <div className="mt-3">
                  <p className="text-2xl font-medium font-pixel">
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
          ))}
        </ul>
      </div>
    </Container>
  );
}
