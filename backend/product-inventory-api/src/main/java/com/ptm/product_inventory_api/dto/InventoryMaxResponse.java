package com.ptm.product_inventory_api.dto;

import java.math.BigDecimal;

public record InventoryMaxResponse(
        ProductResponse producto,
        BigDecimal valorInventarioProducto
) {}
