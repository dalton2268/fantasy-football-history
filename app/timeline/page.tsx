import { formatPoints, formatRecord } from "@/lib/format";
import { getLeagueArchive } from "@/lib/sleeper";
import { TeamIdentity } from "@/components/team-identity";

export default async function TimelinePage() {
  const archive = await getLeagueArchive();

  return (
    <main className="page-shell">
      <section className="page-heading">
        <p className="eyebrow">League timeline</p>
        <h1>Season Archive</h1>
        <p className="intro-copy">
          A season-by-season rollup with champion, scoring leader, league size,
          and the top finishers.
        </p>
      </section>

      <section className="season-stack">
        {archive.seasons.map((season) => (
          <article className="panel season-panel" key={season.leagueId}>
            <div className="season-header">
              <div>
                <p className="eyebrow">{season.name}</p>
                <h2>{season.season}</h2>
              </div>
              <strong>{season.totalTeams} teams</strong>
            </div>

            <div className="format-grid compact-format">
              <div>
                <span>Champion</span>
                <TeamIdentity
                  ownerName={season.champion?.ownerName}
                  teamName={season.champion?.teamName}
                />
              </div>
              <div>
                <span>Scoring leader</span>
                <TeamIdentity
                  ownerName={season.scoringLeader?.ownerName}
                  teamName={season.scoringLeader?.teamName}
                />
              </div>
              <div>
                <span>Leader PF</span>
                <strong>{formatPoints(season.scoringLeader?.pointsFor)}</strong>
              </div>
              <div>
                <span>Playoff teams</span>
                <strong>{season.settings.playoffTeams ?? "-"}</strong>
              </div>
            </div>

            <div className="standings-table mini-table">
              <div className="table-row table-head">
                <span>Top finishers</span>
                <span>Record</span>
                <span>PF</span>
              </div>
              {season.standings.slice(0, 4).map((team) => (
                <div className="table-row" key={team.rosterId}>
                  <TeamIdentity
                    ownerName={team.ownerName}
                    teamName={team.teamName}
                  />
                  <span>{formatRecord(team)}</span>
                  <span>{formatPoints(team.pointsFor)}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
