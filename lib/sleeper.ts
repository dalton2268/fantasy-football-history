const SLEEPER_BASE_URL = "https://api.sleeper.app/v1";
const USER_ID = "990013421099835392";
const SPORT = "nfl";
const START_SEASON = "2025";
const GRAVEYARD_USERNAME_OVERRIDES = new Set(["bassybaby"]);

type SleeperLeague = {
  league_id: string;
  name: string;
  season: string;
  status: string;
  total_rosters: number;
  previous_league_id?: string | null;
  roster_positions?: string[];
  metadata?: {
    latest_league_winner_roster_id?: string;
  };
  settings?: {
    playoff_teams?: number;
    playoff_week_start?: number;
    trade_deadline?: number;
    waiver_budget?: number;
    max_keepers?: number;
    draft_rounds?: number;
    last_scored_leg?: number;
  };
  scoring_settings?: {
    rec?: number;
    pass_td?: number;
    pass_yd?: number;
    rush_yd?: number;
    rec_yd?: number;
    fum_lost?: number;
  };
};

type SleeperRoster = {
  roster_id: number;
  owner_id?: string;
  metadata?: Record<string, string | undefined>;
  settings?: {
    wins?: number;
    losses?: number;
    ties?: number;
    fpts?: number;
    fpts_decimal?: number;
    fpts_against?: number;
    fpts_against_decimal?: number;
    total_moves?: number;
    waiver_budget_used?: number;
  };
};

type SleeperUser = {
  user_id: string;
  display_name: string;
  metadata?: {
    team_name?: string;
  };
};

type SleeperMatchup = {
  roster_id: number;
  matchup_id?: number;
  points: number;
  starters?: string[];
  starters_points?: number[];
};

type SleeperBracketMatchup = {
  m: number;
  r: number;
  p?: number;
  t1?: number;
  t2?: number;
  w?: number;
  l?: number;
};

type SleeperTransaction = {
  transaction_id: string;
  type: string;
  status: string;
  created?: number;
  status_updated?: number;
  leg?: number;
  roster_ids?: number[];
  adds?: Record<string, number | undefined> | null;
  drops?: Record<string, number | undefined> | null;
  draft_picks?: {
    season: string;
    round: number;
    roster_id: number;
    previous_owner_id: number;
    owner_id: number;
  }[];
};

type SleeperPlayer = {
  first_name?: string;
  last_name?: string;
  full_name?: string;
  position?: string;
  team?: string;
};

export type TeamStanding = {
  rosterId: number;
  ownerId?: string;
  ownerName: string;
  teamName: string;
  wins: number;
  losses: number;
  ties: number;
  pointsFor: number;
  pointsAgainst: number;
  totalMoves: number;
};

export type AllTimeStanding = {
  ownerId: string;
  ownerName: string;
  teamName: string;
  seasons: number;
  games: number;
  wins: number;
  losses: number;
  ties: number;
  winPct: number;
  pointsFor: number;
  pointsAgainst: number;
  pointsPerGame: number;
  playoffAppearances: number;
  titles: number;
};

export type ChampionSummary = {
  ownerId: string;
  ownerName: string;
  teamName: string;
  titles: number;
  seasons: string[];
  totalWins: number;
};

export type GraveyardMember = AllTimeStanding & {
  lastSeason: string;
  finalTeamName: string;
  reason: "departed" | "not_returning";
};

export type WeeklyScore = {
  season: string;
  week: number;
  rosterId: number;
  ownerId: string;
  ownerName: string;
  teamName: string;
  points: number;
  starters: {
    playerId: string;
    name?: string;
    position?: string;
    team?: string;
    points: number;
  }[];
};

export type HeadToHeadGame = {
  season: string;
  week: number;
  dateLabel: string;
  teamScore: number;
  opponentScore: number;
  result: "W" | "L" | "T";
  margin: number;
};

export type HeadToHeadOpponent = {
  opponentOwnerId: string;
  opponentOwnerName: string;
  opponentTeamName: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  ties: number;
  pointsFor: number;
  pointsAgainst: number;
  games: HeadToHeadGame[];
};

export type HeadToHeadOwner = {
  ownerId: string;
  ownerName: string;
  teamName: string;
  opponents: HeadToHeadOpponent[];
};

export type MatchupRecord = {
  season: string;
  week: number;
  winner: WeeklyScore;
  loser: WeeklyScore;
  margin: number;
};

export type RegularSeasonFinishTeam = {
  rank: number;
  rosterId: number;
  ownerId: string;
  ownerName: string;
  teamName: string;
  wins: number;
  losses: number;
  ties: number;
  pointsFor: number;
  pointsAgainst: number;
  pointsPerGame: number;
  gamesPlayed: number;
};

export type RegularSeasonFinish = {
  leagueId: string;
  leagueName: string;
  season: string;
  throughWeek: number;
  teams: RegularSeasonFinishTeam[];
};

export type PlayoffParticipant = {
  rosterId?: number;
  ownerName?: string;
  teamName?: string;
  score?: number;
  result?: "W" | "L" | "T";
  starters?: {
    playerId: string;
    name: string;
    position?: string;
    team?: string;
    points: number;
  }[];
};

export type PlayoffMatchup = {
  id: number;
  round: number;
  week?: number;
  label: string;
  isBye?: boolean;
  isChampionship?: boolean;
  placement?: number;
  winnerRosterId?: number;
  loserRosterId?: number;
  teamOne: PlayoffParticipant;
  teamTwo: PlayoffParticipant;
};

