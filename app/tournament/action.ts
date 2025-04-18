"use server"

import { createClient } from "@/lib/supabase/server"

// import { categories } from "../categories"

export async function fetchCategoryData() {
  const supabase = await createClient()

  const { data, error } = await supabase.from("count_by_category").select()

  if (error) {
    console.error("Error fetching category data:", error)
    return []
  }

  return data
}
