---
title: "Intalar módulo por consola en Odoo"
description: "Aprende a instalar módulos en Odoo utilizando la consola, una habilidad esencial para administradores y desarrolladores."
version: "17"
module: "Base"
difficulty: "Intermedio"
icon: "code"
iconColor: "purple"
date: "2025-12-26"
---

# Instalar módulo por consola en Odoo
Cuando trabajas con Odoo, a veces es necesario instalar módulos directamente desde la consola, especialmente en entornos de producción o cuando no tienes acceso a la interfaz web. Aquí te mostramos cómo hacerlo.

```
-d nombre_basedatos -i nombre_modulo --stop-after-init --logfile=/dev/stdout
```

Por ejemplo, para instalar un módulo llamado `your_module_name` en una base de datos llamada `db-17`, usarías el siguiente comando:

```
$ su - odoo -s /bin/bash
$ odoo -d db-17 -i your_module_name --stop-after-init --logfile=/dev/stdoutsu - odoo -s /bin/bash
```
