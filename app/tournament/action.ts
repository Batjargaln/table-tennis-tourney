"use server"

import { createClient } from "@supabase/supabase-js"

interface Player {
  id: string
  firstName: string
  lastName: string
  email: string
  age: number
  gender: string
}

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function fetchInitialTournamentData() {
  const { data, error } = await supabase()
    .from("players")
    .select("id, first_name, last_name, email, age, gender, skill_beginner, skill_advanced")

  if (error) throw new Error(error.message)

  // Map snake_case DB rows to camelCase player objects
  const players: (Player & { skill_beginner: boolean; skill_advanced: boolean })[] =
    (data ?? []).map((row) => ({
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      age: row.age,
      gender: row.gender,
      skill_beginner: row.skill_beginner,
      skill_advanced: row.skill_advanced,
    }))

  return {
    "beginner-male": {
      players: players.filter((p) => p.gender === "male" && p.skill_beginner),
    },
    "advanced-male": {
      players: players.filter((p) => p.gender === "male" && p.skill_advanced),
    },
    "beginner-female": {
      players: players.filter((p) => p.gender === "female" && p.skill_beginner),
    },
    "advanced-female": {
      players: players.filter((p) => p.gender === "female" && p.skill_advanced),
    },
  }
}
