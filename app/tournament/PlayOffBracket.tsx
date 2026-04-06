"use client"

import { ChevronLeft, Trophy } from "lucide-react"
import React, { useMemo, useState } from "react"
import { useLang } from "./LangContext"

// ─── Layout constants ──────────────────────────────────────────────────────────
const MATCH_W = 200   // match card width (px)
const MATCH_H = 88    // collapsed card height (two player rows + divider)
// GAP must exceed the score-entry section height so expanded cards never overlap.
// Score section: mt-2(8) + label(20) + 2 button rows(44) + cancel row(28) ≈ 100px
// So GAP > 100 → use 108 for comfortable clearance.
const GAP     = 108
const COL_W   = 280   // column width per round (card + connector space)
const UNIT    = MATCH_H + GAP   // 196px per bracket slot

// ─── Round styling ─────────────────────────────────────────────────────────────
const ROUND_META: Record<number, { accent: string; labelColor: string }> = {
  2:  { accent: "rgba(200,144,58,0.9)",  labelColor: "#a07020" },
  4:  { accent: "rgba(34,139,34,0.75)",  labelColor: "#166534" },
  8:  { accent: "rgba(28,55,160,0.75)",  labelColor: "#1e3a8a" },
  16: { accent: "rgba(130,60,180,0.70)", labelColor: "#7e22ce" },
  32: { accent: "rgba(185,60,60,0.70)",  labelColor: "#991b1b" },
  64: { accent: "rgba(60,140,140,0.70)", labelColor: "#0f5151" },
}
const DEFAULT_META = { accent: "rgba(100,100,100,0.6)", labelColor: "#374151" }

function getRoundMeta(size: number) {
  return ROUND_META[size] ?? DEFAULT_META
}

function getRoundLabel(size: number, t: any): string {
  if (size === 2) return t.final
  if (size === 4) return t.semiFinals
  if (size === 8) return t.quarterFinals
  return t.roundOf(size)
}

// ─── Position helpers ──────────────────────────────────────────────────────────

function matchSlotIndex(id: string): number {
  const m = id.match(/_M(\d+)$/)
  return m ? parseInt(m[1], 10) - 1 : 0
}

function slotTop(roundIdx: number, slotIdx: number): number {
  const span = Math.pow(2, roundIdx)
  return (slotIdx * span + (span - 1) / 2) * UNIT + GAP / 2
}

