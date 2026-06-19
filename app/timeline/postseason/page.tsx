import { PostseasonBrackets } from "@/components/postseason-brackets";
import { getLeagueArchive } from "@/lib/sleeper";

export default async function PostseasonPage() {
  const archive = await getLeagueArchive({ includePlayoffBrackets: true });

  return (
    <main className="page-shell">
      <section className="page-heading">
        <p className="eyebrow">League timeline</p>
        <h1>Postseason Brackets</h1>
        <p className="intro-copy">
          A year-by-year look at the playoff bracket, with teams, users, rounds,
          scores, and expandable starting lineups pulled from Sleeper where
          available.
        </p>
      </section>

      <PostseasonBrackets brackets={archive.playoffBrackets} />
    </main>
  );
}
