package com.ptm.product_inventory_api.service;

import com.ptm.product_inventory_api.dto.*;

import java.math.BigDecimal;
import java.util.List;

public interface ProductService {
    List<ProductResponse> findAll();
    ProductResponse findById(Long id);
    ProductResponse create(ProductRequest req);
    ProductResponse update(Long id, ProductRequest req);
    void delete(Long id);

    InventoryTotalResponse totalInventario();
    InventoryMaxResponse mayorValorInventario();
    List<CombinationResponse> combinaciones(BigDecimal valorMax);
}
