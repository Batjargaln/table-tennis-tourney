import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

import { LogoutButton } from "./logout-button"
import { TournamentButton } from "./tournament-button"

export default async function ProtectedPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/login")
  }

  return (
    <div className="flex flex-col h-svh w-full items-center justify-center gap-2">
      <p>
        Hello <span>{data.user.email}</span>
      </p>

      <TournamentButton />

      <LogoutButton />
    </div>
  )
}
