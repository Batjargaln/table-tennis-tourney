import React from "react"
import { useLang } from "./LangContext"
import GroupStandings from "./GroupStandings"
import MatchCard from "./MatchCard"

const GroupCard = ({
  group, groupIndex, standings, editingMatch,
  onEditMatch, onSetScore, onCancelEdit,
}) => {
  const { t } = useLang()
  const letter = String.fromCharCode(65 + groupIndex)

  const total    = group.matches.length
  const done     = group.matches.filter((m) => m.score !== null).length
  const complete = done === total

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(16px)",
        border: complete
          ? "1px solid rgba(34,139,34,0.22)"
          : "1px solid rgba(255,183,197,0.3)",
        boxShadow: "0 2px 16px rgba(28,35,64,0.07)",
      }}
    >
      {/* Header */}
      <div
        className="px-5 py-3 flex items-center gap-2"
        style={{
          background: complete
            ? "rgba(34,139,34,0.07)"
            : "rgba(200,144,58,0.08)",
          borderBottom: complete
            ? "1px solid rgba(34,139,34,0.15)"
            : "1px solid rgba(200,144,58,0.2)",
        }}
      >
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0"
          style={{
            background: complete ? "rgba(34,139,34,0.15)" : "rgba(200,144,58,0.15)",
            color: complete ? "#166534" : "#A87028",
          }}
        >
          {complete ? "✓" : letter}
        </span>
        <span className="font-black text-sm" style={{ color: "#1C2340" }}>
          {t.group} {letter}
        </span>

        {/* Progress indicator */}
        <div className="ml-auto flex items-center gap-2">
          <div className="flex gap-0.5">
            {group.matches.map((m, i) => (
              <div
                key={i}
                className="rounded-full"
                style={{
                  width: 6,
                  height: 6,
                  background: m.score !== null
                    ? complete ? "rgba(34,139,34,0.7)" : "rgba(200,144,58,0.7)"
                    : "rgba(28,35,64,0.15)",
                }}
              />
            ))}
          </div>
          <span
            className="text-xs font-bold tabular-nums"
            style={{ color: complete ? "#166534" : "rgba(28,35,64,0.38)" }}
          >
            {done}/{total}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <GroupStandings standings={standings} />
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-2"
            style={{ color: "rgba(28,35,64,0.4)" }}
          >
            {t.matches}
          </p>
          <div className="space-y-2">
            {group.matches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                isEditing={editingMatch === match.id}
                onEdit={() => onEditMatch(match.id)}
                onSetScore={(score1, score2) => onSetScore(match.id, score1, score2)}
                onCancelEdit={onCancelEdit}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupCard
