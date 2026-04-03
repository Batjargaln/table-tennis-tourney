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

export async function registerPlayer(data: PlayerData) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { error } = await supabase.from("players").insert({
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    age: data.age,
    gender: data.gender,
    skill_beginner: data.skillGroups.beginner,
    skill_advanced: data.skillGroups.advanced,
  })

  if (error) throw new Error(error.message)

  redirect("/registry/done")
}
