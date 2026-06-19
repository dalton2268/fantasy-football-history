import { HeadToHeadExplorer } from "@/components/head-to-head-explorer";
import { getLeagueArchive } from "@/lib/sleeper";

export default async function HeadToHeadPage() {
  const archive = await getLeagueArchive();

  return (
    <main className="page-shell">
      <section className="page-heading">
        <p className="eyebrow">Records</p>
        <h1>Head-to-Head</h1>
        <p className="intro-copy">
          Pick any owner to see their all-time record against every opponent,
          then expand a matchup to inspect the individual games.
        </p>
      </section>

      <HeadToHeadExplorer owners={archive.headToHead} />
    </main>
  );
}
