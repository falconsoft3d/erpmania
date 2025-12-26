'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { App } from '@/lib/apps'

interface AppsListProps {
  apps: App[]
}

export default function AppsList({ apps }: AppsListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedPrice, setSelectedPrice] = useState<string>('all')

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

  const filteredApps = apps.filter((app) => {
    const categoryMatch = selectedCategory === 'all' || app.metadata.category === selectedCategory
    const priceMatch = selectedPrice === 'all' || app.metadata.price === selectedPrice
    return categoryMatch && priceMatch
  })

  const allCategories = [...new Set(apps.map((a) => a.metadata.category).filter(Boolean))].sort()
  const allPrices = [...new Set(apps.map((a) => a.metadata.price).filter(Boolean))].sort()

  return (
    <div className="flex flex-grow overflow-hidden relative">
      <div className="w-full overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900 p-2">
        <div className="mb-4 flex gap-2 px-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-select py-2 px-3 text-sm border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">Todas las categorías</option>
            {allCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="form-select py-2 px-3 text-sm border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">Todos los precios</option>
            {allPrices.map((price) => (
              <option key={price} value={price}>
                {price}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
          {filteredApps.map((app) => {
            const colorClass = iconColors[app.metadata.iconColor || 'primary'] || iconColors.primary

            return (
              <Link
                key={app.slug}
                href={`/apps/${app.slug}`}
                className="group flex flex-col p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-all duration-150 hover:shadow-lg"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`w-12 h-12 rounded-lg ${colorClass} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                  >
                    <span className="material-icons-outlined text-xl">
                      {app.metadata.icon || 'apps'}
                    </span>
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-1">
                      {app.metadata.title}
                    </h3>
                    {app.metadata.category && (
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {app.metadata.category}
                      </p>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3 flex-grow">
                  {app.metadata.description}
                </p>
                
                <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex gap-2">
                    {app.metadata.price && (
                      <span className="text-xs px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {app.metadata.price}
                      </span>
                    )}
                    {app.metadata.rating && (
                      <span className="text-xs px-2 py-1 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 flex items-center gap-1">
                        <span className="material-icons-outlined" style={{ fontSize: '12px' }}>star</span>
                        {app.metadata.rating}
                      </span>
                    )}
                  </div>
                  
                  <span className="material-icons-outlined text-slate-400 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                    arrow_forward
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {filteredApps.length === 0 && (
          <div className="text-center py-12">
            <span className="material-icons-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">
              search_off
            </span>
            <p className="text-slate-500 dark:text-slate-400">
              No se encontraron aplicaciones con los filtros seleccionados
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
