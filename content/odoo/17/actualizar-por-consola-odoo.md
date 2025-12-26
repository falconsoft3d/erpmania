---
title: "Actualizar Odoo por consola"
description: "Aprende a crear actualizar Odoo utilizando la consola, una habilidad esencial para administradores y desarrolladores."
version: "17"
module: "Base"
difficulty: "Intermedio"
icon: "code"
iconColor: "purple"
date: "2025-12-26"
---

# Actualizar Odoo por consola

## Introducción

Actualizar Odoo a través de la consola es una habilidad esencial para administradores y desarrolladores. Este método es especialmente útil cuando se trabaja en entornos de producción o cuando se necesita actualizar módulos específicos sin acceder a la interfaz web.

```bash
/etc/init.d/odoo stop
su - odoo -s /bin/bash
odoo -d db16-bim -u all --stop-after-init --logfile=/dev/stdout
odoo -d db16-bim -u base_bim_2 --stop-after-init --logfile=/dev/stdout
/etc/init.d/odoo start
```