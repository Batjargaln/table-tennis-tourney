import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, Trophy } from 'lucide-react';
import PlayoffMatchCard from './PlayOffMatchCard';

const PlayoffBracket = ({
  playoffs,
  onBackToGroups,
  editingMatch,
  onEditMatch,
  onSetScore,
  onCancelEdit
}) => {
  const quarterFinals = playoffs.matches.filter(m => m.round === 'quarter');
  const semiFinals = playoffs.matches.filter(m => m.round === 'semi');
  const final = playoffs.matches.find(m => m.round === 'final');

  const winner = final?.score
    ? (final.score.player1Score > final.score.player2Score ? final.player1 : final.player2)
    : null;

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          className="gap-2"
          onClick={onBackToGroups}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Groups
        </Button>
        <h2 className="text-2xl font-bold">Playoffs</h2>
      </div>

      {winner && (
        <Card className="mb-8 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/50">
          <CardContent className="p-6 text-center">
            <Trophy className="h-12 w-12 mx-auto mb-3 text-yellow-500" />
            <h3 className="text-2xl font-bold mb-2">Tournament Winner</h3>
            <p className="text-xl">
              {winner.name}
              <span className="text-base ml-2 text-muted-foreground">
                (Group {winner.groupId})
              </span>
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-blue-500/50 rounded"></div>
            <h3 className="text-lg font-bold">Quarter Finals</h3>
          </div>
          {quarterFinals.map(match => (
            <PlayoffMatchCard
              key={match.id}
              match={match}
              isEditing={editingMatch === match.id}
              onEdit={() => onEditMatch(match.id)}
              onSetScore={(score1, score2) => onSetScore(match.id, score1, score2)}
              onCancelEdit={onCancelEdit}
            />
          ))}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-green-500/50 rounded"></div>
            <h3 className="text-lg font-bold">Semi Finals</h3>
          </div>
          {semiFinals.map(match => (
            <PlayoffMatchCard
              key={match.id}
              match={match}
              isEditing={editingMatch === match.id}
              onEdit={() => onEditMatch(match.id)}
              onSetScore={(score1, score2) => onSetScore(match.id, score1, score2)}
              onCancelEdit={onCancelEdit}
            />
          ))}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-yellow-500/50 rounded"></div>
            <h3 className="text-lg font-bold">Final</h3>
          </div>
          {final && (
            <PlayoffMatchCard
              match={final}
              isEditing={editingMatch === final.id}
              onEdit={() => onEditMatch(final.id)}
              onSetScore={(score1, score2) => onSetScore(final.id, score1, score2)}
              onCancelEdit={onCancelEdit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayoffBracket;