"use client"

import React, { createContext, useContext, useState } from "react"

type Lang = "mn" | "en"

const translations = {
  mn: {
    subtitle:        "АНУ-ын Монголчуудын",
    title:           "Тэмцээний Удирдлага",
    titleEn:         "Tournament Management",
    selectCategory:  "Ангилал сонгон тэмцээнийг удирдана уу",
    players:         "Тоглогч",
    groups:          "Групп",
    playoffs:        "Плейофф",
    standings:       "Байрлал",
    matches:         "Тоглолт",
    shuffle:         "Холих",
    viewPlayoffs:    "Плейофф харах",
    startPlayoffs:   "Плейофф эхлэх",
    backToGroups:    "Групп руу буцах",
    roundOf:         (n: number) => `${n}-ын шат`,
    quarterFinals:   "Дөрөвний шигшээ",
    semiFinals:      "Хагас шигшээ",
    final:           "Финал",
    winner:          "Тэмцээний Аварга",
    winnerGroup:     "Групп",
    enterScore:      "Оноо оруулах",
    group:           "Групп",
    wl:              (w: number, l: number) => `${w}Х–${l}А`,
    mensBeginner:    "Эрэгтэй - Сонирхогч",
    mensAdvanced:    "Эрэгтэй - Ахисан шат",
    womensBeginner:  "Эмэгтэй - Сонирхогч",
    womensAdvanced:  "Эмэгтэй - Ахисан шат",
    forBeginners:    "Ширээний теннис шинэ тоглогчдод",
    forAdvanced:     "Туршлагатай тоглогчдод",
    mensSection:     "Эрэгтэй",
    womensSection:   "Эмэгтэй",
    doublesSection:  "Хосын тэмцээн",
    mixedDoubles:    "Холимог хос",
    forDoubles:      "Нэг эрэгтэй + нэг эмэгтэй баг",
  },
  en: {
    subtitle:        "USA Mongolians",
    title:           "Tournament Management",
    titleEn:         "Тэмцээний Удирдлага",
    selectCategory:  "Select a category to manage the tournament",
    players:         "Players",
    groups:          "Groups",
    playoffs:        "Playoffs",
    standings:       "Standings",
    matches:         "Matches",
    shuffle:         "Shuffle",
    viewPlayoffs:    "View Playoffs",
    startPlayoffs:   "Start Playoffs",
    backToGroups:    "Back to Groups",
    roundOf:         (n: number) => `Round of ${n}`,
    quarterFinals:   "Quarter Finals",
    semiFinals:      "Semi Finals",
    final:           "Final",
    winner:          "Tournament Winner",
    winnerGroup:     "Group",
    enterScore:      "Enter Score",
    group:           "Group",
    wl:              (w: number, l: number) => `${w}W–${l}L`,
    mensBeginner:    "Men's Intermediate",
    mensAdvanced:    "Men's Advanced",
    womensBeginner:  "Women's Intermediate",
    womensAdvanced:  "Women's Advanced",
    forBeginners:    "For players new to competitive table tennis",
    forAdvanced:     "For experienced competitive players",
    mensSection:     "Men's",
    womensSection:   "Women's",
    doublesSection:  "Doubles",
    mixedDoubles:    "Mixed Doubles",
    forDoubles:      "One man + one woman per team",
  },
}

type Translations = typeof translations.en
type LangContextType = {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations
  isAdmin: boolean
}

const LangContext = createContext<LangContextType>({
  lang: "mn",
  setLang: () => {},
  t: translations.mn,
  isAdmin: false,
})

export function LangProvider({ children, isAdmin }: { children: React.ReactNode; isAdmin: boolean }) {
  const [lang, setLang] = useState<Lang>("mn")
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang], isAdmin }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
