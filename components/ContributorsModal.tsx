'use client'

import { getContributors, type Contributor } from '@/lib/contributors'

interface ContributorsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContributorsModal({ isOpen, onClose }: ContributorsModalProps) {
  if (!isOpen) return null

  const contributors = getContributors()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <span className="material-icons-outlined text-purple-500">people</span>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Colaboradores
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
          >
            <span className="material-icons-outlined text-slate-500">close</span>
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)] custom-scrollbar">
          {contributors.length === 0 ? (
            <div className="text-center py-12">
              <span className="material-icons-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">
                group_off
              </span>
              <p className="text-slate-500 dark:text-slate-400">
                No hay colaboradores registrados aún
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {contributors.map((contributor, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {contributor.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-grow min-w-0">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100 truncate">
                      {contributor.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                      {contributor.role}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="material-icons-outlined text-xs text-amber-500">
                        star
                      </span>
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {contributor.contributions} contribuciones
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    {contributor.github && (
                      <a
                        href={`https://github.com/${contributor.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors"
                        title="GitHub"
                      >
                        <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    {contributor.linkedin && (
                      <a
                        href={`https://linkedin.com/in/${contributor.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors"
                        title="LinkedIn"
                      >
                        <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                    {contributor.email && (
                      <a
                        href={`mailto:${contributor.email}`}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors"
                        title="Email"
                      >
                        <span className="material-icons-outlined text-lg text-slate-600 dark:text-slate-400">
                          email
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
