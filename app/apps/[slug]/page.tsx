import { getAppBySlug, getAllApps } from '@/lib/apps'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import Link from 'next/link'
import 'highlight.js/styles/github-dark.css'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const apps = getAllApps()
  
  return apps.map((app) => ({
    slug: app.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const app = getAppBySlug(params.slug)
  
  if (!app) {
    return {
      title: 'Aplicación no encontrada',
    }
  }
  
  return {
    title: `${app.metadata.title} - ERPMania`,
    description: app.metadata.description,
  }
}

export default function AppPage({ params }: PageProps) {
  const app = getAppBySlug(params.slug)
  
  if (!app) {
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
  
  const colorClass = iconColors[app.metadata.iconColor || 'primary'] || iconColors.primary
  
  const priceColors: Record<string, string> = {
    Free: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    Freemium: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    Paid: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  }
  
  return (
    <>
      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-700 shrink-0">
        <Link
          href="/apps"
          className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light mb-4 transition-colors"
        >
          <span className="material-icons-outlined text-sm mr-1">arrow_back</span>
          Volver a aplicaciones
        </Link>
        
        <div className="flex items-start gap-4">
          <div className={`w-16 h-16 rounded-xl ${colorClass} flex items-center justify-center shrink-0`}>
            <span className="material-icons-outlined text-3xl">
              {app.metadata.icon || 'apps'}
            </span>
          </div>
          
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              {app.metadata.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-3">
              {app.metadata.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {app.metadata.category && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-primary-light text-sm font-medium">
                  <span className="material-icons-outlined text-xs mr-1">category</span>
                  {app.metadata.category}
                </span>
              )}
              
              {app.metadata.price && (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${priceColors[app.metadata.price]}`}>
                  <span className="material-icons-outlined text-xs mr-1">
                    {app.metadata.price === 'Free' ? 'check_circle' : 'payments'}
                  </span>
                  {app.metadata.price}
                </span>
              )}
              
              {app.metadata.platform && app.metadata.platform.length > 0 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm">
                  <span className="material-icons-outlined text-xs mr-1">devices</span>
                  {app.metadata.platform.join(', ')}
                </span>
              )}
              
              {app.metadata.rating && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm">
                  <span className="material-icons-outlined text-xs mr-1">star</span>
                  {app.metadata.rating}/5
                </span>
              )}
            </div>
            
            <div className="flex gap-2 mt-3">
              {app.metadata.website && (
                <a
                  href={app.metadata.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg font-medium transition-colors text-sm"
                >
                  <span className="material-icons-outlined text-sm mr-1">language</span>
                  Sitio web
                </a>
              )}
              
              {app.metadata.github && (
                <a
                  href={`https://github.com/${app.metadata.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-lg font-medium transition-colors text-sm"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
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
            {app.content}
          </ReactMarkdown>
        </article>
      </div>
    </>
  )
}
