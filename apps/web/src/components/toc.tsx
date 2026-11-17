import { useEffect, useMemo, useRef, useState } from "react";

import { Icons } from "~/components/icons";
import type { TocItem } from "~/lib/toc-utils";
import { cn } from "~/lib/utils";

interface TocProps {
  items: TocItem[];
  className?: string;
}

interface Row {
  top: number;
  height: number;
}

interface Point {
  x: number;
  y: number;
}

const SCROLL_OFFSET = 112;
const DOT_X = 7;
const INDENT = 12;
const BOAT_SIZE = 22;

const clampLevel = (depth: number) => Math.min(Math.max(depth - 1, 1), 3);

const dotX = (depth: number) => DOT_X + (clampLevel(depth) - 1) * INDENT;

function buildPath(rows: Row[], items: TocItem[]) {
  const dots: Point[] = [];

  rows.forEach((row, index) => {
    const item = items[index];
    if (!item) return;
    dots.push({
      x: dotX(item.depth),
      y: row.top + Math.min(row.height / 2, 16),
    });
  });

  if (dots.length < 2) {
    return null;
  }

  const stops: number[] = [0];
  let length = 0;

  for (let index = 1; index < dots.length; index++) {
    const from = dots[index - 1];
    const to = dots[index];
    if (!from || !to) continue;
    length += Math.hypot(to.x - from.x, to.y - from.y);
    stops.push(length);
  }

  if (length === 0) {
    return null;
  }

  const d = dots
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`)
    .join(" ");

  return { d, dots, stops, length };
}

function pointAt(
  dots: Point[],
  stops: number[],
  length: number,
  distance: number
) {
  const target = Math.min(Math.max(distance, 0), length);
  let index = 0;

  while (index < dots.length - 2 && (stops[index + 1] ?? 0) < target) {
    index++;
  }

  const from = dots[index];
  const to = dots[index + 1];

  if (!from || !to) {
    return { x: from?.x ?? 0, y: from?.y ?? 0 };
  }

  const start = stops[index] ?? 0;
  const end = stops[index + 1] ?? start;
  const ratio = end > start ? (target - start) / (end - start) : 0;

  return {
    x: from.x + (to.x - from.x) * ratio,
    y: from.y + (to.y - from.y) * ratio,
  };
}

function useRows(
  ref: React.RefObject<HTMLUListElement | null>,
  items: TocItem[]
) {
  const [rows, setRows] = useState<Row[]>([]);
  const key = items.map((item) => item.id).join("|");

  useEffect(() => {
    const list = ref.current;
    if (!list || !key) return;

    const measure = () => {
      const elements = Array.from(
        list.querySelectorAll<HTMLElement>("[data-toc-row]")
      );
      setRows(
        elements.map((el) => ({ top: el.offsetTop, height: el.offsetHeight }))
      );
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(list);
    for (const element of list.querySelectorAll("[data-toc-row]")) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [ref, key]);

  return rows;
}

function useActiveHeading(items: TocItem[]) {
  const [active, setActive] = useState<string | undefined>(items[0]?.id);
  const locked = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const key = items.map((item) => item.id).join("|");

  useEffect(() => {
    const ids = key ? key.split("|") : [];
    if (ids.length === 0) return;

    let frame = 0;

    const compute = () => {
      frame = 0;
      if (locked.current) return;

      let current = ids[0];
      for (const id of ids) {
        const element = document.getElementById(id);
        if (
          element &&
          element.getBoundingClientRect().top <= SCROLL_OFFSET + 1
        ) {
          current = id;
        }
      }

      const atEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atEnd) current = ids[ids.length - 1];

      setActive(current);
    };

    const onScroll = () => {
      if (locked.current) {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          locked.current = false;
        }, 160);
      }
      if (!frame) frame = requestAnimationFrame(compute);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    frame = requestAnimationFrame(compute);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      clearTimeout(timer.current);
      locked.current = false;
    };
  }, [key]);

  const select = (id: string) => {
    locked.current = true;
    setActive(id);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      locked.current = false;
    }, 1500);
  };

  return [active, select] as const;
}

export function Toc({ items, className }: TocProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const boatRef = useRef<HTMLDivElement>(null);
  const distanceRef = useRef(0);

  const rows = useRows(listRef, items);
  const geo = useMemo(() => buildPath(rows, items), [rows, items]);
  const [active, select] = useActiveHeading(items);

  const index = Math.max(
    0,
    items.findIndex((item) => item.id === active)
  );
  const progress = geo ? (geo.stops[index] ?? 0) / geo.length : 0;

  useEffect(() => {
    if (!geo) return;

    const target = geo.stops[index] ?? 0;
    const from = distanceRef.current;
    const place = (distance: number) => {
      const point = pointAt(geo.dots, geo.stops, geo.length, distance);
      const node = boatRef.current;
      if (!node) return;
      node.style.transform = `translate3d(${point.x - BOAT_SIZE / 2}px, ${
        point.y - BOAT_SIZE / 2
      }px, 0)`;
      node.style.opacity = "1";
    };

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced || from === target) {
      distanceRef.current = target;
      place(target);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = Math.min(900, 320 + Math.abs(target - from) / 2);

    const step = (now: number) => {
      const elapsed = Math.min(1, (now - start) / duration);
      const eased =
        elapsed < 0.5 ? 4 * elapsed ** 3 : 1 - (-2 * elapsed + 2) ** 3 / 2;
      const distance = from + (target - from) * eased;
      distanceRef.current = distance;
      place(distance);
      if (elapsed < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [geo, index]);

  if (items.length === 0) {
    return null;
  }

  const navigate = (id: string) => {
    select(id);
    const element = document.getElementById(id);
    if (!element) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const top =
      window.scrollY + element.getBoundingClientRect().top - SCROLL_OFFSET + 1;

    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav
      className={cn(
        "max-h-[calc(100vh-8rem)] w-full max-w-64 overflow-y-auto",
        className
      )}
      aria-label="Table of contents"
    >
      <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold text-foreground">
        <Icons.list className="size-3.5 text-muted-foreground" />
        On this page
      </h2>
      <ul ref={listRef} className="relative">
        {geo ? (
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 size-full overflow-visible"
          >
            <path
              d={geo.d}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.25}
              strokeDasharray="3 4"
              className="text-muted-foreground opacity-40"
            />
            <path
              d={geo.d}
              fill="none"
              pathLength={1}
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="1 1"
              strokeDashoffset={1 - progress}
              className="text-foreground transition-[stroke-dashoffset] duration-500 ease-out"
            />
            {geo.dots.map((point, dotIndex) =>
              dotIndex === index ? null : (
                <circle
                  key={dotIndex}
                  cx={point.x}
                  cy={point.y}
                  r={dotIndex < index ? 2.5 : 2.25}
                  strokeWidth={1.25}
                  className={cn(
                    "transition-colors duration-300",
                    dotIndex < index
                      ? "fill-foreground stroke-foreground"
                      : "fill-background stroke-muted-foreground"
                  )}
                />
              )
            )}
          </svg>
        ) : null}
        <div
          ref={boatRef}
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 text-foreground opacity-0"
          style={{ width: BOAT_SIZE, height: BOAT_SIZE }}
        >
          <Icons.boat className="toc-boat size-full" />
        </div>
        {items.map((item, itemIndex) => (
          <li key={item.id} data-toc-row>
            <a
              href={`#${item.id}`}
              aria-current={itemIndex === index ? "location" : undefined}
              onClick={(event) => {
                event.preventDefault();
                navigate(item.id);
              }}
              className={cn(
                "block py-1.5 pr-2 text-xs leading-5 transition-colors duration-300",
                itemIndex === index
                  ? "text-foreground"
                  : itemIndex < index
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-muted-foreground/60 hover:text-foreground"
              )}
              style={{ paddingLeft: dotX(item.depth) + 15 }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
