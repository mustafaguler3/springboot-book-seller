package com.example.demo.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @Column(name = "price",nullable = false)
    private Double price;
    @Column(name = "create_time")
    private LocalDateTime createTime;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "product")
    private Set<Purchase> purchaseList;
}



























