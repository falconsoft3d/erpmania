import IconBuilder from '@/components/IconBuilder'

export const metadata = {
  title: 'Icon Builder - ERPMania',
  description: 'Generador de iconos para módulos de Odoo',
}

export default function IconBuilderPage() {
  return (
    <>
      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-700 shrink-0">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
            <span className="material-icons-outlined text-3xl">palette</span>
          </div>
          
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              Icon Builder para Odoo
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Crea iconos profesionales para tus módulos de Odoo en segundos. Personaliza colores, elige iconos de Material Icons y descarga directamente.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900">
        <IconBuilder />
      </div>
    </>
  )
}
