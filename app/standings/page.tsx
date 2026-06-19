import { getLeagueArchive } from "@/lib/sleeper";
import { SortableStandingsTable } from "@/components/sortable-standings-table";

export default async function StandingsPage() {
  const archive = await getLeagueArchive();

  return (
    <main className="page-shell">
      <section className="page-heading">
        <p className="eyebrow">All-time standings</p>
        <h1>Career Leaderboard</h1>
        <p className="intro-copy">
          The long view: every owner we can map across Sleeper seasons, ranked
          by titles, win percentage, and points.
        </p>
      </section>

      <section className="panel">
        <SortableStandingsTable standings={archive.allTimeStandings} />
      </section>
    </main>
  );
}
