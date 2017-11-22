package com.coding.challenge.service;

import java.util.List;

import com.coding.challenge.model.Shop;

public interface IShopService {

	void create(Shop shop);
	 
	void delete(String id);
 
    List<Shop> findAll();
 
    Shop findById(String id);
 
    Shop update(Shop shop);
}
