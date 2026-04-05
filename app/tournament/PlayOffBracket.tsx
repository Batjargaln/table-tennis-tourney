import { ChevronLeft, Trophy } from "lucide-react"
import React from "react"
import { useLang } from "./LangContext"

const ROUND_COLORS: Record<number, string> = {
  2:  "rgba(200,144,58,0.7)",
  4:  "rgba(34,139,34,0.5)",
  8:  "rgba(28,55,160,0.5)",
  16: "rgba(130,60,180,0.5)",
  32: "rgba(185,60,60,0.5)",
  64: "rgba(60,140,140,0.5)",
}

function getRoundLabel(size: number, t: any): string {
  if (size === 2)  return t.final
  if (size === 4)  return t.semiFinals
  if (size === 8)  return t.quarterFinals
  return t.roundOf(size)
}

function getRoundColor(size: number): string {
  return ROUND_COLORS[size] ?? "rgba(100,100,100,0.5)"
}

const PlayoffBracket = ({
  playoffs, onBackToGroups, editingMatch,
  onEditMatch, onSetScore, onCancelEdit,
}) => {
  const { t } = useLang()

  // Collect unique round sizes, largest first (earliest round → final)
  const roundSizes = [...new Set(playoffs.matches.map((m) => m.round as number))]
    .sort((a, b) => b - a)

  // For each round, only show non-BYE matches
  const visibleRounds = roundSizes
    .map((size) => ({
      size,
      matches: playoffs.matches.filter((m) => m.round === size && !m.isBye),
    }))
    .filter((r) => r.matches.length > 0)

  const finalMatch = playoffs.matches.find((m) => m.round === 2)
  const winner = finalMatch?.score
    ? finalMatch.score.player1Score > finalMatch.score.player2Score
      ? finalMatch.player1
      : finalMatch.player2
    : null

  const RoundSection = ({ size, matches }) => {
    const label = getRoundLabel(size, t)
    const color = getRoundColor(size)
    return (
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 rounded" style={{ background: color }} />
          <h3 className="text-base font-black" style={{ color: "#1C2340" }}>{label}</h3>
        </div>
        {matches.map((match) => (
          <PlayoffMatchCard
            key={match.id}
            match={match}
            accentColor={color}
            isEditing={editingMatch === match.id}
            onEdit={() => onEditMatch(match.id)}
            onSetScore={(s1, s2) => onSetScore(match.id, s1, s2)}
            onCancelEdit={onCancelEdit}
          />
        ))}
      </div>
    )
  }

  const numCols = Math.min(visibleRounds.length, 4)

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div
        className="flex items-center gap-3 mb-8 px-5 py-4 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.65)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,183,197,0.35)",
          boxShadow: "0 2px 16px rgba(28,35,64,0.06)",
        }}
      >
        <button
          onClick={onBackToGroups}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-colors hover:bg-black/5"
          style={{ color: "#1C2340" }}
        >
          <ChevronLeft className="h-4 w-4" />
          {t.backToGroups}
        </button>
        <h2 className="text-xl font-black" style={{ color: "#1C2340" }}>{t.playoffs}</h2>
      </div>

      {/* Winner banner */}
      {winner && (
        <div
          className="mb-8 px-6 py-5 rounded-2xl text-center"
          style={{
            background: "linear-gradient(135deg, rgba(200,144,58,0.12), rgba(200,144,58,0.05))",
            border: "1px solid rgba(200,144,58,0.35)",
            boxShadow: "0 4px 24px rgba(200,144,58,0.15)",
          }}
        >
          <Trophy className="h-10 w-10 mx-auto mb-2" style={{ color: "#C8903A" }} />
          <h3 className="text-xl font-black mb-1" style={{ color: "#1C2340" }}>{t.winner}</h3>
          <p className="text-lg font-bold" style={{ color: "#A87028" }}>
            {winner.firstName} {winner.lastName}
            <span className="text-sm font-semibold ml-2" style={{ color: "rgba(28,35,64,0.4)" }}>
              ({t.winnerGroup} {winner.groupId})
            </span>
          </p>
        </div>
      )}

      <div
        className="grid grid-cols-1 gap-6"
        style={{ gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))` }}
      >
        {visibleRounds.map(({ size, matches }) => (
          <RoundSection key={size} size={size} matches={matches} />
        ))}
      </div>
    </div>
  )
}

/* Inline match card to avoid extra file */
function PlayoffMatchCard({ match, accentColor, isEditing, onEdit, onSetScore, onCancelEdit }) {
  const { t, isAdmin } = useLang()
  if (!match.player1 || !match.player2) return null

  return (
    <div
      className="mb-4 rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,183,197,0.28)",
        borderLeft: `4px solid ${accentColor}`,
        boxShadow: "0 2px 12px rgba(28,35,64,0.07)",
      }}
    >
      <div className="p-4">
        {/* Player 1 */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="font-semibold text-sm" style={{ color: "#1C2340" }}>
              {match.player1.firstName} {match.player1.lastName}
            </span>
            <span className="text-xs ml-2" style={{ color: "rgba(28,35,64,0.4)" }}>
              {match.player1.groupId}{match.player1.rank}
            </span>
          </div>
          {match.score && !isEditing && (
            <span className="font-black text-lg" style={{ color: "#C8903A" }}>
              {match.score.player1Score}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="h-px mb-2" style={{ background: "rgba(28,35,64,0.07)" }} />

        {/* Player 2 */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="font-semibold text-sm" style={{ color: "#1C2340" }}>
              {match.player2.firstName} {match.player2.lastName}
            </span>
            <span className="text-xs ml-2" style={{ color: "rgba(28,35,64,0.4)" }}>
              {match.player2.groupId}{match.player2.rank}
            </span>
          </div>
          {match.score && !isEditing && (
            <span className="font-black text-lg" style={{ color: "#C8903A" }}>
              {match.score.player2Score}
            </span>
          )}
        </div>

        {/* Score entry — admin only */}
        {isAdmin && (
          (isEditing || !match.score) ? (
            <ScoreButtons onSetScore={onSetScore} onCancel={isEditing ? onCancelEdit : null} enterLabel={t.enterScore} />
          ) : (
            <button
              onClick={onEdit}
              className="text-xs font-semibold px-3 py-1 rounded-lg transition-colors hover:bg-black/5"
              style={{ color: "rgba(28,35,64,0.4)", border: "1px solid rgba(28,35,64,0.1)" }}
            >
              ✎ edit
            </button>
          )
        )}
      </div>
    </div>
  )
}

function ScoreButtons({ onSetScore, onCancel, enterLabel }) {
  const scores = [[3,0],[3,1],[3,2],[2,3],[1,3],[0,3]] as const
  return (
    <div>
      <p className="text-xs font-semibold mb-2" style={{ color: "rgba(28,35,64,0.4)" }}>{enterLabel}</p>
      <div className="flex flex-wrap gap-1.5">
        {scores.map(([s1, s2]) => (
          <button
            key={`${s1}-${s2}`}
            onClick={() => onSetScore(s1, s2)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold transition-colors hover:scale-105"
            style={{
              background: s1 > s2 ? "rgba(28,55,160,0.08)" : "rgba(185,40,90,0.07)",
              border: s1 > s2 ? "1px solid rgba(28,55,160,0.2)" : "1px solid rgba(220,100,140,0.2)",
              color: "#1C2340",
            }}
          >
            {s1}–{s2}
          </button>
        ))}
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-3 py-1.5 rounded-lg text-xs font-bold transition-colors hover:bg-black/5"
            style={{ border: "1px solid rgba(28,35,64,0.12)", color: "rgba(28,35,64,0.5)" }}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

export default PlayoffBracket
