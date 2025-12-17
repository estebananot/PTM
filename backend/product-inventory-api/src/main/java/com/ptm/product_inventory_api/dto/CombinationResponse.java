package com.ptm.product_inventory_api.dto;

import java.math.BigDecimal;
import java.util.List;

public record CombinationResponse(
        List<String> productos,
        BigDecimal suma
) {}
