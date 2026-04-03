"use server"

// Supabase disabled — returns empty bracket data
export async function fetchInitialTournamentData() {
  return {
    "beginner-male":      { players: [] },
    "intermediate-male":  { players: [] },
    "advanced-male":      { players: [] },
    "intermediate-female":{ players: [] },
    "advanced-female":    { players: [] },
  }
}
