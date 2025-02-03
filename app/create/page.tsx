"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IPlayer } from "@/utils/supabase/IPlayer";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Page() {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState<IPlayer[]>([]);
  // Player Registration
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      setPlayers((prev) => [
        ...prev,
        {
          id: uuidv4(),
          name: playerName.trim(),
          matches: 0,
          matchesWon: 0,
          points: 0,
        },
      ]);
      setPlayerName("");
    }
  };
  const handleRemovePlayer = (playerId: string) => {
    setPlayers((prev) => prev.filter((player) => player.id !== playerId));
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-semibold">Player Registration</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
        <Input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter player name"
          className="flex-1"
        />
        <Button type="submit">Add Player</Button>
      </form>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {players.map((player) => (
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
        <Button onClick={() => {}} disabled={players.length < 2}>
          Start Group Stage ({players.length} players)
        </Button>
      </div>
    </div>
  );
}
