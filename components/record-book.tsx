"use client";

import { ReactNode, useState } from "react";
import { TeamIdentity } from "@/components/team-identity";
import { formatPoints, formatRecord } from "@/lib/format";
import type { LeagueArchive } from "@/lib/sleeper";

type Records = LeagueArchive["records"];

function RecordCard({
  children,
  className = "",
  detail,
  eyebrow,
  summary,
}: {
  children: ReactNode;
  className?: string;
  detail: ReactNode;
  eyebrow: string;
  summary: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className={`panel record-hero expandable-record ${className}`}>
      <button
        aria-expanded={isOpen}
        className="record-card-toggle"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span>{eyebrow}</span>
        {children}
        <p>{summary}</p>
      </button>

      {isOpen ? <div className="record-detail">{detail}</div> : null}
    </article>
  );
}

function StaticRecordCard({
  children,
  eyebrow,
  summary,
}: {
  children: ReactNode;
  eyebrow: string;
  summary: ReactNode;
}) {
  return (
    <article className="panel record-hero static-record">
      <span>{eyebrow}</span>
      {children}
      <p>{summary}</p>
    </article>
  );
}

function avgPointsPerWeek(points?: number, games?: number) {
  return games ? formatPoints((points ?? 0) / games) : "-";
}

function StarterList({
  starters,
}: {
  starters?: NonNullable<Records["highestWeek"]>["starters"];
}) {
  if (!starters?.length) {
    return <p className="empty-detail">No starter data available.</p>;
  }

  return (
    <div className="lineup-list record-lineup-list">
      {starters.map((starter) => (
        <div className="lineup-player" key={starter.playerId}>
          <span>
            <strong>{starter.name ?? starter.playerId}</strong>
            <small>
              {[starter.position, starter.team].filter(Boolean).join(" - ")}
            </small>
          </span>
          <strong>{formatPoints(starter.points)}</strong>
        </div>
      ))}
    </div>
  );
}

function LineupColumn({
  ownerName,
  starters,
  teamName,
}: {
  ownerName?: string;
  starters?: NonNullable<Records["highestWeek"]>["starters"];
  teamName?: string;
}) {
  return (
    <div className="lineup-column">
      <TeamIdentity ownerName={ownerName} teamName={teamName} />
      <StarterList starters={starters} />
    </div>
  );
}

export function RecordBook({ records }: { records: Records }) {
  return (
    <section className="record-grid">
      <StaticRecordCard
        eyebrow="Highest scoring season"
        summary={
          <>
            {records.highestScoringSeason?.season} -{" "}
            {formatPoints(records.highestScoringSeason?.pointsFor)} points ·{" "}
            {avgPointsPerWeek(
              records.highestScoringSeason?.pointsFor,
              (records.highestScoringSeason?.wins ?? 0) +
                (records.highestScoringSeason?.losses ?? 0) +
                (records.highestScoringSeason?.ties ?? 0),
            )}{" "}
            per week
          </>
        }
      >
        <TeamIdentity
          ownerName={records.highestScoringSeason?.ownerName}
          teamName={records.highestScoringSeason?.teamName}
        />
      </StaticRecordCard>

      <StaticRecordCard
        eyebrow="Best regular-season record"
        summary={
          <>
            {records.bestRecord?.season} - {formatRecord(records.bestRecord)} ·{" "}
            {avgPointsPerWeek(
              records.bestRecord?.pointsFor,
              (records.bestRecord?.wins ?? 0) +
                (records.bestRecord?.losses ?? 0) +
                (records.bestRecord?.ties ?? 0),
            )}{" "}
            per week
          </>
        }
      >
        <TeamIdentity
          ownerName={records.bestRecord?.ownerName}
          teamName={records.bestRecord?.teamName}
        />
      </StaticRecordCard>

      <RecordCard
        detail={
          <div className="weekly-record-detail">
            <StarterList starters={records.highestWeek?.starters} />
          </div>
        }
        eyebrow="Weekly high score"
        summary={
          <>
            {records.highestWeek?.season}, Week {records.highestWeek?.week} -{" "}
            {formatPoints(records.highestWeek?.points)}
          </>
        }
      >
        <TeamIdentity
          ownerName={records.highestWeek?.ownerName}
          teamName={records.highestWeek?.teamName}
        />
      </RecordCard>

      <RecordCard
        detail={
          <div className="weekly-record-detail">
            <StarterList starters={records.lowestWeek?.starters} />
          </div>
        }
        eyebrow="Lowest scoring week"
        summary={
          <>
            {records.lowestWeek?.season}, Week {records.lowestWeek?.week} -{" "}
            {formatPoints(records.lowestWeek?.points)}
          </>
        }
      >
        <TeamIdentity
          ownerName={records.lowestWeek?.ownerName}
          teamName={records.lowestWeek?.teamName}
        />
      </RecordCard>

      <RecordCard
        className="span-2"
        detail={
          <div className="weekly-record-detail">
            <div className="lineup-matchup record-lineup-matchup">
              <LineupColumn
                starters={records.biggestBlowout?.winner.starters}
                teamName={records.biggestBlowout?.winner.teamName}
                ownerName={records.biggestBlowout?.winner.ownerName}
              />
              <LineupColumn
                starters={records.biggestBlowout?.loser.starters}
                teamName={records.biggestBlowout?.loser.teamName}
                ownerName={records.biggestBlowout?.loser.ownerName}
              />
            </div>
          </div>
        }
        eyebrow="Biggest blowout"
        summary={
          <>
            {records.biggestBlowout?.season}, Week{" "}
            {records.biggestBlowout?.week} -{" "}
            {formatPoints(records.biggestBlowout?.winner.points)} to{" "}
            {formatPoints(records.biggestBlowout?.loser.points)} (
            {formatPoints(records.biggestBlowout?.margin)} point margin)
          </>
        }
      >
        <div className="matchup-title">
          <TeamIdentity
            ownerName={records.biggestBlowout?.winner.ownerName}
            teamName={records.biggestBlowout?.winner.teamName}
          />
          <span>over</span>
          <TeamIdentity
            ownerName={records.biggestBlowout?.loser.ownerName}
            teamName={records.biggestBlowout?.loser.teamName}
          />
        </div>
      </RecordCard>

      <RecordCard
        className="span-2"
        detail={
          <div className="weekly-record-detail">
            <div className="lineup-matchup record-lineup-matchup">
              <LineupColumn
                starters={records.closestMatchup?.winner.starters}
                teamName={records.closestMatchup?.winner.teamName}
                ownerName={records.closestMatchup?.winner.ownerName}
              />
              <LineupColumn
                starters={records.closestMatchup?.loser.starters}
                teamName={records.closestMatchup?.loser.teamName}
                ownerName={records.closestMatchup?.loser.ownerName}
              />
            </div>
          </div>
        }
        eyebrow="Closest matchup"
        summary={
          <>
            {records.closestMatchup?.season}, Week{" "}
            {records.closestMatchup?.week} -{" "}
            {formatPoints(records.closestMatchup?.winner.points)} to{" "}
            {formatPoints(records.closestMatchup?.loser.points)} (
            {formatPoints(records.closestMatchup?.margin)} point margin)
          </>
        }
      >
        <div className="matchup-title">
          <TeamIdentity
            ownerName={records.closestMatchup?.winner.ownerName}
            teamName={records.closestMatchup?.winner.teamName}
          />
          <span>over</span>
          <TeamIdentity
            ownerName={records.closestMatchup?.loser.ownerName}
            teamName={records.closestMatchup?.loser.teamName}
          />
        </div>
      </RecordCard>
    </section>
  );
}
