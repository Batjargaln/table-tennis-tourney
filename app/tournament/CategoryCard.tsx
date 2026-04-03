import React from "react"
import { useLang } from "./LangContext"

const categoryTitleKey = {
  "beginner-male":   "mensBeginner",
  "advanced-male":   "mensAdvanced",
  "beginner-female": "womensBeginner",
  "advanced-female": "womensAdvanced",
} as const

const categoryDescKey = {
  "beginner-male":   "forBeginners",
  "advanced-male":   "forAdvanced",
  "beginner-female": "forBeginners",
  "advanced-female": "forAdvanced",
} as const

const CategoryCard = ({ category, data, onClick }) => {
  const { t } = useLang()
  const title = t[categoryTitleKey[category.id]] ?? category.title
  const desc  = t[categoryDescKey[category.id]]  ?? category.description

  return (
    <button
      onClick={onClick}
      className="text-left w-full rounded-2xl overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg"
      style={{
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,183,197,0.35)",
        boxShadow: "0 2px 16px rgba(28,35,64,0.07)",
      }}
    >
      <div
        className="px-5 py-3.5"
        style={{
          background: category.gender === "male"
            ? "rgba(28,55,160,0.07)"
            : "rgba(185,40,90,0.07)",
          borderBottom: `1px solid ${category.gender === "male" ? "rgba(28,55,160,0.15)" : "rgba(220,100,140,0.22)"}`,
        }}
      >
        <p className="font-black text-sm tracking-wide" style={{ color: "#1C2340" }}>
          {title}
        </p>
      </div>

      <div className="px-5 py-4 space-y-2.5">
        <p className="text-xs" style={{ color: "rgba(28,35,64,0.5)" }}>{desc}</p>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <span style={{ color: "rgba(28,35,64,0.4)" }}>{t.players}</span>
            <span className="font-black" style={{ color: "#C8903A" }}>{data.players.length}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span style={{ color: "rgba(28,35,64,0.4)" }}>{t.groups}</span>
            <span className="font-black" style={{ color: "#C8903A" }}>{data.groups?.length ?? 0}</span>
          </div>
          {data.playoffs && (
            <div
              className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(200,144,58,0.12)", color: "#A87028" }}
            >
              {t.playoffs}
            </div>
          )}
        </div>
      </div>
    </button>
  )
}

export default CategoryCard
