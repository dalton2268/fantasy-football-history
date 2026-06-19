import { TeamIdentity } from "@/components/team-identity";
import { formatPoints, formatRecord } from "@/lib/format";
import { getLeagueArchive } from "@/lib/sleeper";

export default async function RegularSeasonFinishesPage() {
  const archive = await getLeagueArchive();

  return (
    <main className="page-shell">
      <section className="page-heading">
        <p className="eyebrow">League timeline</p>
        <h1>Regular Season Finishes</h1>
        <p className="intro-copy">
          Final regular-season rankings before the playoff bracket starts, with
          records, points scored, and points per game.
        </p>
      </section>

      <section className="season-stack">
        {archive.regularSeasonFinishes.map((season) => (
          <article className="panel season-panel" key={season.leagueId}>
            <div className="season-header">
              <div>
                <p className="eyebrow">{season.leagueName}</p>
                <h2>{season.season}</h2>
              </div>
              <strong>Through Week {season.throughWeek}</strong>
            </div>

            <div className="wide-table regular-season-table">
              <div className="wide-row wide-head regular-season-row">
                <span>Position</span>
                <span>Team</span>
                <span>Record</span>
                <span>PF</span>
                <span>PPG</span>
                <span>PA</span>
              </div>
              {season.teams.map((team) => (
                <div className="wide-row regular-season-row" key={team.ownerId}>
                  <strong>{team.rank}</strong>
                  <TeamIdentity
                    ownerName={team.ownerName}
                    teamName={team.teamName}
                  />
                  <span>{formatRecord(team)}</span>
                  <span>{formatPoints(team.pointsFor)}</span>
                  <span>{formatPoints(team.pointsPerGame)}</span>
                  <span>{formatPoints(team.pointsAgainst)}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
