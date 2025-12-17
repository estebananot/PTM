package com.ptm.product_inventory_api.service;

import com.ptm.product_inventory_api.domain.Product;
import com.ptm.product_inventory_api.dto.*;
import com.ptm.product_inventory_api.exception.NotFoundException;
import com.ptm.product_inventory_api.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repo;

    public ProductServiceImpl(ProductRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<ProductResponse> findAll() {
        return repo.findAll().stream().map(this::toResponse).toList();
    }

    @Override
    public ProductResponse findById(Long id) {
        return toResponse(findEntity(id));
    }

    @Override
    public ProductResponse create(ProductRequest req) {
        Product p = new Product();
        apply(p, req);
        return toResponse(repo.save(p));
    }

    @Override
    public ProductResponse update(Long id, ProductRequest req) {
        Product p = findEntity(id);
        apply(p, req);
        return toResponse(repo.save(p));
    }

    @Override
    public void delete(Long id) {
        repo.delete(findEntity(id));
    }

    @Override
    public InventoryTotalResponse totalInventario() {
        BigDecimal total = repo.findAll().stream()
                .map(p -> p.getPrecio().multiply(BigDecimal.valueOf(p.getCantidadEnStock())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return new InventoryTotalResponse(total);
    }

    @Override
    public InventoryMaxResponse mayorValorInventario() {
        return repo.findAll().stream()
                .max(Comparator.comparing(p -> p.getPrecio().multiply(BigDecimal.valueOf(p.getCantidadEnStock()))))
                .map(p -> new InventoryMaxResponse(
                        toResponse(p),
                        p.getPrecio().multiply(BigDecimal.valueOf(p.getCantidadEnStock()))
                ))
                .orElse(new InventoryMaxResponse(null, BigDecimal.ZERO));
    }

    @Override
    public List<CombinationResponse> combinaciones(BigDecimal valorMax) {
        List<Product> products = repo.findAll();
        List<CombinationResponse> out = new ArrayList<>();
        int n = products.size();

        // combos de 2
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                BigDecimal sum = products.get(i).getPrecio().add(products.get(j).getPrecio());
                if (sum.compareTo(valorMax) <= 0) {
                    out.add(new CombinationResponse(
                            List.of(products.get(i).getNombre(), products.get(j).getNombre()),
                            sum
                    ));
                }
            }
        }

        // combos de 3
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                for (int k = j + 1; k < n; k++) {
                    BigDecimal sum = products.get(i).getPrecio()
                            .add(products.get(j).getPrecio())
                            .add(products.get(k).getPrecio());
                    if (sum.compareTo(valorMax) <= 0) {
                        out.add(new CombinationResponse(
                                List.of(products.get(i).getNombre(), products.get(j).getNombre(), products.get(k).getNombre()),
                                sum
                        ));
                    }
                }
            }
        }

        out.sort((a, b) -> b.suma().compareTo(a.suma()));
        return out.stream().limit(5).toList();
    }

    private Product findEntity(Long id) {
        return repo.findById(id).orElseThrow(() -> new NotFoundException("Producto no encontrado: " + id));
    }

    private void apply(Product p, ProductRequest req) {
        p.setNombre(req.nombre());
        p.setDescripcion(req.descripcion());
        p.setPrecio(req.precio());
        p.setCantidadEnStock(req.cantidadEnStock());
    }

    private ProductResponse toResponse(Product p) {
        return new ProductResponse(p.getId(), p.getNombre(), p.getDescripcion(), p.getPrecio(), p.getCantidadEnStock());
    }
}
