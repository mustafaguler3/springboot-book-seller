package com.example.demo.service;

import com.example.demo.model.Purchase;
import com.example.demo.repository.projection.PurchaseItem;

import java.util.List;

public interface PurchaseService {

    Purchase savePurchase(Purchase purchase);

    List<PurchaseItem> findPurchaseItemsOfUser(Long userId);
}
