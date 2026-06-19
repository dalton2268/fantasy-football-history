"use client";

import { useMemo, useState } from "react";
import { TeamIdentity } from "@/components/team-identity";
import type { NicknameOwner } from "@/lib/sleeper";

export function NicknameExplorer({ owners }: { owners: NicknameOwner[] }) {
  const [selectedOwnerId, setSelectedOwnerId] = useState(
    owners[0]?.ownerId ?? "",
  );
  const selectedOwner = useMemo(
    () => owners.find((owner) => owner.ownerId === selectedOwnerId) ?? owners[0],
    [owners, selectedOwnerId],
  );
  const nicknameLeaderboard = useMemo(
    () =>
      owners.toSorted((a, b) => {
        if (b.totalNicknames !== a.totalNicknames) {
          return b.totalNicknames - a.totalNicknames;
        }

        return a.ownerName.localeCompare(b.ownerName);
      }),
    [owners],
  );

  if (!selectedOwner) {
    return (
      <section className="panel">
        <p>No player nicknames found.</p>
      </section>
    );
  }

  return (
    <section className="nickname-layout">
      <aside className="panel h2h-picker">
        <label htmlFor="nickname-owner-picker">Owner</label>
        <select
          id="nickname-owner-picker"
          onChange={(event) => setSelectedOwnerId(event.target.value)}
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
          <p>{selectedOwner.totalNicknames} nicknames found</p>
        </div>

        <div className="nickname-counts">
          <div className="nickname-counts-header">
            <span>Team</span>
            <span>Nicknames</span>
          </div>
          {nicknameLeaderboard.map((owner) => (
            <button
              className={owner.ownerId === selectedOwner.ownerId ? "active" : ""}
              key={owner.ownerId}
              onClick={() => setSelectedOwnerId(owner.ownerId)}
              type="button"
            >
              <span>
                <strong>{owner.teamName}</strong>
                <small>{owner.ownerName}</small>
              </span>
              <strong>{owner.totalNicknames}</strong>
            </button>
          ))}
        </div>
      </aside>

      <section className="nickname-season-stack">
        {selectedOwner.seasons.map((season) => (
          <article className="panel nickname-season" key={season.season}>
            <div className="season-header">
              <div>
                <p className="eyebrow">{season.teamName}</p>
                <h2>{season.season}</h2>
              </div>
              <strong>{season.nicknames.length} nicknames</strong>
            </div>

            <div className="nickname-grid">
              {season.nicknames.map((entry) => (
                <div
                  className="nickname-card"
                  key={`${entry.season}-${entry.rosterId}-${entry.playerId}`}
                >
                  <span>
                    <strong>{entry.playerName}</strong>
                    <small>
                      {[entry.position, entry.team].filter(Boolean).join(" - ")}
                    </small>
                  </span>
                  <p>{entry.nickname}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </section>
  );
}
