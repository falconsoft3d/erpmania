---
title: "Cambiar contraseña Odoo 14"
description: "Aprende a cambiar la contraseña de usuario en Odoo 14 de manera sencilla y rápida."
version: "17"
module: "Base"
difficulty: "Intermedio"
icon: "code"
iconColor: "black"
date: "2025-12-26"
---

# Cambiar contraseña Odoo 14

## Introducción

Cambiar la contraseña de un usuario en Odoo 14 puede ser necesario por razones de seguridad o si un usuario ha olvidado su contraseña. A continuación, te mostramos cómo hacerlo utilizando la consola de PostgreSQL.

# Nos conectamos a la base de datos
```
sudo -u postgres psql -d db10-chile-sii
```

# Cambiamos la contraseña del usuario admin
```
update res_users set password='123' where login='admin';
```

