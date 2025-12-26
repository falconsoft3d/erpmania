import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const appsDirectory = path.join(process.cwd(), 'content/apps')

export interface AppMetadata {
  title: string
  description: string
  category?: string
  website?: string
  github?: string
  price?: 'Free' | 'Freemium' | 'Paid'
  platform?: string[]
  icon?: string
  iconColor?: string
  date?: string
  rating?: number
}

export interface App {
  slug: string
  metadata: AppMetadata
  content: string
}

/**
 * Obtiene todas las aplicaciones disponibles
 */
export function getAllApps(): App[] {
  const apps: App[] = []
  
  if (!fs.existsSync(appsDirectory)) {
    return apps
  }

  const files = fs.readdirSync(appsDirectory)
  
  files.forEach((file) => {
    if (!file.endsWith('.md')) return
    
    const filePath = path.join(appsDirectory, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    
    const slug = file.replace(/\.md$/, '')
    
    apps.push({
      slug,
      metadata: data as AppMetadata,
      content,
    })
  })
  
  return apps
}

/**
 * Obtiene una aplicación específica por slug
 */
export function getAppBySlug(slug: string): App | null {
  try {
    const filePath = path.join(appsDirectory, `${slug}.md`)
    
    if (!fs.existsSync(filePath)) {
      return null
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    
    return {
      slug,
      metadata: data as AppMetadata,
      content,
    }
  } catch (error) {
    return null
  }
}

/**
 * Obtiene todas las categorías disponibles
 */
export function getAvailableCategories(): string[] {
  const apps = getAllApps()
  const categories = new Set<string>()
  
  apps.forEach((app) => {
    if (app.metadata.category) {
      categories.add(app.metadata.category)
    }
  })
  
  return Array.from(categories).sort()
}
