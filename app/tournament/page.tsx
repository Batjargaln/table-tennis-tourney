import { MAX_PLAYERS_PER_GROUP } from "@/lib/constants"

import { categories } from "../categories"
import { CategoryCard } from "./CategoryCard"
import { fetchCategoryData } from "./action"

export default async function Home() {
  const data = await fetchCategoryData()

  return (
    //TODO: translate
    <main className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          Table Tennis Tournament
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => {
            const playerCount = Number(
              data.find((item) => item.gender === category.gender)?.[
                category.skillLevel
              ]
            )
            return (
              <CategoryCard
                key={category.id}
                id={category.id}
                title={category.title}
                description={category.description}
                players={playerCount}
                groups={Math.ceil(playerCount / MAX_PLAYERS_PER_GROUP)}
              />
            )
          })}
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Select a category to view matches and standings</p>
        </div>
      </div>
    </main>
  )
}
