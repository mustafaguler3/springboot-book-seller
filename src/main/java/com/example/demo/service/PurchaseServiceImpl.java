package com.example.demo.service;

import com.example.demo.model.Purchase;
import com.example.demo.repository.PurchaseRepository;
import com.example.demo.repository.projection.PurchaseItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PurchaseServiceImpl implements PurchaseService{

    @Autowired
    private PurchaseRepository purchaseRepository;

    public Purchase savePurchase(Purchase purchase){
        purchase.setPurchaseTime(LocalDateTime.now());
        return purchaseRepository.save(purchase);
    }

    public List<PurchaseItem> findPurchaseItemsOfUser(Long userId){
        return purchaseRepository.findAllPurchaseOfUser(userId);
    }
}
































