"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  {
    href: "/standings",
    label: "Standings",
    children: [{ href: "/standings", label: "All-Time Standings" }],
  },
  {
    href: "/champions",
    label: "Champions",
    children: [{ href: "/champions", label: "Championship Tracker" }],
  },
  {
    href: "/records",
    label: "Records",
    children: [
      { href: "/records", label: "Record Book" },
      { href: "/records/head-to-head", label: "Head-to-Head" },
      { href: "/records/nicknames", label: "Player Nicknames" },
    ],
  },
  {
    href: "/timeline",
    label: "Timeline",
    children: [
      { href: "/timeline", label: "Season Archive" },
      {
        href: "/timeline/regular-season",
        label: "Regular Season Finishes",
      },
      { href: "/timeline/postseason", label: "Postseason Brackets" },
      { href: "/timeline/trades", label: "Trade Tracker" },
      { href: "/timeline/graveyard", label: "Graveyard" },
    ],
  },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="site-header">
      <Link className="site-brand" href="/" onClick={closeMenu}>
        Fantasy Archive
      </Link>

      <button
        aria-controls="primary-navigation"
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
        className="menu-toggle"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        aria-label="Primary navigation"
        className={`site-nav ${isOpen ? "is-open" : ""}`}
        id="primary-navigation"
      >
        {navItems.map((item) => (
          <div className="nav-item" key={item.href}>
            <Link href={item.href} onClick={closeMenu}>
              {item.label}
            </Link>
            {item.children ? (
              <div className="nav-dropdown">
                {item.children.map((child) => (
                  <Link href={child.href} key={child.href} onClick={closeMenu}>
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </nav>
    </header>
  );
}
