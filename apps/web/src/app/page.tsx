import Link from "next/link";

import Avatar from "~/components/avatar";
import Container from "~/components/container";

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
        <Avatar className="size-10" />
      </div>
      <div>
        <p className="text-2xl text-muted-foreground">
          <span className="font-serif text-foreground text-3xl italic">
            Saif Ahmed.
          </span>{" "}
          Developer & Infrastructural Engineer, focused in entrepreneurship.
        </p>
      </div>
      <div className="mt-10 flex flex-col gap-6 w-full">
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
