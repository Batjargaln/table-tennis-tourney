"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
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
