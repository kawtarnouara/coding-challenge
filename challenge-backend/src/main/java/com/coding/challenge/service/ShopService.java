package com.coding.challenge.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coding.challenge.model.Shop;
import com.coding.challenge.repository.IShopRepository;

@Service
public class ShopService implements IShopService{
	
	@Autowired
	private IShopRepository repository;
	
	@Override
	public void create(Shop shop) {
         repository.save(shop);
	}

	@Override
	public void delete(String id) {
		 repository.delete(id);
	}

	@Override
	public List<Shop> findAll() {
		return repository.findAll();
	}

	@Override
	public Shop findById(String id) {
		return repository.findOne(id);
	}

	@Override
	public Shop update(Shop shop) {
		return repository.save(shop);
	}

}
