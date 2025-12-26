'use client'

import { useState, useRef, useEffect } from 'react'

type OdooVersion = '11' | '12' | '13' | '14' | '15' | '16' | '17'

interface IconSettings {
  iconName: string
  backgroundColor: string
  iconSize: number
  odooVersion: OdooVersion
  shadowOffsetX: number
  shadowOffsetY: number
}

export default function IconBuilder() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [settings, setSettings] = useState<IconSettings>({
    iconName: 'water_drop',
    backgroundColor: '#9b4dca',
    iconSize: 300,
    odooVersion: '17',
    shadowOffsetX: 0,
    shadowOffsetY: 6,
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [popularIcons] = useState([
    'home', 'person', 'settings', 'shopping_cart', 'inventory_2',
    'analytics', 'receipt_long', 'account_balance', 'trending_up',
    'local_shipping', 'factory', 'store', 'people', 'assignment',
    'description', 'folder', 'schedule', 'calendar_today', 'check_circle',
    'star', 'favorite', 'thumb_up', 'shopping_bag', 'credit_card',
  ])

  useEffect(() => {
    generateIcon()
  }, [settings])

  const shadeColor = (color: string, percent: number): string => {
    const num = parseInt(color.replace('#', ''), 16)
    const amt = Math.round(2.55 * percent)
    const R = (num >> 16) + amt
    const G = ((num >> 8) & 0x00ff) + amt
    const B = (num & 0x0000ff) + amt
    return (
      '#' +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    )
  }

  const generateIcon = async () => {
    setIsGenerating(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = settings.iconSize
    canvas.width = size
    canvas.height = size

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Draw background with rounded corners
    const radius = size * 0.047
    ctx.beginPath()
    
    if (parseInt(settings.odooVersion) >= 12) {
      ctx.moveTo(radius, 0)
      ctx.lineTo(size - radius, 0)
      ctx.arcTo(size, 0, size, radius, radius)
      ctx.lineTo(size, size - radius)
      ctx.arcTo(size, size, size - radius, size, radius)
      ctx.lineTo(radius, size)
      ctx.arcTo(0, size, 0, size - radius, radius)
      ctx.lineTo(0, radius)
      ctx.arcTo(0, 0, radius, 0, radius)
    } else {
      ctx.rect(0, 0, size, size)
    }
    
    ctx.clip()
    ctx.fillStyle = settings.backgroundColor
    ctx.fill()

    // Draw hard shadow
    const shadowColor = shadeColor(settings.backgroundColor, -40)
    const fontSize = size * 0.5
    
    for (let i = 0; i < size * (2 / 3); i++) {
      const tmpWidth = (size - 2 * i) / 2 + settings.shadowOffsetX
      const tmpHeight = (size + 2 * i) / 2 + settings.shadowOffsetY
      ctx.fillStyle = shadowColor
      ctx.font = `900 ${fontSize}px "Material Icons Outlined"`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(settings.iconName, tmpWidth, tmpHeight)
    }

    // Draw main icon with shadow
    if (parseInt(settings.odooVersion) >= 12) {
      ctx.save()
      ctx.shadowOffsetX = settings.shadowOffsetX
      ctx.shadowOffsetY = settings.shadowOffsetY + (size * 0.02)
      ctx.shadowBlur = 0
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)'
      ctx.fillStyle = '#ffffff'
      ctx.font = `900 ${fontSize}px "Material Icons Outlined"`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(settings.iconName, size / 2, size / 2)
      ctx.restore()
    } else {
      ctx.fillStyle = '#ffffff'
      ctx.font = `900 ${fontSize}px "Material Icons Outlined"`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(settings.iconName, size / 2, size / 2)
    }

    // Inner shadows (top and bottom)
    if (parseInt(settings.odooVersion) >= 12) {
      const isRadius = size * 0.047
      const isHeight = size * 0.015

      ctx.save()
      ctx.globalAlpha = 0.4

      // Bottom inner shadow
      ctx.fillStyle = '#282F33'
      ctx.beginPath()
      ctx.moveTo(isRadius - isHeight, size)
      ctx.lineTo(size - isRadius, size)
      ctx.arcTo(size, size, size, size - isRadius, isRadius)
      ctx.lineTo(size, size - (isRadius + isHeight))
      ctx.arcTo(size, size - isHeight, size - isRadius, size - isHeight, isRadius)
      ctx.lineTo(isRadius, size - isHeight)
      ctx.arcTo(0, size - isHeight, 0, size - (isRadius + isHeight), isRadius)
      ctx.lineTo(0, size - isHeight)
      ctx.arcTo(0, size, isRadius - isHeight, size, isRadius)
      ctx.fill()

      // Top inner shadow
      ctx.fillStyle = '#FFFFFF'
      ctx.beginPath()
      ctx.moveTo(isRadius - isHeight, 0)
      ctx.lineTo(size - isRadius, 0)
      ctx.arcTo(size, 0, size, isRadius - isHeight, isRadius)
      ctx.lineTo(size, isRadius + 2)
      ctx.arcTo(size, isHeight, size - isRadius, isHeight, isRadius)
      ctx.lineTo(isRadius, isHeight)
      ctx.arcTo(0, isHeight, 0, isRadius + isHeight, isRadius)
      ctx.lineTo(0, isRadius)
      ctx.arcTo(0, 0, isRadius - isHeight, 0, isRadius)
      ctx.fill()

      ctx.restore()
    }

    // Gradient overlay
    if (parseInt(settings.odooVersion) >= 12) {
      ctx.save()
      ctx.globalAlpha = 0.2
      const gradient = ctx.createLinearGradient(0, size, size, 0)
      gradient.addColorStop(0, 'rgba(0,0,0,0)')
      gradient.addColorStop(1, '#FFFFFF')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, size, size)
      ctx.restore()
    }

    setIsGenerating(false)
  }

  const downloadIcon = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.download = `odoo_icon_${settings.iconName}_${Date.now()}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const presetColors = [
    '#9b4dca', '#714B67', '#00A09D', '#875A7B', '#3498db',
    '#e74c3c', '#f39c12', '#27ae60', '#8e44ad', '#34495e',
    '#16a085', '#c0392b', '#d35400', '#2980b9', '#8e44ad',
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preview */}
        <div className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">
              Vista Previa
            </h3>
            <div className="flex items-center justify-center bg-white dark:bg-slate-900 rounded-lg p-8">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto shadow-2xl"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
            <button
              onClick={downloadIcon}
              disabled={isGenerating}
              className="w-full mt-4 py-3 px-6 bg-primary hover:bg-primary-light text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span className="material-icons-outlined">download</span>
              Descargar PNG
            </button>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2 flex items-center gap-2">
              <span className="material-icons-outlined text-sm">info</span>
              Cómo usar en Odoo
            </h4>
            <ol className="text-sm text-blue-800 dark:text-blue-300 space-y-1 list-decimal list-inside">
              <li>Descarga el icono generado</li>
              <li>Renómbralo a <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">icon.png</code></li>
              <li>Colócalo en: <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">tu_modulo/static/description/</code></li>
              <li>Reinicia Odoo y actualiza la lista de apps</li>
            </ol>
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-4">
          {/* Odoo Version */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
              Versión de Odoo
            </label>
            <select
              value={settings.odooVersion}
              onChange={(e) => setSettings({ ...settings, odooVersion: e.target.value as OdooVersion })}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="11">Odoo 11</option>
              <option value="12">Odoo 12</option>
              <option value="13">Odoo 13</option>
              <option value="14">Odoo 14</option>
              <option value="15">Odoo 15</option>
              <option value="16">Odoo 16</option>
              <option value="17">Odoo 17</option>
            </select>
          </div>

          {/* Icon Name */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
              Icono (Material Icons)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={settings.iconName}
                onChange={(e) => setSettings({ ...settings, iconName: e.target.value })}
                placeholder="ej: water_drop, home, settings"
                className="flex-grow px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <div className="w-12 h-12 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg flex items-center justify-center">
                <span className="material-icons-outlined text-2xl text-slate-700 dark:text-slate-300">
                  {settings.iconName}
                </span>
              </div>
            </div>
            
            <div className="mt-3">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                Iconos populares:
              </p>
              <div className="flex flex-wrap gap-2">
                {popularIcons.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => setSettings({ ...settings, iconName: icon })}
                    className={`p-2 rounded-lg border transition-colors ${
                      settings.iconName === icon
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-primary'
                    }`}
                    title={icon}
                  >
                    <span className="material-icons-outlined text-lg">{icon}</span>
                  </button>
                ))}
              </div>
              <a
                href="https://fonts.google.com/icons"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary-light mt-2"
              >
                <span className="material-icons-outlined text-xs">open_in_new</span>
                Ver todos los iconos de Material Icons
              </a>
            </div>
          </div>

          {/* Background Color */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
              Color de Fondo
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="color"
                value={settings.backgroundColor}
                onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
                className="w-16 h-12 rounded-lg cursor-pointer border-2 border-slate-300 dark:border-slate-600"
              />
              <input
                type="text"
                value={settings.backgroundColor}
                onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
                placeholder="#9b4dca"
                className="flex-grow px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-primary font-mono"
              />
            </div>
            
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                Colores predefinidos:
              </p>
              <div className="grid grid-cols-5 gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSettings({ ...settings, backgroundColor: color })}
                    className={`w-full h-10 rounded-lg border-2 transition-all ${
                      settings.backgroundColor === color
                        ? 'border-slate-900 dark:border-white scale-110'
                        : 'border-slate-300 dark:border-slate-600 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Icon Size */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
              Tamaño del Icono: {settings.iconSize}px
            </label>
            <input
              type="range"
              min="128"
              max="512"
              step="64"
              value={settings.iconSize}
              onChange={(e) => setSettings({ ...settings, iconSize: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
              <span>128px</span>
              <span>256px</span>
              <span>512px</span>
            </div>
          </div>

          {/* Shadow Controls */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <label className="block text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">
              Posición de la Sombra
            </label>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs text-slate-600 dark:text-slate-400">
                    Horizontal (X): {settings.shadowOffsetX}px
                  </label>
                  <button
                    onClick={() => setSettings({ ...settings, shadowOffsetX: 0 })}
                    className="text-xs text-primary hover:text-primary-light"
                  >
                    Reset
                  </button>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  step="1"
                  value={settings.shadowOffsetX}
                  onChange={(e) => setSettings({ ...settings, shadowOffsetX: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>← Izquierda</span>
                  <span>Derecha →</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs text-slate-600 dark:text-slate-400">
                    Vertical (Y): {settings.shadowOffsetY}px
                  </label>
                  <button
                    onClick={() => setSettings({ ...settings, shadowOffsetY: 6 })}
                    className="text-xs text-primary hover:text-primary-light"
                  >
                    Reset
                  </button>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  step="1"
                  value={settings.shadowOffsetY}
                  onChange={(e) => setSettings({ ...settings, shadowOffsetY: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>↑ Arriba</span>
                  <span>Abajo ↓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
