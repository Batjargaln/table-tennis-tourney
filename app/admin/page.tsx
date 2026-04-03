import { createClient } from "@supabase/supabase-js"
import AdminPanel from "./AdminPanel"

async function fetchPlayers() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data, error } = await supabase
    .from("players")
    .select("id, first_name, last_name, email, gender, skill_beginner, skill_advanced, paid, checked_in, created_at")
    .order("created_at", { ascending: true })

  if (error) throw new Error(error.message)
  return data ?? []
}

export default async function AdminPage() {
  const players = await fetchPlayers()
  return <AdminPanel players={players} />
}
