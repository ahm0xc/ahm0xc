import { Link, createFileRoute } from "@tanstack/react-router";

import Container from "~/components/container";
import { loadProjects } from "~/lib/route-content";

export const Route = createFileRoute("/")({
  loader: () => loadProjects(),
  component: HomePage,
});

function HomePage() {
  const projects = Route.useLoaderData();

  return (
    <Container className="pt-32 md:pt-48">
      <section className="flex flex-col">
        <h1 className="font-heading text-3xl font-bold">Saif Ahmed</h1>
        <p className="mt-2 text-xl text-muted-foreground">
          Full-stack Developer &amp; Infrastructural Engineer.
        </p>
        <div className="mt-10">
          <p className="text-foreground/80">
            I'm Ahmed aka{" "}
            <span className="font-semibold text-foreground">ahm0xc</span>,
            self-taught polyglot developer with expertise spanning web, mobile,
            desktop, and CLI applications. Experienced in building scalable
            infrastructure and architecting full-stack solutions from the ground
            up.
            <br />
            <br />
            Passionate about entrepreneurship and creating products that are
            fast and scalable. I have been coding since 2020, which has taught
            me invaluable lessons about building robust, scalable software.
          </p>
        </div>
        <p className="mt-10 font-heading text-lg text-muted-foreground">
          Reach me at{" "}
          <a
            href="mailto:ahm0xc@proton.me"
            className="text-foreground underline underline-offset-2"
          >
            ahm0xc@proton.me
          </a>
        </p>
        <div className="my-10 h-px w-full bg-muted" />
        <h2 className="font-heading font-medium">Work</h2>
        <div className="mt-6 flex flex-col gap-6">
          {works.map((work) => (
            <div key={`${work.title}-${work.company}`}>
              <div className="flex flex-col-reverse justify-between gap-2 sm:flex-row sm:items-center">
                <h3 className="text-[15px]">
                  {work.title}, {work.company}
                </h3>
                <div className="flex flex-1 items-center gap-2">
                  <div className="h-px flex-1 border-b-2 border-dotted border-muted" />
                  <p className="text-sm text-muted-foreground">
                    {work.startDate} — {work.endDate}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {work.description}
              </p>
            </div>
          ))}
        </div>
        <div className="my-10 h-px w-full bg-muted" />
        <h2 className="font-heading font-medium">Projects</h2>
        <div className="mt-6 flex flex-col gap-6">
          {projects.map((project) => (
            <div key={project.slug}>
              <h3 className="text-[15px]">{project.frontmatter.name}</h3>
              <p className="text-sm text-muted-foreground">
                {project.frontmatter.shortDescription}
              </p>
              <Link
                to="/projects/$slug"
                params={{ slug: project.slug }}
                className="mt-1 text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
              >
                view →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}

const works = [
  {
    title: "Lead Mobile Developer",
    company: "Somossa LLC",
    description: "A app studio growing consumer apps.",
    startDate: "Aug 2025",
    endDate: "Now",
  },
  {
    title: "Full-stack Developer",
    company: "Jokuh LLC, NY",
    description: "A Private workspace with your own AI.",
    startDate: "Dec 2023",
    endDate: "Jul 2025",
  },
  {
    title: "Lead Mobile Developer",
    company: "DGA LLC, Germany",
    description: "Mobile app for a digital marketing agency.",
    startDate: "Oct 2024",
    endDate: "Feb 2025",
  },
  {
    title: "Backend Architect",
    company: "HelpSonic LLC. Germany",
    description: "Structured GPT Prompts for AI agents.",
    startDate: "Jul 2023",
    endDate: "Aug 2023",
  },
  {
    title: "Full-stack Developer",
    company: "LG Exports",
    description: "Financial management team for export businesses.",
    startDate: "Jan 2023",
    endDate: "Dec 2023",
  },
  {
    title: "Frontend Developer",
    company: "Grower Nursery",
    description: "Storefront for a nursery business.",
    startDate: "Apr 2022",
    endDate: "Nov 2022",
  },
];
