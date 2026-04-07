"use client"

import orderBy from "lodash.orderby"
import shuffle from "lodash.shuffle"
import { ChevronLeft, Shuffle } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"

import { MAX_PLAYERS_PER_GROUP, MIN_PLAYERS_PER_GROUP } from "@/lib/constants"

import { saveCategoryState } from "./action"
import { categories } from "../categories"
import CategoryCard from "./CategoryCard"
import GroupCard from "./GroupCard"
import { LangProvider, useLang } from "./LangContext"
import PlayoffBracket from "./PlayOffBracket"

const TournamentApp = ({ initialTournamentData, isAdmin, initialCategory }) => {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState(initialCategory ?? null)
  const [editingMatch, setEditingMatch] = useState(null)
  const [view, setView] = useState("groups")

  function selectCategory(id: string) {
    setSelectedCategory(id)
    router.replace(`/tournament?cat=${id}`, { scroll: false })
  }

  function deselectCategory() {
    setSelectedCategory(null)
    router.replace("/tournament", { scroll: false })
  }

  // Helper functions
  const createPlayoffBracket = (groups) => {
    // Get top 2 players from each group
    const qualifiedPlayers = groups
      .map((group, groupIndex) => {
        const standings = group.players.map((player) => ({
          ...player,
          matches: 0,
          wins: 0,
          losses: 0,
          matchesWon: 0,
          matchesLost: 0,
        }))

        group.matches.forEach((match) => {
          if (match.score) {
            const player1Standing = standings.find((s) => s.id === match.player1.id)
            const player2Standing = standings.find((s) => s.id === match.player2.id)
            player1Standing.matches += 1
            player2Standing.matches += 1
            if (match.score.player1Score > match.score.player2Score) {
              player1Standing.wins += 1
              player2Standing.losses += 1
            } else {
              player2Standing.wins += 1
              player1Standing.losses += 1
            }
            player1Standing.matchesWon += match.score.player1Score
            player1Standing.matchesLost += match.score.player2Score
            player2Standing.matchesWon += match.score.player2Score
            player2Standing.matchesLost += match.score.player1Score
          }
        })

        return orderBy(standings, ["wins", "matchesWon"], ["desc", "desc"])
          .slice(0, 2)
          .map((player, rank) => ({
            ...player,
            groupId: String.fromCharCode(65 + groupIndex),
            rank: rank + 1,
          }))
      })
      .flat()

    // Seed: group winners first, then runners-up
    const seeded = [
      ...qualifiedPlayers.filter((p) => p.rank === 1),
      ...qualifiedPlayers.filter((p) => p.rank === 2),
    ]

    // Find next power of 2 for bracket size
    let bracketSize = 1
    while (bracketSize < seeded.length) bracketSize *= 2

    // Fill remaining slots with BYEs (null)
    const slots = [...seeded, ...Array(bracketSize - seeded.length).fill(null)]

    const allMatches = []

    // Round 1: pair slot[i] vs slot[bracketSize-1-i]
    const round1: any[] = []
    for (let i = 0; i < bracketSize / 2; i++) {
      const p1 = slots[i]
      const p2 = slots[bracketSize - 1 - i]
      const isBye = p1 !== null && p2 === null
      round1.push({
        id: `R${bracketSize}_M${i + 1}`,
        player1: p1,
        player2: p2,
        score: isBye ? { player1Score: 1, player2Score: 0 } : null,
        round: bracketSize,
        isBye,
        previousMatches: [],
      })
    }
    allMatches.push(...round1)

    // Build subsequent rounds, pre-filling winners of BYE matches
    const getWinner = (m) => {
      if (m.isBye) return m.player1
      if (m.score) return m.score.player1Score > m.score.player2Score ? m.player1 : m.player2
      return null
    }

    let prevRound = round1
    let size = bracketSize / 2
    while (size >= 2) {
      const nextRound: any[] = []
      for (let i = 0; i < size / 2; i++) {
        const matchA = prevRound[i * 2]
        const matchB = prevRound[i * 2 + 1]
        nextRound.push({
          id: `R${size}_M${i + 1}`,
          player1: getWinner(matchA),
          player2: getWinner(matchB),
          score: null,
          round: size,
          isBye: false,
          previousMatches: [matchA.id, matchB.id],
        })
      }
      allMatches.push(...nextRound)
      prevRound = nextRound
      size /= 2
    }

    return { matches: allMatches, qualifiedPlayers }
  }
  const generateGroupMatches = (players) => {
    const matches = []
    for (let i = 0; i < players.length; i++) {
      for (let j = i + 1; j < players.length; j++) {
        matches.push({
          id: `${players[i].id}-${players[j].id}`,
          player1: players[i],
          player2: players[j],
          score: null,
        })
      }
    }

    return matches
  }

  const calculateStandings = (group) => {
    const standings = group.players.map((player) => ({
      ...player,
      matches: 0,
      wins: 0,
      losses: 0,
      matchesWon: 0,
      matchesLost: 0,
    }))

    group.matches.forEach((match) => {
      if (match.score) {
        const player1Standing = standings.find((s) => s.id === match.player1.id)
        const player2Standing = standings.find((s) => s.id === match.player2.id)

        player1Standing.matches += 1
        player2Standing.matches += 1

        if (match.score.player1Score > match.score.player2Score) {
          player1Standing.wins += 1
          player2Standing.losses += 1
        } else {
          player2Standing.wins += 1
          player1Standing.losses += 1
        }

        player1Standing.matchesWon += match.score.player1Score
        player1Standing.matchesLost += match.score.player2Score
        player2Standing.matchesWon += match.score.player2Score
        player2Standing.matchesLost += match.score.player1Score
      }
    })

    return orderBy(standings, ["wins"], ["desc"])
  }

  const [tournamentData, setTournamentData] = useState(() => {
    const data = { ...initialTournamentData }
    Object.keys(data).forEach((categoryId) => {
      const { savedGroups, savedPlayoffs } = data[categoryId]

      // Use persisted state if available
      if (savedGroups) {
        data[categoryId] = {
          players:  data[categoryId].players,
          groups:   savedGroups,
          playoffs: savedPlayoffs ?? null,
        }
        return
      }

      // Otherwise build fresh groups from players
      const groups = []
      let groupSlicingIndex = 0
      const totalPlayersCurrentGroup = data[categoryId].players.length
      let numberOfGroups = Math.ceil(
        totalPlayersCurrentGroup / MAX_PLAYERS_PER_GROUP
      )

      while (
        totalPlayersCurrentGroup / numberOfGroups < MIN_PLAYERS_PER_GROUP &&
        numberOfGroups > 1
      ) {
        numberOfGroups--
      }
      const baseGroupSize = Math.floor(
        totalPlayersCurrentGroup / numberOfGroups
      )
      const extraPlayers = totalPlayersCurrentGroup % numberOfGroups
      const groupSizes = Array(numberOfGroups)
        .fill(baseGroupSize)
        .map((size, index) => {
          return index < extraPlayers ? size + 1 : size
        })
      let i = 0
      while (i < data[categoryId].players.length) {
        const size = groupSizes[groupSlicingIndex]
        const groupPlayers = data[categoryId].players.slice(i, Math.min(i + size, data[categoryId].players.length))
        groups.push({
          players: groupPlayers,
          matches: generateGroupMatches(groupPlayers),
        })
        i += size
        groupSlicingIndex++
      }
      data[categoryId].groups = groups
      data[categoryId].playoffs = null
    })
    return data
  })

  // Auto-save to DB whenever tournament state changes
  const prevDataRef = useRef<typeof tournamentData | null>(null)
  useEffect(() => {
    if (prevDataRef.current === null) {
      prevDataRef.current = tournamentData
      return
    }
    Object.keys(tournamentData).forEach((categoryId) => {
      if (tournamentData[categoryId] !== prevDataRef.current![categoryId]) {
        saveCategoryState(categoryId, tournamentData[categoryId].groups, tournamentData[categoryId].playoffs)
      }
    })
    prevDataRef.current = tournamentData
  }, [tournamentData])

  // Event handlers
  const handleShuffle = (categoryId) => {
    setTournamentData((prev) => {
      let groupSlicingIndex = 0
      const newGroups = []
      const totalPlayers = shuffle([...prev[categoryId].players])
      const totalPlayersCurrentGroup = totalPlayers.length
      let numberOfGroups = Math.ceil(
        totalPlayersCurrentGroup / MAX_PLAYERS_PER_GROUP
      )
      while (
        totalPlayersCurrentGroup / numberOfGroups < MIN_PLAYERS_PER_GROUP &&
        numberOfGroups > 1
      ) {
        numberOfGroups--
      }
      const baseGroupSize = Math.floor(
        totalPlayersCurrentGroup / numberOfGroups
      )
      const extraPlayers = totalPlayersCurrentGroup % numberOfGroups
      const groupSizes = Array(numberOfGroups)
        .fill(baseGroupSize)
        .map((size, index) => {
          return index < extraPlayers ? size + 1 : size
        })
      let si = 0
      while (si < totalPlayersCurrentGroup) {
        const size = groupSizes[groupSlicingIndex]
        const groupPlayers = totalPlayers.slice(si, Math.min(si + size, totalPlayersCurrentGroup))
        newGroups.push({
          players: groupPlayers,
          matches: generateGroupMatches(groupPlayers),
        })
        si += size
        groupSlicingIndex++
      }
      return {
        ...prev,
        [categoryId]: {
          ...prev[categoryId],
          players: totalPlayers,
          groups: newGroups,
          playoffs: null,
        },
      }
    })
    setEditingMatch(null)
  }

  const handleSetScore = (groupIndex, matchId, player1Score, player2Score) => {
    setTournamentData((prev) => {
      const newGroups = [...prev[selectedCategory].groups]
      const groupMatches = newGroups[groupIndex].matches
      const matchIndex = groupMatches.findIndex((m) => m.id === matchId)

      if (matchIndex !== -1) {
        groupMatches[matchIndex] = {
          ...groupMatches[matchIndex],
          score: { player1Score, player2Score },
        }
      }

      return {
        ...prev,
        [selectedCategory]: {
          ...prev[selectedCategory],
          groups: newGroups,
        },
      }
    })
    setEditingMatch(null)
  }

  const handlePlayoffScore = (matchId, player1Score, player2Score) => {
    setTournamentData((prev) => {
      const categoryData = prev[selectedCategory]
      const newPlayoffs = { ...categoryData.playoffs }
      const matchIndex = newPlayoffs.matches.findIndex((m) => m.id === matchId)

      if (matchIndex !== -1) {
        newPlayoffs.matches[matchIndex].score = { player1Score, player2Score }
        const currentMatch = newPlayoffs.matches[matchIndex]
        const winner =
          player1Score > player2Score
            ? currentMatch.player1
            : currentMatch.player2

        // Update next round matches
        const nextMatch = newPlayoffs.matches.find((m) =>
          m.previousMatches?.includes(matchId)
        )
        if (nextMatch) {
          if (nextMatch.previousMatches[0] === matchId) {
            nextMatch.player1 = winner
          } else {
            nextMatch.player2 = winner
          }
        }
      }

      return {
        ...prev,
        [selectedCategory]: {
          ...categoryData,
          playoffs: newPlayoffs,
        },
      }
    })
    setEditingMatch(null)
  }

  const startPlayoffs = () => {
    const categoryData = tournamentData[selectedCategory]
    const playoffs = createPlayoffBracket(categoryData.groups)
    setTournamentData((prev) => ({
      ...prev,
      [selectedCategory]: {
        ...prev[selectedCategory],
        playoffs,
      },
    }))
    setView("playoffs")
  }

  const renderCategoryView = () => {
    const categoryData = tournamentData[selectedCategory]

    if (view === "playoffs" && categoryData.playoffs) {
      return (
        <PlayoffBracket
          playoffs={categoryData.playoffs}
          onBackToGroups={() => setView("groups")}
          onSetScore={handlePlayoffScore}
        />
      )
    }

    const allMatchesComplete = categoryData.groups.every((group) =>
      group.matches.every((match) => match.score !== null)
    )

    const anyScoreEntered = categoryData.groups.some((group) =>
      group.matches.some((match) => match.score !== null)
    )

    return (
      <CategoryView
        categoryData={categoryData}
        selectedCategory={selectedCategory}
        allMatchesComplete={allMatchesComplete}
        anyScoreEntered={anyScoreEntered}
        editingMatch={editingMatch}
        calculateStandings={calculateStandings}
        onBack={deselectCategory}
        onViewPlayoffs={() => setView("playoffs")}
        onStartPlayoffs={startPlayoffs}
        onShuffle={() => handleShuffle(selectedCategory)}
        onEditMatch={setEditingMatch}
        onSetScore={handleSetScore}
        onCancelEdit={() => setEditingMatch(null)}
      />
    )
  }

  function renderHomePage() {
    return (
      <HomeView
        tournamentData={tournamentData}
        onSelect={selectCategory}
      />
    )
  }

  return selectedCategory ? renderCategoryView() : renderHomePage()
}

