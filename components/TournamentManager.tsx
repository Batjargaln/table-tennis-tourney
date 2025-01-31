import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Trophy } from "lucide-react";

// Interfaces
interface Player {
  id: number;
  name: string;
  matches?: number;
  matchesWon?: number;
  points?: number;
}

interface GameScore {
  player1Score: number;
  player2Score: number;
}

interface Group {
  id: number;
  name: string;
  players: Player[];
  matches: {
    player1Id: number;
    player2Id: number;
    gameScores: GameScore[];
    winnerId: number;
  }[];
}

interface PlayoffPlayer extends Player {
  groupName: string;
  seedRank: number;
}

interface PlayoffMatch {
  round: "round32" | "round16" | "quarter" | "semi" | "final";
  player1: PlayoffPlayer;
  player2: PlayoffPlayer | null;
  gameScores: GameScore[];
  winner: PlayoffPlayer | null;
}

interface MatchDisplayProps {
  match: PlayoffMatch;
  onRecord: () => void;
  isFinal?: boolean;
}

// Match Display Component
const MatchDisplay: React.FC<MatchDisplayProps> = ({
  match,
  onRecord,
  isFinal = false,
}) => {
  const isByeMatch = !match.player2;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold">
            {match.player1.name}
            <span className="text-sm text-gray-500 ml-2">
              ({match.player1.groupName} - Seed {match.player1.seedRank})
            </span>
          </h3>
        </div>
        <div className="mx-4 text-xl font-bold">VS</div>
        <div className="flex-1 text-right">
          {isByeMatch ? (
            <span className="italic text-gray-500">BYE</span>
          ) : (
            <h3 className="font-semibold">
              <span className="text-sm text-gray-500 mr-2">
                ({match.player2?.groupName} - Seed {match.player2?.seedRank})
              </span>
              {match.player2?.name}
            </h3>
          )}
        </div>
      </div>

      {!match.winner && !isByeMatch && (
        <div className="flex justify-center">
          <Button onClick={onRecord} variant="outline">
            Record Result
          </Button>
        </div>
      )}

      {(match.winner || isByeMatch) && (
        <div className={`text-center ${isFinal ? "text-2xl font-bold" : ""}`}>
          <div
            className={`${
              isFinal
                ? "text-2xl font-bold text-green-600 mb-2"
                : "text-green-600 font-semibold"
            }`}
          >
            {isFinal
              ? "Tournament Winner: "
              : isByeMatch
              ? "Advanced with bye: "
              : "Winner: "}
            {match.winner?.name}
          </div>
          {!isByeMatch && match.gameScores.length > 0 && (
            <div className={`${isFinal ? "text-xl" : "text-sm"} text-gray-600`}>
              Score:{" "}
              {
                match.gameScores.filter((s) =>
                  match.winner === match.player1
                    ? s.player1Score > s.player2Score
                    : s.player2Score > s.player1Score
                ).length
              }
              -
              {
                match.gameScores.filter((s) =>
                  match.winner === match.player1
                    ? s.player2Score > s.player1Score
                    : s.player1Score > s.player2Score
                ).length
              }
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const initialGroups: Group[] = [
  {
    id: 1,
    name: "Group A",
    players: [
      { id: 1, name: "Player 1" },
      { id: 2, name: "Player 2" },
      { id: 3, name: "Player 3" },
      { id: 4, name: "Player 4" },
    ],
    matches: [],
  },
  {
    id: 2,
    name: "Group B",
    players: [
      { id: 5, name: "Player 5" },
      { id: 6, name: "Player 6" },
      { id: 7, name: "Player 7" },
      { id: 8, name: "Player 8" },
    ],
    matches: [],
  },
  {
    id: 3,
    name: "Group C",
    players: [
      { id: 9, name: "Player 9" },
      { id: 10, name: "Player 10" },
      { id: 11, name: "Player 11" },
      { id: 12, name: "Player 12" },
    ],
    matches: [],
  },
  {
    id: 4,
    name: "Group D",
    players: [
      { id: 13, name: "Player 13" },
      { id: 14, name: "Player 14" },
      { id: 15, name: "Player 15" },
      { id: 16, name: "Player 16" },
    ],
    matches: [],
  },
];

// Main Tournament Manager Component
const TournamentManager: React.FC = () => {
  // State declarations
  const [stage, setStage] = useState<"groups" | "playoffs">("groups");
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [playoffs, setPlayoffs] = useState<PlayoffMatch[]>([]);

  // Record group match result
  const recordMatch = (
    groupId: number,
    player1Id: number,
    player2Id: number
  ) => {
    const group = groups.find((g) => g.id === groupId);
    if (!group) return;

    const player1Score = prompt(
      "Enter games won by first player (e.g., 3 for a 3-1 win):"
    );
    if (!player1Score) return;

    const player2Score = prompt(
      "Enter games won by second player (e.g., 1 for a 3-1 loss):"
    );
    if (!player2Score) return;

    const score1 = parseInt(player1Score);
    const score2 = parseInt(player2Score);

    if (
      isNaN(score1) ||
      isNaN(score2) ||
      score1 + score2 > 5 ||
      score1 < 0 ||
      score2 < 0 ||
      (score1 !== 3 && score2 !== 3)
    ) {
      alert("Invalid scores. One player must win 3 games.");
      return;
    }

    const winnerId = score1 > score2 ? player1Id : player2Id;
    const loserId = score1 > score2 ? player2Id : player1Id;

    const gameScores: GameScore[] = [];
    for (let i = 0; i < score1 + score2; i++) {
      if (i < score1) {
        gameScores.push({ player1Score: 11, player2Score: 5 });
      } else {
        gameScores.push({ player1Score: 5, player2Score: 11 });
      }
    }

    setGroups(
      groups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            players: group.players.map((player) => {
              if (player.id === winnerId) {
                return {
                  ...player,
                  matches: (player.matches || 0) + 1,
                  matchesWon: (player.matchesWon || 0) + 1,
                  points: (player.points || 0) + 2,
                };
              }
              if (player.id === loserId) {
                return {
                  ...player,
                  matches: (player.matches || 0) + 1,
                  points: player.points || 0,
                };
              }
              return player;
            }),
            matches: [
              ...group.matches,
              {
                player1Id,
                player2Id,
                gameScores,
                winnerId,
              },
            ],
          };
        }
        return group;
      })
    );
  };

  // Start playoffs
  const startPlayoffs = () => {
    const qualifiedPlayers = groups.flatMap((group) => {
      const sortedPlayers = [...group.players].sort(
        (a, b) => (b.points || 0) - (a.points || 0)
      );
      return sortedPlayers.slice(0, 2).map((player, index) => ({
        ...player,
        groupName: group.name,
        seedRank: index + 1,
      }));
    });

    const numPlayers = qualifiedPlayers.length;
    const playoffMatches: PlayoffMatch[] = [];

    const bracketSize = numPlayers <= 16 ? 16 : 32;
    const numByes = bracketSize - numPlayers;

    const seededPlayers = [
      ...qualifiedPlayers
        .filter((p) => p.seedRank === 1)
        .sort((a, b) => a.groupName.localeCompare(b.groupName)),
      ...qualifiedPlayers
        .filter((p) => p.seedRank === 2)
        .sort((a, b) => a.groupName.localeCompare(b.groupName)),
    ];

    const firstRound: PlayoffMatch["round"] =
      bracketSize === 32 ? "round32" : "round16";

    for (let i = 0; i < bracketSize / 2; i++) {
      const matchPosition = i + 1;
      const reversePosition = bracketSize / 2 - i;

      const shouldGetBye =
        numByes > 0 &&
        (matchPosition <= numByes / 2 || reversePosition <= numByes / 2);

      if (shouldGetBye) {
        const player = seededPlayers[i];
        if (player) {
          playoffMatches.push({
            round: firstRound,
            player1: player,
            player2: null,
            gameScores: [],
            winner: player,
          });
        }
      } else {
        const player1Index = i;
        const player2Index = bracketSize / 2 - 1 - i;

        if (
          player1Index < seededPlayers.length &&
          player2Index < seededPlayers.length
        ) {
          playoffMatches.push({
            round: firstRound,
            player1: seededPlayers[player1Index],
            player2: seededPlayers[player2Index],
            gameScores: [],
            winner: null,
          });
        }
      }
    }

    setPlayoffs(playoffMatches);
    setStage("playoffs");
  };

  // Get next round name
  const getNextRound = (
    currentRound: PlayoffMatch["round"]
  ): PlayoffMatch["round"] | null => {
    const rounds: PlayoffMatch["round"][] = [
      "round32",
      "round16",
      "quarter",
      "semi",
      "final",
    ];
    const currentIndex = rounds.indexOf(currentRound);
    return currentIndex < rounds.length - 1 ? rounds[currentIndex + 1] : null;
  };

  // Record playoff match result
  const recordPlayoffMatch = (matchIndex: number) => {
    const match = playoffs[matchIndex];
    if (!match.player2) return; // Skip bye matches

    const player1Score = prompt(`Enter games won by ${match.player1.name}:`);
    if (!player1Score) return;

    const player2Score = prompt(`Enter games won by ${match.player2.name}:`);
    if (!player2Score) return;

    const score1 = parseInt(player1Score);
    const score2 = parseInt(player2Score);

    if (
      isNaN(score1) ||
      isNaN(score2) ||
      score1 + score2 > 5 ||
      score1 < 0 ||
      score2 < 0 ||
      (score1 !== 3 && score2 !== 3)
    ) {
      alert("Invalid scores. One player must win 3 games.");
      return;
    }

    const gameScores: GameScore[] = [];
    for (let i = 0; i < score1 + score2; i++) {
      if (i < score1) {
        gameScores.push({ player1Score: 11, player2Score: 5 });
      } else {
        gameScores.push({ player1Score: 5, player2Score: 11 });
      }
    }

    const winner = score1 > score2 ? match.player1 : match.player2;

    const updatedPlayoffs = [...playoffs];
    updatedPlayoffs[matchIndex] = { ...match, gameScores, winner };

    // Check if current round is complete and create next round matches
    const currentRoundMatches = updatedPlayoffs.filter(
      (m) => m.round === match.round
    );
    const isRoundComplete = currentRoundMatches.every((m) => m.winner);

    if (isRoundComplete) {
      const winners = currentRoundMatches.map((m) => m.winner!);
      const nextRound = getNextRound(match.round);

      if (nextRound) {
        // Pair winners for next round
        for (let i = 0; i < winners.length; i += 2) {
          if (winners[i] && winners[i + 1]) {
            updatedPlayoffs.push({
              round: nextRound,
              player1: winners[i],
              player2: winners[i + 1],
              gameScores: [],
              winner: null,
            });
          }
        }
      }
    }

    setPlayoffs(updatedPlayoffs);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Table Tennis Tournament
      </h1>

      {/* Group Stage */}
      {stage === "groups" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {groups.map((group) => (
            <Card key={group.id} className="mb-4">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  <h2 className="text-xl font-semibold">{group.name}</h2>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Standings */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Player</th>
                          <th className="text-center p-2">Matches</th>
                          <th className="text-center p-2">Won</th>
                          <th className="text-center p-2">Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...group.players]
                          .sort((a, b) => (b.points || 0) - (a.points || 0))
                          .map((player) => (
                            <tr key={player.id} className="border-b">
                              <td className="p-2">{player.name}</td>
                              <td className="text-center p-2">
                                {player.matches}
                              </td>
                              <td className="text-center p-2">
                                {player.matchesWon}
                              </td>
                              <td className="text-center p-2">
                                {player.points}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Record Matches */}
                  <div className="space-y-2">
                    <h3 className="font-semibold">Record Match Result</h3>
                    {group.players.map((player1) => (
                      <div key={player1.id}>
                        {group.players
                          .filter((player2) => player2.id > player1.id)
                          .map((player2) => (
                            <div
                              key={`${player1.id}-${player2.id}`}
                              className="flex gap-2 items-center mb-2"
                            >
                              <span>
                                {player1.name} vs {player2.name}
                              </span>
                              <Button
                                onClick={() =>
                                  recordMatch(group.id, player1.id, player2.id)
                                }
                                disabled={group.matches.some(
                                  (m) =>
                                    (m.player1Id === player1.id &&
                                      m.player2Id === player2.id) ||
                                    (m.player1Id === player2.id &&
                                      m.player2Id === player1.id)
                                )}
                                variant="outline"
                              >
                                Record Result
                              </Button>
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>

                  {/* Match History */}
                  {group.matches.length > 0 && (
                    <div className="mt-4">
                      <h3 className="font-semibold mb-2">Match History</h3>
                      <div className="space-y-2">
                        {group.matches.map((match, idx) => {
                          const player1 = group.players.find(
                            (p) => p.id === match.player1Id
                          );
                          const player2 = group.players.find(
                            (p) => p.id === match.player2Id
                          );
                          const score1 = match.gameScores.filter(
                            (s) => s.player1Score > s.player2Score
                          ).length;
                          const score2 = match.gameScores.filter(
                            (s) => s.player2Score > s.player1Score
                          ).length;
                          return (
                            <div key={idx} className="text-sm">
                              {player1?.name} vs {player2?.name}: {score1}-
                              {score2}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="col-span-full text-center">
            <Button onClick={startPlayoffs} className="mt-4">
              Start Playoffs
            </Button>
          </div>
        </div>
      )}

      {/* Playoff Stage */}
      {stage === "playoffs" && (
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-center">
            <Trophy className="inline-block w-8 h-8 mr-2" />
            Playoff Stage
          </h2>

          {/* Round of 32 */}
          {playoffs.some((m) => m.round === "round32") && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-center">Round of 32</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {playoffs
                  .filter((match) => match.round === "round32")
                  .map((match, idx) => (
                    <Card key={idx} className="p-4">
                      <CardContent>
                        <MatchDisplay
                          match={match}
                          onRecord={() =>
                            recordPlayoffMatch(playoffs.indexOf(match))
                          }
                        />
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )}

          {/* Round of 16 */}
          {playoffs.some((m) => m.round === "round16") && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-center">Round of 16</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {playoffs
                  .filter((match) => match.round === "round16")
                  .map((match, idx) => (
                    <Card key={idx} className="p-4">
                      <CardContent>
                        <MatchDisplay
                          match={match}
                          onRecord={() =>
                            recordPlayoffMatch(playoffs.indexOf(match))
                          }
                        />
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )}

          {/* Quarter-finals */}
          {playoffs.some((m) => m.round === "quarter") && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-center">
                Quarter-finals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {playoffs
                  .filter((match) => match.round === "quarter")
                  .map((match, idx) => (
                    <Card key={idx} className="p-4">
                      <CardContent>
                        <MatchDisplay
                          match={match}
                          onRecord={() =>
                            recordPlayoffMatch(playoffs.indexOf(match))
                          }
                        />
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )}

          {/* Semi-finals */}
          {playoffs.some((m) => m.round === "semi") && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-center">Semi-finals</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {playoffs
                  .filter((match) => match.round === "semi")
                  .map((match, idx) => (
                    <Card key={idx} className="p-4">
                      <CardContent>
                        <MatchDisplay
                          match={match}
                          onRecord={() =>
                            recordPlayoffMatch(playoffs.indexOf(match))
                          }
                        />
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )}

          {/* Finals */}
          {playoffs.some((m) => m.round === "final") && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-center">Final</h3>
              <div className="max-w-2xl mx-auto">
                {playoffs
                  .filter((match) => match.round === "final")
                  .map((match, idx) => (
                    <Card key={idx} className="p-4">
                      <CardContent>
                        <MatchDisplay
                          match={match}
                          onRecord={() =>
                            recordPlayoffMatch(playoffs.indexOf(match))
                          }
                          isFinal={true}
                        />
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TournamentManager;
