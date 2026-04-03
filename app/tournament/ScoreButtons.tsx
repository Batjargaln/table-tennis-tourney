import React from "react"

const scores = [[3,0],[3,1],[3,2],[2,3],[1,3],[0,3]] as const

const ScoreButtons = ({ onSetScore, onCancel, enterLabel }: {
  onSetScore: (s1: number, s2: number) => void
  onCancel?: (() => void) | null
  enterLabel?: string
}) => (
  <div>
    {enterLabel && (
      <p className="text-xs font-semibold mb-1.5" style={{ color: "rgba(28,35,64,0.4)" }}>{enterLabel}</p>
    )}
    <div className="flex flex-wrap gap-1.5">
      {scores.map(([s1, s2]) => (
        <button
          key={`${s1}-${s2}`}
          onClick={() => onSetScore(s1, s2)}
          className="px-3 py-1.5 rounded-lg text-xs font-bold transition-transform hover:scale-105"
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

export default ScoreButtons
