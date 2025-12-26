'use client'

import { useState } from 'react'
import Link from 'next/link'
import ContributorsModal from './ContributorsModal'

export default function Header() {
  const [isDark, setIsDark] = useState(false)
  const [showContributors, setShowContributors] = useState(false)
  const [showToolsMenu, setShowToolsMenu] = useState(false)

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

      <nav className="bg-surface-light dark:bg-surface-dark border-b border-slate-200 dark:border-slate-700 p-2 flex space-x-1 shrink-0 relative z-50 overflow-visible">
        <Link 
          href="/"
          className="flex items-center space-x-1 px-3 py-1.5 rounded bg-primary/10 text-primary dark:text-primary-light font-medium text-sm transition-colors whitespace-nowrap"
        >
          <span className="material-icons-outlined text-lg">list</span>
          <span>Lista</span>
        </Link>
        <Link
          href="/apps"
          className="flex items-center space-x-1 px-3 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors whitespace-nowrap"
        >
          <span className="material-icons-outlined text-blue-500 text-lg">apps</span>
          <span>Aplicaciones interesantes</span>
        </Link>
        <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-2 self-center"></div>
        <button 
          onClick={() => setShowContributors(true)}
          className="flex items-center space-x-1 px-3 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors whitespace-nowrap"
        >
          <span className="material-icons-outlined text-purple-500 text-lg">people</span>
          <span>Colaboradores</span>
        </button>
        
        <div className="relative z-[200]">
          <button
            onClick={() => setShowToolsMenu(!showToolsMenu)}
            className="flex items-center space-x-1 px-3 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors whitespace-nowrap"
          >
            <span className="material-icons-outlined text-orange-500 text-lg">build</span>
            <span>Herramientas</span>
            <span className="material-icons-outlined text-xs">{showToolsMenu ? 'expand_less' : 'expand_more'}</span>
          </button>
          
          {showToolsMenu && (
            <>
              <div 
                className="fixed inset-0 z-[150]" 
                onClick={() => setShowToolsMenu(false)}
              />
              <div className="absolute top-full left-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-2xl py-1 min-w-[200px] z-[200]">
                <Link
                  href="/tools/icon-builder"
                  onClick={() => setShowToolsMenu(false)}
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <span className="material-icons-outlined text-sm text-orange-500">palette</span>
                  <span className="text-sm text-slate-700 dark:text-slate-300">Icon Builder</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </nav>

      <ContributorsModal isOpen={showContributors} onClose={() => setShowContributors(false)} />
    </>
  )
}
