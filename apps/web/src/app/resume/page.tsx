import { Metadata } from "next";
import Link from "next/link";

import Container from "~/components/container";
import { cn } from "~/lib/utils";

export const metadata: Metadata = {
  title: "Resume | ahm0xc",
  description:
    "Saif Ahmed - Self-taught polyglot developer specializing in full-stack development, infrastructure engineering, and entrepreneurship",
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent("Resume | ahm0xc")}`,
        width: 1200,
        height: 630,
        alt: "Resume | ahm0xc",
      },
    ],
  },
};

type Experience = {
  companyName: string;
  companyUrl: string;
  logoUrl: string;
  position: string;
  period: string;
  details: string;
};

export default function ResumePage() {
  const experiences: Experience[] = [
    {
      companyName: "Ollyo",
      companyUrl: "https://ollyo.com",
      logoUrl: "/ollyo-logo.svg",
      position: "Infrastructure Engineer",
      period: "2021 — 2023",
      details:
        "Implemented high-performance database solutions, designed distributed systems architecture, optimized application performance and reliability, and automated deployment and CI/CD pipelines.",
    },
    {
      companyName: "Jokuh",
      companyUrl: "https://www.jokuh.com",
      logoUrl: "/jokuh-logo.png",
      position: "CTO",
      period: "2023 — Present",
      details:
        "Architected and deployed production-grade web applications, built cross-platform mobile and desktop applications, developed CLI tools for developer productivity, and designed and maintained scalable backend infrastructure.",
    },
  ];

  return (
    <Container className="pt-32">
      <div className="flex flex-col gap-16">
        <ResumeHeader />

        <AboutSection />

        <ExperienceSection experiences={experiences} />

        <SkillsSection />

        <ProjectsSection />

        <EducationSection />

        <FooterNoteSection />
      </div>
    </Container>
  );
}

function ResumeHeader() {
  return (
    <header className="flex flex-col gap-4">
      <h1 className="font-serif text-4xl text-foreground md:text-5xl">
        Saif Ahmed
      </h1>
      <p className="text-xl text-muted-foreground">
        Full-Stack Developer & Infrastructure Engineer
      </p>
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <Link
          href="https://x.com/ahm0xc"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-foreground"
        >
          @ahm0xc
        </Link>
        <span>•</span>
        <span>Bangladesh</span>
      </div>
    </header>
  );
}

function AboutSection() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-serif text-2xl text-foreground">About</h2>
      <div className="flex flex-col gap-4 text-foreground/80">
        <p>
          Self-taught polyglot developer with expertise spanning web, mobile,
          desktop, and CLI applications. Experienced in building scalable
          infrastructure and architecting full-stack solutions from the ground
          up.
        </p>
        <p>
          Passionate about entrepreneurship and creating products that is fast
          and scalable. Been coding since the pre-npm era, which has taught me
          invaluable lessons about building robust, scalable software.
        </p>
      </div>
    </section>
  );
}

function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-serif text-2xl text-foreground">Experience</h2>
      <ExperienceTimeline experiences={experiences} />
    </section>
  );
}

function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  return (
    <div className="relative">
      <ol>
        {experiences.map((exp, index) => (
          <ExperienceTimelineItem
            key={exp.companyName + exp.period}
            exp={exp}
            isLast={index === experiences.length - 1}
          />
        ))}
      </ol>
    </div>
  );
}

function ExperienceTimelineItem({
  exp,
  isLast,
}: {
  exp: Experience;
  isLast: boolean;
}) {
  return (
    <li className={cn("relative flex gap-4 pb-10", isLast && "pb-0")}>
      <div
        className={cn(
          "absolute top-0 bottom-0 left-4 z-0 w-1 -translate-x-1/2 bg-linear-to-b from-muted to-muted",
          isLast && "to-transparent"
        )}
      />
      <div className="z-1 flex h-8 min-w-8 items-center justify-center overflow-hidden rounded-full bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={exp.logoUrl}
          alt={exp.companyName}
          className="h-full w-full object-contain p-1.5 dark:invert"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <Link
            href={exp.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:underline"
          >
            {exp.companyName}
          </Link>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{exp.period}</span>
        </div>
        <div className="text-foreground/80">{exp.position}</div>
        <p className="mt-2 text-foreground/80">{exp.details}</p>
      </div>
    </li>
  );
}

function SkillsSection() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-serif text-2xl text-foreground">Skills</h2>
      <div className="flex flex-col gap-6">
        <SkillCategory
          category="Languages"
          skills={["TypeScript", "JavaScript", "Python", "Rust"]}
        />
        <SkillCategory
          category="Frontend Frameworks"
          skills={["React", "Next.js", "Astro"]}
        />
        <SkillCategory
          category="Styling Solutions"
          skills={["Tailwind CSS", "Styled Components", "Sass/SCSS"]}
        />
        <SkillCategory
          category="Backend & APIs"
          skills={[
            "Node.js",
            "Express",
            "tRPC",
            "GraphQL",
            "REST APIs",
            "Prisma",
            "Drizzle ORM",
          ]}
        />
        <SkillCategory
          category="Databases"
          skills={["PostgreSQL", "MySQL", "Redis"]}
        />
        <SkillCategory
          category="Mobile Development"
          skills={["React Native", "Expo", "NativeWind"]}
        />
        <SkillCategory
          category="Desktop Development"
          skills={["Electron", "Tauri"]}
        />
        <SkillCategory
          category="Infrastructure & DevOps"
          skills={["Docker", "CI/CD", "Nginx"]}
        />
        <SkillCategory
          category="Tools & Practices"
          skills={[
            "Git",
            "GitHub Actions",
            "Turborepo",
            "Vite",
            "Webpack",
            "Testing (Vitest/Jest)",
            "System Design",
            "Performance Optimization",
          ]}
        />
      </div>
    </section>
  );
}

interface SkillCategoryProps {
  category: string;
  skills: string[];
}

function SkillCategory({ category, skills }: SkillCategoryProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-foreground">{category}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-md bg-muted px-3 py-1 text-sm text-foreground"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-serif text-2xl text-foreground">Projects</h2>
      <p className="text-foreground/80">
        I&apos;ve worked on numerous projects spanning different domains and
        technologies. Check out my{" "}
        <Link
          href="/projects"
          className="font-serif text-foreground hover:underline"
        >
          projects page
        </Link>{" "}
        for a detailed showcase of my work.
      </p>
    </section>
  );
}

function EducationSection() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-serif text-2xl text-foreground">Education</h2>
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-foreground">Self-Taught Developer</h3>
        <p className="text-foreground/80">
          Continuous learning through hands-on projects, open-source
          contributions, documentation, and building real-world applications.
        </p>
      </div>
    </section>
  );
}

function FooterNoteSection() {
  return (
    <section className="border-t border-border pt-8">
      <p className="text-sm text-muted-foreground">
        Want to get in touch? Find me on{" "}
        <Link
          href="https://x.com/ahm0xc"
          target="_blank"
          rel="noopener noreferrer"
          className="font-serif text-foreground hover:underline"
        >
          Twitter/X
        </Link>{" "}
        or check out my{" "}
        <Link
          href="/writing"
          className="font-serif text-foreground hover:underline"
        >
          writing
        </Link>
        .
      </p>
    </section>
  );
}
