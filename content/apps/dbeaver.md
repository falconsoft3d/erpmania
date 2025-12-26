---
title: "DBeaver"
description: "Cliente universal de base de datos gratuito que soporta PostgreSQL, MySQL y muchos otros. Perfecto para gestionar bases de datos de Odoo."
category: "Base de Datos"
website: "https://dbeaver.io"
github: "dbeaver/dbeaver"
price: "Freemium"
platform: ["Windows", "macOS", "Linux"]
icon: "storage"
iconColor: "orange"
rating: 5
date: "2024-03-15"
---

# DBeaver

## ¿Qué es DBeaver?

DBeaver es un cliente de base de datos universal, gratuito y de código abierto. Soporta múltiples bases de datos y es especialmente útil para trabajar con PostgreSQL, el motor de base de datos que usa Odoo.

## Características principales

### 1. Soporte multi-base de datos
- PostgreSQL (usado por Odoo)
- MySQL
- MariaDB
- SQLite
- Oracle
- SQL Server
- Y muchos más...

### 2. Editor SQL avanzado
- Autocompletado
- Resaltado de sintaxis
- Formateo de consultas
- Ejecución por bloques

### 3. Explorador de datos
- Navegación intuitiva de tablas
- Filtrado y ordenamiento
- Exportación a CSV, Excel, JSON
- Editor de datos inline

### 4. Diagramas ER
Visualiza las relaciones entre tablas de tu base de datos Odoo.

## Uso con Odoo

### Conectar a una base de datos Odoo

1. **Nueva conexión**
   - Host: localhost (o tu servidor)
   - Puerto: 5432
   - Database: nombre_db_odoo
   - Usuario: odoo (o tu usuario)
   - Contraseña: tu_contraseña

2. **Explorar datos**
   - Navega por las tablas (res_partner, sale_order, etc.)
   - Ejecuta consultas SQL personalizadas
   - Analiza la estructura de los modelos

### Consultas útiles para Odoo

```sql
-- Ver todos los usuarios
SELECT id, login, name, active 
FROM res_users 
WHERE active = true;

-- Contar órdenes de venta por estado
SELECT state, COUNT(*) 
FROM sale_order 
GROUP BY state;

-- Ver módulos instalados
SELECT name, state, latest_version 
FROM ir_module_module 
WHERE state = 'installed';
```

## Ventajas para desarrollo Odoo

1. **Debug rápido**: Consulta datos directamente sin escribir código Python
2. **Análisis de rendimiento**: Usa EXPLAIN para optimizar consultas
3. **Limpieza de datos**: Modifica datos de prueba fácilmente
4. **Backup/Restore**: Gestiona copias de seguridad visualmente
5. **Exploración de esquema**: Entiende la estructura de modelos de Odoo

## Tips profesionales

### 1. Usa favoritos SQL
Guarda consultas frecuentes para reutilizarlas rápidamente.

### 2. Modo read-only
Conecta en modo solo lectura a bases de datos de producción para evitar accidentes.

### 3. Exporta a Excel
Exporta resultados de consultas directamente a Excel para reportes.

### 4. Scripts SQL
Crea scripts para tareas repetitivas como limpieza de datos de prueba.

## DBeaver vs pgAdmin

| Característica | DBeaver | pgAdmin |
|----------------|---------|---------|
| Multi-DB | ✅ | ❌ (solo PostgreSQL) |
| Interfaz | Moderna | Tradicional |
| Editor SQL | Excelente | Bueno |
| Gratuito | ✅ | ✅ |
| Diagramas ER | ✅ | ⚠️ Limitado |

## Versión PRO

DBeaver tiene una versión PRO ($10/mes) que añade:
- Soporte NoSQL (MongoDB, Cassandra)
- Mockdata generator
- Comparación de esquemas
- Editor visual de consultas

Para desarrollo Odoo, la versión gratuita es más que suficiente.

## Conclusión

DBeaver es la herramienta perfecta para trabajar con bases de datos de Odoo. Es gratuita, potente y fácil de usar.

## Enlaces útiles

- [Documentación oficial](https://dbeaver.io/docs/)
- [Guía de inicio rápido](https://github.com/dbeaver/dbeaver/wiki/Quick-Start)
