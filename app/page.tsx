import Link from "next/link";
import { getLeagueArchive } from "@/lib/sleeper";

const featureCards = [
  {
    href: "/standings",
    eyebrow: "All-time standings",
    title: "Career leaderboard",
    description:
      "Wins, losses, win percentage, points scored, points allowed, and titles by owner.",
  },
  {
    href: "/champions",
    eyebrow: "Championship tracker",
    title: "Title history",
    description:
      "Every champion we can identify from Sleeper, plus a quick trophy count by manager.",
  },
  {
    href: "/records",
    eyebrow: "Record book",
    title: "Highs, lows, and pain",
    description:
      "Highest scoring season, best record, weekly high score, lowest week, blowouts, and close calls.",
  },
  {
    href: "/timeline",
    eyebrow: "League timeline",
    title: "Season archive",
    description:
      "A year-by-year snapshot with champion, scoring leader, playoff format, and standings.",
  },
];

export default async function Home() {
  const archive = await getLeagueArchive();
  const activeSeason = archive.activeSeason;

  return (
    <main className="page-shell">
      <section className="intro home-intro">
        <p className="eyebrow">Sleeper league archive</p>
        <h1>Fantasy Football League History</h1>
        <p className="intro-copy">
          A proper home base for {activeSeason?.name ?? "your league"}:
          standings, champions, records, and season history pulled from Sleeper.
        </p>
      </section>

      <section className="stats-strip" aria-label="League summary">
        <div>
          <span>League</span>
          <strong>{activeSeason?.name ?? "Loading"}</strong>
        </div>
        <div>
          <span>Current season</span>
          <strong>{activeSeason?.season ?? "2025"}</strong>
        </div>
        <div>
          <span>Teams</span>
          <strong>{activeSeason?.totalTeams ?? "-"}</strong>
        </div>
        <div>
          <span>Tracked seasons</span>
          <strong>{archive.seasons.length}</strong>
        </div>
      </section>

      <section className="feature-grid" aria-label="Explore the archive">
        {featureCards.map((card) => (
          <Link className="feature-card" href={card.href} key={card.href}>
            <span>{card.eyebrow}</span>
            <strong>{card.title}</strong>
            <p>{card.description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
