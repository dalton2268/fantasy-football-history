import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fantasy Football League History",
  description: "A home for league history, champions, records, standings, and stats.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link className="site-brand" href="/">
            Fantasy Archive
          </Link>
          <nav className="site-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <div className="nav-item" key={item.href}>
                <Link href={item.href}>{item.label}</Link>
                {item.children ? (
                  <div className="nav-dropdown">
                    {item.children.map((child) => (
                      <Link href={child.href} key={child.href}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
