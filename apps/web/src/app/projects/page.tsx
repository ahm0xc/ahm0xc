import { Metadata } from "next";

import Container from "~/components/container";

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

export default function ProjectsPage() {
  return <Container>coming soon</Container>;
}
