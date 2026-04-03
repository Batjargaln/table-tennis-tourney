"use client"

import { useState, useTransition, useMemo } from "react"
import { togglePaid, toggleCheckedIn } from "./action"
import { adminLogout } from "./login/action"

type Lang = "mn" | "en"
type Player = {
  id: string
  first_name: string
  last_name: string
  email: string
  gender: string
  skill_beginner: boolean
  skill_advanced: boolean
  paid: boolean
  checked_in: boolean
  created_at: string
}

const T = {
  mn: {
    title:       "Админ самбар",
    subtitle:    "Тэмцээн удирдлага",
    logout:      "Гарах",
    search:      "Нэрээр хайх...",
    filter:      "Шүүлтүүр",
    all:         "Бүгд",
    male:        "Эрэгтэй",
    female:      "Эмэгтэй",
    beginner:    "Анхан",
    advanced:    "Ахисан",
    checkedIn:   "Ирсэн",
    notCheckedIn:"Ирээгүй",
    paid:        "Төлсөн",
    notPaid:     "Төлөөгүй",
    totalReg:    "Нийт бүртгэлтэй",
    totalIn:     "Ирсэн",
    totalPaid:   "Төлбөр төлсөн",
    totalUnpaid: "Төлбөр төлөөгүй",
    name:        "Нэр",
    email:       "Имэйл",
    category:    "Ангилал",
    status:      "Төлөв",
    actions:     "Үйлдэл",
    markIn:      "Ирсэн тэмдэглэх",
    markOut:     "Ирээгүй болгох",
    markPaid:    "Төлсөн тэмдэглэх",
    markUnpaid:  "Төлөөгүй болгох",
    menBeg:      "Эрэгтэй · Анхан",
    menAdv:      "Эрэгтэй · Ахисан",
    womBeg:      "Эмэгтэй · Анхан",
    womAdv:      "Эмэгтэй · Ахисан",
    noResults:   "Тоглогч олдсонгүй",
  },
  en: {
    title:       "Admin Panel",
    subtitle:    "Tournament Management",
    logout:      "Logout",
    search:      "Search by name...",
    filter:      "Filter",
    all:         "All",
    male:        "Men",
    female:      "Women",
    beginner:    "Beginner",
    advanced:    "Advanced",
    checkedIn:   "Checked In",
    notCheckedIn:"Not Arrived",
    paid:        "Paid",
    notPaid:     "Unpaid",
    totalReg:    "Total Registered",
    totalIn:     "Checked In",
    totalPaid:   "Paid",
    totalUnpaid: "Unpaid",
    name:        "Name",
    email:       "Email",
    category:    "Category",
    status:      "Status",
    actions:     "Actions",
    markIn:      "Mark Arrived",
    markOut:     "Mark Not Arrived",
    markPaid:    "Mark Paid",
    markUnpaid:  "Mark Unpaid",
    menBeg:      "Men · Beginner",
    menAdv:      "Men · Advanced",
    womBeg:      "Women · Beginner",
    womAdv:      "Women · Advanced",
    noResults:   "No players found",
  },
}

function categoryLabel(p: Player, t: typeof T.en) {
  const parts: string[] = []
  if (p.skill_beginner) parts.push(p.gender === "male" ? t.menBeg : t.womBeg)
  if (p.skill_advanced) parts.push(p.gender === "male" ? t.menAdv : t.womAdv)
  return parts.join(", ")
}

