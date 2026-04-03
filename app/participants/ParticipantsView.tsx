"use client"

import { useState } from "react"

type Lang = "mn" | "en"
type Player = {
  id: string
  first_name: string
  last_name: string
  gender: string
  skill_beginner: boolean
  skill_advanced: boolean
}

const T = {
  mn: {
    subtitle:       "АНУ-ын Монголчуудын",
    title:          "Оролцогчид",
    titleSub:       "Бүртгэлтэй тоглогчид",
    total:          (n: number) => `Нийт ${n} тоглогч`,
    mensBeginner:   "Эрэгтэй · Анхан шат",
    mensAdvanced:   "Эрэгтэй · Ахисан шат",
    womensBeginner: "Эмэгтэй · Анхан шат",
    womensAdvanced: "Эмэгтэй · Ахисан шат",
    players:        (n: number) => `${n} тоглогч`,
    empty:          "Бүртгэлтэй тоглогч байхгүй байна",
    register:       "Бүртгүүлэх",
  },
  en: {
    subtitle:       "USA Mongolians",
    title:          "Participants",
    titleSub:       "Registered players",
    total:          (n: number) => `${n} players registered`,
    mensBeginner:   "Men · Beginner",
    mensAdvanced:   "Men · Advanced",
    womensBeginner: "Women · Beginner",
    womensAdvanced: "Women · Advanced",
    players:        (n: number) => `${n} player${n !== 1 ? "s" : ""}`,
    empty:          "No players registered yet",
    register:       "Register",
  },
}

const CATEGORIES = [
  { key: "mensBeginner",   filter: (p: Player) => p.gender === "male"   && p.skill_beginner, gender: "male" },
  { key: "mensAdvanced",   filter: (p: Player) => p.gender === "male"   && p.skill_advanced, gender: "male" },
  { key: "womensBeginner", filter: (p: Player) => p.gender === "female" && p.skill_beginner, gender: "female" },
  { key: "womensAdvanced", filter: (p: Player) => p.gender === "female" && p.skill_advanced, gender: "female" },
] as const

