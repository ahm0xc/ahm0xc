import * as React from "react";

import Container from "~/components/container";
import Signature from "~/components/signature";

import Clock from "./clock";

const Footer: React.FC = () => {
  return (
    <Container className="px-0 sm:px-4 w-full pt-10">
      <footer className="relative px-4 sm:px-0">
        <div className="wavy-line opacity-50 absolute top-0 left-0 right-0 -translate-y-0.5" />
        <div className="flex items-center justify-between h-16">
          <div>
            <Signature />
          </div>
          <div>
            <Clock />
          </div>
        </div>
      </footer>
    </Container>
  );
};

export default Footer;