function slotCenterY(roundIdx: number, slotIdx: number): number {
  return slotTop(roundIdx, slotIdx) + MATCH_H / 2
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function PlayoffBracket({
  playoffs, onBackToGroups, onSetScore,
}: any) {
  const { t } = useLang()

  const roundSizes: number[] = useMemo(
    () =>
      Array.from(new Set<number>(playoffs.matches.map((m: any) => m.round as number))).sort(
        (a, b) => b - a
      ),
    [playoffs.matches]
  )

  const matchesByRound: Record<number, any[]> = useMemo(() => {
    const map: Record<number, any[]> = {}
    roundSizes.forEach((size) => {
      map[size] = playoffs.matches
        .filter((m: any) => m.round === size)
        .sort((a: any, b: any) => matchSlotIndex(a.id) - matchSlotIndex(b.id))
    })
    return map
  }, [playoffs.matches, roundSizes])

  const posMap: Record<string, { roundIdx: number; slotIdx: number }> = useMemo(() => {
    const map: Record<string, { roundIdx: number; slotIdx: number }> = {}
    roundSizes.forEach((size, roundIdx) => {
      matchesByRound[size].forEach((m: any, slotIdx: number) => {
        map[m.id] = { roundIdx, slotIdx }
      })
    })
    return map
  }, [roundSizes, matchesByRound])

  const numRounds   = roundSizes.length
  const firstRoundN = matchesByRound[roundSizes[0]]?.length ?? 0
  const containerH  = Math.max(firstRoundN * UNIT, UNIT)
  const containerW  = (numRounds - 1) * COL_W + MATCH_W

  const finalMatch = matchesByRound[2]?.[0]
  const winner = finalMatch?.score
    ? finalMatch.score.player1Score > finalMatch.score.player2Score
      ? finalMatch.player1 : finalMatch.player2
    : null

  // SVG connectors
  const connectors = useMemo(() => {
    const lines: { key: string; points: string; played: boolean }[] = []
    roundSizes.forEach((size, roundIdx) => {
      if (roundIdx === 0) return
      matchesByRound[size].forEach((match: any, slotIdx: number) => {
        if (!match.previousMatches?.length) return
        const parentX  = roundIdx * COL_W
        const parentCY = slotCenterY(roundIdx, slotIdx)
        const midX     = parentX - (COL_W - MATCH_W) / 2

        match.previousMatches.forEach((childId: string) => {
          const childPos = posMap[childId]
          if (!childPos) return
          const childRightX = childPos.roundIdx * COL_W + MATCH_W
          const childCY     = slotCenterY(childPos.roundIdx, childPos.slotIdx)
          const childMatch  = playoffs.matches.find((m: any) => m.id === childId)
          const played      = !!childMatch?.score && !childMatch?.isBye

          lines.push({
            key: `${childId}→${match.id}`,
            played,
            points: [
              `${childRightX},${childCY}`,
              `${midX},${childCY}`,
              `${midX},${parentCY}`,
              `${parentX},${parentCY}`,
            ].join(" "),
          })
        })
      })
    })
    return lines
  }, [roundSizes, matchesByRound, posMap, playoffs.matches])

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div
        className="flex items-center gap-3 mb-6 px-5 py-4 rounded-2xl"
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

      {/* Champion banner */}
      {winner && (
        <div
          className="mb-6 px-6 py-5 rounded-2xl text-center"
          style={{
            background: "linear-gradient(135deg, rgba(200,144,58,0.15), rgba(200,144,58,0.05))",
            border: "1px solid rgba(200,144,58,0.4)",
            boxShadow: "0 4px 24px rgba(200,144,58,0.18)",
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

      {/* Bracket — horizontal scroll */}
      <div style={{ overflowX: "auto", overflowY: "visible", paddingBottom: 16 }}>
        {/* Round headers */}
        <div className="flex mb-3" style={{ width: containerW }}>
          {roundSizes.map((size, roundIdx) => {
            const meta = getRoundMeta(size)
            const colW = roundIdx < numRounds - 1 ? COL_W : MATCH_W
            return (
              <div key={size} className="flex-shrink-0 flex items-center gap-1.5" style={{ width: colW }}>
                <div className="w-1 h-4 rounded" style={{ background: meta.accent }} />
                <span className="text-xs font-black uppercase tracking-widest" style={{ color: meta.labelColor }}>
                  {getRoundLabel(size, t)}
                </span>
              </div>
            )
          })}
        </div>

        {/* Canvas — tall enough for expanded cards; overflow visible so score entry is never clipped */}
        <div
          className="relative flex-shrink-0"
          style={{ width: containerW, height: containerH, overflow: "visible" }}
        >
          {/* Connector lines */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width={containerW}
            height={containerH}
            style={{ overflow: "visible" }}
          >
            {connectors.map(({ key, points, played }) => (
              <polyline
                key={key}
                points={points}
                fill="none"
                stroke={played ? "rgba(28,35,64,0.30)" : "rgba(28,35,64,0.12)"}
                strokeWidth={played ? 2 : 1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </svg>

          {/* Match cards — each manages its own open/closed state */}
          {roundSizes.map((size, roundIdx) =>
            matchesByRound[size].map((match: any, slotIdx: number) => {
              if (match.isBye) return null
              const meta = getRoundMeta(size)
              return (
                <div
                  key={match.id}
                  className="absolute"
                  style={{
                    top:   slotTop(roundIdx, slotIdx),
                    left:  roundIdx * COL_W,
                    width: MATCH_W,
                  }}
                >
                  <MatchCard
                    match={match}
                    accent={meta.accent}
                    isFinal={size === 2}
                    onSetScore={(s1: number, s2: number) => onSetScore(match.id, s1, s2)}
                  />
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Match card with local open/closed state ───────────────────────────────────

function MatchCard({ match, accent, isFinal, onSetScore }: any) {
  const { t, isAdmin } = useLang()
  const [isOpen, setIsOpen] = useState(!match.score)

  const p1Wins  = match.score && match.score.player1Score > match.score.player2Score
  const p2Wins  = match.score && match.score.player2Score > match.score.player1Score
  const played  = !!match.score
  const canEdit = isAdmin && match.player1 && match.player2

  function handleSetScore(s1: number, s2: number) {
    onSetScore(s1, s2)
    setIsOpen(false)
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: isFinal ? "rgba(255,252,245,0.97)" : "rgba(255,255,255,0.84)",
        backdropFilter: "blur(16px)",
        border: isFinal
          ? "1.5px solid rgba(200,144,58,0.5)"
          : "1px solid rgba(255,183,197,0.30)",
        borderLeft: `3px solid ${accent}`,
        boxShadow: isFinal
          ? "0 4px 20px rgba(200,144,58,0.16)"
          : "0 2px 10px rgba(28,35,64,0.07)",
      }}
    >
      <div className="px-3 pt-2.5 pb-2">
        <PlayerSlot
          player={match.player1}
          score={match.score?.player1Score}
          isWinner={!!p1Wins}
          played={played}
        />
        <div className="my-1.5 h-px" style={{ background: "rgba(28,35,64,0.07)" }} />
        <PlayerSlot
          player={match.player2}
          score={match.score?.player2Score}
          isWinner={!!p2Wins}
          played={played}
        />

        {canEdit && (
          <div className="mt-2">
            {isOpen ? (
              <ScoreButtons
                onSetScore={handleSetScore}
                onCancel={played ? () => setIsOpen(false) : null}
                enterLabel={t.enterScore}
              />
            ) : (
              <button
                onClick={() => setIsOpen(true)}
                className="text-xs font-semibold px-2 py-0.5 rounded-lg transition-colors hover:bg-black/5"
                style={{ color: "rgba(28,35,64,0.35)", border: "1px solid rgba(28,35,64,0.1)" }}
              >
                ✎
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Player row ────────────────────────────────────────────────────────────────

function PlayerSlot({ player, score, isWinner, played }: {
  player: any; score?: number; isWinner: boolean; played: boolean
}) {
  if (!player) {
    return (
      <div className="flex items-center h-7">
        <span className="text-xs italic" style={{ color: "rgba(28,35,64,0.22)" }}>TBD</span>
      </div>
    )
  }
  const isLoser = played && !isWinner
  return (
    <div className="flex items-center justify-between gap-1 h-7">
      <div className="flex items-center gap-1 min-w-0 flex-1">
        {isWinner && <span className="text-xs flex-shrink-0" style={{ color: "#C8903A" }}>▶</span>}
        <span
          className="text-sm truncate"
          style={{
            color: isLoser ? "rgba(28,35,64,0.35)" : "#1C2340",
            fontWeight: isWinner ? 800 : isLoser ? 400 : 600,
            textDecoration: isLoser ? "line-through" : "none",
          }}
        >
          {player.firstName} {player.lastName}
        </span>
        <span className="text-xs flex-shrink-0 ml-0.5" style={{ color: "rgba(28,35,64,0.25)", fontSize: 10 }}>
          {player.groupId}{player.rank}
        </span>
      </div>
      {score !== undefined && (
        <span className="text-sm font-black flex-shrink-0 ml-1"
          style={{ color: isWinner ? "#C8903A" : "rgba(28,35,64,0.28)" }}>
          {score}
        </span>
      )}
    </div>
  )
}

// ─── Score buttons ─────────────────────────────────────────────────────────────

function ScoreButtons({ onSetScore, onCancel, enterLabel }: {
  onSetScore: (s1: number, s2: number) => void
  onCancel: (() => void) | null
  enterLabel: string
}) {
  const scores = [[3, 0], [3, 1], [3, 2], [2, 3], [1, 3], [0, 3]] as const
  return (
    <div>
      <p className="text-xs font-semibold mb-1" style={{ color: "rgba(28,35,64,0.4)" }}>{enterLabel}</p>
      <div className="flex flex-wrap gap-1">
        {scores.map(([s1, s2]) => (
          <button
            key={`${s1}-${s2}`}
            onClick={() => onSetScore(s1, s2)}
            className="px-2 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105"
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
            className="px-2 py-1 rounded-lg text-xs font-bold hover:bg-black/5"
            style={{ border: "1px solid rgba(28,35,64,0.12)", color: "rgba(28,35,64,0.5)" }}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}
