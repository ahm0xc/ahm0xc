import * as React from "react";

import Container from "~/components/container";
import Signature from "~/components/signature";

import Clock from "./clock";

const Footer: React.FC = () => {
  return (
    <Container className="w-full px-0 pt-10 sm:px-4">
      <footer className="relative px-4 sm:px-0">
        <div className="flex h-16 items-center justify-between">
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
