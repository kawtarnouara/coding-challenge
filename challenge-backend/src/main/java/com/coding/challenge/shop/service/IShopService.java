package com.coding.challenge.shop.service;

import java.util.List;

import com.coding.challenge.shop.model.Shop;

public interface IShopService {
 
    List<Shop> findAll();
 
    Shop findById(String id);
 
    Shop update(Shop shop);
}