export type PlayoffBracket = {
  leagueId: string;
  season: string;
  leagueName: string;
  playoffTeams?: number;
  playoffWeekStart?: number;
  rounds: {
    round: number;
    label: string;
    matchups: PlayoffMatchup[];
  }[];
};

export type PlayerNickname = {
  season: string;
  leagueId: string;
  rosterId: number;
  ownerId: string;
  ownerName: string;
  teamName: string;
  playerId: string;
  playerName: string;
  position?: string;
  team?: string;
  nickname: string;
};

export type NicknameOwner = {
  ownerId: string;
  ownerName: string;
  teamName: string;
  totalNicknames: number;
  seasons: {
    season: string;
    teamName: string;
    nicknames: PlayerNickname[];
  }[];
};

export type TradeAsset = {
  label: string;
  detail?: string;
};

export type TradeSide = {
  rosterId: number;
  ownerId: string;
  ownerName: string;
  teamName: string;
  received: TradeAsset[];
  sent: TradeAsset[];
};

export type LeagueTrade = {
  id: string;
  season: string;
  week: number;
  dateLabel: string;
  leagueName: string;
  sides: TradeSide[];
  totalAssets: number;
};

export type SeasonSnapshot = {
  leagueId: string;
  name: string;
  season: string;
  status: string;
  totalTeams: number;
  champion?: TeamStanding;
  standings: TeamStanding[];
  scoringLeader?: TeamStanding;
  settings: {
    playoffTeams?: number;
    playoffWeekStart?: number;
    tradeDeadline?: number;
    waiverBudget?: number;
    maxKeepers?: number;
    draftRounds?: number;
    lastScoredWeek?: number;
    starters: string[];
    benchSpots: number;
    isPpr: boolean;
  };
};

export type LeagueArchive = {
  activeSeason?: SeasonSnapshot;
  seasons: SeasonSnapshot[];
  allTimeStandings: AllTimeStanding[];
  championTracker: ChampionSummary[];
  graveyard: GraveyardMember[];
  headToHead: HeadToHeadOwner[];
  playoffBrackets: PlayoffBracket[];
  regularSeasonFinishes: RegularSeasonFinish[];
  records: {
    highestScoringSeason?: TeamStanding & { season: string };
    bestRecord?: TeamStanding & { season: string };
    mostMoves?: TeamStanding & { season: string };
    highestWeek?: WeeklyScore;
    lowestWeek?: WeeklyScore;
    biggestBlowout?: MatchupRecord;
    closestMatchup?: MatchupRecord;
  };
};

async function sleeperFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${SLEEPER_BASE_URL}${path}`, {
    next: { revalidate: 60 * 60 * 6 },
  });

  if (!response.ok) {
    throw new Error(`Sleeper request failed: ${response.status} ${path}`);
  }

  return response.json() as Promise<T>;
}

async function sleeperUncachedFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${SLEEPER_BASE_URL}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Sleeper request failed: ${response.status} ${path}`);
  }

  return response.json() as Promise<T>;
}

function points(whole = 0, decimal = 0) {
  return Number(`${whole}.${String(decimal).padStart(2, "0")}`);
}

function teamLabel(user?: SleeperUser, rosterId?: number) {
  return user?.metadata?.team_name || user?.display_name || `Roster ${rosterId}`;
}

function playerName(playerId: string, player?: SleeperPlayer) {
  return (
    player?.full_name ||
    [player?.first_name, player?.last_name].filter(Boolean).join(" ") ||
    playerId
  );
}

function ownerKeyFromRoster(
  roster: SleeperRoster,
  user: SleeperUser | undefined,
) {
  return roster.owner_id || `${user?.display_name ?? "Roster"}-${roster.roster_id}`;
}

function mapStandings(rosters: SleeperRoster[], users: SleeperUser[]) {
  const usersById = new Map(users.map((user) => [user.user_id, user]));

  return rosters
    .map((roster) => {
      const user = roster.owner_id ? usersById.get(roster.owner_id) : undefined;
      const wins = roster.settings?.wins ?? 0;
      const losses = roster.settings?.losses ?? 0;
      const ties = roster.settings?.ties ?? 0;
      const pointsFor = points(
        roster.settings?.fpts,
        roster.settings?.fpts_decimal,
      );
      const pointsAgainst = points(
        roster.settings?.fpts_against,
        roster.settings?.fpts_against_decimal,
      );

      return {
        rosterId: roster.roster_id,
        ownerId: roster.owner_id,
        ownerName: user?.display_name || `Roster ${roster.roster_id}`,
        teamName: teamLabel(user, roster.roster_id),
        wins,
        losses,
        ties,
        pointsFor,
        pointsAgainst,
        totalMoves: roster.settings?.total_moves ?? 0,
      };
    })
    .sort((a, b) => {
      if (b.wins !== a.wins) {
        return b.wins - a.wins;
      }

      if (a.losses !== b.losses) {
        return a.losses - b.losses;
      }

      return b.pointsFor - a.pointsFor;
    });
}

