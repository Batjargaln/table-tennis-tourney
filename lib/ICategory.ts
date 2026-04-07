export interface ICategory {
  id: string
  title: string
  description: string
  gender: "male" | "female" | "mixed"
  skillLevel: "beginner" | "advanced" | "doubles"
}
