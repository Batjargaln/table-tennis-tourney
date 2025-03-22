export type SkillGroup = "beginner" | "intermediate" | "advanced"

export interface FormData {
  firstName: string
  lastName: string
  city: string
  age: string
  gender: string
  skillGroups: SkillGroup | ""
}

export interface FormErrors {
  firstName?: string
  lastName?: string
  city?: string
  age?: string
  gender?: string
  skillGroups?: string
}