function mapSeason(
  league: SleeperLeague,
  rosters: SleeperRoster[],
  users: SleeperUser[],
): SeasonSnapshot {
  const standings = mapStandings(rosters, users);
  const championRosterId = Number(
    league.metadata?.latest_league_winner_roster_id,
  );
  const champion = standings.find(
    (team) => team.rosterId === championRosterId,
  );
  const positions = league.roster_positions ?? [];
  const scoringLeader = standings.toSorted(
    (a, b) => b.pointsFor - a.pointsFor,
  )[0];

  return {
    leagueId: league.league_id,
    name: league.name,
    season: league.season,
    status: league.status,
    totalTeams: league.total_rosters,
    champion,
    standings,
    scoringLeader,
    settings: {
      playoffTeams: league.settings?.playoff_teams,
      playoffWeekStart: league.settings?.playoff_week_start,
      tradeDeadline: league.settings?.trade_deadline,
      waiverBudget: league.settings?.waiver_budget,
      maxKeepers: league.settings?.max_keepers,
      draftRounds: league.settings?.draft_rounds,
      lastScoredWeek: league.settings?.last_scored_leg,
      starters: positions.filter((position) => position !== "BN"),
      benchSpots: positions.filter((position) => position === "BN").length,
      isPpr: league.scoring_settings?.rec === 1,
    },
  };
}

async function getLeagueChain() {
  const firstLeague = await sleeperFetch<SleeperLeague>(
    `/user/${USER_ID}/leagues/${SPORT}/${START_SEASON}`,
  );
  const first = Array.isArray(firstLeague) ? firstLeague[0] : firstLeague;
  const leagues: SleeperLeague[] = [];
  let current: SleeperLeague | undefined = first;

  while (current) {
    leagues.push(current);

    if (!current.previous_league_id) {
      break;
    }

    current = await sleeperFetch<SleeperLeague>(
      `/league/${current.previous_league_id}`,
    );
  }

  return leagues;
}

function getOwnerKey(team: TeamStanding) {
  return team.ownerId || `${team.ownerName}-${team.rosterId}`;
}

function getAllTimeStandings(
  seasons: SeasonSnapshot[],
  regularSeasonFinishes: RegularSeasonFinish[] = [],
): AllTimeStanding[] {
  const owners = new Map<string, AllTimeStanding>();
  const playoffOwnersBySeason = new Map(
    regularSeasonFinishes.map((finish) => {
      const season = seasons.find((item) => item.season === finish.season);
      const playoffTeams = season?.settings.playoffTeams ?? 0;

      return [
        finish.season,
        new Set(
          finish.teams
            .filter((team) => playoffTeams && team.rank <= playoffTeams)
            .map((team) => team.ownerId),
        ),
      ];
    }),
  );

  for (const season of seasons) {
    for (const team of season.standings) {
      const ownerId = getOwnerKey(team);
      const current =
        owners.get(ownerId) ??
        ({
          ownerId,
          ownerName: team.ownerName,
          teamName: team.teamName,
          seasons: 0,
          games: 0,
          wins: 0,
          losses: 0,
          ties: 0,
          winPct: 0,
          pointsFor: 0,
          pointsAgainst: 0,
          pointsPerGame: 0,
          playoffAppearances: 0,
          titles: 0,
        } satisfies AllTimeStanding);

      current.ownerName = team.ownerName;
      current.teamName = team.teamName;
      current.seasons += 1;
      current.wins += team.wins;
      current.losses += team.losses;
      current.ties += team.ties;
      current.pointsFor += team.pointsFor;
      current.pointsAgainst += team.pointsAgainst;

      if (season.champion && getOwnerKey(season.champion) === ownerId) {
        current.titles += 1;
      }

      if (playoffOwnersBySeason.get(season.season)?.has(ownerId)) {
        current.playoffAppearances += 1;
      }

      const decisions = current.wins + current.losses + current.ties;
      current.games = decisions;
      current.winPct = decisions
        ? (current.wins + current.ties * 0.5) / decisions
        : 0;
      current.pointsPerGame = decisions ? current.pointsFor / decisions : 0;

      owners.set(ownerId, current);
    }
  }

  return [...owners.values()].sort((a, b) => {
    if (b.titles !== a.titles) {
      return b.titles - a.titles;
    }

    if (b.winPct !== a.winPct) {
      return b.winPct - a.winPct;
    }

    return b.pointsFor - a.pointsFor;
  });
}

function getChampionTracker(seasons: SeasonSnapshot[]): ChampionSummary[] {
  const champions = new Map<string, ChampionSummary>();

  for (const season of seasons) {
    if (!season.champion) {
      continue;
    }

    const ownerId = getOwnerKey(season.champion);
    const current =
      champions.get(ownerId) ??
      ({
        ownerId,
        ownerName: season.champion.ownerName,
        teamName: season.champion.teamName,
        titles: 0,
        seasons: [],
        totalWins: 0,
      } satisfies ChampionSummary);

    current.ownerName = season.champion.ownerName;
    current.teamName = season.champion.teamName;
    current.titles += 1;
    current.seasons.push(season.season);
    current.totalWins += season.champion.wins;
    champions.set(ownerId, current);
  }

  return [...champions.values()].sort((a, b) => {
    if (b.titles !== a.titles) {
      return b.titles - a.titles;
    }

    return b.totalWins - a.totalWins;
  });
}

