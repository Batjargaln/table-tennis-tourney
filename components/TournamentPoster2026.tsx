"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

type Lang = "mn" | "en"

/** Five-petal cherry blossom, rendered inside an <svg> */
function Blossom({ x, y, r = 7, opacity = 0.9 }: { x: number; y: number; r?: number; opacity?: number }) {
  const petals: [number, number][] = [
    [x,           y - r],
    [x + r * 0.95, y - r * 0.31],
    [x + r * 0.59, y + r * 0.81],
    [x - r * 0.59, y + r * 0.81],
    [x - r * 0.95, y - r * 0.31],
  ]
  const colors = ["#FFB7C5", "#F6A0B8", "#EF8AAE", "#F6A0B8", "#FFB7C5"]
  return (
    <g opacity={opacity}>
      {petals.map(([px, py], i) => (
        <circle key={i} cx={px} cy={py} r={r * 0.55} fill={colors[i]} />
      ))}
      <circle cx={x} cy={y} r={r * 0.28} fill="#FFD9A0" />
    </g>
  )
}

/** Cherry blossom branch — shown on sm+ screens */
function BlossomBranch() {
  return (
    <svg width="300" height="320" viewBox="0 0 300 320" aria-hidden="true">
      <path d="M -8,-8 C 30,55 65,45 105,105 C 138,155 158,188 185,238" stroke="#7A3828" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M 45,64 C 62,36 96,20 132,12" stroke="#7A3828" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <path d="M 105,105 C 130,76 162,60 198,50" stroke="#7A3828" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <path d="M 158,188 C 178,162 210,152 244,140" stroke="#7A3828" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M 185,238 C 198,262 214,278 222,300" stroke="#7A3828" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <Blossom x={28}  y={38}  r={9}   />
      <Blossom x={74}  y={60}  r={7.5} opacity={0.8} />
      <Blossom x={110} y={112} r={9.5} />
      <Blossom x={160} y={194} r={8.5} opacity={0.88} />
      <Blossom x={184} y={242} r={8}   />
      <Blossom x={96}  y={32}  r={8}   opacity={0.85} />
      <Blossom x={130} y={16}  r={8.5} />
      <Blossom x={164} y={65}  r={7.5} opacity={0.82} />
      <Blossom x={196} y={54}  r={8.5} />
      <Blossom x={212} y={150} r={7.5} opacity={0.78} />
      <Blossom x={242} y={143} r={7}   opacity={0.72} />
      <Blossom x={220} y={302} r={7.5} opacity={0.72} />
      <circle cx="155" cy="88"  r="3.2" fill="#FFB7C5" opacity="0.6" />
      <circle cx="210" cy="128" r="2.8" fill="#F6A0B8" opacity="0.5" />
      <circle cx="82"  cy="130" r="2.5" fill="#FFB7C5" opacity="0.55" />
      <circle cx="170" cy="240" r="3"   fill="#FFB7C5" opacity="0.45" />
    </svg>
  )
}

/** Tiny branch for mobile — fits in corner without overlapping content */
function BlossomBranchMobile() {
  return (
    <svg width="140" height="160" viewBox="0 0 300 320" aria-hidden="true">
      <path d="M -8,-8 C 30,55 65,45 105,105 C 138,155 158,188 185,238" stroke="#7A3828" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M 45,64 C 62,36 96,20 132,12" stroke="#7A3828" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <path d="M 105,105 C 130,76 162,60 198,50" stroke="#7A3828" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <Blossom x={28}  y={38}  r={9}   />
      <Blossom x={74}  y={60}  r={7.5} opacity={0.8} />
      <Blossom x={110} y={112} r={9.5} />
      <Blossom x={96}  y={32}  r={8}   opacity={0.85} />
      <Blossom x={130} y={16}  r={8.5} />
      <Blossom x={164} y={65}  r={7.5} opacity={0.82} />
      <Blossom x={196} y={54}  r={8.5} />
    </svg>
  )
}