export default function AdminPanel({ players: initial }: { players: Player[] }) {
  const [lang, setLang]     = useState<Lang>("mn")
  const [search, setSearch] = useState("")
  const [gender, setGender] = useState("all")
  const [skill, setSkill]   = useState("all")
  const [statusF, setStatusF] = useState("all")
  const [players, setPlayers] = useState(initial)
  const [, startTransition]   = useTransition()
  const t = T[lang]

  const filtered = useMemo(() => {
    return players.filter((p) => {
      const name = `${p.first_name} ${p.last_name}`.toLowerCase()
      if (search && !name.includes(search.toLowerCase())) return false
      if (gender === "male"   && p.gender !== "male")   return false
      if (gender === "female" && p.gender !== "female") return false
      if (skill === "beginner" && !p.skill_beginner)    return false
      if (skill === "advanced" && !p.skill_advanced)    return false
      if (statusF === "checked_in"    && !p.checked_in) return false
      if (statusF === "not_checked_in" && p.checked_in) return false
      if (statusF === "paid"   && !p.paid)              return false
      if (statusF === "unpaid" &&  p.paid)              return false
      return true
    })
  }, [players, search, gender, skill, statusF])

  const stats = useMemo(() => ({
    total:    players.length,
    checkedIn: players.filter((p) => p.checked_in).length,
    paid:     players.filter((p) => p.paid).length,
    unpaid:   players.filter((p) => !p.paid).length,
  }), [players])

  function optimisticToggle(id: string, field: "paid" | "checked_in") {
    setPlayers((prev) =>
      prev.map((p) => p.id === id ? { ...p, [field]: !p[field] } : p)
    )
  }

  function handleToggleCheckedIn(p: Player) {
    optimisticToggle(p.id, "checked_in")
    startTransition(() => toggleCheckedIn(p.id, p.checked_in))
  }

  function handleTogglePaid(p: Player) {
    optimisticToggle(p.id, "paid")
    startTransition(() => togglePaid(p.id, p.paid))
  }

  const Pill = ({ active, label }: { active: boolean; label: string }) => (
    <span
      className="text-xs font-bold px-2 py-0.5 rounded-full"
      style={{
        background: active ? "rgba(34,139,34,0.12)" : "rgba(28,35,64,0.06)",
        color: active ? "#166534" : "rgba(28,35,64,0.4)",
        border: `1px solid ${active ? "rgba(34,139,34,0.25)" : "rgba(28,35,64,0.1)"}`,
      }}
    >
      {label}
    </span>
  )

  const FilterBtn = ({ val, current, set, label }: { val: string; current: string; set: (v: string) => void; label: string }) => (
    <button
      onClick={() => set(val)}
      className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
      style={{
        background: current === val ? "rgba(28,35,64,0.1)" : "transparent",
        color: current === val ? "#1C2340" : "rgba(28,35,64,0.45)",
        border: `1px solid ${current === val ? "rgba(28,35,64,0.2)" : "rgba(28,35,64,0.1)"}`,
      }}
    >
      {label}
    </button>
  )

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(165deg, #FFF7FA 0%, #FDF0F5 22%, #F8E8F2 48%, #EEE5F4 74%, #EAE6F5 100%)",
      }}
    >
      {/* Radial glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(255,183,197,0.18) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "rgba(28,35,64,0.35)" }}>
              АНУ-ын Монголчуудын
            </p>
            <h1 className="text-2xl font-black" style={{ color: "#1C2340" }}>{t.title}</h1>
            <p className="text-sm font-semibold" style={{ color: "#B8762A" }}>{t.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Lang toggle */}
            <div className="flex rounded-full overflow-hidden text-sm" style={{ border: "1px solid rgba(28,35,64,0.18)" }}>
              {(["mn", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="px-3 py-1 font-bold transition-all"
                  style={{
                    background: lang === l ? "rgba(28,35,64,0.1)" : "transparent",
                    color: lang === l ? "#1C2340" : "rgba(28,35,64,0.38)",
                  }}
                >
                  {l === "mn" ? "МОН" : "ENG"}
                </button>
              ))}
            </div>
            {/* Logout */}
            <form action={adminLogout}>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl text-sm font-bold transition-colors hover:bg-black/5"
                style={{ border: "1px solid rgba(28,35,64,0.18)", color: "rgba(28,35,64,0.6)" }}
              >
                {t.logout}
              </button>
            </form>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: t.totalReg,  value: stats.total,     color: "#1C2340",  bg: "rgba(28,35,64,0.06)"      },
            { label: t.totalIn,   value: stats.checkedIn, color: "#2A5ABD",  bg: "rgba(28,55,160,0.07)"     },
            { label: t.totalPaid, value: stats.paid,      color: "#166534",  bg: "rgba(34,139,34,0.07)"     },
            { label: t.totalUnpaid,value: stats.unpaid,   color: "#B91C1C",  bg: "rgba(185,28,28,0.06)"     },
          ].map(({ label, value, color, bg }) => (
            <div
              key={label}
              className="rounded-2xl px-5 py-4 text-center"
              style={{
                background: "rgba(255,255,255,0.72)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,183,197,0.28)",
                boxShadow: "0 2px 12px rgba(28,35,64,0.06)",
              }}
            >
              <div className="text-3xl font-black mb-0.5" style={{ color }}>{value}</div>
              <div className="text-xs font-semibold" style={{ color: "rgba(28,35,64,0.45)" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div
          className="rounded-2xl px-5 py-4 mb-4 flex flex-wrap gap-3 items-center"
          style={{
            background: "rgba(255,255,255,0.65)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,183,197,0.28)",
          }}
        >
          <input
            type="text"
            placeholder={t.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-48 px-3 py-2 rounded-xl text-sm outline-none"
            style={{
              background: "rgba(255,255,255,0.8)",
              border: "1px solid rgba(28,35,64,0.12)",
              color: "#1C2340",
            }}
          />
          <div className="flex flex-wrap gap-1.5">
            <FilterBtn val="all"    current={gender}  set={setGender}  label={t.all}     />
            <FilterBtn val="male"   current={gender}  set={setGender}  label={t.male}    />
            <FilterBtn val="female" current={gender}  set={setGender}  label={t.female}  />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <FilterBtn val="all"      current={skill}  set={setSkill}  label={t.all}      />
            <FilterBtn val="beginner" current={skill}  set={setSkill}  label={t.beginner} />
            <FilterBtn val="advanced" current={skill}  set={setSkill}  label={t.advanced} />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <FilterBtn val="all"           current={statusF} set={setStatusF} label={t.all}         />
            <FilterBtn val="checked_in"    current={statusF} set={setStatusF} label={t.checkedIn}    />
            <FilterBtn val="not_checked_in"current={statusF} set={setStatusF} label={t.notCheckedIn} />
            <FilterBtn val="paid"          current={statusF} set={setStatusF} label={t.paid}         />
            <FilterBtn val="unpaid"        current={statusF} set={setStatusF} label={t.notPaid}      />
          </div>
        </div>

        {/* Player table */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,183,197,0.3)",
            boxShadow: "0 2px 16px rgba(28,35,64,0.07)",
          }}
        >
          {/* Table header */}
          <div
            className="grid grid-cols-12 px-5 py-3 text-xs font-bold uppercase tracking-wider"
            style={{
              background: "rgba(200,144,58,0.07)",
              borderBottom: "1px solid rgba(200,144,58,0.18)",
              color: "rgba(28,35,64,0.45)",
            }}
          >
            <div className="col-span-1">#</div>
            <div className="col-span-3">{t.name}</div>
            <div className="col-span-3 hidden sm:block">{t.email}</div>
            <div className="col-span-2 hidden md:block">{t.category}</div>
            <div className="col-span-2">{t.status}</div>
            <div className="col-span-1 text-right">{t.actions}</div>
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm" style={{ color: "rgba(28,35,64,0.35)" }}>
              {t.noResults}
            </div>
          ) : (
            filtered.map((player, i) => (
              <div
                key={player.id}
                className="grid grid-cols-12 px-5 py-3.5 items-center text-sm"
                style={{
                  borderBottom: i < filtered.length - 1 ? "1px solid rgba(28,35,64,0.06)" : "none",
                  background: player.checked_in && player.paid
                    ? "rgba(34,139,34,0.03)"
                    : "transparent",
                }}
              >
                {/* # */}
                <div className="col-span-1 text-xs font-bold" style={{ color: "rgba(28,35,64,0.3)" }}>
                  {i + 1}
                </div>

                {/* Name */}
                <div className="col-span-3 font-semibold" style={{ color: "#1C2340" }}>
                  {player.first_name} {player.last_name}
                </div>

                {/* Email */}
                <div className="col-span-3 hidden sm:block text-xs truncate" style={{ color: "rgba(28,35,64,0.45)" }}>
                  {player.email}
                </div>

                {/* Category */}
                <div className="col-span-2 hidden md:block text-xs" style={{ color: "rgba(28,35,64,0.5)" }}>
                  {categoryLabel(player, t)}
                </div>

                {/* Status */}
                <div className="col-span-2 flex gap-1.5 flex-wrap">
                  <Pill active={player.checked_in} label={player.checked_in ? t.checkedIn : t.notCheckedIn} />
                  <Pill active={player.paid}        label={player.paid        ? t.paid      : t.notPaid}      />
                </div>

                {/* Actions */}
                <div className="col-span-1 flex gap-1.5 justify-end">
                  <button
                    onClick={() => handleToggleCheckedIn(player)}
                    title={player.checked_in ? t.markOut : t.markIn}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-base transition-colors hover:scale-110"
                    style={{
                      background: player.checked_in ? "rgba(34,139,34,0.12)" : "rgba(28,35,64,0.06)",
                      border: `1px solid ${player.checked_in ? "rgba(34,139,34,0.25)" : "rgba(28,35,64,0.1)"}`,
                    }}
                  >
                    {player.checked_in ? "✓" : "○"}
                  </button>
                  <button
                    onClick={() => handleTogglePaid(player)}
                    title={player.paid ? t.markUnpaid : t.markPaid}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-base transition-colors hover:scale-110"
                    style={{
                      background: player.paid ? "rgba(200,144,58,0.15)" : "rgba(28,35,64,0.06)",
                      border: `1px solid ${player.paid ? "rgba(200,144,58,0.3)" : "rgba(28,35,64,0.1)"}`,
                    }}
                  >
                    {player.paid ? "💰" : "$"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "rgba(28,35,64,0.28)" }}>
          {filtered.length} / {players.length} {lang === "mn" ? "тоглогч харагдаж байна" : "players shown"}
        </p>
      </div>
    </div>
  )
}
