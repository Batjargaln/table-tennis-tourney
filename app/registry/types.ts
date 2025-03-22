export interface SkillGroups {
  beginner: boolean
  intermediate: boolean
  advanced: boolean
}

export interface FormData {
  firstName: string
  lastName: string
  city: string
  age: number
  gender: string
  skillGroups: SkillGroups
}

export interface FormErrors {
  firstName?: string
  lastName?: string
  city?: string
  gender?: string
  skillGroups?: string
}