export default function TournamentPoster2026() {
  const [lang, setLang] = useState<Lang>("mn")
  const t = (mn: string, en: string) => (lang === "mn" ? mn : en)

  return (
    <section
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{
        background:
          "linear-gradient(165deg, #FFF7FA 0%, #FDF0F5 22%, #F8E8F2 48%, #EEE5F4 74%, #EAE6F5 100%)",
      }}
    >
      {/* ── Soft radial glow — centre bloom ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 30%, rgba(255,183,197,0.22) 0%, transparent 70%)",
        }}
      />

      {/* ── Falling petals (decorative) ── */}
      {([
        ["12%", "22%", 8, 0.55, 0],
        ["24%", "52%", 6, 0.42, 37],
        ["68%", "38%", 9, 0.48, 74],
        ["82%", "60%", 6, 0.38, 111],
        ["44%", "18%", 5, 0.45, 148],
        ["58%", "68%", 8, 0.4,  185],
        ["7%",  "72%", 6, 0.42, 222],
        ["90%", "44%", 5, 0.36, 259],
        ["35%", "80%", 7, 0.35, 300],
        ["75%", "82%", 5, 0.3,  340],
      ] as const).map(([left, top, sz, op, rot], i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left, top,
            width: sz * 2,
            height: sz,
            background: "#FFB7C5",
            opacity: op,
            transform: `rotate(${rot}deg)`,
            borderRadius: "50% 0 50% 0",
          }}
        />
      ))}

      {/* ── Cherry blossom — top left (desktop) ── */}
      <div className="absolute top-0 left-0 pointer-events-none select-none hidden sm:block">
        <BlossomBranch />
      </div>
      {/* ── Cherry blossom — top right mirrored (desktop) ── */}
      <div
        className="absolute top-0 right-0 pointer-events-none select-none hidden sm:block"
        style={{ transform: "scaleX(-1)" }}
      >
        <BlossomBranch />
      </div>
      {/* ── Smaller branches for mobile ── */}
      <div className="absolute top-0 left-0 pointer-events-none select-none sm:hidden">
        <BlossomBranchMobile />
      </div>
      <div
        className="absolute top-0 right-0 pointer-events-none select-none sm:hidden"
        style={{ transform: "scaleX(-1)" }}
      >
        <BlossomBranchMobile />
      </div>

      {/* ── DC Monument silhouettes ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 190"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", display: "block" }}
          preserveAspectRatio="xMidYMax meet"
        >
          <defs>
            <linearGradient id="skyFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#E8B4C8" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#D4A0BC" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <rect x="0" y="40" width="1440" height="150" fill="url(#skyFade)" />

          <g fill="#1C2340">
            {/* Lincoln Memorial */}
            <polygon points="195,88 300,56 405,88" />
            <rect x="195" y="88"  width="210" height="14" />
            <rect x="207" y="102" width="12"  height="52" />
            <rect x="231" y="102" width="12"  height="52" />
            <rect x="255" y="102" width="12"  height="52" />
            <rect x="279" y="102" width="12"  height="52" />
            <rect x="303" y="102" width="12"  height="52" />
            <rect x="327" y="102" width="12"  height="52" />
            <rect x="351" y="102" width="12"  height="52" />
            <rect x="375" y="102" width="12"  height="52" />
            <rect x="195" y="153" width="210" height="12" />
            <rect x="183" y="164" width="234" height="10" />
            <rect x="171" y="173" width="258" height="17" />

            {/* Washington Monument */}
            <polygon points="716,14 724,14 720,2" />
            <polygon points="716,14 724,14 738,155 702,155" />
            <rect x="700" y="155" width="40"  height="12" />
            <rect x="692" y="167" width="56"  height="23" />

            {/* Capitol */}
            <polygon points="1148,22 1152,22 1150,10" />
            <rect x="1144" y="22"  width="12"  height="18" />
            <ellipse cx="1150" cy="72"  rx="58"  ry="52" />
            <rect x="1116" y="88"  width="68"  height="24" />
            <polygon points="1094,110 1150,90 1206,110" />
            <rect x="1070" y="110" width="160" height="38" />
            <rect x="985"  y="128" width="95"  height="62" />
            <rect x="980"  y="118" width="104" height="14" />
            <rect x="1205" y="128" width="95"  height="62" />
            <rect x="1206" y="118" width="104" height="14" />
            <rect x="920"  y="168" width="460" height="22" />

            {/* Reflecting pool — soft rose tint */}
            <ellipse cx="588" cy="176" rx="105" ry="7" fill="#C8A0B8" opacity="0.45" />

            {/* Ground */}
            <path d="M0,178 Q360,172 720,178 Q1080,184 1440,178 L1440,190 L0,190 Z" />
          </g>
        </svg>
      </div>

      {/* ── Main content ── */}
      <div
        className="relative z-10 flex-1 max-w-3xl mx-auto w-full px-6 sm:px-12 pt-4 pb-16 flex flex-col"
      >
        {/* Language toggle */}
        <div className="flex justify-end mb-3">
          <div
            className="flex rounded-full overflow-hidden text-xs"
            style={{ border: "1px solid rgba(28,35,64,0.16)" }}
          >
            {(["mn", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="px-3.5 py-1.5 font-bold transition-all"
                style={{
                  background: lang === l ? "rgba(28,35,64,0.09)" : "transparent",
                  color: lang === l ? "#1C2340" : "rgba(28,35,64,0.35)",
                }}
              >
                {l === "mn" ? "МОН" : "ENG"}
              </button>
            ))}
          </div>
        </div>

        {/* Organizer / sponsor logos */}
        <div className="flex items-center justify-center flex-wrap gap-3 mb-3">
          <Image src="/matta(1).png"       alt="MATTA"         width={160} height={160} className="object-contain w-14 h-14 sm:w-20 sm:h-20" />
          <Image src="/dc-mongol-real.png" alt="DC Mongol Club" width={160} height={160} className="object-contain w-18 h-18 sm:w-24 sm:h-24" />
          <Image src="/elchin(1).png"      alt="Elchin"         width={160} height={160} className="object-contain w-14 h-14 sm:w-20 sm:h-20" />
        </div>

        {/* ── Hero: title left / year right ── */}
        <div className="flex items-center gap-6 mb-3">

          {/* Left: all text info */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-black tracking-[0.4em] uppercase mb-2 text-center sm:text-left" style={{ color: "rgba(28,35,64,0.38)" }}>
              {t("ШИРЭЭНИЙ ТЕННИС", "TABLE TENNIS")}
            </p>
            <div className="h-px mb-3" style={{ background: "linear-gradient(90deg, rgba(255,138,174,0.6), transparent)" }} />

            <h1 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight mb-1" style={{ color: "#1C2340" }}>
              {t("Вашингтон Д.С. орчмын Монголчуудын", "D.C. Area Mongolians")}
            </h1>
            <h2 className="text-base sm:text-xl font-bold mb-4" style={{ color: "#B8762A" }}>
              {t("Ширээний Теннисний Тэмцээн", "Table Tennis Tournament")}
            </h2>

            <div className="flex flex-col gap-1">
              <p className="text-sm sm:text-base font-bold" style={{ color: "#1C2340" }}>
                <Calendar className="inline w-3.5 h-3.5 mr-1.5 mb-0.5" style={{ color: "#C8903A" }} />
                {t("2026 оны 4 сарын 19 · 10:00 AM", "April 19, 2026 · 10:00 AM")}
              </p>
              <a
                href="https://maps.google.com/?q=6403+Chillum+Pl+NW,+Washington,+DC+20012"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold transition-opacity hover:opacity-70"
                style={{ color: "#2A3560" }}
              >
                <MapPin className="inline w-3.5 h-3.5 mr-1 mb-0.5" style={{ color: "#2A3560", opacity: 0.55 }} />
                {t("Вашингтон Ди Си, АНУ", "Washington, D.C., USA")}
              </a>
              <p className="text-xs" style={{ color: "rgba(28,35,64,0.35)" }}>
                6403 Chillum Pl NW, Washington, DC 20012
              </p>
            </div>
          </div>

          {/* Right: year as display element */}
          <div
            className="shrink-0 text-7xl sm:text-8xl font-black leading-none tracking-tighter select-none text-right"
            style={{
              background: "linear-gradient(160deg, #D4A048 0%, #F0CC7A 40%, #A87028 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 2px 10px rgba(180,120,40,0.22))",
            }}
          >
            2026
          </div>
        </div>

        {/* ── Events rule ── */}
        <div className="flex items-center gap-4 my-2">
          <div className="flex-1 h-px" style={{ background: "rgba(200,144,58,0.3)" }} />
          <span className="text-xs font-black tracking-[0.35em] uppercase" style={{ color: "rgba(200,144,58,0.7)" }}>
            {t("Тэмцээний ангилал", "Events")}
          </span>
          <div className="flex-1 h-px" style={{ background: "rgba(200,144,58,0.3)" }} />
        </div>

        {/* ── Events — 3 columns ── */}
        <div className="grid grid-cols-3 gap-0 mb-3" style={{ borderTop: "1px solid rgba(255,183,197,0.35)", borderBottom: "1px solid rgba(255,183,197,0.35)" }}>

          {/* Men's Singles */}
          <div className="text-center py-4 px-4" style={{ borderRight: "1px solid rgba(255,183,197,0.35)" }}>
            <p className="text-sm font-black tracking-widest uppercase mb-1" style={{ color: "#2A5ABD" }}>
              {t("Эрэгтэй", "Men's")}
            </p>
            <p className="text-base sm:text-lg font-bold mb-3" style={{ color: "#1C2340" }}>
              {t("Ганцаарчилсан", "Singles")}
            </p>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full w-full text-center"
                style={{ background: "rgba(28,55,160,0.08)", color: "#2A5ABD", border: "1px solid rgba(28,55,160,0.15)" }}>
                {t("Сонирхогч", "Intermediate")}
              </span>
              <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full w-full text-center"
                style={{ background: "rgba(28,55,160,0.08)", color: "#2A5ABD", border: "1px solid rgba(28,55,160,0.15)" }}>
                {t("Ахисан шат", "Advanced")}
              </span>
            </div>
          </div>

          {/* Women's Singles */}
          <div className="text-center py-4 px-4" style={{ borderRight: "1px solid rgba(255,183,197,0.35)" }}>
            <p className="text-sm font-black tracking-widest uppercase mb-1" style={{ color: "#B8285A" }}>
              {t("Эмэгтэй", "Women's")}
            </p>
            <p className="text-base sm:text-lg font-bold mb-3" style={{ color: "#1C2340" }}>
              {t("Ганцаарчилсан", "Singles")}
            </p>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full w-full text-center"
                style={{ background: "rgba(185,40,90,0.07)", color: "#B8285A", border: "1px solid rgba(185,40,90,0.15)" }}>
                {t("Сонирхогч", "Intermediate")}
              </span>
              <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full w-full text-center"
                style={{ background: "rgba(185,40,90,0.07)", color: "#B8285A", border: "1px solid rgba(185,40,90,0.15)" }}>
                {t("Ахисан шат", "Advanced")}
              </span>
            </div>
          </div>

          {/* Mixed Doubles */}
          <div className="text-center py-4 px-4 flex flex-col justify-center items-center">
            <p className="text-sm font-black tracking-widest uppercase mb-1" style={{ color: "#1a7a1a" }}>
              {t("Холимог", "Mixed")}
            </p>
            <p className="text-base sm:text-lg font-bold mb-3" style={{ color: "#1C2340" }}>
              {t("Хосын", "Doubles")}
            </p>
            <div className="flex flex-col items-center gap-2 w-full">
              <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full w-full text-center"
                style={{ background: "rgba(34,139,34,0.07)", color: "#1a7a1a", border: "1px solid rgba(34,139,34,0.18)" }}>
                {t("Эрэгтэй", "Man")}
              </span>
              <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full w-full text-center"
                style={{ background: "rgba(34,139,34,0.07)", color: "#1a7a1a", border: "1px solid rgba(34,139,34,0.18)" }}>
                {t("Эмэгтэй", "Woman")}
              </span>
            </div>
          </div>
        </div>

        {/* Entry fee + CTA — side by side */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 mb-2">
          <p className="text-sm font-semibold text-center sm:text-left" style={{ color: "rgba(28,35,64,0.5)" }}>
            {t("Бүртгэлийн хураамж:", "Entry fee:")}{" "}
            <span style={{ color: "#C8903A", fontWeight: 800 }}>$30</span>{" "}
            <span style={{ color: "rgba(28,35,64,0.35)" }}>{t("/ ангилал", "/ event")}</span>
            <br className="sm:hidden" />
            <span className="sm:ml-2" style={{ color: "rgba(28,35,64,0.35)" }}>{t("Сонирхогч → Ахисан: +$20", "Intermediate → Advanced: +$20")}</span>
          </p>

          <div className="flex gap-2 shrink-0">
            <Link href="/registry">
              <Button
                className="px-5 py-2.5 rounded-xl font-black text-sm tracking-wide transition-transform hover:scale-105 border-0"
                style={{ background: "linear-gradient(135deg, #D4963C, #A87028)", color: "#FFF8F0", boxShadow: "0 4px 16px rgba(200,144,58,0.35)" }}
              >
                {t("Бүртгүүлэх →", "Register →")}
              </Button>
            </Link>
            <Link href="/participants">
              <Button variant="ghost" className="px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-black/5"
                style={{ color: "rgba(28,35,64,0.6)", border: "1px solid rgba(28,35,64,0.16)" }}>
                {t("Оролцогчид", "Participants")}
              </Button>
            </Link>
            <Link href="/rulebook">
              <Button variant="ghost" className="px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-black/5"
                style={{ color: "rgba(28,35,64,0.6)", border: "1px solid rgba(28,35,64,0.16)" }}>
                {t("Дүрэм", "Rules")}
              </Button>
            </Link>
          </div>
        </div>

        <p className="text-center text-xs mt-3" style={{ color: "rgba(28,35,64,0.28)" }}>
          {t("Зохион байгуулагч: DC Mongol Club", "Organized by DC Mongol Club")}
        </p>
      </div>
    </section>
  )
}
