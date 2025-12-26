---
title: "Acciones automáticas con código Python"
description: "Aprende a crear acciones automáticas potentes usando código Python en Odoo."
version: "17"
module: "Base"
difficulty: "Intermedio"
icon: "code"
iconColor: "purple"
date: "2024-03-10"
---

# Crear acciones automáticas con código Python

## Introducción

Las acciones automáticas en Odoo permiten ejecutar código cuando ocurren ciertos eventos. Esta característica es extremadamente poderosa para automatizar procesos de negocio.

## ¿Qué son las acciones automáticas?

Son reglas que se ejecutan automáticamente cuando:
- Se crea un registro
- Se actualiza un registro
- Se elimina un registro
- En una fecha/hora específica

## Crear una acción automática

### 1. Navegar a la configuración

Ve a: **Configuración > Técnico > Automatización > Acciones automáticas**

### 2. Crear nueva acción

Completa los campos básicos:
- **Nombre**: Descripción de la acción
- **Modelo**: El modelo donde se ejecutará (ej: sale.order)
- **Disparador**: Cuándo se ejecuta la acción
- **Aplicar en**: Opcional - agrega un dominio para filtrar

### 3. Escribir el código Python

En la pestaña "Código Python", escribe tu lógica:

```python
# Los registros están disponibles en 'records' o 'record'
for order in records:
    if order.amount_total > 10000:
        # Enviar notificación al gerente
        manager = env['res.users'].search([('name', '=', 'Manager')], limit=1)
        order.message_post(
            body='Orden grande detectada: %s' % order.name,
            partner_ids=[manager.partner_id.id]
        )
```

## Ejemplos prácticos

### Ejemplo 1: Validar datos al crear

```python
# Verificar que el cliente tenga un email válido
if not record.partner_id.email:
    raise UserError('El cliente debe tener un email válido')
```

### Ejemplo 2: Actualizar campos relacionados

```python
# Actualizar el total en el proyecto cuando se crea una tarea
if record.project_id:
    total_hours = sum(record.project_id.task_ids.mapped('planned_hours'))
    record.project_id.write({'total_planned_hours': total_hours})
```

### Ejemplo 3: Crear registros automáticamente

```python
# Crear una actividad de seguimiento
env['mail.activity'].create({
    'res_id': record.id,
    'res_model_id': env.ref('sale.model_sale_order').id,
    'user_id': record.user_id.id,
    'summary': 'Seguimiento de orden',
    'date_deadline': fields.Date.today(),
    'activity_type_id': env.ref('mail.mail_activity_data_todo').id,
})
```

### Ejemplo 4: Enviar email automático

```python
# Enviar email de confirmación
template = env.ref('sale.email_template_edi_sale')
if template:
    template.send_mail(record.id, force_send=True)
```

## Variables disponibles

En el contexto de código Python tienes acceso a:

- `env`: Environment de Odoo
- `record` o `records`: El registro que disparó la acción
- `fields`: Módulo de campos de Odoo
- `datetime`, `time`: Módulos de Python para fechas
- `UserError`, `ValidationError`: Excepciones de Odoo

## Consejos importantes

1. **Usa try-except** para manejar errores apropiadamente
2. **No hagas operaciones pesadas** en acciones que se ejecutan frecuentemente
3. **Ten cuidado con bucles infinitos** - una acción puede disparar otra acción
4. **Prueba en desarrollo** antes de usar en producción
5. **Documenta tu código** para facilitar el mantenimiento

## Limitaciones

- El código se ejecuta con privilegios de administrador
- No todos los módulos de Python están disponibles
- Las acciones síncronas pueden ralentizar la interfaz

## Debugging

Para hacer debug de tus acciones:

```python
import logging
_logger = logging.getLogger(__name__)

_logger.info('Order created: %s' % record.name)
_logger.warning('Total amount: %s' % record.amount_total)
```

Los logs aparecerán en el archivo de log de Odoo.

## Conclusión

Las acciones automáticas son una herramienta poderosa para extender Odoo sin crear módulos personalizados. Úsalas sabiamente para automatizar procesos repetitivos y mejorar la eficiencia.
