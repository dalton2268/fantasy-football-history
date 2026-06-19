"use client";

import { useMemo, useState } from "react";
import { TeamIdentity } from "@/components/team-identity";
import { formatPct, formatPoints } from "@/lib/format";
import type { AllTimeStanding } from "@/lib/sleeper";

type SortKey =
  | "owner"
  | "seasons"
  | "playoffAppearances"
  | "record"
  | "winPct"
  | "pointsFor"
  | "pointsAgainst"
  | "pointsPerGame"
  | "titles";

type SortDirection = "asc" | "desc";

type SortState = {
  key: SortKey;
  direction: SortDirection;
};

const columns: { key: SortKey; label: string; numeric?: boolean }[] = [
  { key: "owner", label: "Owner" },
  { key: "seasons", label: "Seasons", numeric: true },
  { key: "playoffAppearances", label: "Playoffs", numeric: true },
  { key: "record", label: "Record", numeric: true },
  { key: "winPct", label: "Win %", numeric: true },
  { key: "pointsFor", label: "PF", numeric: true },
  { key: "pointsAgainst", label: "PA", numeric: true },
  { key: "pointsPerGame", label: "PPG", numeric: true },
  { key: "titles", label: "Titles", numeric: true },
];

function sortValue(owner: AllTimeStanding, key: SortKey) {
  if (key === "owner") {
    return `${owner.ownerName} ${owner.teamName}`.toLowerCase();
  }

  if (key === "record") {
    return owner.wins + owner.ties * 0.5;
  }

  return owner[key];
}

function defaultDirection(key: SortKey): SortDirection {
  return key === "owner" ? "asc" : "desc";
}

export function SortableStandingsTable({
  standings,
}: {
  standings: AllTimeStanding[];
}) {
  const [sort, setSort] = useState<SortState>({
    key: "titles",
    direction: "desc",
  });

  const sortedStandings = useMemo(() => {
    return standings.toSorted((a, b) => {
      const aValue = sortValue(a, sort.key);
      const bValue = sortValue(b, sort.key);
      const direction = sort.direction === "asc" ? 1 : -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue) * direction;
      }

      if (aValue === bValue) {
        return b.pointsFor - a.pointsFor;
      }

      return ((aValue as number) - (bValue as number)) * direction;
    });
  }, [sort, standings]);

  function updateSort(key: SortKey) {
    setSort((current) => {
      if (current.key !== key) {
        return { key, direction: defaultDirection(key) };
      }

      return {
        key,
        direction: current.direction === "asc" ? "desc" : "asc",
      };
    });
  }

  return (
    <div className="wide-table">
      <div className="wide-row wide-head standings-row">
        {columns.map((column) => (
          <button
            aria-label={`Sort by ${column.label}${
              sort.key === column.key
                ? `, currently ${sort.direction === "asc" ? "ascending" : "descending"}`
                : ""
            }`}
            className="sortable-heading"
            key={column.key}
            onClick={() => updateSort(column.key)}
            type="button"
          >
            <span>{column.label}</span>
            <span aria-hidden="true">
              {sort.key === column.key
                ? sort.direction === "asc"
                  ? "\u2191"
                  : "\u2193"
                : "\u2195"}
            </span>
          </button>
        ))}
      </div>

      {sortedStandings.map((owner) => (
        <div className="wide-row standings-row" key={owner.ownerId}>
          <TeamIdentity ownerName={owner.ownerName} teamName={owner.teamName} />
          <span>{owner.seasons}</span>
          <span>{owner.playoffAppearances}</span>
          <span>
            {owner.wins}-{owner.losses}
            {owner.ties ? `-${owner.ties}` : ""}
          </span>
          <span>{formatPct(owner.winPct)}</span>
          <span>{formatPoints(owner.pointsFor)}</span>
          <span>{formatPoints(owner.pointsAgainst)}</span>
          <span>{formatPoints(owner.pointsPerGame)}</span>
          <span>{owner.titles}</span>
        </div>
      ))}
    </div>
  );
}
