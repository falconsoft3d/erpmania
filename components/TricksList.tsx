'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Trick } from '@/lib/markdown'

interface TricksListProps {
  tricks: Trick[]
}

export default function TricksList({ tricks }: TricksListProps) {
  const [selectedVersion, setSelectedVersion] = useState<string>('all')
  const [selectedERP, setSelectedERP] = useState<string>('all')

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

  const filteredTricks = tricks.filter((trick) => {
    const versionMatch = selectedVersion === 'all' || trick.version === selectedVersion
    const erpMatch = selectedERP === 'all' || trick.erpName === selectedERP
    return versionMatch && erpMatch
  })

  const allVersions = [...new Set(tricks.map((t) => t.version))].sort()
  const allERPs = [...new Set(tricks.map((t) => t.erpName))].sort()

  return (
    <div className="flex flex-grow overflow-hidden relative">
      <div className="w-full overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900 p-2">
        <div className="mb-4 flex gap-2 px-2">
          <select
            value={selectedERP}
            onChange={(e) => setSelectedERP(e.target.value)}
            className="form-select py-2 px-3 text-sm border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">Todos los ERPs</option>
            {allERPs.map((erp) => (
              <option key={erp} value={erp}>
                {erp.toUpperCase()}
              </option>
            ))}
          </select>

          <select
            value={selectedVersion}
            onChange={(e) => setSelectedVersion(e.target.value)}
            className="form-select py-2 px-3 text-sm border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">Todas las versiones</option>
            {allVersions.map((version) => (
              <option key={version} value={version}>
                v{version}
              </option>
            ))}
          </select>
        </div>

        <ul className="space-y-1">
          {filteredTricks.map((trick) => {
            const colorClass = iconColors[trick.metadata.iconColor || 'primary'] || iconColors.primary

            return (
              <li
                key={`${trick.erpName}-${trick.version}-${trick.slug}`}
                className="group flex items-center justify-between p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-150"
              >
                <Link
                  href={`/erp/${trick.erpName}/${trick.version}/${trick.slug}`}
                  className="flex items-center flex-grow min-w-0 mr-3"
                >
                  <div
                    className={`w-8 h-8 rounded ${colorClass} flex items-center justify-center mr-3 shrink-0 group-hover:scale-110 transition-transform`}
                  >
                    <span className="material-icons-outlined text-sm">
                      {trick.metadata.icon || 'description'}
                    </span>
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-primary transition-colors line-clamp-1">
                      {trick.metadata.title}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {trick.metadata.description}
                    </div>
                  </div>
                </Link>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary dark:text-primary-light font-mono">
                    {trick.erpName} v{trick.version}
                  </span>
                  {trick.metadata.difficulty && (
                    <span className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {trick.metadata.difficulty}
                    </span>
                  )}
                </div>
              </li>
            )
          })}
        </ul>

        {filteredTricks.length === 0 && (
          <div className="text-center py-12">
            <span className="material-icons-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">
              search_off
            </span>
            <p className="text-slate-500 dark:text-slate-400">
              No se encontraron trucos con los filtros seleccionados
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
