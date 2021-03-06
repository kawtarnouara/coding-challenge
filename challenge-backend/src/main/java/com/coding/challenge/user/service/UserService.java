package com.coding.challenge.user.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coding.challenge.shop.model.DislikedShop;
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

	// create a user with a random id
	@Override
	public User create(User user) {
		user.setId(UUID.randomUUID().toString());
		return repository.save(user);
	}
	
	// get all users
	@Override
	public List<User> findAll() {
		return repository.findAll();
	}

	// find a user by id
	@Override
	public User findById(String id) {
		return repository.findOne(id);
	}
	
	// update a user
	@Override
	public User update(User user) {
		return repository.save(user);
	}

	// find a user by email
	@Override
	public User findByEmail(String email) {
		if (repository.findByEmail(email).size() > 0)
			return repository.findByEmail(email).get(0);
		else
			return null;
	}
	
	// add a liked shop to a user
	public User addPreferredShop(User user, String idShop) {
		user = repository.findOne(user.getId());
		Shop shop = shopRepository.findOne(idShop);
		ArrayList<Shop> likedShops = user.getPreferedShops();
		likedShops.add(shop);
		user.setPreferedShops(likedShops);
		return this.update(user);
	}

	public void delete(String id) {
		repository.delete(id);

	}
	
	// remove a liked shop
	public User removeLikedShop(User user, String idShop) {
		user = repository.findOne(user.getId());
		Shop shop = shopRepository.findOne(idShop);
		ArrayList<Shop> likedShops = user.getPreferedShops();
		for (int i = 0; i < likedShops.size(); i++) {
			if (likedShops.get(i).getId().equals(idShop)) {
				likedShops.remove(i);
			}
		}
		user.setPreferedShops(likedShops);
		return this.update(user);
	}
	// add disliked shop
	public User addDislikedShop(User user, String idShop, String deadline) {
		user = repository.findOne(user.getId());
		Shop shop = shopRepository.findOne(idShop);
		ArrayList<DislikedShop> dislikedShops = user.getDislikedShops();
		DislikedShop dislikedShop = new DislikedShop(shop, deadline);
		dislikedShops.add(dislikedShop);
		user.setDislikedShops(dislikedShops);
		return this.update(user);
	}
	
	// list of disliked shops
	public List<DislikedShop> getDislikedShops(String idUser) {
		User user = repository.findOne(idUser);
		ArrayList<DislikedShop> dislikedShops = user.getDislikedShops();
		ArrayList<Shop> shops = new ArrayList<Shop>();
		DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm.ss'Z'");
		Date date = new Date();
		// eliminate shops with a deadline that is already passed
		for (int i = 0; i < dislikedShops.size(); i++) {
			String deadline = dislikedShops.get(i).getDeadline();
			if (sdf.format(date).compareTo(deadline) > 0) {
				dislikedShops.remove(i);
			}
		}
		user.setDislikedShops(dislikedShops);
		this.update(user);
		return dislikedShops;
	}
	
	// verify the email and password of a user
	public boolean authenticate(User user) {
		User realUser = this.findByEmail(user.getEmail());
		if (realUser != null) {
			if ((realUser.getPassword().equals(user.getPassword())) && (realUser.getEmail().equals(user.getEmail()))) {
				this.update(realUser);
				return true;
			}
		}
		return false;
	}

}
