import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

export interface TrickMetadata {
  title: string
  description: string
  version: string
  module?: string
  difficulty?: 'Básico' | 'Intermedio' | 'Avanzado'
  icon?: string
  iconColor?: string
  date?: string
}

export interface Trick {
  slug: string
  erpName: string
  version: string
  metadata: TrickMetadata
  content: string
}

/**
 * Obtiene todos los trucos disponibles
 */
export function getAllTricks(): Trick[] {
  const tricks: Trick[] = []
  
  if (!fs.existsSync(contentDirectory)) {
    return tricks
  }

  // Leer carpeta content/erp
  const erpFolders = fs.readdirSync(contentDirectory)
  
  erpFolders.forEach((erpName) => {
    const erpPath = path.join(contentDirectory, erpName)
    
    if (!fs.statSync(erpPath).isDirectory()) return
    
    // Leer carpetas de versiones
    const versionFolders = fs.readdirSync(erpPath)
    
    versionFolders.forEach((version) => {
      const versionPath = path.join(erpPath, version)
      
      if (!fs.statSync(versionPath).isDirectory()) return
      
      // Leer archivos markdown
      const files = fs.readdirSync(versionPath)
      
      files.forEach((file) => {
        if (!file.endsWith('.md')) return
        
        const filePath = path.join(versionPath, file)
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const { data, content } = matter(fileContent)
        
        const slug = file.replace(/\.md$/, '')
        
        tricks.push({
          slug,
          erpName,
          version,
          metadata: data as TrickMetadata,
          content,
        })
      })
    })
  })
  
  return tricks
}

/**
 * Obtiene un truco específico
 */
export function getTrickBySlug(
  erpName: string,
  version: string,
  slug: string
): Trick | null {
  try {
    const filePath = path.join(contentDirectory, erpName, version, `${slug}.md`)
    
    if (!fs.existsSync(filePath)) {
      return null
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    
    return {
      slug,
      erpName,
      version,
      metadata: data as TrickMetadata,
      content,
    }
  } catch (error) {
    return null
  }
}

/**
 * Obtiene todos los ERPs disponibles
 */
export function getAvailableERPs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return []
  }
  
  return fs.readdirSync(contentDirectory).filter((name) => {
    return fs.statSync(path.join(contentDirectory, name)).isDirectory()
  })
}

/**
 * Obtiene todas las versiones disponibles para un ERP
 */
export function getAvailableVersions(erpName: string): string[] {
  const erpPath = path.join(contentDirectory, erpName)
  
  if (!fs.existsSync(erpPath)) {
    return []
  }
  
  return fs.readdirSync(erpPath).filter((name) => {
    return fs.statSync(path.join(erpPath, name)).isDirectory()
  })
}
