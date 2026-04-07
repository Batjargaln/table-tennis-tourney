import { ICategory } from "@/lib/ICategory"

export const categories: ICategory[] = [
  {
    id: "beginner-male",
    title: "Men's Singles - Intermediate",
    description: "For players new to competitive table tennis",
    gender: "male",
    skillLevel: "beginner",
  },
  {
    id: "advanced-male",
    title: "Men's Singles - Advanced",
    description: "For experienced competitive players",
    gender: "male",
    skillLevel: "advanced",
  },
  {
    id: "beginner-female",
    title: "Women's Singles - Intermediate",
    description: "For players new to competitive table tennis",
    gender: "female",
    skillLevel: "beginner",
  },
  {
    id: "advanced-female",
    title: "Women's Singles - Advanced",
    description: "For experienced competitive players",
    gender: "female",
    skillLevel: "advanced",
  },
  {
    id: "mixed-doubles",
    title: "Mixed Doubles",
    description: "One man + one woman per team, $30 entry",
    gender: "mixed",
    skillLevel: "doubles",
  },
]