/* ── Home page with language toggle ── */
function HomeView({ tournamentData, onSelect }) {
  const { lang, setLang, t } = useLang()
  return (
    <main className="container mx-auto px-4 py-10 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Lang toggle */}
        <div className="flex justify-end mb-6">
          <div className="flex rounded-full overflow-hidden text-sm" style={{ border: "1px solid rgba(28,35,64,0.18)" }}>
            {(["mn", "en"] as const).map((l) => (
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
          <p className="text-xs font-bold tracking-[0.35em] uppercase mb-3" style={{ color: "rgba(28,35,64,0.35)" }}>
            {t.subtitle}
          </p>
          <h1 className="text-3xl sm:text-4xl font-black mb-2" style={{ color: "#1C2340" }}>
            {t.title}
          </h1>
          <p className="text-sm font-semibold" style={{ color: "#B8762A" }}>{t.titleEn}</p>
          <div className="flex items-center gap-3 mt-5 max-w-xs mx-auto">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,138,174,0.5))" }} />
            <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="10" cy="4"  r="2.5" fill="#FFB7C5" />
              <circle cx="16" cy="10" r="2.5" fill="#FFB7C5" />
              <circle cx="10" cy="16" r="2.5" fill="#FFB7C5" />
              <circle cx="4"  cy="10" r="2.5" fill="#FFB7C5" />
              <circle cx="10" cy="10" r="1.6" fill="#C8903A" />
            </svg>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(255,138,174,0.5), transparent)" }} />
          </div>
        </div>

        {(["male", "female", "mixed"] as const).map((gender) => (
          <div key={gender} className="mb-6">
            {/* Section header */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="h-px flex-1"
                style={{
                  background: gender === "male"
                    ? "linear-gradient(90deg, rgba(28,55,160,0.25), transparent)"
                    : gender === "female"
                    ? "linear-gradient(90deg, rgba(185,40,90,0.25), transparent)"
                    : "linear-gradient(90deg, rgba(34,139,34,0.25), transparent)",
                }}
              />
              <span
                className="text-xs font-black uppercase tracking-[0.25em] px-1"
                style={{
                  color: gender === "male"
                    ? "rgba(28,55,160,0.6)"
                    : gender === "female"
                    ? "rgba(185,40,90,0.7)"
                    : "rgba(34,139,34,0.7)",
                }}
              >
                {gender === "male" ? t.mensSection : gender === "female" ? t.womensSection : t.doublesSection}
              </span>
              <div
                className="h-px flex-1"
                style={{
                  background: gender === "male"
                    ? "linear-gradient(90deg, transparent, rgba(28,55,160,0.25))"
                    : gender === "female"
                    ? "linear-gradient(90deg, transparent, rgba(185,40,90,0.25))"
                    : "linear-gradient(90deg, transparent, rgba(34,139,34,0.25))",
                }}
              />
            </div>

            {/* Category cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories
                .filter((c) => c.gender === gender && tournamentData[c.id] !== undefined)
                .map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    data={tournamentData[category.id]}
                    onClick={() => onSelect(category.id)}
                  />
                ))}
            </div>
          </div>
        ))}

        <p className="mt-10 text-center text-xs" style={{ color: "rgba(28,35,64,0.35)" }}>
          {t.selectCategory}
        </p>
      </div>
    </main>
  )
}

/* ── Category / group view ── */
function CategoryView({
  categoryData, selectedCategory, allMatchesComplete, anyScoreEntered, editingMatch,
  calculateStandings, onBack, onViewPlayoffs, onStartPlayoffs,
  onShuffle, onEditMatch, onSetScore, onCancelEdit,
}) {
  const { t, isAdmin } = useLang()
  const title = categories.find((c) => c.id === selectedCategory)?.title ?? ""

  return (
    <div className="container mx-auto px-4 py-8">
      <div
        className="flex items-center gap-3 mb-8 px-5 py-4 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.65)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,183,197,0.35)",
          boxShadow: "0 2px 16px rgba(28,35,64,0.06)",
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center justify-center w-9 h-9 rounded-full transition-colors hover:bg-black/5"
          style={{ color: "#1C2340" }}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-black" style={{ color: "#1C2340" }}>{title}</h1>
        <div className="ml-auto flex gap-2">
          {categoryData.playoffs ? (
            <button
              onClick={onViewPlayoffs}
              className="px-4 py-2 rounded-xl text-sm font-bold transition-transform hover:scale-105"
              style={{ background: "linear-gradient(135deg, #D4963C, #A87028)", color: "#FFF8F0", boxShadow: "0 3px 12px rgba(200,144,58,0.3)" }}
            >
              {t.viewPlayoffs}
            </button>
          ) : isAdmin && allMatchesComplete ? (
            <button
              onClick={onStartPlayoffs}
              className="px-4 py-2 rounded-xl text-sm font-bold transition-transform hover:scale-105"
              style={{ background: "linear-gradient(135deg, #D4963C, #A87028)", color: "#FFF8F0", boxShadow: "0 3px 12px rgba(200,144,58,0.3)" }}
            >
              {t.startPlayoffs}
            </button>
          ) : null}
          {isAdmin && !anyScoreEntered && (
            <button
              onClick={onShuffle}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors hover:bg-black/5"
              style={{ border: "1px solid rgba(28,35,64,0.18)", color: "#1C2340" }}
            >
              <Shuffle className="h-4 w-4" />
              {t.shuffle}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categoryData.groups.map((group, groupIndex) => (
          <GroupCard
            key={groupIndex}
            group={group}
            groupIndex={groupIndex}
            standings={calculateStandings(group)}
            editingMatch={editingMatch}
            onEditMatch={onEditMatch}
            onSetScore={(matchId, score1, score2) => onSetScore(groupIndex, matchId, score1, score2)}
            onCancelEdit={onCancelEdit}
          />
        ))}
      </div>
    </div>
  )
}

function WrappedTournamentApp(props) {
  return (
    <LangProvider isAdmin={props.isAdmin ?? false}>
      <TournamentApp {...props} />
    </LangProvider>
  )
}

export default WrappedTournamentApp
