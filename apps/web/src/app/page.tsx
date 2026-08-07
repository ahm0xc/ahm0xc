import Link from "next/link";

import Container from "~/components/container";
import Signature from "~/components/signature";

export default function HomePage() {
  return (
    <Container className="pt-32 md:pt-48">
      <IntroductionSection />
    </Container>
  );
}

function IntroductionSection() {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <p className="text-2xl text-muted-foreground">
          <Signature className="inline h-7 text-foreground" /> Developer &
          Infrastructural Engineer, focused in entrepreneurship.
        </p>
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        <p className="text-foreground/80">
          Hey there! I&apos;m Ahmed aka{" "}
          <Link
            href="https://x.com/ahm0xc"
            className="font-serif text-foreground"
            target="_blank"
          >
            ahm0xc
          </Link>
          , a self-taught polyglot developer from Bangladesh. You might know me
          as someone who builds web application or maybe backend infra or maybe
          mobile application or maybe desktop application or maybe some cli
          application or maybe...
        </p>
        <p className="text-foreground/80">
          Heck, maybe you don&apos;t even know me. I&apos;ve been a web
          programmer since the pre-npm days. This taught me some... powerful
          lessons on what it takes to build scalable software. It&apos;s a lot
          more than JQuery and a dream.
        </p>
      </div>
    </section>
  );
}
