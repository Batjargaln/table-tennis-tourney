import React from 'react';

const GroupStandings = ({ standings }) => (
  <div className="mt-4">
    <h3 className="font-semibold mb-3">Standings</h3>
    <div className="text-sm space-y-1.5">
      {standings.map((player, index) => (
        <div
          key={player.id}
          className={`flex justify-between items-center p-2.5 rounded-lg transition-colors ${
            index === 0 ? 'bg-gradient-to-r from-green-500/20 to-green-500/10 hover:from-green-500/30 hover:to-green-500/20' :
            index === 1 ? 'bg-gradient-to-r from-blue-500/20 to-blue-500/10 hover:from-blue-500/30 hover:to-blue-500/20' :
            'bg-secondary hover:bg-secondary/70'
          }`}
        >
          <div className="font-medium flex items-center gap-2">
            <span className="text-lg">{index + 1}.</span>
            <span>{player.name}</span>
            {index < 2 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-background/50">
                {index === 0 ? '1st' : '2nd'}
              </span>
            )}
          </div>
          <div className="text-muted-foreground flex items-center gap-3">
            <span>{player.wins}W - {player.losses}L</span>
            <span className="text-xs">({player.matchesWon}-{player.matchesLost})</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default GroupStandings;