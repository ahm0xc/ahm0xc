import { readFileSync } from "node:fs";
import path from "node:path";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/og")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const loadImageResponse = import("@vercel/og").then(
          ({ ImageResponse }) => ImageResponse
        );
        const title =
          new URL(request.url).searchParams.get("title") ?? "ahm0xc";
        const template = readFileSync(
          path.join(process.cwd(), "public/opengraph-template.png")
        );
        const font = readFileSync(
          path.join(process.cwd(), "public/InstrumentSerif-Regular.ttf")
        );

        return loadImageResponse.then(
          (ImageResponse) =>
            new ImageResponse(
              <div
                tw="w-full h-full flex"
                style={{
                  fontFamily: "Serif",
                  backgroundImage: `url(data:image/png;base64,${template.toString("base64")})`,
                }}
              >
                <div tw="absolute bottom-0 left-0 p-16 max-w-[900px] flex">
                  <p tw="text-[80px] text-white">{title}</p>
                </div>
              </div>,
              {
                width: 1200,
                height: 630,
                fonts: [{ name: "Serif", data: font, weight: 400 }],
              }
            )
        );
      },
    },
  },
});
