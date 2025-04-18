import Link from "next/link"
import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CategoryCardProps {
  id: string
  title: string
  description: string
  players: number
  groups: number
}

export const CategoryCard = ({
  id,
  title,
  description,
  players,
  groups,
}: CategoryCardProps) => (
  <Link href={`tournament/${id}`}>
    <Card className="group cursor-pointer transition-all hover:shadow-lg">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-muted-foreground">{description}</p>
        <div className="mt-4 text-sm text-muted-foreground">
          <div className="flex justify-between items-center">
            <span>Players:</span>
            <span className="font-medium">{players}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span>Groups:</span>
            <span className="font-medium">{groups}</span>
          </div>
          {/* {data.playoffs && (
        <div className="flex justify-between items-center mt-1 text-primary font-medium">
          <span>Status:</span>
          <span>Playoffs</span>
        </div>
      )} */}
        </div>
      </CardContent>
    </Card>
  </Link>
)
