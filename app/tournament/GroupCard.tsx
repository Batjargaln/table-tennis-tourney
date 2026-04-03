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

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,183,197,0.3)",
        boxShadow: "0 2px 16px rgba(28,35,64,0.07)",
      }}
    >
      <div
        className="px-5 py-3 flex items-center gap-2"
        style={{ background: "rgba(200,144,58,0.08)", borderBottom: "1px solid rgba(200,144,58,0.2)" }}
      >
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
          style={{ background: "rgba(200,144,58,0.15)", color: "#A87028" }}
        >
          {letter}
        </span>
        <span className="font-black text-sm" style={{ color: "#1C2340" }}>
          {t.group} {letter}
        </span>
      </div>

      <div className="p-4 space-y-4">
        <GroupStandings standings={standings} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(28,35,64,0.4)" }}>
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
