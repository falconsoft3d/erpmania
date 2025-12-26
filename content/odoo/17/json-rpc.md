---
title: "Como usar JSON-RPC en Odoo"
description: "Aprende a interactuar con Odoo utilizando JSON-RPC, una técnica esencial para desarrolladores que trabajan con integraciones y automatizaciones."
version: "17"
module: "Base"
difficulty: "Intermedio"
icon: "code"
iconColor: "purple"
date: "2025-12-26"
---

# Actualizar Odoo por consola

## Introducción

JSON-RPC es un protocolo ligero para realizar llamadas a procedimientos remotos utilizando JSON. En Odoo, JSON-RPC se utiliza comúnmente para interactuar con el servidor desde aplicaciones externas, permitiendo operaciones como crear, leer, actualizar y eliminar registros.

# Login
```
http://localhost:8069/jsonrpc/
```

```
   {
        "jsonrpc": "2.0",
        "method": "call",
        "params": {"service": "common", "method": "login", "args": ["db15-spain", "admin", "x1234567890"]}
    }
```

# Get Products
```
      {
        "jsonrpc": "2.0",
        "method": "call",
        "params": {
                    "service": "object", 
                    "method": "execute", 
                    "args": ["db15-spain", 2, "x1234567890", "product.template", "search_read", [], []]}
      }
```

# Sale Order by customer
```
{
        "jsonrpc": "2.0",
        "method": "call",
        "params": {
                    "service": "object", 
                    "method": "execute", 
                    "args": ["db15-spain", 2, "x1234567890", "sale.order", "search_read", 
                            [ ["partner_id", "=", 7 ] ], 
                            ["name"]
                            ]}
    }
```

# Get Product
```
{
        "jsonrpc": "2.0",
        "method": "call",
        "params": {
                    "service": "object", 
                    "method": "execute", 
                    "args": ["db15-spain", 2, "x1234567890", "product.template", "read", [1], []]}
    }   
```

# Delete Product
```
{
        "jsonrpc": "2.0",
        "method": "call",
        "params": {
                    "service": "object", 
                    "method": "execute", 
                    "args": ["db15-spain", 2, "x1234567890", "product.template", "unlink", [4] ]}
    }
```


# Validate Invoice
```
{
        "jsonrpc": "2.0",
        "method": "call",
        "params": {
                    "service": "object", 
                    "method": "execute", 
                    "args": ["db15-spain", 2, "x1234567890", "account.move", "action_post", [12] ]}
    }
```

# Validate Sale Order
```
{
        "jsonrpc": "2.0",
        "method": "call",
        "params": {
                    "service": "object", 
                    "method": "execute", 
                    "args": ["db15-spain", 2, "x1234567890", "sale.order", "action_confirm", [12] ]}
    }
```

# Create Product
```
{
        "jsonrpc": "2.0",
        "method": "call",
        "params": {
                    "service": "object", 
                    "method": "execute", 
                    "args": ["db15-spain", 2, "x1234567890", "product.template", "create", {
                        "name" : "demo",
                        "default_code" : "AZUL01010"
                    }]}
    }
```

# Create Sale Order
```
{
        "jsonrpc": "2.0",
        "method": "call",
        "params": {
                    "service": "object", 
                    "method": "execute", 
                    "args": ["db15-spain", 2, "x1234567890", "sale.order", "create", {
                        "partner_id" : 7,
                        "order_line" : [ 
                                            [0,0, { 
                                                    "product_id": 1 , 
                                                    "product_uom_qty": 12,
                                                    "price_unit" : 5
                                                    }] 
                                        ]
                        
                    }]}
    }
```