function getGraveyard(
  seasons: SeasonSnapshot[],
  allTimeStandings: AllTimeStanding[],
): GraveyardMember[] {
  const currentOwnerIds = new Set(
    seasons[0]?.standings.map((team) => getOwnerKey(team)) ?? [],
  );
  const lastSeasonByOwner = new Map<
    string,
    { season: string; teamName: string }
  >();

  for (const season of seasons) {
    for (const team of season.standings) {
      const ownerId = getOwnerKey(team);
      const existing = lastSeasonByOwner.get(ownerId);

      if (!existing || Number(season.season) > Number(existing.season)) {
        lastSeasonByOwner.set(ownerId, {
          season: season.season,
          teamName: team.teamName,
        });
      }
    }
  }

  return allTimeStandings
    .filter((owner) => {
      const isOverride = GRAVEYARD_USERNAME_OVERRIDES.has(
        owner.ownerName.toLowerCase(),
      );

      return !currentOwnerIds.has(owner.ownerId) || isOverride;
    })
    .map((owner) => {
      const finalSeason = lastSeasonByOwner.get(owner.ownerId);
      const isOverride = GRAVEYARD_USERNAME_OVERRIDES.has(
        owner.ownerName.toLowerCase(),
      );

      return {
        ...owner,
        lastSeason: finalSeason?.season ?? START_SEASON,
        finalTeamName: finalSeason?.teamName ?? owner.teamName,
        reason: isOverride ? "not_returning" : "departed",
      } satisfies GraveyardMember;
    })
    .sort((a, b) => {
      if (Number(b.lastSeason) !== Number(a.lastSeason)) {
        return Number(b.lastSeason) - Number(a.lastSeason);
      }

      return b.wins - a.wins;
    });
}

async function getWeeklyScores(
  seasons: SeasonSnapshot[],
): Promise<{ weeklyScores: WeeklyScore[]; matchups: MatchupRecord[] }> {
  const weeklyScores: WeeklyScore[] = [];
  const matchups: MatchupRecord[] = [];

  await Promise.all(
    seasons.map(async (season) => {
      const rosterById = new Map(
        season.standings.map((team) => [team.rosterId, team]),
      );
      const lastWeek = season.settings.lastScoredWeek ?? 0;
      const weeklyMatchups = await Promise.all(
        Array.from({ length: lastWeek }, (_, index) => index + 1).map(
          async (week) => {
            const response = await sleeperFetch<SleeperMatchup[]>(
              `/league/${season.leagueId}/matchups/${week}`,
            );

            return { week, response };
          },
        ),
      );

      for (const { week, response } of weeklyMatchups) {
        const grouped = new Map<number, WeeklyScore[]>();

        for (const matchup of response) {
          const team = rosterById.get(matchup.roster_id);

          if (!team || matchup.points <= 0) {
            continue;
          }

          const score = {
            season: season.season,
            week,
            rosterId: matchup.roster_id,
            ownerId: getOwnerKey(team),
            ownerName: team.ownerName,
            teamName: team.teamName,
            points: matchup.points,
            starters: (matchup.starters ?? []).map((playerId, index) => ({
              playerId,
              points: matchup.starters_points?.[index] ?? 0,
            })),
          } satisfies WeeklyScore;

          weeklyScores.push(score);

          if (matchup.matchup_id) {
            grouped.set(matchup.matchup_id, [
              ...(grouped.get(matchup.matchup_id) ?? []),
              score,
            ]);
          }
        }

        for (const scores of grouped.values()) {
          if (scores.length !== 2) {
            continue;
          }

          const [first, second] = scores.toSorted(
            (a, b) => b.points - a.points,
          );

          matchups.push({
            season: season.season,
            week,
            winner: first,
            loser: second,
            margin: Number((first.points - second.points).toFixed(2)),
          });
        }
      }
    }),
  );

  return { weeklyScores, matchups };
}

function getRegularSeasonFinishes(
  seasons: SeasonSnapshot[],
  matchups: MatchupRecord[],
): RegularSeasonFinish[] {
  return seasons.map((season) => {
    const throughWeek = Math.max(
      1,
      (season.settings.playoffWeekStart ?? 15) - 1,
    );
    const teams = new Map<string, RegularSeasonFinishTeam>();

    for (const team of season.standings) {
      const ownerId = getOwnerKey(team);

      teams.set(ownerId, {
        rank: 0,
        rosterId: team.rosterId,
        ownerId,
        ownerName: team.ownerName,
        teamName: team.teamName,
        wins: 0,
        losses: 0,
        ties: 0,
        pointsFor: 0,
        pointsAgainst: 0,
        pointsPerGame: 0,
        gamesPlayed: 0,
      });
    }

    function addResult(team: WeeklyScore, opponent: WeeklyScore) {
      const current = teams.get(team.ownerId);

      if (!current) {
        return;
      }

      current.teamName = team.teamName;
      current.ownerName = team.ownerName;
      current.pointsFor += team.points;
      current.pointsAgainst += opponent.points;
      current.gamesPlayed += 1;

      if (team.points > opponent.points) {
        current.wins += 1;
      } else if (team.points < opponent.points) {
        current.losses += 1;
      } else {
        current.ties += 1;
      }
    }

    for (const matchup of matchups) {
      if (matchup.season !== season.season || matchup.week > throughWeek) {
        continue;
      }

      addResult(matchup.winner, matchup.loser);
      addResult(matchup.loser, matchup.winner);
    }

    const rankedTeams = [...teams.values()]
      .map((team) => ({
        ...team,
        pointsFor: Number(team.pointsFor.toFixed(2)),
        pointsAgainst: Number(team.pointsAgainst.toFixed(2)),
        pointsPerGame: team.gamesPlayed
          ? Number((team.pointsFor / team.gamesPlayed).toFixed(2))
          : 0,
      }))
      .sort((a, b) => {
        if (b.wins !== a.wins) {
          return b.wins - a.wins;
        }

        if (a.losses !== b.losses) {
          return a.losses - b.losses;
        }

        if (b.ties !== a.ties) {
          return b.ties - a.ties;
        }

        return b.pointsFor - a.pointsFor;
      })
      .map((team, index) => ({ ...team, rank: index + 1 }));

    return {
      leagueId: season.leagueId,
      leagueName: season.name,
      season: season.season,
      throughWeek,
      teams: rankedTeams,
    } satisfies RegularSeasonFinish;
  });
}

