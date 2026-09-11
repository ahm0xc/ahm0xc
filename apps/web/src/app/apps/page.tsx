import Container from "~/components/container";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";

interface App {
  name: string;
  imageUrl: string;
  description: string;
  status?: undefined | "dropped" | "ongoing";
  link?: string;
}

const apps: App[] = [
  {
    name: "Kagoj",
    imageUrl: "/assets/apps/kagoj.webp",
    description: "A minimal focus oriented ebook reader",
    status: undefined,
    link: "https://kagoj.vercel.app",
  },
  {
    name: "Quite Chat",
    imageUrl: "/assets/apps/quite-chat.webp",
    description: "An OSS, Fast Chat app.",
    status: undefined,
  },
  {
    name: "Negative",
    imageUrl: "/assets/apps/negative.webp",
    description: "A camera app with filter like black pro mist.",
    status: "ongoing",
  },
  {
    name: "Swipe Go",
    imageUrl: "/assets/apps/swipe-go.webp",
    description: "An ios app that lets you swipe and clean your media.",
    status: "ongoing",
  },
  {
    name: "Pakhi",
    imageUrl: "/assets/apps/pakhi.webp",
    description: "An ios app to block distractions.",
    status: "dropped",
  },
  {
    name: "Pygmalion",
    imageUrl: "/assets/apps/pygmalion.webp",
    description:
      "An AI Agent that can build minecraft builds and export as schematics.",
    status: "dropped",
  },
];

export default function AppsPage() {
  return (
    <Container className="pt-32 md:pt-48">
      <div>
        <h1 className="font-heading text-3xl font-bold">Wall of Apps</h1>
        <p className="mt-2 text-base text-pretty text-muted-foreground">
          These are a collection of softwares that I built for me or as a part
          of my entrepreneurship.
        </p>
      </div>

      <section className="mt-10 grid grid-cols-2 sm:grid-cols-3">
        {apps.map((app) => (
          <div
            key={app.name}
            className={cn(
              "flex h-full w-full items-center justify-center border-r-4 border-b-4 border-dashed p-6",
              "nth-last-1:border-r-0 nth-last-1:border-b-0",
              "nth-last-2:border-b-0",
              "sm:nth-last-3:border-b-0",
              "max-sm:nth-[2n]:border-r-0 sm:nth-[3n]:border-r-0"
            )}
          >
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <div className="relative flex flex-col items-center gap-2">
                  <img
                    src={app.imageUrl}
                    className={cn(
                      "size-20 rounded-2xl border border-black/5 object-cover dark:border-white/10",
                      app.status === "dropped" && "opacity-50"
                    )}
                    alt=""
                  />
                  <span
                    className={cn(
                      "text-sm",
                      app.status === "dropped" && "opacity-50"
                    )}
                  >
                    {app.name}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {app.description}{" "}
                {app.status === "ongoing"
                  ? "Coming soon..."
                  : app.status === "dropped"
                    ? "Dropped the project."
                    : null}
              </TooltipContent>
            </Tooltip>
          </div>
        ))}
      </section>
    </Container>
  );
}
