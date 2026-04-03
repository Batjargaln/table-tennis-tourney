import React from "react"
import { useLang } from "./LangContext"
import ScoreButtons from "./ScoreButtons"

const MatchCard = ({ match, isEditing, onEdit, onSetScore, onCancelEdit }) => {
  const { t, isAdmin } = useLang()

  return (
    <div
      className="p-3 rounded-xl transition-colors"
      style={{ background: "rgba(28,35,64,0.04)", border: "1px solid rgba(28,35,64,0.07)" }}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="flex-1 font-semibold text-sm" style={{ color: "#1C2340" }}>
          {match.player1.firstName} {match.player1.lastName}
        </span>
        {match.score && !isEditing ? (
          <div className="flex items-center gap-2">
            <span className="px-3 font-black text-base" style={{ color: "#C8903A" }}>
              {match.score.player1Score}–{match.score.player2Score}
            </span>
            <button
              onClick={onEdit}
              className="text-xs px-2 py-0.5 rounded-lg transition-colors hover:bg-black/5"
              style={{ color: "rgba(28,35,64,0.35)", border: "1px solid rgba(28,35,64,0.1)" }}
            >
              ✎
            </button>
          </div>
        ) : (
          <span className="text-xs px-3" style={{ color: "rgba(28,35,64,0.3)" }}>vs</span>
        )}
        <span className="flex-1 text-right font-semibold text-sm" style={{ color: "#1C2340" }}>
          {match.player2.firstName} {match.player2.lastName}
        </span>
      </div>

      {isAdmin && (isEditing || !match.score) && (
        <div className="mt-2 pt-2" style={{ borderTop: "1px solid rgba(28,35,64,0.07)" }}>
          <ScoreButtons
            onSetScore={onSetScore}
            onCancel={isEditing ? onCancelEdit : null}
            enterLabel={t.enterScore}
          />
        </div>
      )}
    </div>
  )
}

export default MatchCard
