package com.ptm.product_inventory_api.repository;

import com.ptm.product_inventory_api.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {}
