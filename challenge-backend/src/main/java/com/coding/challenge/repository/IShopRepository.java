package com.coding.challenge.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.coding.challenge.model.Shop;

public interface IShopRepository extends  MongoRepository<Shop, String> {

	void delete(Shop shop);
	 
    List<Shop> findAll();
 
   Shop findOne(String id);
 
}
