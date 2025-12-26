'use client'

import { useState } from 'react'
import Link from 'next/link'
import ContributorsModal from './ContributorsModal'

export default function Header() {
  const [isDark, setIsDark] = useState(false)
  const [showContributors, setShowContributors] = useState(false)

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark')
    setIsDark(!isDark)
  }

  return (
    <>
      <header className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            ERPMania by Marlon Falcón Hernández
          </span>
        </div>
        <button
          className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          <span className="material-icons-outlined text-sm">dark_mode</span>
        </button>
      </header>

      <nav className="bg-surface-light dark:bg-surface-dark border-b border-slate-200 dark:border-slate-700 p-2 flex overflow-x-auto space-x-1 shrink-0">
        <Link 
          href="/"
          className="flex items-center space-x-1 px-3 py-1.5 rounded bg-primary/10 text-primary dark:text-primary-light font-medium text-sm transition-colors"
        >
          <span className="material-icons-outlined text-lg">list</span>
          <span>Lista</span>
        </Link>
        <Link
          href="/apps"
          className="flex items-center space-x-1 px-3 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors"
        >
          <span className="material-icons-outlined text-blue-500 text-lg">apps</span>
          <span>Aplicaciones interesantes</span>
        </Link>
        <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-2 self-center"></div>
        <button 
          onClick={() => setShowContributors(true)}
          className="flex items-center space-x-1 px-3 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors"
        >
          <span className="material-icons-outlined text-purple-500 text-lg">people</span>
          <span>Colaboradores</span>
        </button>
      </nav>

      <ContributorsModal isOpen={showContributors} onClose={() => setShowContributors(false)} />
    </>
  )
}
