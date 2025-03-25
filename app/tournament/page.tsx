import { categories } from "../categories"
import { CategoryCard } from "./CategoryCard"

export default function Home() {
  return (
    //TODO: translate
    <main className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          Table Tennis Tournament
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              players={20}
              groups={4}
            />
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Select a category to view matches and standings</p>
        </div>
      </div>
    </main>
  )
}
