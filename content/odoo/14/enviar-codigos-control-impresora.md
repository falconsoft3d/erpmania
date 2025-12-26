---
title: "Enviar códigos de control a la impresora"
description: "Aprende cómo enviar comandos ESC/POS directamente a impresoras térmicas desde Odoo IoT Box sin avanzar el rollo de papel innecesariamente."
version: "14"
module: "Point of Sale"
difficulty: "Avanzado"
icon: "print"
iconColor: "primary"
date: "2024-01-15"
---

# Enviar códigos de control a la impresora

## Introducción

En este tutorial aprenderás cómo enviar códigos de control ESC/POS directamente a impresoras térmicas conectadas a través de Odoo IoT Box. Esto es útil cuando necesitas controlar aspectos específicos de la impresora como:

- Corte de papel
- Apertura de cajón
- Configuración de fuentes
- Control de alimentación de papel

## Requisitos previos

- Odoo 14 instalado
- IoT Box configurado
- Impresora térmica ESC/POS compatible
- Conocimientos básicos de Python

## Implementación

### Paso 1: Importar los módulos necesarios

```python
from odoo import models, fields, api
import logging

_logger = logging.getLogger(__name__)
```

### Paso 2: Crear el método para enviar comandos

```python
class PosOrder(models.Model):
    _inherit = 'pos.order'
    
    def send_control_code(self, code):
        """
        Envía un código de control a la impresora
        :param code: Código ESC/POS en formato bytes
        """
        printer = self.env['hw_proxy'].search([('name', '=', 'printer')], limit=1)
        if printer:
            printer.action_print_raw_data(code)
```

### Paso 3: Códigos ESC/POS comunes

Aquí algunos códigos útiles:

| Acción | Código |
|--------|--------|
| Cortar papel | `\\x1D\\x56\\x00` |
| Abrir cajón | `\\x1B\\x70\\x00` |
| Alimentar línea | `\\x0A` |
| Resetear impresora | `\\x1B\\x40` |

### Ejemplo completo

```python
def print_receipt_with_cut(self):
    # Imprimir contenido del ticket
    self.print_receipt()
    
    # Enviar código de corte
    cut_code = b'\\x1D\\x56\\x00'
    self.send_control_code(cut_code)
```

## Consejos importantes

1. **Siempre prueba los códigos** en una impresora de desarrollo primero
2. **Consulta el manual** de tu impresora para códigos específicos
3. **Maneja los errores** apropiadamente para evitar bloqueos
4. **No abuses del corte automático** para ahorrar papel

## Solución de problemas

### La impresora no responde

Verifica que:
- El IoT Box está conectado correctamente
- La impresora está encendida y lista
- Los cables están bien conectados

### El código no funciona

- Confirma que el código ESC/POS es el correcto para tu modelo de impresora
- Algunos modelos requieren variaciones del estándar ESC/POS

## Conclusión

Con esta técnica puedes tener control total sobre el comportamiento de tu impresora térmica en Odoo. Esto es especialmente útil para optimizar el consumo de papel y mejorar la experiencia del usuario.

## Recursos adicionales

- [Documentación oficial de Odoo IoT](https://www.odoo.com/documentation/14.0/applications/general/iot.html)
- [Especificación ESC/POS](https://reference.epson-biz.com/modules/ref_escpos/index.php)
