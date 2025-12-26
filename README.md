# ERPMania

Una aplicación Next.js para gestionar y compartir trucos sobre ERPs (Odoo y otros) en formato Markdown.

## 🚀 Características

- ✅ Gestión de trucos en formato Markdown
- ✅ URLs amigables: `/erp/odoo/17/nombre-truco`
- ✅ Sin base de datos - solo archivos MD
- ✅ Interfaz moderna con modo oscuro
- ✅ Filtros por ERP y versión
- ✅ Resaltado de sintaxis para código
- ✅ Responsive design
- ✅ Generación estática (SSG) para máximo rendimiento

## 📁 Estructura del proyecto

```
erpmania/
├── app/                          # App Router de Next.js
│   ├── erp/[erpName]/[version]/[slug]/
│   │   └── page.tsx             # Página de detalle del truco
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Página de inicio
│   └── globals.css              # Estilos globales
├── components/                   # Componentes React
│   ├── Header.tsx               # Cabecera con modo oscuro
│   ├── Footer.tsx               # Pie de página
│   └── TricksList.tsx           # Lista de trucos con filtros
├── content/                      # Contenido en Markdown
│   └── [erpName]/               # Carpeta por ERP (ej: odoo)
│       └── [version]/           # Carpeta por versión (ej: 17)
│           └── truco.md         # Archivo del truco
├── lib/
│   └── markdown.ts              # Utilidades para leer MD
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## 🛠️ Instalación

1. **Instalar dependencias:**

```bash
npm install
```

2. **Ejecutar en desarrollo:**

```bash
npm run dev
```

3. **Abrir en el navegador:**

```
http://localhost:3000
```

## 📝 Cómo agregar un nuevo truco

1. Crea la estructura de carpetas si no existe:
   ```
   content/[nombre-erp]/[version]/
   ```

2. Crea un archivo `.md` con el siguiente formato:

```markdown
---
title: "Título del truco"
description: "Descripción breve del truco"
version: "17"
module: "Ventas"
difficulty: "Intermedio"
icon: "code"
iconColor: "purple"
date: "2024-03-10"
---

# Contenido del truco

Tu contenido aquí...
```

### Metadata disponible:

- **title** (requerido): Título del truco
- **description** (requerido): Descripción breve
- **version** (requerido): Versión del ERP
- **module** (opcional): Módulo relacionado
- **difficulty** (opcional): Básico | Intermedio | Avanzado
- **icon** (opcional): Nombre del ícono de Material Icons
- **iconColor** (opcional): blue, orange, purple, green, primary, red, yellow, pink, teal
- **date** (opcional): Fecha de publicación

### Iconos disponibles

Usa nombres de [Material Icons](https://fonts.google.com/icons):
- `description`, `code`, `lightbulb`, `print`, `terminal`
- `warning`, `bug_report`, `engineering`, `tips_and_updates`
- Y muchos más...

## 🎨 Personalización

### Colores

Edita `tailwind.config.js` para cambiar los colores:

```js
colors: {
  primary: '#714B67',
  'primary-light': '#A67F9B',
  // ...
}
```

### Estilos del contenido Markdown

Edita `app/globals.css` para personalizar:

```css
.prose h1, .prose h2, .prose h3 {
  @apply text-slate-900 dark:text-slate-100;
}
```

## 📦 Build para producción

```bash
npm run build
npm start
```

## 🚢 Deploy

Puedes deployar en:

- **Vercel** (recomendado): `vercel --prod`
- **Netlify**: Conecta tu repositorio
- **Servidor propio**: Ejecuta `npm run build && npm start`

## 🔧 Tecnologías

- [Next.js 14](https://nextjs.org/) - Framework React
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [Tailwind CSS](https://tailwindcss.com/) - Estilos
- [Gray Matter](https://github.com/jonschlinkert/gray-matter) - Parser de frontmatter
- [React Markdown](https://github.com/remarkjs/react-markdown) - Renderizado de MD
- [Highlight.js](https://highlightjs.org/) - Resaltado de sintaxis

## 📄 Licencia

MIT

---

¡Disfruta compartiendo tus trucos de ERP! 🎉
