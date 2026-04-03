export interface SkillGroups {
  beginner: boolean
  advanced: boolean
}

export interface FormData {
  firstName: string
  lastName: string
  email: string
  age: number
  gender: string
  skillGroups: SkillGroups
}

export interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  gender?: string
  skillGroups?: string
}
