import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '../components/ui/button';
import { Edit2 } from 'lucide-react';
import ScoreButtons from './ScoreButtons';

const PlayoffMatchCard = ({
  match,
  isEditing,
  onEdit,
  onSetScore,
  onCancelEdit
}) => {
  if (!match.player1 || !match.player2) return null;

  const getMatchStyle = (round) => {
    switch(round) {
      case 'quarter':
        return 'border-l-4 border-blue-500/50';
      case 'semi':
        return 'border-l-4 border-green-500/50';
      case 'final':
        return 'border-l-4 border-yellow-500/50';
      default:
        return '';
    }
  };

  return (
    <Card className={`mb-4 shadow-md hover:shadow-lg transition-shadow ${getMatchStyle(match.round)}`}>
      <CardContent className="p-4">
        <div className="rounded-lg hover:bg-secondary/50 transition-colors">
          <div className="flex items-center justify-between p-3">
            <div className="flex-1">
              <span className="font-medium">{match.player1.name}</span>
              <span className="text-xs ml-2 text-muted-foreground">
                ({match.player1.groupId}{match.player1.rank})
              </span>
            </div>
            {match.score && !isEditing ? (
              <div className="flex items-center gap-2">
                <span className="px-4 font-bold text-lg">
                  {match.score.player1Score} - {match.score.player2Score}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onEdit}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            ) : null}
            <div className="flex-1 text-right">
              <span className="text-xs mr-2 text-muted-foreground">
                ({match.player2.groupId}{match.player2.rank})
              </span>
              <span className="font-medium">{match.player2.name}</span>
            </div>
          </div>
          {(isEditing || !match.score) && (
            <div className="p-3 bg-secondary/30 rounded-b-lg">
              <ScoreButtons
                onSetScore={onSetScore}
                onCancel={isEditing ? onCancelEdit : null}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayoffMatchCard;