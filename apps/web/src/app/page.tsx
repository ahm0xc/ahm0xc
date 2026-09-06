import Link from "next/link";

import Container from "~/components/container";
import { getAllProjects } from "~/lib/content";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <Container className="pt-32 md:pt-48">
      <IntroductionSection />
    </Container>
  );
}

function IntroductionSection() {
  return (
    <section className="flex flex-col">
      <div>
        <h1 className="font-heading text-3xl font-bold">Saif Ahmed</h1>
        <p className="mt-2 text-xl text-muted-foreground">
          Full-stack Developer & Infrastructural Engineer.
        </p>
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        <p className="text-foreground/80">
          I'm Ahmed aka{" "}
          <span className="font-semibold text-foreground hover:underline hover:underline-offset-2">
            ahm0xc
          </span>
          , a self-taught polyglot developer. I've been a web programmer since
          2021. This taught me some powerful lessons on what it takes to build
          scalable software. It's a lot more than JQuery and a dream.
        </p>
      </div>

      <div className="mt-10">
        <p className="font-heading text-lg text-muted-foreground">
          Reach me at{" "}
          <Link
            href="mailto:ahm0xc@proton.me"
            className="text-foreground underline underline-offset-2"
          >
            ahm0xc@proton.me
          </Link>
        </p>
      </div>

      <Separator />

      <WorkSection />

      <Separator />

      <ProjectsSection />
    </section>
  );
}

function WorkSection() {
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

  return (
    <section className="flex flex-col">
      <h2 className="font-heading font-medium">Work</h2>

      <div className="mt-6 flex flex-col gap-6">
        {works.map((work) => (
          <div key={`${work.title}-${work.company}`}>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[15px]">
                {work.title}, {work.company}
              </h3>
              <div className="flex flex-1 items-center gap-2">
                <div className="h-px flex-1 border-b-2 border-dotted border-muted" />
                <p className="text-sm text-muted-foreground">
                  {work.startDate} &mdash; {work.endDate}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                {work.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

async function ProjectsSection() {
  const projects = await getAllProjects();

  return (
    <section className="flex flex-col">
      <h2 className="font-heading font-medium">Projects</h2>

      <div className="mt-6 flex flex-col gap-6">
        {projects.map((p) => (
          <div key={`project-list-item-${p.slug}`}>
            <h3 className="text-[15px]">{p.frontmatter.name}</h3>
            <p className="text-sm text-muted-foreground">
              {p.frontmatter.shortDescription}
            </p>

            <Link
              href={`/projects/${p.slug}`}
              className="mt-1 text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            >
              view →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function Separator() {
  return <div className="my-10 h-px w-full bg-muted" />;
}
