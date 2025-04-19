import { Edit2 } from "lucide-react"
import React from "react"

import { Button } from "@/components/ui/button"

import ScoreButtons from "./ScoreButtons"

const MatchCard = ({ match, isEditing, onEdit, onSetScore, onCancelEdit }) => (
  <div className="p-3 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors">
    <div className="flex items-center justify-between">
      <span className="flex-1 font-medium">
        {match.player1.firstName} {match.player1.lastName}
      </span>
      {match.score && !isEditing ? (
        <div className="flex items-center gap-2">
          <span className="px-4 font-bold text-lg">
            {match.score.player1Score} - {match.score.player2Score}
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={onEdit}
            className="hover:bg-background/50"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <span className="text-sm text-muted-foreground px-4">vs</span>
      )}
      <span className="flex-1 text-right font-medium">
        {match.player2.firstName} {match.player2.lastName}
      </span>
    </div>
    {(isEditing || !match.score) && (
      <div className="mt-3 pt-3 border-t border-border/50">
        <ScoreButtons
          onSetScore={onSetScore}
          onCancel={isEditing ? onCancelEdit : null}
        />
      </div>
    )}
  </div>
)

export default MatchCard
