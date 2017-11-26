package com.coding.challenge.user.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.coding.challenge.shop.model.Shop;
import com.coding.challenge.shop.repository.IShopRepository;
import com.coding.challenge.user.model.User;
import com.coding.challenge.user.repository.IUserRepository;

@Service
public class UserService implements IUserService {
	
	@Autowired
	private IUserRepository repository;
	
	@Autowired
	private IShopRepository shopRepository;

	@Override
	public User create(User user) {
		user.setId(UUID.randomUUID().toString());
		return repository.save(user);
	}

	@Override
	public List<User> findAll() {
		return repository.findAll();
	}

	@Override
	public User findById(String id) {
		return repository.findOne(id);
	}

	@Override
	public User update(User user) {
		return repository.save(user);
	}

	@Override
	public User findByEmail(String email) {
		if(repository.findByEmail(email).size()>0)
			return repository.findByEmail(email).get(0);
		else
			return null;
	}

	public User addPreferredShop(User user,String idShop) {
		 user = repository.findOne(user.getId());
		Shop shop= shopRepository.findOne(idShop);
		ArrayList<Shop> likedShops=user.getPreferedShops();
		likedShops.add(shop);
		user.setPreferedShops(likedShops);
		return this.update(user);	
	}

	public void delete(String id) {
		repository.delete(id);
		
	}

	public User removeLikedShop(User user, String idShop) {
		 user = repository.findOne(user.getId());
			Shop shop= shopRepository.findOne(idShop);
			ArrayList<Shop> likedShops=user.getPreferedShops();
			for(int i=0;i<likedShops.size();i++) {
				if(likedShops.get(i).getId().equals(idShop)) {
					likedShops.remove(i);
				}
			}
			user.setPreferedShops(likedShops);
			return this.update(user);	
	}

	

}
