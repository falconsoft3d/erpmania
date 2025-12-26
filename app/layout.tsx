import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ERPMania - Trucos y Tips para ERPs',
  description: 'La mejor colección de trucos y tips para Odoo y otros ERPs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 min-h-screen flex flex-col transition-colors duration-200`}>
        <div className="flex-grow flex flex-col w-full h-screen">
          <div className="bg-surface-light dark:bg-surface-dark flex flex-col h-full overflow-hidden">
            <Header />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
