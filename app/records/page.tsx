import { RecordBook } from "@/components/record-book";
import { getLeagueArchive } from "@/lib/sleeper";

export default async function RecordsPage() {
  const { records } = await getLeagueArchive({ includeRecordLineups: true });

  return (
    <main className="page-shell">
      <section className="page-heading">
        <p className="eyebrow">Record book</p>
        <h1>Highs, Lows, and Pain</h1>
        <p className="intro-copy">
          A first pass at the league record book, using season totals and weekly
          matchup scores from Sleeper.
        </p>
      </section>

      <RecordBook records={records} />
    </main>
  );
}
