---
title: "LLamada API desde Odoo"
description: "Llama APIs externas desde Odoo utilizando Python y la biblioteca requests para integrar servicios de terceros."
version: "17"
module: "Base"
difficulty: "Intermedio"
icon: "code"
iconColor: "purple"
date: "2025-12-26"
---

# Actualizar Odoo por consola

## Introducción

Llamar APIs externas desde Odoo es una forma poderosa de integrar servicios de terceros en tu sistema ERP. Utilizando Python y la biblioteca requests, puedes enviar y recibir datos de diversas APIs RESTful.


```bash
import requests

url = 'https://eu102.chat-api.com/instance99645/sendMessage?token=iwu09tzu212lk'

params = {
    "phone": "79912422",
    "body": "WhatsApp API on chat-api.com works good"
}

response = requests.post(url, params=params)

response.json()
```