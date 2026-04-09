"use server"

import { redirect } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

interface PlayerData {
  firstName: string | null
  lastName: string | null
  email: string | null
  age: number | null
  gender: string | null
  skillGroups: {
    beginner: boolean
    advanced: boolean
  }
}

export async function registerDoubles(data: {
  player1FirstName: string
  player1LastName: string
  player2FirstName: string
  player2LastName: string
  email: string
}): Promise<{ error: string } | void> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: existing } = await supabase
    .from("doubles_teams")
    .select("id")
    .eq("email", data.email)
    .maybeSingle()

  if (existing) return { error: "duplicate_email" }

  const { error } = await supabase.from("doubles_teams").insert({
    player1_first_name: data.player1FirstName,
    player1_last_name:  data.player1LastName,
    player2_first_name: data.player2FirstName,
    player2_last_name:  data.player2LastName,
    email:              data.email,
  })

  if (error) throw new Error(error.message)

  redirect("/registry/done")
}

export async function registerPlayer(data: PlayerData): Promise<{ error: string } | void> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: existing } = await supabase
    .from("players")
    .select("id")
    .eq("email", data.email)
    .maybeSingle()

  if (existing) return { error: "duplicate_email" }

  const { error } = await supabase.from("players").insert({
    first_name:     data.firstName,
    last_name:      data.lastName,
    email:          data.email,
    age:            data.age,
    gender:         data.gender,
    skill_beginner: data.skillGroups.beginner,
    skill_advanced: data.skillGroups.advanced,
  })

  if (error) throw new Error(error.message)

  redirect("/registry/done")
}