export default function ParticipantsView({ players }: { players: Player[] }) {
  const [lang, setLang] = useState<Lang>("mn")
  const t = T[lang]
  const total = new Set(players.map((p) => p.id)).size

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(165deg, #FFF7FA 0%, #FDF0F5 22%, #F8E8F2 48%, #EEE5F4 74%, #EAE6F5 100%)",
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 25%, rgba(255,183,197,0.2) 0%, transparent 70%)",
        }}
      />

      {/* Falling petals */}
      {([
        ["10%", "15%", 8, 0.45,  0],
        ["25%", "45%", 6, 0.35, 40],
        ["70%", "20%", 9, 0.38, 75],
        ["88%", "50%", 6, 0.28,115],
        ["50%", "8%",  5, 0.40,150],
        ["62%", "72%", 7, 0.30,188],
        ["6%",  "70%", 6, 0.32,225],
        ["93%", "35%", 5, 0.25,262],
      ] as const).map(([left, top, sz, op, rot], i) => (
        <div key={i} className="absolute pointer-events-none" style={{
          left, top, width: sz * 2, height: sz,
          background: "#FFB7C5", opacity: op,
          transform: `rotate(${rot}deg)`, borderRadius: "50% 0 50% 0",
        }} />
      ))}

      {/* Cherry branches */}
      <div className="absolute top-0 left-0 pointer-events-none select-none opacity-60 hidden sm:block">
        <BlossomBranch />
      </div>
      <div className="absolute top-0 right-0 pointer-events-none select-none opacity-60 hidden sm:block" style={{ transform: "scaleX(-1)" }}>
        <BlossomBranch />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-8">

        {/* Lang toggle */}
        <div className="flex justify-end mb-6">
          <div className="flex rounded-full overflow-hidden text-sm" style={{ border: "1px solid rgba(28,35,64,0.18)" }}>
            {(["mn", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="px-4 py-1.5 font-bold transition-all"
                style={{
                  background: lang === l ? "rgba(28,35,64,0.1)" : "transparent",
                  color: lang === l ? "#1C2340" : "rgba(28,35,64,0.38)",
                }}
              >
                {l === "mn" ? "МОН" : "ENG"}
              </button>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-[0.35em] uppercase mb-3" style={{ color: "rgba(28,35,64,0.32)" }}>
            {t.subtitle}
          </p>

          {/* Petal divider */}
          <div className="flex items-center gap-3 mb-4 max-w-xs mx-auto">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,138,174,0.5))" }} />
            <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="10" cy="4"  r="2.6" fill="#FFB7C5" />
              <circle cx="16" cy="10" r="2.6" fill="#FFB7C5" />
              <circle cx="10" cy="16" r="2.6" fill="#FFB7C5" />
              <circle cx="4"  cy="10" r="2.6" fill="#FFB7C5" />
              <circle cx="10" cy="10" r="1.7" fill="#C8903A" />
            </svg>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(255,138,174,0.5), transparent)" }} />
          </div>

          <h1 className="text-3xl sm:text-4xl font-black mb-1" style={{ color: "#1C2340" }}>
            {t.title}
          </h1>
          <p className="text-sm font-semibold mb-3" style={{ color: "#B8762A" }}>{t.titleSub}</p>
          <span
            className="inline-block text-sm font-bold px-4 py-1.5 rounded-full"
            style={{ background: "rgba(200,144,58,0.1)", border: "1px solid rgba(200,144,58,0.28)", color: "#A87028" }}
          >
            {t.total(total)}
          </span>
        </div>

        {/* Category groups */}
        <div className="space-y-6">
          {CATEGORIES.map(({ key, filter, gender }) => {
            const group = players.filter(filter)
            return (
              <div
                key={key}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.72)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,183,197,0.32)",
                  boxShadow: "0 2px 16px rgba(28,35,64,0.07)",
                }}
              >
                {/* Category header */}
                <div
                  className="px-5 py-3.5 flex items-center justify-between"
                  style={{
                    background: gender === "male" ? "rgba(28,55,160,0.07)" : "rgba(185,40,90,0.07)",
                    borderBottom: `1px solid ${gender === "male" ? "rgba(28,55,160,0.15)" : "rgba(220,100,140,0.22)"}`,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{gender === "male" ? "♂" : "♀"}</span>
                    <span className="font-black text-sm tracking-wide" style={{ color: "#1C2340" }}>
                      {t[key]}
                    </span>
                  </div>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: gender === "male" ? "rgba(28,55,160,0.1)" : "rgba(185,40,90,0.1)",
                      color: gender === "male" ? "#2A5ABD" : "#B8285A",
                    }}
                  >
                    {t.players(group.length)}
                  </span>
                </div>

                {/* Player list */}
                <div className="p-4">
                  {group.length === 0 ? (
                    <p className="text-center py-4 text-sm" style={{ color: "rgba(28,35,64,0.35)" }}>
                      {t.empty}
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {group.map((player, i) => (
                        <div
                          key={player.id}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                          style={{ background: "rgba(28,35,64,0.03)", border: "1px solid rgba(28,35,64,0.07)" }}
                        >
                          <span
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                            style={{ background: "rgba(200,144,58,0.12)", color: "#A87028" }}
                          >
                            {i + 1}
                          </span>
                          <span className="font-semibold text-sm" style={{ color: "#1C2340" }}>
                            {player.first_name} {player.last_name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Register CTA */}
        <div className="text-center mt-10">
          <a
            href="/registry"
            className="inline-block px-8 py-3 rounded-xl font-black text-sm tracking-wide transition-transform hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #D4963C, #A87028)",
              color: "#FFF8F0",
              boxShadow: "0 4px 20px rgba(200,144,58,0.35)",
            }}
          >
            {t.register} →
          </a>
        </div>
      </div>
    </section>
  )
}

function BlossomBranch() {
  const blossoms = [
    [28,38,9],[74,60,7.5],[110,112,9.5],[96,32,8],[130,16,8.5],[164,65,7.5],[196,54,8.5],
  ]
  return (
    <svg width="200" height="220" viewBox="0 0 300 320" aria-hidden="true">
      <path d="M -8,-8 C 30,55 65,45 105,105 C 138,155 158,188 185,238" stroke="#7A3828" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M 45,64 C 62,36 96,20 132,12" stroke="#7A3828" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <path d="M 105,105 C 130,76 162,60 198,50" stroke="#7A3828" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      {blossoms.map(([x, y, r], i) => {
        const petals: [number,number][] = [[x,y-r],[x+r*.95,y-r*.31],[x+r*.59,y+r*.81],[x-r*.59,y+r*.81],[x-r*.95,y-r*.31]]
        const colors = ["#FFB7C5","#F6A0B8","#EF8AAE","#F6A0B8","#FFB7C5"]
        return (
          <g key={i} opacity={0.85}>
            {petals.map(([px,py],j) => <circle key={j} cx={px} cy={py} r={r*.55} fill={colors[j]} />)}
            <circle cx={x} cy={y} r={r*.28} fill="#FFD9A0" />
          </g>
        )
      })}
    </svg>
  )
}
