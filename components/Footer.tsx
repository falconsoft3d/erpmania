export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-4 py-1.5 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 shrink-0">
      <div className="flex items-center space-x-4">
        <span>
          Status:{' '}
          <span className="text-green-600 dark:text-green-400 font-semibold">Online</span>
        </span>
        <span className="hidden sm:inline">
          Powered by <span className="font-semibold text-slate-700 dark:text-slate-300">Next.js</span>
        </span>
      </div>
      <div>Press F1 for Help</div>
    </footer>
  )
}
