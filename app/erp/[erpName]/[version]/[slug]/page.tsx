import { getTrickBySlug, getAllTricks } from '@/lib/markdown'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import Link from 'next/link'
import 'highlight.js/styles/github-dark.css'

interface PageProps {
  params: {
    erpName: string
    version: string
    slug: string
  }
}

export async function generateStaticParams() {
  const tricks = getAllTricks()
  
  return tricks.map((trick) => ({
    erpName: trick.erpName,
    version: trick.version,
    slug: trick.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const trick = getTrickBySlug(params.erpName, params.version, params.slug)
  
  if (!trick) {
    return {
      title: 'Truco no encontrado',
    }
  }
  
  return {
    title: `${trick.metadata.title} - ERPMania`,
    description: trick.metadata.description,
  }
}

export default function TrickPage({ params }: PageProps) {
  const trick = getTrickBySlug(params.erpName, params.version, params.slug)
  
  if (!trick) {
    notFound()
  }
  
  const iconColors: Record<string, string> = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    primary: 'bg-primary/10 text-primary dark:text-primary-light',
    red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
    pink: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
    teal: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
  }
  
  const colorClass = iconColors[trick.metadata.iconColor || 'primary'] || iconColors.primary
  
  return (
    <>
      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-700 shrink-0">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light mb-4 transition-colors"
        >
          <span className="material-icons-outlined text-sm mr-1">arrow_back</span>
          Volver a la lista
        </Link>
        
        <div className="flex items-start gap-4">
          <div className={`w-16 h-16 rounded-xl ${colorClass} flex items-center justify-center shrink-0`}>
            <span className="material-icons-outlined text-3xl">
              {trick.metadata.icon || 'description'}
            </span>
          </div>
          
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              {trick.metadata.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-3">
              {trick.metadata.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-primary-light text-sm font-medium">
                {params.erpName.toUpperCase()} v{params.version}
              </span>
              
              {trick.metadata.module && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm">
                  <span className="material-icons-outlined text-xs mr-1">folder</span>
                  {trick.metadata.module}
                </span>
              )}
              
              {trick.metadata.difficulty && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm">
                  <span className="material-icons-outlined text-xs mr-1">school</span>
                  {trick.metadata.difficulty}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto custom-scrollbar">
        <article className="prose prose-slate dark:prose-invert max-w-none p-4">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
          >
            {trick.content}
          </ReactMarkdown>
        </article>
      </div>
    </>
  )
}
