package com.ptm.product_inventory_api.controller;

import com.ptm.product_inventory_api.dto.*;
import com.ptm.product_inventory_api.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/productos")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public List<ProductResponse> list() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ProductResponse get(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public ProductResponse create(@RequestBody @Valid ProductRequest req) {
        return service.create(req);
    }

    @PutMapping("/{id}")
    public ProductResponse update(@PathVariable Long id, @RequestBody @Valid ProductRequest req) {
        return service.update(id, req);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/inventario/total")
    public InventoryTotalResponse totalInventario() {
        return service.totalInventario();
    }

    @GetMapping("/inventario/mayor")
    public InventoryMaxResponse mayorInventario() {
        return service.mayorValorInventario();
    }

    @GetMapping("/combinaciones")
    public List<CombinationResponse> combinaciones(@RequestParam("valor") BigDecimal valor) {
        return service.combinaciones(valor);
    }
}
