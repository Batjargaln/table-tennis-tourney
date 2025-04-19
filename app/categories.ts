import { ICategory } from "@/lib/ICategory"

export const categories: ICategory[] = [
  {
    id: "beginner-male",
    title: "Men's Singles - Beginner",
    description: "For players new to competitive table tennis",
    gender: "male",
    skillLevel: "beginner",
  },
  {
    id: "intermediate-male",
    title: "Men's Singles - Intermediate",
    description: "For players with some competitive experience",
    gender: "male",
    skillLevel: "intermediate",
  },
  {
    id: "advanced-male",
    title: "Men's Singles - Advanced",
    description: "For experienced competitive players",
    gender: "male",
    skillLevel: "advanced",
  },
  {
    id: "intermediate-female",
    title: "Women's Singles - intermediate",
    description: "For players with some competitive experience",
    gender: "female",
    skillLevel: "intermediate",
  },
  {
    id: "advanced-female",
    title: "Women's Singles - Advanced",
    description: "For experienced competitive players",
    gender: "female",
    skillLevel: "advanced",
  },
]
