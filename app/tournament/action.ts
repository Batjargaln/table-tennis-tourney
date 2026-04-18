"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function fetchInitialTournamentData() {
  const [playersRes, doublesRes, statesRes] = await Promise.all([
    supabase()
      .from("players")
      .select("id, first_name, last_name, email, age, gender, skill_beginner, skill_advanced")
      .eq("paid", true),
    supabase()
      .from("doubles_teams")
      .select("id, player1_first_name, player1_last_name, player2_first_name, player2_last_name, email")
      .eq("paid", true),
    supabase()
      .from("tournament_state")
      .select("category_id, groups, playoffs"),
  ])

  if (playersRes.error) throw new Error(playersRes.error.message)

  const players = (playersRes.data ?? []).map((row) => ({
    id:             row.id,
    firstName:      row.first_name,
    lastName:       row.last_name,
    email:          row.email,
    age:            row.age,
    gender:         row.gender,
    skill_beginner: row.skill_beginner,
    skill_advanced: row.skill_advanced,
  }))

  // Represent each doubles team as a single "player" entry so the bracket
  // engine (which works with player objects) needs no changes.
  const doublesAsPlayers = (doublesRes.data ?? []).map((row) => ({
    id:             row.id,
    firstName:      `${row.player1_first_name} ${row.player1_last_name}`,
    lastName:       `& ${row.player2_first_name} ${row.player2_last_name}`,
    email:          row.email ?? "",
    age:            null,
    gender:         "mixed",
    skill_beginner: false,
    skill_advanced: false,
  }))

  const stateMap = Object.fromEntries(
    (statesRes.data ?? []).map((s) => [s.category_id, s])
  )

  const makeCategory = (entries: typeof players, id: string) => ({
    players:       entries,
    savedGroups:   stateMap[id]?.groups   ?? null,
    savedPlayoffs: stateMap[id]?.playoffs ?? null,
  })

  return {
    "beginner-male":   makeCategory(players.filter((p) => p.gender === "male"   && p.skill_beginner), "beginner-male"),
    "advanced-male":   makeCategory(players.filter((p) => p.gender === "male"   && p.skill_advanced), "advanced-male"),
    "beginner-female": makeCategory(players.filter((p) => p.gender === "female" && p.skill_beginner), "beginner-female"),
    "advanced-female": makeCategory(players.filter((p) => p.gender === "female" && p.skill_advanced), "advanced-female"),
    "mixed-doubles":   makeCategory(doublesAsPlayers, "mixed-doubles"),
  }
}

export async function saveCategoryState(categoryId: string, groups: any, playoffs: any) {
  await supabase()
    .from("tournament_state")
    .upsert(
      { category_id: categoryId, groups, playoffs, updated_at: new Date().toISOString() },
      { onConflict: "category_id" }
    )
}

export async function togglePaid(id: string, current: boolean) {
  await supabase().from("players").update({ paid: !current }).eq("id", id)
  revalidatePath("/admin")
}

export async function toggleCheckedIn(id: string, current: boolean) {
  await supabase().from("players").update({ checked_in: !current }).eq("id", id)
  revalidatePath("/admin")
}
