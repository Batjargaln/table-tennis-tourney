import { createClient } from "@supabase/supabase-js"
import AdminPanel from "./AdminPanel"

async function fetchData() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [playersRes, doublesRes] = await Promise.all([
    supabase
      .from("players")
      .select("id, first_name, last_name, email, gender, skill_beginner, skill_advanced, paid, checked_in, created_at")
      .order("created_at", { ascending: true }),
    supabase
      .from("doubles_teams")
      .select("id, player1_first_name, player1_last_name, player2_first_name, player2_last_name, email, paid, checked_in, created_at")
      .order("created_at", { ascending: true }),
  ])

  if (playersRes.error) throw new Error(playersRes.error.message)

  return {
    players:      playersRes.data ?? [],
    doublesTeams: doublesRes.data ?? [],
  }
}

export default async function AdminPage() {
  const { players, doublesTeams } = await fetchData()
  return <AdminPanel players={players} doublesTeams={doublesTeams} />
}
