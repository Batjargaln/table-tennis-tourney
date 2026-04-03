import { createClient } from "@supabase/supabase-js"
import ParticipantsView from "./ParticipantsView"

async function fetchParticipants() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data, error } = await supabase
    .from("players")
    .select("id, first_name, last_name, gender, skill_beginner, skill_advanced")
    .order("created_at", { ascending: true })

  if (error) throw new Error(error.message)
  return data ?? []
}

export default async function ParticipantsPage() {
  const players = await fetchParticipants()
  return <ParticipantsView players={players} />
}