function getRecords(
  seasons: SeasonSnapshot[],
  weeklyScores: WeeklyScore[],
  matchups: MatchupRecord[],
  players?: Record<string, SleeperPlayer>,
): LeagueArchive["records"] {
  const teams = seasons.flatMap((season) =>
    season.standings.map((team) => ({ ...team, season: season.season })),
  );
  const highestWeek = weeklyScores.toSorted((a, b) => b.points - a.points)[0];
  const lowestWeek = weeklyScores.toSorted((a, b) => a.points - b.points)[0];

  function enrichScore(score?: WeeklyScore) {
    if (!score || !players) {
      return score;
    }

    return {
      ...score,
      starters: score.starters.map((starter) => {
        const player = players[starter.playerId];

        return {
          ...starter,
          name: playerName(starter.playerId, player),
          position: player?.position,
          team: player?.team,
        };
      }),
    };
  }

  function enrichMatchup(matchup?: MatchupRecord) {
    if (!matchup || !players) {
      return matchup;
    }

    return {
      ...matchup,
      winner: enrichScore(matchup.winner) ?? matchup.winner,
      loser: enrichScore(matchup.loser) ?? matchup.loser,
    };
  }

  return {
    highestScoringSeason: teams.toSorted(
      (a, b) => b.pointsFor - a.pointsFor,
    )[0],
    bestRecord: teams.toSorted((a, b) => {
      if (b.wins !== a.wins) {
        return b.wins - a.wins;
      }

      return a.losses - b.losses;
    })[0],
    mostMoves: teams.toSorted((a, b) => b.totalMoves - a.totalMoves)[0],
    highestWeek: enrichScore(highestWeek),
    lowestWeek: enrichScore(lowestWeek),
    biggestBlowout: enrichMatchup(
      matchups.toSorted((a, b) => b.margin - a.margin)[0],
    ),
    closestMatchup: enrichMatchup(
      matchups.toSorted((a, b) => a.margin - b.margin)[0],
    ),
  };
}

function playoffLabel(matchup: SleeperBracketMatchup) {
  if (matchup.p === 1) {
    return "Championship";
  }

  if (matchup.p === 3) {
    return "Third place";
  }

  if (matchup.p === 5) {
    return "Fifth place";
  }

  return matchup.r === 1 ? "Quarterfinal" : `Round ${matchup.r}`;
}

