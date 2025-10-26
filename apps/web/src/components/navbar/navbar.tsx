"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useTheme } from "next-themes";

import { cn } from "~/lib/utils";

import { Icons } from "../icons";

export default function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  const navItems = [
    {
      title: "projects",
      href: "/projects",
      isActive: pathname === "/projects",
    },
    {
      title: "blog",
      href: "/blog",
      isActive: pathname === "/blog",
    },
    {
      title: "resume",
      href: "/resume",
      isActive: pathname === "/resume",
    },
  ];

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  const isHome = pathname === "/";

  return (
    <nav className="absolute top-0 right-0 z-10">
      <div className="px-2 py-2 pr-6 pt-6">
        <div className="flex items-center justify-center gap-4">
          {!isHome && <NavbarItem title="me" href="/" isActive={false} />}
          {navItems.map((item) => (
            <NavbarItem key={item.title} {...item} />
          ))}
          <button onClick={toggleTheme}>
            {resolvedTheme === "dark" ? (
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

function NavbarItem({
  title,
  href,
  isActive,
}: {
  title: string;
  href: string;
  isActive: boolean;
}) {
  return (
    <Link href={href}>
      <button
        type="button"
        className={cn(
          "text-muted-foreground cursor-pointer hover:text-primary",
          isActive && "text-primary"
        )}
      >
        {title}
      </button>
    </Link>
  );
}
