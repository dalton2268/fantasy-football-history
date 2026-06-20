import Image from "next/image";
import { TeamIdentity } from "@/components/team-identity";
import { formatPoints, formatRecord } from "@/lib/format";
import { getLeagueArchive, type PlayoffMatchup } from "@/lib/sleeper";

const championPhotos: Record<string, string> = {
  "is it in you???": "/photos/is-it-in-you-champion.png",
  "peak male physique": "/photos/Peak%20Male%20Physique.png",
  "slim reapers": "/photos/slim-reapers-champion.png",
};

function matchupTeams(matchup: PlayoffMatchup) {
  return [matchup.teamOne, matchup.teamTwo].filter((team) => team.rosterId);
}

function opponentName(matchup: PlayoffMatchup, championRosterId: number) {
  return matchupTeams(matchup).find(
    (team) => team.rosterId !== championRosterId,
  )?.teamName;
}

function participantScore(matchup: PlayoffMatchup, rosterId: number) {
  return matchupTeams(matchup).find((team) => team.rosterId === rosterId)
    ?.score;
}

function topStarters(matchup: PlayoffMatchup, rosterId: number) {
  return (
    matchupTeams(matchup)
      .find((team) => team.rosterId === rosterId)
      ?.starters?.toSorted((a, b) => b.points - a.points)
      .slice(0, 4) ?? []
  );
}

function photoClass(teamName?: string) {
  if (!teamName) {
    return "champion-photo";
  }

  return `champion-photo champion-photo-${teamName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

function championshipParagraph({
  season,
  final,
  path,
  regularSeasonRank,
}: {
  season: Awaited<ReturnType<typeof getLeagueArchive>>["seasons"][number];
  final?: PlayoffMatchup;
  path: PlayoffMatchup[];
  regularSeasonRank?: number;
}) {
  const champion = season.champion;

  if (!champion) {
    return "";
  }

  const titleScore = final
    ? participantScore(final, champion.rosterId)
    : undefined;
  const runnerUp = final ? opponentName(final, champion.rosterId) : undefined;
  const finalText =
    final && runnerUp && titleScore
      ? ` finished the job with a ${formatPoints(titleScore)}-point championship performance against ${runnerUp}`
      : " finished the season on top";
  const pathText = path.length
    ? ` The playoff path also went through ${path
        .map((matchup) => opponentName(matchup, champion.rosterId))
        .filter(Boolean)
        .join(" and ")}.`
    : "";
  const starterNames = final
    ? topStarters(final, champion.rosterId)
        .slice(0, 3)
        .map((starter) => starter.name)
        .filter(Boolean)
    : [];
  const starterText = starterNames.length
    ? ` The final was powered by ${starterNames.join(", ")}, giving the lineup the punch it needed when the trophy was on the table.`
    : "";
  const rankText = regularSeasonRank
    ? ` after entering the postseason as the No. ${regularSeasonRank} regular-season finisher`
    : "";

  return `${champion.teamName}${rankText}${finalText}.${pathText}${starterText}`;
}

export default async function ChampionsPage() {
  const archive = await getLeagueArchive({ includePlayoffBrackets: true });
  const championSeasons = archive.seasons.filter((season) => season.champion);

  return (
    <main className="page-shell">
      <section className="page-heading">
        <p className="eyebrow">Championship tracker</p>
        <h1>Title Stories</h1>
        <p className="intro-copy">
          A short writeup for each champion, built from the regular season,
          playoff bracket, championship matchup, and title-game lineups.
        </p>
      </section>

      <section className="champion-story-stack">
        {championSeasons.map((season) => {
          const champion = season.champion;
          const bracket = archive.playoffBrackets.find(
            (item) => item.season === season.season,
          );
          const bracketMatchups =
            bracket?.rounds.flatMap((round) => round.matchups) ?? [];
          const final = bracketMatchups.find(
            (matchup) =>
              matchup.isChampionship &&
              matchup.winnerRosterId === champion?.rosterId,
          );
          const path = bracketMatchups
            .filter(
              (matchup) =>
                !matchup.isChampionship &&
                !matchup.isBye &&
                matchup.winnerRosterId === champion?.rosterId,
            )
            .sort((a, b) => a.round - b.round);
          const finish = archive.regularSeasonFinishes
            .find((item) => item.season === season.season)
            ?.teams.find((team) => team.rosterId === champion?.rosterId);
          const finalOpponent = final
            ? matchupTeams(final).find(
                (team) => team.rosterId !== champion?.rosterId,
              )
            : undefined;
          const championScore =
            final && champion ? participantScore(final, champion.rosterId) : undefined;
          const runnerUpScore = finalOpponent?.score;
          const finalLeaders =
            final && champion ? topStarters(final, champion.rosterId) : [];
          const championPhoto = champion?.teamName
            ? championPhotos[champion.teamName.toLowerCase()]
            : undefined;

          return (
            <article className="panel champion-story" key={season.leagueId}>
              {championPhoto ? (
                <div className={photoClass(champion?.teamName)}>
                  <Image
                    alt={`${champion?.teamName} championship photo`}
                    fill
                    priority={season.season === archive.activeSeason?.season}
                    sizes="(max-width: 900px) 100vw, 360px"
                    src={championPhoto}
                  />
                </div>
              ) : null}

              <div className="champion-story-header">
                <div>
                  <p className="eyebrow">{season.season} champion</p>
                  <TeamIdentity
                    ownerName={champion?.ownerName}
                    teamName={champion?.teamName}
                  />
                </div>
                <div className="champion-meta">
                  <span>{formatRecord(champion)}</span>
                  {finish ? <span>No. {finish.rank} seed</span> : null}
                </div>
              </div>

              <p className="champion-narrative">
                {championshipParagraph({
                  season,
                  final,
                  path,
                  regularSeasonRank: finish?.rank,
                })}
              </p>

              <div className="champion-detail-grid">
                <div>
                  <span>Title game</span>
                  {finalOpponent && championScore && runnerUpScore ? (
                    <p>
                      {formatPoints(championScore)} to{" "}
                      {formatPoints(runnerUpScore)} over{" "}
                      {finalOpponent.teamName}
                    </p>
                  ) : (
                    <p>Championship result unavailable</p>
                  )}
                </div>
                <div>
                  <span>Playoff wins</span>
                  <p>
                    {[...path, ...(final ? [final] : [])]
                      .map((matchup) =>
                        opponentName(matchup, champion?.rosterId ?? 0),
                      )
                      .filter(Boolean)
                      .join(", ") || "No playoff path available"}
                  </p>
                </div>
                <div>
                  <span>Final leaders</span>
                  <div className="champion-player-list">
                    {finalLeaders.slice(0, 4).map((starter) => (
                      <p key={starter.playerId}>
                        <strong>{starter.name}</strong>
                        <small>
                          {starter.position}
                          {starter.team ? ` - ${starter.team}` : ""} -{" "}
                          {formatPoints(starter.points)}
                        </small>
                      </p>
                    ))}
                    {!finalLeaders.length ? <p>No lineup data available</p> : null}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