async function getPlayoffBrackets(
  seasons: SeasonSnapshot[],
  matchups: MatchupRecord[],
): Promise<PlayoffBracket[]> {
  const players = await sleeperUncachedFetch<Record<string, SleeperPlayer>>(
    `/players/${SPORT}`,
  );
  const weeklyMatchups = new Map<string, MatchupRecord[]>();

  for (const matchup of matchups) {
    const key = `${matchup.season}-${matchup.week}`;
    weeklyMatchups.set(key, [...(weeklyMatchups.get(key) ?? []), matchup]);
  }

  const brackets = await Promise.all(
    seasons.map(async (season) => {
      const rosterById = new Map(
        season.standings.map((team) => [team.rosterId, team]),
      );
      const bracket = await sleeperFetch<SleeperBracketMatchup[]>(
        `/league/${season.leagueId}/winners_bracket`,
      );
      const playoffMatchups: PlayoffMatchup[] = bracket
        .filter((matchup) => matchup.p !== 5)
        .map((matchup) => {
          const teamOne = matchup.t1 ? rosterById.get(matchup.t1) : undefined;
          const teamTwo = matchup.t2 ? rosterById.get(matchup.t2) : undefined;
          const week = season.settings.playoffWeekStart
            ? season.settings.playoffWeekStart + matchup.r - 1
            : undefined;
          const scoredMatchup = week
            ? weeklyMatchups
                .get(`${season.season}-${week}`)
                ?.find((game) => {
                  const ids = [game.winner.rosterId, game.loser.rosterId];

                  return (
                    matchup.t1 &&
                    matchup.t2 &&
                    ids.includes(matchup.t1) &&
                    ids.includes(matchup.t2)
                  );
                })
            : undefined;

          function participant(
            rosterId: number | undefined,
          ): PlayoffParticipant {
            const team = rosterId ? rosterById.get(rosterId) : undefined;
            const weeklyScore = scoredMatchup
              ? scoredMatchup.winner.rosterId === rosterId
                ? scoredMatchup.winner
                : scoredMatchup.loser.rosterId === rosterId
                  ? scoredMatchup.loser
                  : undefined
              : undefined;

            return {
              rosterId,
              ownerName: team?.ownerName,
              teamName: team?.teamName,
              score: weeklyScore?.points,
              result:
                matchup.w === rosterId
                  ? "W"
                  : matchup.l === rosterId
                    ? "L"
                    : undefined,
              starters: weeklyScore?.starters.map((starter) => {
                const player = players[starter.playerId];

                return {
                  playerId: starter.playerId,
                  name: playerName(starter.playerId, player),
                  position: player?.position,
                  team: player?.team,
                  points: starter.points,
                };
              }),
            };
          }

          return {
            id: matchup.m,
            round: matchup.r,
            week,
            label: playoffLabel(matchup),
            isChampionship: matchup.p === 1,
            placement: matchup.p,
            winnerRosterId: matchup.w,
            loserRosterId: matchup.l,
            teamOne: participant(teamOne?.rosterId ?? matchup.t1),
            teamTwo: participant(teamTwo?.rosterId ?? matchup.t2),
          } satisfies PlayoffMatchup;
        })
        .sort((a, b) => {
          if (a.round !== b.round) {
            return a.round - b.round;
          }

          return a.id - b.id;
        });

      const roundOneRosterIds = new Set(
        playoffMatchups
          .filter((matchup) => matchup.round === 1)
          .flatMap((matchup) => [
            matchup.teamOne.rosterId,
            matchup.teamTwo.rosterId,
          ])
          .filter((rosterId): rosterId is number => rosterId !== undefined),
      );
      const roundTwoRosterIds = new Set(
        playoffMatchups
          .filter((matchup) => matchup.round === 2)
          .flatMap((matchup) => [
            matchup.teamOne.rosterId,
            matchup.teamTwo.rosterId,
          ])
          .filter((rosterId): rosterId is number => rosterId !== undefined),
      );
      const byeTeams = [...roundTwoRosterIds].filter(
        (rosterId) => !roundOneRosterIds.has(rosterId),
      );
      const byeMatchups: PlayoffMatchup[] = [];

      for (let index = 0; index < byeTeams.length; index += 2) {
        const teamOneRosterId = byeTeams[index];
        const teamTwoRosterId = byeTeams[index + 1];
        const teamOne = rosterById.get(teamOneRosterId);
        const teamTwo = teamTwoRosterId
          ? rosterById.get(teamTwoRosterId)
          : undefined;

        byeMatchups.push({
          id: -1 - index,
          round: 1,
          week: season.settings.playoffWeekStart,
          label: "First-round byes",
          isBye: true,
          teamOne: {
            rosterId: teamOneRosterId,
            ownerName: teamOne?.ownerName,
            teamName: teamOne?.teamName,
            result: "W",
          },
          teamTwo: teamTwoRosterId
            ? {
                rosterId: teamTwoRosterId,
                ownerName: teamTwo?.ownerName,
                teamName: teamTwo?.teamName,
                result: "W",
              }
            : {},
        });
      }
      const displayMatchups: PlayoffMatchup[] = [
        ...playoffMatchups,
        ...byeMatchups,
      ].sort(
        (a, b) => {
          if (a.round !== b.round) {
            return a.round - b.round;
          }

          if (a.isBye !== b.isBye) {
            return a.isBye ? -1 : 1;
          }

          return a.id - b.id;
        },
      );

      const rounds = [...new Set(displayMatchups.map((matchup) => matchup.round))]
        .sort((a, b) => a - b)
        .map((round) => ({
          round,
          label: round === 1 ? "Opening round" : `Round ${round}`,
          matchups: displayMatchups.filter((matchup) => matchup.round === round),
        }));

      return {
        leagueId: season.leagueId,
        season: season.season,
        leagueName: season.name,
        playoffTeams: season.settings.playoffTeams,
        playoffWeekStart: season.settings.playoffWeekStart,
        rounds,
      } satisfies PlayoffBracket;
    }),
  );

  return brackets.filter((bracket) => bracket.rounds.length > 0);
}

function getHeadToHead(
  matchups: MatchupRecord[],
  allTimeStandings: AllTimeStanding[],
): HeadToHeadOwner[] {
  const owners = new Map(
    allTimeStandings.map((owner) => [
      owner.ownerId,
      {
        ownerId: owner.ownerId,
        ownerName: owner.ownerName,
        teamName: owner.teamName,
        opponents: new Map<string, HeadToHeadOpponent>(),
      },
    ]),
  );

  function addGame(
    team: WeeklyScore,
    opponent: WeeklyScore,
    ownerMap: Map<
      string,
      {
        ownerId: string;
        ownerName: string;
        teamName: string;
        opponents: Map<string, HeadToHeadOpponent>;
      }
    >,
  ) {
    const owner = ownerMap.get(team.ownerId);

    if (!owner || team.ownerId === opponent.ownerId) {
      return;
    }

    const current =
      owner.opponents.get(opponent.ownerId) ??
      ({
        opponentOwnerId: opponent.ownerId,
        opponentOwnerName: opponent.ownerName,
        opponentTeamName: opponent.teamName,
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        ties: 0,
        pointsFor: 0,
        pointsAgainst: 0,
        games: [],
      } satisfies HeadToHeadOpponent);

    const result =
      team.points > opponent.points
        ? "W"
        : team.points < opponent.points
          ? "L"
          : "T";

    current.opponentOwnerName = opponent.ownerName;
    current.opponentTeamName = opponent.teamName;
    current.gamesPlayed += 1;
    current.pointsFor += team.points;
    current.pointsAgainst += opponent.points;

    if (result === "W") {
      current.wins += 1;
    } else if (result === "L") {
      current.losses += 1;
    } else {
      current.ties += 1;
    }

    current.games.push({
      season: team.season,
      week: team.week,
      dateLabel: `${team.season} Week ${team.week}`,
      teamScore: team.points,
      opponentScore: opponent.points,
      result,
      margin: Number(Math.abs(team.points - opponent.points).toFixed(2)),
    });
    owner.opponents.set(opponent.ownerId, current);
  }

  for (const matchup of matchups) {
    addGame(matchup.winner, matchup.loser, owners);
    addGame(matchup.loser, matchup.winner, owners);
  }

  return [...owners.values()]
    .map((owner) => ({
      ownerId: owner.ownerId,
      ownerName: owner.ownerName,
      teamName: owner.teamName,
      opponents: [...owner.opponents.values()]
        .map((opponent) => ({
          ...opponent,
          pointsFor: Number(opponent.pointsFor.toFixed(2)),
          pointsAgainst: Number(opponent.pointsAgainst.toFixed(2)),
          games: opponent.games.toSorted((a, b) => {
            if (Number(b.season) !== Number(a.season)) {
              return Number(b.season) - Number(a.season);
            }

            return b.week - a.week;
          }),
        }))
        .sort((a, b) => {
          if (b.gamesPlayed !== a.gamesPlayed) {
            return b.gamesPlayed - a.gamesPlayed;
          }

          return b.wins - a.wins;
        }),
    }))
    .filter((owner) => owner.opponents.length > 0)
    .sort((a, b) => a.ownerName.localeCompare(b.ownerName));
}

