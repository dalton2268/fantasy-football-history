"use client";

import { useMemo, useState } from "react";
import { formatPoints } from "@/lib/format";
import type { HeadToHeadOwner } from "@/lib/sleeper";
import { TeamIdentity } from "@/components/team-identity";

function recordLabel(wins: number, losses: number, ties: number) {
  return `${wins}-${losses}${ties ? `-${ties}` : ""}`;
}

export function HeadToHeadExplorer({ owners }: { owners: HeadToHeadOwner[] }) {
  const [selectedOwnerId, setSelectedOwnerId] = useState(
    owners[0]?.ownerId ?? "",
  );
  const [expandedOpponentId, setExpandedOpponentId] = useState<string | null>(
    null,
  );

  const selectedOwner = useMemo(
    () => owners.find((owner) => owner.ownerId === selectedOwnerId) ?? owners[0],
    [owners, selectedOwnerId],
  );

  if (!selectedOwner) {
    return (
      <section className="panel">
        <p>No head-to-head matchups are available yet.</p>
      </section>
    );
  }

  return (
    <section className="h2h-layout">
      <aside className="panel h2h-picker">
        <label htmlFor="owner-picker">Owner</label>
        <select
          id="owner-picker"
          onChange={(event) => {
            setSelectedOwnerId(event.target.value);
            setExpandedOpponentId(null);
          }}
          value={selectedOwner.ownerId}
        >
          {owners.map((owner) => (
            <option key={owner.ownerId} value={owner.ownerId}>
              {owner.ownerName} - {owner.teamName}
            </option>
          ))}
        </select>

        <div className="h2h-selected">
          <TeamIdentity
            ownerName={selectedOwner.ownerName}
            teamName={selectedOwner.teamName}
          />
          <p>{selectedOwner.opponents.length} opponents found</p>
        </div>
      </aside>

      <section className="panel h2h-results">
        <div className="h2h-header-row">
          <span>Opponent</span>
          <span>Record</span>
          <span>PF</span>
          <span>PA</span>
          <span>Games</span>
        </div>

        {selectedOwner.opponents.map((opponent) => {
          const isExpanded =
            expandedOpponentId === opponent.opponentOwnerId;

          return (
            <article className="h2h-opponent" key={opponent.opponentOwnerId}>
              <button
                aria-expanded={isExpanded}
                className="h2h-summary"
                onClick={() =>
                  setExpandedOpponentId(isExpanded ? null : opponent.opponentOwnerId)
                }
                type="button"
              >
                <TeamIdentity
                  ownerName={opponent.opponentOwnerName}
                  teamName={opponent.opponentTeamName}
                />
                <span>{recordLabel(opponent.wins, opponent.losses, opponent.ties)}</span>
                <span>{formatPoints(opponent.pointsFor)}</span>
                <span>{formatPoints(opponent.pointsAgainst)}</span>
                <span>{opponent.gamesPlayed}</span>
              </button>

              {isExpanded ? (
                <div className="h2h-games">
                  <div className="h2h-game-row h2h-game-head">
                    <span>Date</span>
                    <span>Result</span>
                    <span>{selectedOwner.ownerName}</span>
                    <span>{opponent.opponentOwnerName}</span>
                    <span>Margin</span>
                  </div>
                  {opponent.games.map((game) => (
                    <div
                      className="h2h-game-row"
                      key={`${game.season}-${game.week}-${opponent.opponentOwnerId}`}
                    >
                      <span>{game.dateLabel}</span>
                      <span className={`result-pill result-${game.result.toLowerCase()}`}>
                        {game.result}
                      </span>
                      <span>{formatPoints(game.teamScore)}</span>
                      <span>{formatPoints(game.opponentScore)}</span>
                      <span>{formatPoints(game.margin)}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </article>
          );
        })}
      </section>
    </section>
  );
}
