import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Trophy } from 'lucide-react';

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

interface ActiveMatch {
  groupId: number;
  player1: Player & { games: number; currentScore: number };
  player2: Player & { games: number; currentScore: number };
  gameScores: GameScore[];
  currentGame: number;
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

const TournamentManager: React.FC = () => {
  const [stage, setStage] = useState<'registration' | 'groups' | 'playoffs'>('registration');
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [activeMatch, setActiveMatch] = useState<ActiveMatch | null>(null);

  // Player Registration
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      setPlayers(prev => [...prev, {
        id: Date.now(),
        name: playerName.trim(),
        matches: 0,
        matchesWon: 0,
        points: 0
      }]);
      setPlayerName('');
    }
  };

  const handleRemovePlayer = (playerId: number) => {
    setPlayers(prev => prev.filter(player => player.id !== playerId));
  };

  // Create groups
  const startGroupStage = () => {
    if (players.length >= 2) {
      const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
      const numGroups = Math.ceil(shuffledPlayers.length / 4);
      const newGroups = [];

      for (let i = 0; i < numGroups; i++) {
        const groupName = String.fromCharCode(65 + i);
        const startIdx = i * 4;
        const endIdx = Math.min(startIdx + 4, shuffledPlayers.length);

        newGroups.push({
          id: i + 1,
          name: `Group ${groupName}`,
          players: shuffledPlayers.slice(startIdx, endIdx).map(player => ({
            ...player,
            matches: 0,
            matchesWon: 0,
            points: 0
          })),
          matches: []
        });
      }
      setGroups(newGroups);
      setStage('groups');
    }
  };

  // Start a match
  const startMatch = (groupId: number, player1Id: number, player2Id: number) => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return;

    const player1 = group.players.find(p => p.id === player1Id);
    const player2 = group.players.find(p => p.id === player2Id);

    if (!player1 || !player2) return;

    setActiveMatch({
      groupId,
      player1: { ...player1, games: 0, currentScore: 0 },
      player2: { ...player2, games: 0, currentScore: 0 },
      gameScores: [],
      currentGame: 1
    });
  };

  // Update game score
  const updateGameScore = (playerNum: 1 | 2) => {
    if (!activeMatch) return;

    const match = { ...activeMatch };
    const player = playerNum === 1 ? 'player1' : 'player2';
    const otherPlayer = playerNum === 1 ? 'player2' : 'player1';

    match[player].currentScore++;

    // Check win condition (11 points with 2 point lead)
    if (match[player].currentScore >= 11 &&
        (match[player].currentScore - match[otherPlayer].currentScore) >= 2) {
      // Game won
      match[player].games++;
      match.gameScores.push({
        player1Score: match.player1.currentScore,
        player2Score: match.player2.currentScore
      });

      // Check if match is won (best of 5)
      if (match[player].games === 3) {
        // Match won
        finishMatch(
          match.groupId,
          match[player].id,
          match[otherPlayer].id,
          match.gameScores
        );
        setActiveMatch(null);
      } else {
        // Next game
        match.currentGame++;
        match.player1.currentScore = 0;
        match.player2.currentScore = 0;
        setActiveMatch(match);
      }
    } else {
      setActiveMatch(match);
    }
  };

  // Finish match and update standings
  const finishMatch = (
    groupId: number,
    winnerId: number,
    loserId: number,
    gameScores: GameScore[]
  ) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          players: group.players.map(player => {
            if (player.id === winnerId) {
              return {
                ...player,
                matches: (player.matches || 0) + 1,
                matchesWon: (player.matchesWon || 0) + 1,
                points: (player.points || 0) + 2
              };
            }
            if (player.id === loserId) {
              return {
                ...player,
                matches: (player.matches || 0) + 1,
                points: (player.points || 0)
              };
            }
            return player;
          }),
          matches: [...group.matches, {
            player1Id: winnerId,
            player2Id: loserId,
            gameScores,
            winnerId
          }]
        };
      }
      return group;
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Table Tennis Tournament
      </h1>

      {/* Registration Stage */}
      {stage === 'registration' && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6" />
              <h2 className="text-2xl font-semibold">Player Registration</h2>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
              <Input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter player name"
                className="flex-1"
              />
              <Button type="submit">
                Add Player
              </Button>
            </form>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {players.map(player => (
                <Card key={player.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <span>{player.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => handleRemovePlayer(player.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        ×
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-4 text-center">
              <Button
                onClick={startGroupStage}
                disabled={players.length < 2}
              >
                Start Group Stage ({players.length} players)
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Match */}
      {activeMatch && (
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-xl font-semibold text-center">
              Match in Progress - Game {activeMatch.currentGame}
            </h2>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="flex justify-between items-center w-full max-w-md">
                <div className="text-center">
                  <h3 className="font-semibold">{activeMatch.player1.name}</h3>
                  <p className="text-3xl font-bold">{activeMatch.player1.currentScore}</p>
                  <p className="text-sm">Games: {activeMatch.player1.games}</p>
                  <Button
                    onClick={() => updateGameScore(1)}
                    className="mt-2"
                  >
                    +1 Point
                  </Button>
                </div>
                <div className="text-2xl font-bold">VS</div>
                <div className="text-center">
                  <h3 className="font-semibold">{activeMatch.player2.name}</h3>
                  <p className="text-3xl font-bold">{activeMatch.player2.currentScore}</p>
                  <p className="text-sm">Games: {activeMatch.player2.games}</p>
                  <Button
                    onClick={() => updateGameScore(2)}
                    className="mt-2"
                  >
                    +1 Point
                  </Button>
                </div>
              </div>

              {activeMatch.gameScores.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Previous Games:</h4>
                  <div className="flex gap-2">
                    {activeMatch.gameScores.map((score, idx) => (
                      <div key={idx} className="text-sm">
                        Game {idx + 1}: {score.player1Score}-{score.player2Score}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Group Stage */}
      {stage === 'groups' && !activeMatch && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {groups.map(group => (
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
                          .map(player => (
                          <tr key={player.id} className="border-b">
                            <td className="p-2">{player.name}</td>
                            <td className="text-center p-2">{player.matches}</td>
                            <td className="text-center p-2">{player.matchesWon}</td>
                            <td className="text-center p-2">{player.points}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Available Matches */}
                  <div className="space-y-2">
                    <h3 className="font-semibold">Start Match</h3>
                    {group.players.map(player1 => (
                      <div key={player1.id}>
                        {group.players
                          .filter(player2 => player2.id > player1.id)
                          .map(player2 => (
                            <div key={`${player1.id}-${player2.id}`} className="flex gap-2 items-center mb-2">
                              <span>{player1.name} vs {player2.name}</span>
                              <Button
                                onClick={() => startMatch(group.id, player1.id, player2.id)}
                                disabled={group.matches.some(m =>
                                  (m.player1Id === player1.id && m.player2Id === player2.id) ||
                                  (m.player1Id === player2.id && m.player2Id === player1.id)
                                )}
                                variant="outline"
                              >
                                Start Match
                              </Button>
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="col-span-full text-center">
            <Button
              onClick={() => setStage('playoffs')}
              className="mt-4"
            >
              Start Playoffs
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TournamentManager;