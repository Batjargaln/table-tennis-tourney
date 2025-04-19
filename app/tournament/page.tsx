import TournamentApp from "./TournamentManager"
import { fetchInitialTournamentData } from "./action"

export default async function Home() {
  const initialTournamentData = await fetchInitialTournamentData()

  return (
    <main className="container mx-auto py-8">
      <TournamentApp initialTournamentData={initialTournamentData} />
    </main>
  )
}
