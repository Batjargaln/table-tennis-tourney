import { ChevronLeft } from "lucide-react"
import Link from "next/link"

import { categories } from "@/app/categories"
import { Button } from "@/components/ui/button"

interface PageProps {
  params: Promise<{ category_id: string }>
}

async function page(props: PageProps) {
  const params = await props.params
  const { category_id } = params

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/tournament">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">
          {categories.find((c) => c.id === category_id)?.title}
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* {categoryData.groups.map((group, groupIndex) => (
          <GroupCard
            key={groupIndex}
            group={group}
            groupIndex={groupIndex}
            standings={calculateStandings(group)}
            editingMatch={editingMatch}
            onEditMatch={setEditingMatch}
            onSetScore={(matchId, score1, score2) =>
              handleSetScore(groupIndex, matchId, score1, score2)
            }
            onCancelEdit={() => setEditingMatch(null)}
          />
        ))} */}
      </div>
    </div>
  )
}

export default page
