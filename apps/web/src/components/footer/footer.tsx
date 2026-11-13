import * as React from "react";

import Link from "next/link";

import Container from "~/components/container";
import { Icons } from "~/components/icons";
import Signature from "~/components/signature";

const Footer: React.FC = () => {
  return (
    <Container className="w-full px-0 pt-10 sm:px-4">
      <footer className="relative px-4 sm:px-0">
        <div className="boat-scene" aria-hidden="true">
          <pre className="boat-art">{String.raw`             |\
            /:|:\
           /::|::\
          /:::|:::\
         /::::|::::\
        /_____|_____\
             |::\::::\
        _____|:::\_______\
       /==o==o==o==o==o===\
      /####################\
      \####################/`}</pre>
          <pre className="boat-art boat-art-small boat-art-small-one">{String.raw`    /\
   /::\
     |:\
 ___|::\___
 \##o####_/`}</pre>
          <pre className="boat-art boat-art-small boat-art-small-two">{String.raw`   /\
  /::\
    |:\
 __|::\__
 \##o###/`}</pre>
          <pre className="boat-wake">
            {"~~~~~ ~~~~~~ ~~~~~ ~~~~~~ ~~~~~ ~~~~~~ ".repeat(12)}
          </pre>
          <pre className="boat-water boat-water-back">
            {"~~~~~ ~~~~~~~~ ~~~~~ ~~~~~~~~ ~~~~~~ ~~~~~~~~ ".repeat(12)}
          </pre>
          <pre className="boat-water boat-water-middle">
            {"~~ ~~~~~~~~ ~~~~~ ~~ ~~~~~~~~ ~~~~~ ~~ ~~~~~~~~ ".repeat(12)}
          </pre>
          <pre className="boat-water boat-water-front">
            {"~~~~~~~ ~~ ~~~~~~~~ ~~~~~~~ ~~ ~~~~~~~~ ~~~~~~~ ".repeat(12)}
          </pre>
        </div>
        <div className="flex h-16 items-center justify-between">
          <div>
            <Signature />
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="https://x.com/ahm0xc"
              aria-label="X (Twitter)"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icons.twitter className="size-4" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/ahm0xc/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icons.linkedin className="size-5" />
            </Link>
          </div>
        </div>
      </footer>
    </Container>
  );
};

export default Footer;
