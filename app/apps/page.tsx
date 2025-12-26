import { getAllApps } from '@/lib/apps'
import Link from 'next/link'
import AppsList from '@/components/AppsList'

export const metadata = {
  title: 'Aplicaciones Interesantes - ERPMania',
  description: 'Descubre las mejores aplicaciones y herramientas para trabajar con ERPs',
}

export default function AppsPage() {
  const apps = getAllApps()
  
  return (
    <>
      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-700 shrink-0">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary dark:text-primary-light font-display tracking-tight mb-2">
              Aplicaciones <span className="text-slate-800 dark:text-white">Interesantes</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-mono flex items-center gap-2">
              Descubre herramientas útiles para trabajar con ERPs...{' '}
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                Recomendadas por la comunidad
              </span>
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Total Apps
              </span>
              <div className="text-2xl font-mono font-bold text-slate-700 dark:text-slate-200">
                {apps.length}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <AppsList apps={apps} />
    </>
  )
}
