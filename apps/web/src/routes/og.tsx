import { createFileRoute } from "@tanstack/react-router";
import { ImageResponse } from "workers-og";

import fontUrl from "../../public/InstrumentSerif-Regular.ttf?inline";
import templateUrl from "../../public/opengraph-template.png?inline";

function decodeDataUrl(dataUrl: string) {
  const base64 = dataUrl.slice(dataUrl.indexOf(",") + 1);
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index++) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes.buffer;
}

export const Route = createFileRoute("/og")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const title =
          new URL(request.url).searchParams.get("title") ?? "ahm0xc";

        return new ImageResponse(
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              fontFamily: "Serif",
              backgroundImage: `url(${templateUrl})`,
            }}
          >
            <div
              style={{
                display: "flex",
                position: "absolute",
                bottom: 0,
                left: 0,
                padding: 64,
                maxWidth: 900,
              }}
            >
              <p style={{ fontSize: 80, color: "white" }}>{title}</p>
            </div>
          </div>,
          {
            width: 1200,
            height: 630,
            fonts: [
              { name: "Serif", data: decodeDataUrl(fontUrl), weight: 400 },
            ],
          }
        );
      },
    },
  },
});
