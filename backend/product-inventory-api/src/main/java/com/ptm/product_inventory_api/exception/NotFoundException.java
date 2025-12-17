package com.ptm.product_inventory_api.exception;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) { super(message); }
}
