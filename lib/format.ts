import type { TeamStanding } from "@/lib/sleeper";

export function formatRecord(team?: Pick<TeamStanding, "wins" | "losses" | "ties">) {
  if (!team) {
    return "Not available";
  }

  return `${team.wins}-${team.losses}${team.ties ? `-${team.ties}` : ""}`;
}

export function formatPoints(points?: number) {
  return (points ?? 0).toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}

export function formatPct(value?: number) {
  return (value ?? 0).toLocaleString(undefined, {
    maximumFractionDigits: 3,
    minimumFractionDigits: 3,
  });
}
