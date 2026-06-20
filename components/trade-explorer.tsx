"use client";

import { useMemo, useState } from "react";
import { TeamIdentity } from "@/components/team-identity";
import type { LeagueTrade, TradeAsset } from "@/lib/sleeper";

function assetList(assets: TradeAsset[]) {
  if (!assets.length) {
    return <p className="empty-copy">Nothing listed</p>;
  }

  return (
    <ul>
      {assets.map((asset, index) => (
        <li key={`${asset.label}-${index}`}>
          <strong>{asset.label}</strong>
          {asset.detail ? <small>{asset.detail}</small> : null}
        </li>
      ))}
    </ul>
  );
}

function tradeHeadline(trade: LeagueTrade) {
  return trade.sides.map((side) => side.teamName).join(" and ");
}

export function TradeExplorer({ trades }: { trades: LeagueTrade[] }) {
  const seasons = useMemo(
    () => [...new Set(trades.map((trade) => trade.season))],
    [trades],
  );
  const teams = useMemo(() => {
    const owners = new Map<
      string,
      { ownerId: string; ownerName: string; teamName: string; trades: number }
    >();

    for (const trade of trades) {
      for (const side of trade.sides) {
        const current =
          owners.get(side.ownerId) ??
          ({
            ownerId: side.ownerId,
            ownerName: side.ownerName,
            teamName: side.teamName,
            trades: 0,
          } satisfies {
            ownerId: string;
            ownerName: string;
            teamName: string;
            trades: number;
          });

        current.ownerName = side.ownerName;
        current.teamName = side.teamName;
        current.trades += 1;
        owners.set(side.ownerId, current);
      }
    }

    return [...owners.values()].sort((a, b) => {
      if (b.trades !== a.trades) {
        return b.trades - a.trades;
      }

      return a.ownerName.localeCompare(b.ownerName);
    });
  }, [trades]);
  const [selectedSeason, setSelectedSeason] = useState("all");
  const [selectedOwnerId, setSelectedOwnerId] = useState("all");
  const [expandedTradeId, setExpandedTradeId] = useState<string | null>(
    trades[0]?.id ?? null,
  );
  const selectedTeam = useMemo(
    () => teams.find((team) => team.ownerId === selectedOwnerId),
    [selectedOwnerId, teams],
  );
  const filteredTrades = useMemo(
    () =>
      trades.filter((trade) => {
        const matchesSeason =
          selectedSeason === "all" || trade.season === selectedSeason;
        const matchesOwner =
          selectedOwnerId === "all" ||
          trade.sides.some((side) => side.ownerId === selectedOwnerId);

        return matchesSeason && matchesOwner;
      }),
    [selectedOwnerId, selectedSeason, trades],
  );
  const tradeCountsBySeason = useMemo(
    () =>
      seasons.map((season) => ({
        season,
        count: trades.filter((trade) => trade.season === season).length,
      })),
    [seasons, trades],
  );

  if (!trades.length) {
    return (
      <section className="panel empty-state">
        <p className="eyebrow">No trades found</p>
        <h2>No completed Sleeper trades are available yet.</h2>
        <p>
          This page is wired up for completed trade transactions. Once Sleeper
          has trade history for these leagues, it will show teams, players,
          picks, season, week, and dates here.
        </p>
      </section>
    );
  }

  return (
    <section className="trade-layout">
      <aside className="panel h2h-picker">
        <label htmlFor="trade-team-picker">Team</label>
        <select
          id="trade-team-picker"
          onChange={(event) => {
            setSelectedOwnerId(event.target.value);
            setExpandedTradeId(null);
          }}
          value={selectedOwnerId}
        >
          <option value="all">All teams</option>
          {teams.map((team) => (
            <option key={team.ownerId} value={team.ownerId}>
              {team.ownerName} - {team.teamName}
            </option>
          ))}
        </select>

        <label htmlFor="trade-season-picker">Season</label>
        <select
          id="trade-season-picker"
          onChange={(event) => {
            setSelectedSeason(event.target.value);
            setExpandedTradeId(null);
          }}
          value={selectedSeason}
        >
          <option value="all">All seasons</option>
          {seasons.map((season) => (
            <option key={season} value={season}>
              {season}
            </option>
          ))}
        </select>

        <div className="h2h-selected">
          <strong>{filteredTrades.length} trades shown</strong>
          <p>
            {selectedTeam
              ? `${selectedTeam.teamName} has ${selectedTeam.trades} total trades.`
              : `${trades.length} total trades across the league.`}
          </p>
        </div>

        <div className="trade-counts trade-active-counts">
          <div className="trade-counts-header">
            <span>Season</span>
            <span>Trades</span>
          </div>
          {tradeCountsBySeason.map((entry) => (
            <button
              className={entry.season === selectedSeason ? "active" : ""}
              key={entry.season}
              onClick={() => {
                setSelectedSeason(entry.season);
                setExpandedTradeId(null);
              }}
              type="button"
            >
              <span>{entry.season}</span>
              <strong>{entry.count}</strong>
            </button>
          ))}
        </div>

        <div className="trade-counts">
          <div className="trade-counts-header">
            <span>Most active traders</span>
            <span>Trades</span>
          </div>
          {teams.map((team) => (
            <button
              className={team.ownerId === selectedOwnerId ? "active" : ""}
              key={team.ownerId}
              onClick={() => {
                setSelectedOwnerId(team.ownerId);
                setExpandedTradeId(null);
              }}
              type="button"
            >
              <span>
                <strong>{team.teamName}</strong>
                <small>{team.ownerName}</small>
              </span>
              <strong>{team.trades}</strong>
            </button>
          ))}
        </div>
      </aside>

      <section className="trade-stack">
        {!filteredTrades.length ? (
          <article className="panel empty-state">
            <p className="eyebrow">No matching trades</p>
            <h2>No trades match those filters.</h2>
            <p>Try another team or switch the season back to all seasons.</p>
          </article>
        ) : null}

        {filteredTrades.map((trade) => {
          const isExpanded = expandedTradeId === trade.id;

          return (
            <article className="panel trade-card" key={trade.id}>
              <button
                aria-expanded={isExpanded}
                className="trade-summary"
                onClick={() =>
                  setExpandedTradeId(isExpanded ? null : trade.id)
                }
                type="button"
              >
                <span>
                  <strong>{tradeHeadline(trade)}</strong>
                  <small>
                    {trade.season}, Week {trade.week} - {trade.dateLabel}
                  </small>
                </span>
                <span>{trade.totalAssets} assets</span>
              </button>

              {isExpanded ? (
                <div className="trade-detail">
                  {trade.sides.map((side) => (
                    <div className="trade-side" key={side.rosterId}>
                      <TeamIdentity
                        ownerName={side.ownerName}
                        teamName={side.teamName}
                      />
                      <div>
                        <span>Received</span>
                        {assetList(side.received)}
                      </div>
                      <div>
                        <span>Sent</span>
                        {assetList(side.sent)}
                      </div>
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
