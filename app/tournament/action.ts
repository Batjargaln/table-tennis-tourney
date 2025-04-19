"use server"

import { createClient } from "@/lib/supabase/server"

export async function fetchInitialTournamentData() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("player").select()

  if (error) {
    console.error("Error fetching player data:", error)
    return []
  }

  const initialData = {
    "beginner-male": {
      players: [],
    },
    "intermediate-male": {
      players: [],
    },
    "advanced-male": {
      players: [],
    },
    "intermediate-female": {
      players: [],
    },
    "advanced-female": {
      players: [],
    },
  }

  for (const player of data) {
    if (player.beginner) {
      initialData[`beginner-${player.gender}`].players.push(player)
    }
    if (player.intermediate) {
      initialData[`intermediate-${player.gender}`].players.push(player)
    }
    if (player.advanced) {
      initialData[`advanced-${player.gender}`].players.push(player)
    }
  }

  return initialData
}
