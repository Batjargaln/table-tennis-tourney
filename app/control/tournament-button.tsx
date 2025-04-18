"use client"

import { Button } from "@/components/ui/button"

import { startTournament } from "./action"

export function TournamentButton() {
  const handleClick = async () => {
    startTournament()
  }

  return (
    <Button onClick={handleClick}>
      Create GroupData and Start Tournament одоохондоо юу ч хйихгүй байгаа
    </Button>
  )
}
