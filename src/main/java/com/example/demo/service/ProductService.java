package com.example.demo.service;

import com.example.demo.model.Product;

import java.util.List;

public interface ProductService {
    Product saveProduct(Product product);
    void deleteProduct(Long id);
    List<Product> findAllProducts();
}
