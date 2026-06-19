"use client";

import { useState } from "react";
import { TeamIdentity } from "@/components/team-identity";
import { formatPoints } from "@/lib/format";
import type {
  PlayoffBracket,
  PlayoffMatchup,
  PlayoffParticipant,
} from "@/lib/sleeper";

function PlayoffTeam({
  hideScore = false,
  team,
}: {
  hideScore?: boolean;
  team: PlayoffParticipant;
}) {
  return (
    <div className={`playoff-team ${team.result === "W" ? "winner" : ""}`}>
      <TeamIdentity
        fallback="TBD"
        ownerName={team.ownerName}
        teamName={team.teamName}
      />
      {hideScore ? null : (
        <strong>{team.score === undefined ? "-" : formatPoints(team.score)}</strong>
      )}
    </div>
  );
}

function LineupColumn({ participant }: { participant: PlayoffParticipant }) {
  return (
    <div className="lineup-column">
      <TeamIdentity
        fallback="TBD"
        ownerName={participant.ownerName}
        teamName={participant.teamName}
      />
      <div className="lineup-list">
        {participant.starters?.length ? (
          participant.starters.map((starter) => (
            <div className="lineup-player" key={starter.playerId}>
              <span>
                <strong>{starter.name}</strong>
                <small>
                  {[starter.position, starter.team].filter(Boolean).join(" - ")}
                </small>
              </span>
              <strong>{formatPoints(starter.points)}</strong>
            </div>
          ))
        ) : (
          <p>No starter data available for this team.</p>
        )}
      </div>
    </div>
  );
}

function MatchupCard({ matchup }: { matchup: PlayoffMatchup }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasLineups =
    !matchup.isBye &&
    ((matchup.teamOne.starters?.length ?? 0) > 0 ||
      (matchup.teamTwo.starters?.length ?? 0) > 0);

  return (
    <article
      className={`bracket-matchup ${
        matchup.isChampionship ? "championship-matchup" : ""
      } ${matchup.isBye ? "bye-matchup" : ""}`}
    >
      <button
        aria-expanded={isOpen}
        className="bracket-matchup-toggle"
        disabled={!hasLineups}
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <div className="bracket-matchup-header">
          <span>{matchup.label}</span>
          <span>{matchup.week ? `Week ${matchup.week}` : "Week TBD"}</span>
        </div>
        <PlayoffTeam hideScore={matchup.isBye} team={matchup.teamOne} />
        {matchup.isBye ? (
          <>
            <PlayoffTeam hideScore team={matchup.teamTwo} />
            <div className="bye-note">Advance automatically</div>
          </>
        ) : (
          <PlayoffTeam team={matchup.teamTwo} />
        )}
      </button>

      {isOpen && hasLineups ? (
        <div className="lineup-matchup">
          <LineupColumn participant={matchup.teamOne} />
          <LineupColumn participant={matchup.teamTwo} />
        </div>
      ) : null}
    </article>
  );
}

export function PostseasonBrackets({
  brackets,
}: {
  brackets: PlayoffBracket[];
}) {
  return (
    <section className="season-stack">
      {brackets.map((bracket) => (
        <article className="panel postseason-panel" key={bracket.leagueId}>
          <div className="season-header">
            <div>
              <p className="eyebrow">{bracket.leagueName}</p>
              <h2>{bracket.season}</h2>
            </div>
            <strong>
              {bracket.playoffTeams ?? "-"} teams - Week{" "}
              {bracket.playoffWeekStart ?? "-"} start
            </strong>
          </div>

          <div className="bracket-board">
            {bracket.rounds.map((round) => (
              <section className="bracket-round" key={round.round}>
                <h3>{round.label}</h3>
                <div className="bracket-matchups">
                  {round.matchups.map((matchup) => (
                    <MatchupCard key={matchup.id} matchup={matchup} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}
