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

export interface DoublesFormData {
  player1FirstName: string
  player1LastName: string
  player2FirstName: string
  player2LastName: string
  email: string
}

export interface DoublesFormErrors {
  player1FirstName?: string
  player1LastName?: string
  player2FirstName?: string
  player2LastName?: string
  email?: string
}
