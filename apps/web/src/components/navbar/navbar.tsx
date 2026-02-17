"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useTheme } from "next-themes";

import { useHotkeys } from "~/hooks/use-hotkey/use-hotkey";
import useMounted from "~/hooks/use-mounted";
import { cn } from "~/lib/utils";
import { useSnowfallStore } from "~/store/snowfall-store";

import { Icons } from "../icons";

interface NavItem {
  title: string;
  href: string;
  isActive: boolean;
  shortcut?: string;
  hidden?: boolean;
}

export default function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const router = useRouter();
  const { isEnabled: isSnowfallEnabled, toggle: toggleSnowfall } =
    useSnowfallStore();

  useHotkeys([
    ["h", () => router.push("/")],
    ["p", () => router.push("/projects")],
    ["w", () => router.push("/writing")],
  ]);

  const navItems: NavItem[] = [
    {
      title: "me",
      href: "/",
      isActive: false,
      shortcut: "h",
      hidden: pathname === "/",
    },
    {
      title: "projects",
      href: "/projects",
      isActive: pathname === "/projects",
      shortcut: "p",
    },
    {
      title: "writing",
      href: "/writing",
      isActive: pathname === "/writing",
      shortcut: "w",
    },
  ];

  function handleToggleSnowfall() {
    if (resolvedTheme === "light") return;
    toggleSnowfall();
  }

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <nav className="absolute top-0 right-0 z-10">
      <div className="px-2 py-2 pt-6 pr-6">
        <div className="flex items-center justify-center gap-4">
          {navItems.map((item) => {
            return <NavbarItem key={item.title} {...item} />;
          })}
          <button onClick={handleToggleSnowfall} title="Toggle Snowfall">
            <Icons.snow
              className={cn(
                "text-muted-foreground",
                !isSnowfallEnabled && "text-destructive-foreground"
              )}
            />
          </button>
          <button onClick={toggleTheme} title="Toggle theme">
            {mounted && resolvedTheme === "dark" ? (
              <Icons.sun className="text-muted-foreground" />
            ) : (
              <Icons.moon className="text-muted-foreground" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

function NavbarItem({ title, href, isActive, shortcut, hidden }: NavItem) {
  if (hidden) return;
  return (
    <Link href={href}>
      <button
        type="button"
        className={cn(
          "cursor-pointer text-muted-foreground hover:text-primary",
          isActive && "text-primary"
        )}
      >
        <span className="hidden font-mono text-sm text-muted-foreground/80 lg:inline-block">
          [{shortcut}]
        </span>{" "}
        {title}
      </button>
    </Link>
  );
}
