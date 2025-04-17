"use server"

import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

interface PlayerData {
  firstName: string | null
  lastName: string | null
  city: string | null
  age: number | null
  gender: string | null
  skillGroups: {
    beginner: boolean
    intermediate: boolean
    advanced: boolean
  }
}

export async function registerPlayer(data: PlayerData) {
  const supabase = await createClient()

  const { data: test, error } = await supabase.from("player").insert({
    firstName: data.firstName,
    lastName: data.lastName,
    city: data.city,
    age: data.age,
    gender: data.gender,
    beginner: data.skillGroups.beginner,
    intermediate: data.skillGroups.intermediate,
    advanced: data.skillGroups.advanced,
  })

  if (error) {
    console.error("Error inserting data:", test, error)
    return
  }

  redirect("/registry/done")
}
