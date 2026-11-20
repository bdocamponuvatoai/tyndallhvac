"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Brand } from "@/components/ui/brand";
import { ButtonLink } from "@/components/ui/button-link";
import { isCurrentNavItem, mainNav } from "@/config/site";

/** Matches the CSS breakpoint above which the menu toggle is hidden. */
const DESKTOP_QUERY = "(min-width: 801px)";

export function SiteHeader() {
  const pathname = usePathname();
  // The menu belongs to the page it was opened on, so any navigation closes it.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const open = openOnPath === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia(DESKTOP_QUERY);
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpenOnPath(null);
      toggleRef.current?.focus();
    }
    function onBreakpointChange(event: MediaQueryListEvent) {
      if (event.matches) setOpenOnPath(null);
    }
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpointChange);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpointChange);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link href="/" aria-label="Tyndall Heating &amp; Air home">
          <Brand />
        </Link>
        <nav
          aria-label="Main navigation"
          className={open ? "navigation open" : "navigation"}
          id="main-navigation"
        >
          {mainNav.map((item) => (
            <Link
              key={item.href}
              aria-current={
                isCurrentNavItem(pathname, item) ? "page" : undefined
              }
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/contact/" variant="small">
            Let’s get comfortable
          </ButtonLink>
        </nav>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          onClick={() => setOpenOnPath(open ? null : pathname)}
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
