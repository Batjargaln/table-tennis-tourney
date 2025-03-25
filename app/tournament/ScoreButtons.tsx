import { X } from "lucide-react"
import React from "react"

import { Button } from "@/components/ui/button"

const ScoreButtons = ({ onSetScore, onCancel }) => (
  <div className="flex flex-wrap gap-2 justify-center">
    <Button size="sm" onClick={() => onSetScore(3, 0)}>
      3-0
    </Button>
    <Button size="sm" onClick={() => onSetScore(3, 1)}>
      3-1
    </Button>
    <Button size="sm" onClick={() => onSetScore(3, 2)}>
      3-2
    </Button>
    <Button size="sm" onClick={() => onSetScore(2, 3)}>
      2-3
    </Button>
    <Button size="sm" onClick={() => onSetScore(1, 3)}>
      1-3
    </Button>
    <Button size="sm" onClick={() => onSetScore(0, 3)}>
      0-3
    </Button>
    {onCancel && (
      <Button size="sm" variant="ghost" onClick={onCancel}>
        <X className="h-4 w-4" />
      </Button>
    )}
  </div>
)

export default ScoreButtons
