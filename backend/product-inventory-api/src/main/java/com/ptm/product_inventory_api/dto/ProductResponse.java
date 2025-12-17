package com.ptm.product_inventory_api.dto;

import java.math.BigDecimal;

public record ProductResponse(
        Long id,
        String nombre,
        String descripcion,
        BigDecimal precio,
        Integer cantidadEnStock
) {}
