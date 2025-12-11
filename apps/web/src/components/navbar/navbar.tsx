"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useTheme } from "next-themes";

import { useHotkeys } from "~/hooks/use-hotkey/use-hotkey";
import useMounted from "~/hooks/use-mounted";
import { cn } from "~/lib/utils";

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

  useHotkeys([
    ["h", () => router.push("/")],
    ["p", () => router.push("/projects")],
    ["w", () => router.push("/writing")],
    ["r", () => router.push("/resume")],
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
    {
      title: "resume",
      href: "/resume",
      isActive: pathname === "/resume",
      shortcut: "r",
    },
  ];

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <nav className="absolute top-0 right-0 z-10">
      <div className="px-2 py-2 pr-6 pt-6">
        <div className="flex items-center justify-center gap-4">
          {navItems.map((item) => {
            return <NavbarItem key={item.title} {...item} />;
          })}
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
          "text-muted-foreground cursor-pointer hover:text-primary",
          isActive && "text-primary"
        )}
      >
        <span className="font-mono text-muted-foreground/80 text-sm hidden lg:inline-block">
          [{shortcut}]
        </span>{" "}
        {title}
      </button>
    </Link>
  );
}
