import { readFileSync } from "node:fs";
import * as path from "node:path";

import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") || "ahm0xc";

  const template = readFileSync(
    path.join(process.cwd(), "public", "opengraph-template.png")
  );

  const fontPixel = readFileSync(
    path.join(process.cwd(), "public", "pixelify-sans.ttf")
  );

  return new ImageResponse(
    (
      <div
        tw="w-full h-full flex"
        style={{
          fontFamily: "Pixel",
          backgroundImage: `url(data:image/png;base64,${template.toString("base64")})`,
        }}
      >
        <div tw="absolute bottom-0 left-0 p-8 max-w-[1000px] flex">
          <p tw="text-[80px] text-white">{title}</p>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Pixel",
          data: fontPixel,
          weight: 400,
        },
      ],
    }
  );
}
