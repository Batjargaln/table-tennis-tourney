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
  const [playersRes, statesRes] = await Promise.all([
    supabase()
      .from("players")
      .select("id, first_name, last_name, email, age, gender, skill_beginner, skill_advanced"),
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

  const stateMap = Object.fromEntries(
    (statesRes.data ?? []).map((s) => [s.category_id, s])
  )

  const makeCategory = (filter: (p: typeof players[0]) => boolean, id: string) => ({
    players:       players.filter(filter),
    savedGroups:   stateMap[id]?.groups   ?? null,
    savedPlayoffs: stateMap[id]?.playoffs ?? null,
  })

  return {
    "beginner-male":   makeCategory((p) => p.gender === "male"   && p.skill_beginner, "beginner-male"),
    "advanced-male":   makeCategory((p) => p.gender === "male"   && p.skill_advanced, "advanced-male"),
    "beginner-female": makeCategory((p) => p.gender === "female" && p.skill_beginner, "beginner-female"),
    "advanced-female": makeCategory((p) => p.gender === "female" && p.skill_advanced, "advanced-female"),
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
