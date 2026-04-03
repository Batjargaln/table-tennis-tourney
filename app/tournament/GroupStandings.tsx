import React from "react"
import { useLang } from "./LangContext"

const GroupStandings = ({ standings }) => {
  const { t } = useLang()

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(28,35,64,0.4)" }}>
        {t.standings}
      </p>
      <div className="space-y-1.5">
        {standings.map((player, index) => (
          <div
            key={player.id}
            className="flex items-center justify-between px-3 py-2 rounded-xl text-sm"
            style={{
              background:
                index === 0
                  ? "linear-gradient(90deg, rgba(200,144,58,0.18), rgba(200,144,58,0.06))"
                  : index === 1
                  ? "linear-gradient(90deg, rgba(28,55,160,0.10), rgba(28,55,160,0.03))"
                  : "rgba(28,35,64,0.04)",
              border:
                index === 0
                  ? "1px solid rgba(200,144,58,0.28)"
                  : index === 1
                  ? "1px solid rgba(28,55,160,0.15)"
                  : "1px solid rgba(28,35,64,0.08)",
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                style={{
                  background: index === 0 ? "rgba(200,144,58,0.2)" : index === 1 ? "rgba(28,55,160,0.12)" : "rgba(28,35,64,0.08)",
                  color: index === 0 ? "#A87028" : index === 1 ? "#2A5ABD" : "rgba(28,35,64,0.5)",
                }}
              >
                {index + 1}
              </span>
              <span className="font-semibold" style={{ color: "#1C2340" }}>
                {player.firstName} {player.lastName}
              </span>
              {index < 2 && (
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                  style={{
                    background: index === 0 ? "rgba(200,144,58,0.15)" : "rgba(28,55,160,0.1)",
                    color: index === 0 ? "#A87028" : "#2A5ABD",
                  }}
                >
                  ↑ ADV
                </span>
              )}
            </div>
            <span className="text-xs font-semibold" style={{ color: "rgba(28,35,64,0.5)" }}>
              {t.wl(player.wins, player.losses)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GroupStandings
