import { Metadata } from "next";

import Container from "~/components/container";

export const metadata: Metadata = {
  title: "Resume | ahm0xc",
  description: "My personal resume",
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

export default function ResumePage() {
  return <Container>coming soon</Container>;
}
