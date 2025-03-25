import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import GroupStandings from "./GroupStandings";
import MatchCard from "./MatchCard";

const GroupCard = ({
  group,
  groupIndex,
  standings,
  editingMatch,
  onEditMatch,
  onSetScore,
  onCancelEdit,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Group {String.fromCharCode(65 + groupIndex)}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <GroupStandings standings={standings} />
        <div>
          <h3 className="font-semibold mb-2">Matches</h3>
          <div className="space-y-2">
            {group.matches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                isEditing={editingMatch === match.id}
                onEdit={() => onEditMatch(match.id)}
                onSetScore={(score1, score2) =>
                  onSetScore(match.id, score1, score2)
                }
                onCancelEdit={onCancelEdit}
              />
            ))}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default GroupCard;
