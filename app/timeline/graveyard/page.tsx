import { formatPct, formatPoints } from "@/lib/format";
import { getLeagueArchive } from "@/lib/sleeper";
import { TeamIdentity } from "@/components/team-identity";

export default async function GraveyardPage() {
  const archive = await getLeagueArchive();

  return (
    <main className="page-shell">
      <section className="page-heading graveyard-heading">
        <p className="eyebrow">League timeline</p>
        <h1>The Graveyard</h1>
        <p className="intro-copy">
          Former league members who are not in the 2025 league, plus BassyBaby
          because he is not returning for future seasons.
        </p>
      </section>

      <section className="stats-strip" aria-label="Graveyard summary">
        <div>
          <span>Buried franchises</span>
          <strong>{archive.graveyard.length}</strong>
        </div>
        <div>
          <span>Most recent season</span>
          <strong>{archive.activeSeason?.season ?? "2025"}</strong>
        </div>
        <div>
          <span>Current teams spared</span>
          <strong>{archive.activeSeason?.standings.length ?? "-"}</strong>
        </div>
        <div>
          <span>Special exception</span>
          <strong>BassyBaby</strong>
        </div>
      </section>

      <section className="graveyard-grid" aria-label="Former league members">
        {archive.graveyard.map((member) => (
          <article className="panel graveyard-card" key={member.ownerId}>
            <div>
              <p className="eyebrow">
                {member.reason === "not_returning"
                  ? "Not returning"
                  : `Last seen ${member.lastSeason}`}
              </p>
              <TeamIdentity
                ownerName={member.ownerName}
                teamName={member.finalTeamName}
              />
            </div>

            <div className="graveyard-stats">
              <div>
                <span>Record</span>
                <strong>
                  {member.wins}-{member.losses}
                  {member.ties ? `-${member.ties}` : ""}
                </strong>
              </div>
              <div>
                <span>Win %</span>
                <strong>{formatPct(member.winPct)}</strong>
              </div>
              <div>
                <span>PF</span>
                <strong>{formatPoints(member.pointsFor)}</strong>
              </div>
              <div>
                <span>PPG</span>
                <strong>{formatPoints(member.pointsPerGame)}</strong>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
