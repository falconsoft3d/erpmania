---
title: "Respaldo Odoo Manual"
description: "Aprende a realizar respaldos manuales de tu base de datos y archivos en Odoo para garantizar la seguridad de tu información."
version: "17"
module: "Base"
difficulty: "Intermedio"
icon: "code"
iconColor: "purple"
date: "2025-12-26"
---

# Actualizar Odoo por consola

1. Hacemos un respaldo de la base de datos en el servidor de origen
```
pg_dump -U odoo -h localhost -p 5432 basedatos > basedatos.dump
```

2. Respaldamos los filestore
```
zip -r filestore-basedatos.zip /opt/odoo/.local/share/Odoo/filestore/basedatos
```
   

3. Montamos el respaldo
```
sudo -u postgres psql
CREATE DATABASE nueva_base_de_datos WITH OWNER = odoo;
ALTER DATABASE soluziono OWNER TO odoo;
psql -U odoo -d soluziono -f soluziono.dump
```


4. Montamos el filestore
```
unzip filestore-soluziono.zip
```

5. Montamos el filestore
```
sudo -u postgres psql
DELETE FROM ir_attachment WHERE create_date > '2024-03-27';
```