function pickLabel(
  pick: NonNullable<SleeperTransaction["draft_picks"]>[number],
  rosterById: Map<number, TeamStanding>,
) {
  const originalTeam = rosterById.get(pick.roster_id);
  const detail = originalTeam
    ? `Original owner: ${originalTeam.teamName}`
    : `Original roster: ${pick.roster_id}`;

  return {
    label: `${pick.season} Round ${pick.round} pick`,
    detail,
  } satisfies TradeAsset;
}

function tradeDateLabel(timestamp?: number) {
  if (!timestamp) {
    return "Date unavailable";
  }

  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function mapTradeTransaction(
  transaction: SleeperTransaction,
  season: SeasonSnapshot,
  players: Record<string, SleeperPlayer>,
): LeagueTrade | undefined {
  const rosterById = new Map(
    season.standings.map((team) => [team.rosterId, team]),
  );
  const rosterIds = transaction.roster_ids ?? [];

  if (!rosterIds.length) {
    return undefined;
  }

  const sides = rosterIds
    .map((rosterId): TradeSide | undefined => {
      const team = rosterById.get(rosterId);

      if (!team) {
        return undefined;
      }

      const receivedPlayers = Object.entries(transaction.adds ?? {})
        .filter(([, receiverRosterId]) => receiverRosterId === rosterId)
        .map(([playerId]) => {
          const player = players[playerId];

          return {
            label: playerName(playerId, player),
            detail:
              [player?.position, player?.team].filter(Boolean).join(" - ") ||
              undefined,
          } satisfies TradeAsset;
        });
      const sentPlayers = Object.entries(transaction.drops ?? {})
        .filter(([, senderRosterId]) => senderRosterId === rosterId)
        .map(([playerId]) => {
          const player = players[playerId];

          return {
            label: playerName(playerId, player),
            detail:
              [player?.position, player?.team].filter(Boolean).join(" - ") ||
              undefined,
          } satisfies TradeAsset;
        });
      const receivedPicks = (transaction.draft_picks ?? [])
        .filter((pick) => pick.owner_id === rosterId)
        .map((pick) => pickLabel(pick, rosterById));
      const sentPicks = (transaction.draft_picks ?? [])
        .filter((pick) => pick.previous_owner_id === rosterId)
        .map((pick) => pickLabel(pick, rosterById));

      return {
        rosterId,
        ownerId: getOwnerKey(team),
        ownerName: team.ownerName,
        teamName: team.teamName,
        received: [...receivedPlayers, ...receivedPicks],
        sent: [...sentPlayers, ...sentPicks],
      } satisfies TradeSide;
    })
    .filter((side): side is TradeSide => Boolean(side));

  return {
    id: transaction.transaction_id,
    season: season.season,
    week: transaction.leg ?? 0,
    dateLabel: tradeDateLabel(transaction.status_updated ?? transaction.created),
    leagueName: season.name,
    sides,
    totalAssets: sides.reduce(
      (total, side) => total + side.received.length + side.sent.length,
      0,
    ),
  } satisfies LeagueTrade;
}

export async function getLeagueArchive({
  includePlayoffBrackets = false,
  includeRecordLineups = false,
}: {
  includePlayoffBrackets?: boolean;
  includeRecordLineups?: boolean;
} = {}): Promise<LeagueArchive> {
  const leagues = await getLeagueChain();
  const seasons = await Promise.all(
    leagues.map(async (league) => {
      const [rosters, users] = await Promise.all([
        sleeperFetch<SleeperRoster[]>(`/league/${league.league_id}/rosters`),
        sleeperFetch<SleeperUser[]>(`/league/${league.league_id}/users`),
      ]);

      return mapSeason(league, rosters, users);
    }),
  );
  const { weeklyScores, matchups } = await getWeeklyScores(seasons);
  const regularSeasonFinishes = getRegularSeasonFinishes(seasons, matchups);
  const allTimeStandings = getAllTimeStandings(
    seasons,
    regularSeasonFinishes,
  );
  const playoffBrackets = includePlayoffBrackets
    ? await getPlayoffBrackets(seasons, matchups)
    : [];
  const recordPlayers = includeRecordLineups
    ? await sleeperUncachedFetch<Record<string, SleeperPlayer>>(`/players/${SPORT}`)
    : undefined;

  return {
    activeSeason: seasons[0],
    seasons,
    allTimeStandings,
    championTracker: getChampionTracker(seasons),
    graveyard: getGraveyard(seasons, allTimeStandings),
    headToHead: getHeadToHead(matchups, allTimeStandings),
    playoffBrackets,
    regularSeasonFinishes,
    records: getRecords(seasons, weeklyScores, matchups, recordPlayers),
  };
}

export async function getNicknameArchive(): Promise<NicknameOwner[]> {
  const [leagues, players] = await Promise.all([
    getLeagueChain(),
    sleeperUncachedFetch<Record<string, SleeperPlayer>>(`/players/${SPORT}`),
  ]);
  const nicknameOwners = new Map<string, NicknameOwner>();

  const seasonEntries = await Promise.all(
    leagues.map(async (league) => {
      const [rosters, users] = await Promise.all([
        sleeperFetch<SleeperRoster[]>(`/league/${league.league_id}/rosters`),
        sleeperFetch<SleeperUser[]>(`/league/${league.league_id}/users`),
      ]);
      const usersById = new Map(users.map((user) => [user.user_id, user]));
      const entries: PlayerNickname[] = [];

      for (const roster of rosters) {
        const user = roster.owner_id ? usersById.get(roster.owner_id) : undefined;
        const ownerId = ownerKeyFromRoster(roster, user);
        const ownerName = user?.display_name || `Roster ${roster.roster_id}`;
        const teamName = teamLabel(user, roster.roster_id);
        const nicknameEntries = Object.entries(roster.metadata ?? {})
          .filter(([key, value]) => key.startsWith("p_nick_") && value?.trim())
          .map(([key, value]) => {
            const playerId = key.replace("p_nick_", "");
            const player = players[playerId];

            return {
              season: league.season,
              leagueId: league.league_id,
              rosterId: roster.roster_id,
              ownerId,
              ownerName,
              teamName,
              playerId,
              playerName: playerName(playerId, player),
              position: player?.position,
              team: player?.team,
              nickname: value?.trim() ?? "",
            } satisfies PlayerNickname;
          })
          .sort((a, b) => a.playerName.localeCompare(b.playerName));

        entries.push(...nicknameEntries);
      }

      return entries;
    }),
  );
  const earliestByOwnerPlayerNickname = new Map<string, PlayerNickname>();

  for (const entry of seasonEntries.flat()) {
    const key = [
      entry.ownerId,
      entry.playerId,
      entry.nickname.toLowerCase(),
    ].join("|");
    const existing = earliestByOwnerPlayerNickname.get(key);

    if (!existing || Number(entry.season) < Number(existing.season)) {
      earliestByOwnerPlayerNickname.set(key, entry);
    }
  }

  for (const entry of earliestByOwnerPlayerNickname.values()) {
    const current =
      nicknameOwners.get(entry.ownerId) ??
      ({
        ownerId: entry.ownerId,
        ownerName: entry.ownerName,
        teamName: entry.teamName,
        totalNicknames: 0,
        seasons: [],
      } satisfies NicknameOwner);
    let season = current.seasons.find((item) => item.season === entry.season);

    if (!season) {
      season = {
        season: entry.season,
        teamName: entry.teamName,
        nicknames: [],
      };
      current.seasons.push(season);
    }

    current.ownerName = entry.ownerName;
    current.teamName = entry.teamName;
    season.teamName = entry.teamName;
    season.nicknames.push(entry);
    current.totalNicknames += 1;
    nicknameOwners.set(entry.ownerId, current);
  }

  return [...nicknameOwners.values()]
    .map((owner) => ({
      ...owner,
      seasons: owner.seasons
        .map((season) => ({
          ...season,
          nicknames: season.nicknames.sort((a, b) =>
            a.playerName.localeCompare(b.playerName),
          ),
        }))
        .sort((a, b) => Number(b.season) - Number(a.season)),
    }))
    .sort((a, b) => a.ownerName.localeCompare(b.ownerName));
}

export async function getTradeArchive(): Promise<LeagueTrade[]> {
  const leagues = await getLeagueChain();
  const seasons = await Promise.all(
    leagues.map(async (league) => {
      const [rosters, users] = await Promise.all([
        sleeperFetch<SleeperRoster[]>(`/league/${league.league_id}/rosters`),
        sleeperFetch<SleeperUser[]>(`/league/${league.league_id}/users`),
      ]);

      return mapSeason(league, rosters, users);
    }),
  );

  const tradeTransactions = await Promise.all(
    seasons.map(async (season) => {
      const transactionsByWeek = await Promise.all(
        Array.from({ length: 18 }, (_, index) => index + 1).map(
          async (week) => {
            const transactions = await sleeperFetch<SleeperTransaction[]>(
              `/league/${season.leagueId}/transactions/${week}`,
            );

            return transactions
              .filter(
                (transaction) =>
                  transaction.type === "trade" &&
                  transaction.status === "complete",
              )
              .map((transaction) => ({
                ...transaction,
                leg: transaction.leg ?? week,
              }));
          },
        ),
      );

      return {
        season,
        transactions: transactionsByWeek.flat(),
      };
    }),
  );
  const rawTrades = tradeTransactions.flatMap((entry) => entry.transactions);

  if (!rawTrades.length) {
    return [];
  }

  const players = await sleeperUncachedFetch<Record<string, SleeperPlayer>>(
    `/players/${SPORT}`,
  );

  return tradeTransactions
    .flatMap(({ season, transactions }) =>
      transactions
        .map((transaction) => mapTradeTransaction(transaction, season, players))
        .filter((trade): trade is LeagueTrade => Boolean(trade)),
    )
    .sort((a, b) => {
      if (Number(b.season) !== Number(a.season)) {
        return Number(b.season) - Number(a.season);
      }

      return b.week - a.week;
    });
}
