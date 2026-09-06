"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useTheme } from "next-themes";

import { useHotkeys } from "~/hooks/use-hotkey/use-hotkey";
import useMounted from "~/hooks/use-mounted";
import { cn } from "~/lib/utils";

import Container from "../container";
import { Icons } from "../icons";
import Logo from "../logo";

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
  ]);

  const navItems: NavItem[] = [
    {
      title: "me",
      href: "/",
      isActive: false,
      shortcut: "h",
      hidden: pathname === "/",
    },
    // {
    //   title: "projects",
    //   href: "/projects",
    //   isActive: pathname === "/projects",
    //   shortcut: "p",
    // },
    {
      title: "writing",
      href: "/writing",
      isActive: pathname === "/writing",
      shortcut: "w",
    },
  ];

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <nav className="absolute top-0 right-0 left-0 z-10">
      <Container className="flex w-full items-center justify-between py-2 pt-6">
        <Link href="/">
          <Logo className="size-6 text-foreground" />
        </Link>

        <div className="">
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
      </Container>
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
