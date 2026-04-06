import React from "react"
import { useLang } from "./LangContext"
import ScoreButtons from "./ScoreButtons"

const MatchCard = ({ match, isEditing, onEdit, onSetScore, onCancelEdit }) => {
  const { t, isAdmin } = useLang()

  const p1Wins = match.score && match.score.player1Score > match.score.player2Score
  const p2Wins = match.score && match.score.player2Score > match.score.player1Score
  const played = !!match.score

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: played ? "rgba(255,255,255,0.7)" : "rgba(28,35,64,0.03)",
        border: played
          ? "1px solid rgba(28,35,64,0.09)"
          : "1px solid rgba(28,35,64,0.07)",
      }}
    >
      <div className="px-3 pt-2.5 pb-2">
        {/* Player 1 */}
        <PlayerRow
          name={`${match.player1.firstName} ${match.player1.lastName}`}
          score={match.score?.player1Score}
          isWinner={!!p1Wins}
          played={played}
        />

        <div className="my-1 h-px" style={{ background: "rgba(28,35,64,0.06)" }} />

        {/* Player 2 */}
        <PlayerRow
          name={`${match.player2.firstName} ${match.player2.lastName}`}
          score={match.score?.player2Score}
          isWinner={!!p2Wins}
          played={played}
        />

        {/* Score actions */}
        {isAdmin && (
          <div className="mt-2">
            {isEditing || !match.score ? (
              <ScoreButtons
                onSetScore={onSetScore}
                onCancel={isEditing ? onCancelEdit : null}
                enterLabel={t.enterScore}
              />
            ) : (
              <button
                onClick={onEdit}
                className="text-xs font-semibold px-2 py-0.5 rounded-lg transition-colors hover:bg-black/5"
                style={{ color: "rgba(28,35,64,0.32)", border: "1px solid rgba(28,35,64,0.09)" }}
              >
                ✎
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function PlayerRow({
  name, score, isWinner, played,
}: {
  name: string
  score?: number
  isWinner: boolean
  played: boolean
}) {
  const isLoser = played && !isWinner
  return (
    <div className="flex items-center justify-between gap-1 h-6">
      <div className="flex items-center gap-1 min-w-0 flex-1">
        {isWinner && (
          <span className="text-xs flex-shrink-0" style={{ color: "#C8903A" }}>▶</span>
        )}
        <span
          className="text-sm truncate"
          style={{
            color: isLoser ? "rgba(28,35,64,0.32)" : "#1C2340",
            fontWeight: isWinner ? 700 : isLoser ? 400 : 600,
            textDecoration: isLoser ? "line-through" : "none",
          }}
        >
          {name}
        </span>
      </div>
      {score !== undefined && (
        <span
          className="text-sm font-black flex-shrink-0 ml-2"
          style={{ color: isWinner ? "#C8903A" : "rgba(28,35,64,0.28)" }}
        >
          {score}
        </span>
      )}
    </div>
  )
}

export default MatchCard
