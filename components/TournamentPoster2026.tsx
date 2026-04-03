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
        className="relative z-10 flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 pt-6"
        style={{ paddingBottom: "max(5rem, 14vw)" }}
      >
        {/* Language toggle */}
        <div className="flex justify-end mb-4">
          <div
            className="flex rounded-full overflow-hidden text-sm"
            style={{ border: "1px solid rgba(28,35,64,0.18)" }}
          >
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

        {/* Organizer / sponsor logos */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-nowrap">
          <Image
            src="/matta(1).png"
            alt="MATTA"
            width={160}
            height={160}
            className="object-contain"
            style={{ maxHeight: 160 }}
          />
          <Image
            src="/dc-mongol-real.png"
            alt="DC Mongol Club"
            width={160}
            height={160}
            className="object-contain"
            style={{ maxHeight: 160 }}
          />
          <Image
            src="/elchin(1).png"
            alt="Elchin"
            width={160}
            height={160}
            className="object-contain"
            style={{ maxHeight: 160 }}
          />
        </div>

        {/* Title block */}
        <div className="text-center mb-9">
          <p
            className="text-xs font-bold tracking-[0.35em] uppercase mb-5"
            style={{ color: "rgba(28,35,64,0.32)" }}
          >
            {t("ШИРЭЭНИЙ ТЕННИС", "TABLE TENNIS")}
          </p>

          {/* Petal divider */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,138,174,0.5))" }}
            />
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="10" cy="4"  r="2.8" fill="#FFB7C5" opacity="0.9" />
              <circle cx="16" cy="10" r="2.8" fill="#FFB7C5" opacity="0.9" />
              <circle cx="10" cy="16" r="2.8" fill="#FFB7C5" opacity="0.9" />
              <circle cx="4"  cy="10" r="2.8" fill="#FFB7C5" opacity="0.9" />
              <circle cx="10" cy="10" r="1.8" fill="#C8903A" />
            </svg>
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(90deg, rgba(255,138,174,0.5), transparent)" }}
            />
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight mb-1"
            style={{ color: "#1C2340" }}
          >
            {t("АНУ-ын Монголчуудын", "USA Mongolians")}
          </h1>
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-5"
            style={{ color: "#B8762A" }}
          >
            {t("Ширээний Теннисний Тэмцээн", "Table Tennis Tournament")}
          </h2>

          {/* Year */}
          <span
            className="inline-block text-5xl sm:text-6xl md:text-7xl font-black leading-none mb-7"
            style={{
              background: "linear-gradient(135deg, #C8903A 0%, #E8B86A 45%, #A87028 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 1px 6px rgba(180,120,40,0.28))",
            }}
          >
            2026
          </span>

          {/* Date & Location */}
          <div className="flex flex-col sm:flex-row gap-2.5 justify-center mb-2">
            <div
              className="flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{
                background: "rgba(200,144,58,0.1)",
                border: "1px solid rgba(200,144,58,0.35)",
                color: "#8B5E20",
              }}
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              {t("4 сарын 19, 2026", "April 19, 2026")}
            </div>
            <a
              href="https://maps.google.com/?q=6403+Chillum+Pl+NW,+Washington,+DC+20012"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 rounded-full text-sm font-semibold transition-colors hover:bg-black/5"
              style={{
                background: "rgba(28,35,64,0.06)",
                border: "1px solid rgba(28,35,64,0.14)",
                color: "#2A3560",
              }}
            >
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              {t("Вашингтон Ди Си, АНУ", "Washington, D.C., USA")}
            </a>
          </div>
          <p className="text-xs" style={{ color: "rgba(28,35,64,0.35)" }}>
            6403 Chillum Pl NW, Washington, DC 20012
          </p>
        </div>

        {/* Category cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          {[
            {
              labelMn: "ЭРЭГТЭЙ", labelEn: "MEN",
              accent: "rgba(28,55,160,0.06)",
              headerBg: "rgba(28,55,160,0.07)",
              border: "rgba(28,55,160,0.15)",
              iconColor: "#2A5ABD",
              icon: (
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#2A5ABD">
                  <path d="M9 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm9-9h3v3l-3.6 3.6A6.97 6.97 0 0 1 16 13a7 7 0 1 1-7-7 6.97 6.97 0 0 1 4.4 1.4L17 3z" />
                </svg>
              ),
            },
            {
              labelMn: "ЭМЭГТЭЙ", labelEn: "WOMEN",
              accent: "rgba(185,40,90,0.05)",
              headerBg: "rgba(185,40,90,0.07)",
              border: "rgba(220,100,140,0.22)",
              iconColor: "#B8285A",
              icon: (
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#B8285A">
                  <path d="M12 2a5 5 0 1 1 0 10A5 5 0 0 1 12 2zm0 12c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              ),
            },
          ].map((cat) => (
            <div
              key={cat.labelEn}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(16px)",
                border: `1px solid ${cat.border}`,
                boxShadow: "0 2px 16px rgba(28,35,64,0.07)",
              }}
            >
              <div
                className="px-5 py-3.5 flex items-center gap-2.5"
                style={{ background: cat.headerBg, borderBottom: `1px solid ${cat.border}` }}
              >
                {cat.icon}
                <span className="font-black text-sm tracking-widest" style={{ color: "#1C2340" }}>
                  {t(cat.labelMn, cat.labelEn)}
                </span>
              </div>
              <div className="p-4 space-y-3">
                {/* Advanced row */}
                <div
                  className="flex items-center justify-between px-4 py-3 rounded-xl"
                  style={{ background: cat.accent, border: `1px solid ${cat.border}` }}
                >
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#1C2340" }}>{t("Ахисан түвшин", "Advanced")}</p>
                    <p className="text-xs" style={{ color: "rgba(28,35,64,0.4)" }}>{t("Advanced", "Ахисан түвшин")}</p>
                  </div>
                  <span className="font-black text-xl" style={{ color: "#C8903A" }}>$30</span>
                </div>

                {/* Beginner row */}
                <div
                  className="px-4 py-3 rounded-xl"
                  style={{ background: cat.accent, border: `1px solid ${cat.border}` }}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "#1C2340" }}>{t("Анхан шат", "Beginner")}</p>
                      <p className="text-xs" style={{ color: "rgba(28,35,64,0.4)" }}>{t("Beginner", "Анхан шат")}</p>
                    </div>
                    <span className="font-black text-xl" style={{ color: "#C8903A" }}>$30</span>
                  </div>
                  <div
                    className="flex items-center gap-1.5 text-xs rounded-lg px-2.5 py-1.5"
                    style={{
                      background: "rgba(200,144,58,0.1)",
                      border: "1px solid rgba(200,144,58,0.28)",
                      color: "#8B5E20",
                    }}
                  >
                    <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                    {t("Ахисан руу шилжих: +$20", "Upgrade to Advanced: +$20")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fee summary */}
        <div
          className="rounded-2xl px-6 py-4 text-center mb-6"
          style={{
            background: "rgba(200,144,58,0.07)",
            border: "1px solid rgba(200,144,58,0.25)",
          }}
        >
          <p
            className="text-xs uppercase tracking-[0.22em] font-semibold mb-1"
            style={{ color: "rgba(28,35,64,0.38)" }}
          >
            {t("Бүртгэлийн хураамж", "Entry Fee")}
          </p>
          <p className="font-black text-2xl" style={{ color: "#C8903A" }}>
            $30{" "}
            <span className="text-sm font-semibold" style={{ color: "rgba(28,35,64,0.38)" }}>
              {t("/ нэг ангилал", "/ per category")}
            </span>
          </p>
          <p className="text-xs mt-1" style={{ color: "rgba(28,35,64,0.35)" }}>
            {t("Анхан шатнаас ахисан руу шилжихэд +$20", "Beginner → Advanced upgrade: +$20")}
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/registry" className="sm:w-auto w-full">
            <Button
              className="w-full sm:w-auto px-6 sm:px-9 py-3 rounded-xl font-black text-base tracking-wide transition-transform hover:scale-105 shadow-lg border-0"
              style={{
                background: "linear-gradient(135deg, #D4963C, #A87028)",
                color: "#FFF8F0",
                boxShadow: "0 4px 20px rgba(200,144,58,0.35)",
              }}
            >
              {t("Бүртгүүлэх →", "Register Now →")}
            </Button>
          </Link>
          <Link href="/rulebook" className="sm:w-auto w-full">
            <Button
              variant="ghost"
              className="w-full sm:w-auto px-6 sm:px-9 py-3 rounded-xl font-bold text-base transition-colors hover:bg-black/5"
              style={{
                color: "rgba(28,35,64,0.65)",
                border: "1px solid rgba(28,35,64,0.18)",
              }}
            >
              {t("Дүрэм", "Rulebook")}
            </Button>
          </Link>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "rgba(28,35,64,0.28)" }}>
          {t("Зохион байгуулагч: DC Mongol Club", "Organized by DC Mongol Club")}
        </p>
      </div>
    </section>
  )
}
