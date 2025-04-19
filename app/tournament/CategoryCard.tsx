import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const CategoryCard = ({ category, data, onClick }) => (
  <Card
    className="group cursor-pointer transition-all hover:shadow-lg"
    onClick={onClick}
  >
    <CardHeader className="border-b border-border/50">
      <CardTitle className="group-hover:text-primary transition-colors">
        {category.title}
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-4">
      <p className="text-muted-foreground">{category.description}</p>
      <div className="mt-4 text-sm text-muted-foreground">
        <div className="flex justify-between items-center">
          <span>Players:</span>
          <span className="font-medium">{data.players.length}</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span>Groups:</span>
          <span className="font-medium">{data.groups.length}</span>
        </div>
        {data.playoffs && (
          <div className="flex justify-between items-center mt-1 text-primary font-medium">
            <span>Status:</span>
            <span>Playoffs</span>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
)

export default CategoryCard
