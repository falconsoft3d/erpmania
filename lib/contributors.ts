export interface Contributor {
  name: string
  role: string
  avatar?: string
  github?: string
  linkedin?: string
  email?: string
  contributions: number
}

export const contributors: Contributor[] = [
  {
    name: "Tu Nombre",
    role: "Fundador & Desarrollador Principal",
    contributions: 150,
    github: "tu-usuario",
    linkedin: "tu-perfil",
  },
  // Agrega más colaboradores aquí
]

export function getContributors(): Contributor[] {
  return contributors.sort((a, b) => b.contributions - a.contributions)
}

export function getTopContributors(limit: number = 5): Contributor[] {
  return getContributors().slice(0, limit)
}
