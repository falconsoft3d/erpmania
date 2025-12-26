---
title: "Configurar servidores de correo saliente en Odoo 16"
description: "Guía completa para configurar correctamente los servidores de correo saliente en Odoo 16 y evitar problemas comunes."
version: "16"
module: "Configuración"
difficulty: "Básico"
icon: "description"
iconColor: "blue"
date: "2024-02-20"
---

# Configurar servidores de correo saliente en Odoo 16

## Introducción

La configuración correcta del servidor de correo saliente es fundamental para que Odoo pueda enviar emails de forma automática. Esta guía te mostrará cómo hacerlo paso a paso.

## Requisitos

- Acceso de administrador en Odoo
- Credenciales del servidor SMTP
- Puerto y configuración SSL/TLS del servidor

## Configuración paso a paso

### 1. Acceder a la configuración

Navega a: **Configuración > Técnico > Correo electrónico > Servidores de correo saliente**

### 2. Crear nuevo servidor

Haz clic en "Crear" y completa los siguientes campos:

```
Descripción: Nombre descriptivo del servidor
Servidor SMTP: smtp.gmail.com (ejemplo)
Puerto SMTP: 587 (TLS) o 465 (SSL)
Seguridad de conexión: TLS (STARTTLS)
Usuario: tu-email@gmail.com
Contraseña: tu-contraseña-de-aplicación
```

### 3. Configuración para Gmail

Si usas Gmail, necesitas una contraseña de aplicación:

1. Ve a tu cuenta de Google
2. Seguridad > Verificación en dos pasos
3. Contraseñas de aplicación
4. Genera una nueva contraseña
5. Úsala en Odoo

### 4. Probar la conexión

Haz clic en "Probar conexión" para verificar que todo funciona correctamente.

## Configuraciones comunes

### Gmail
```
Servidor: smtp.gmail.com
Puerto: 587
TLS: Sí
```

### Outlook/Office 365
```
Servidor: smtp.office365.com
Puerto: 587
TLS: Sí
```

### SendGrid
```
Servidor: smtp.sendgrid.net
Puerto: 587
TLS: Sí
Usuario: apikey
Contraseña: tu-api-key
```

## Problemas comunes

### Error de autenticación

**Causa**: Credenciales incorrectas o autenticación de dos factores activada.

**Solución**: Usa contraseñas de aplicación en lugar de tu contraseña normal.

### Timeout de conexión

**Causa**: Puerto bloqueado o configuración de firewall.

**Solución**: Verifica que el puerto SMTP esté abierto en tu firewall.

### Límite de envíos excedido

**Causa**: Proveedores como Gmail tienen límites diarios.

**Solución**: Considera usar un servicio SMTP dedicado para producción.

## Mejores prácticas

1. **Usa servicios dedicados** para producción (SendGrid, Mailgun, Amazon SES)
2. **Configura SPF y DKIM** para mejorar la entregabilidad
3. **Monitorea los rebotes** y correos no entregados
4. **Prueba regularmente** que el envío funciona correctamente

## Conclusión

Una configuración correcta del correo saliente es esencial para el funcionamiento de Odoo. Sigue estas instrucciones y evitarás los problemas más comunes.
