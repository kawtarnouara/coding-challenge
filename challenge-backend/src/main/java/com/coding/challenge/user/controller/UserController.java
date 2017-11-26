package com.coding.challenge.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.coding.challenge.shop.model.DislikedShop;
import com.coding.challenge.shop.model.Shop;
import com.coding.challenge.user.model.User;
import com.coding.challenge.user.service.UserService;

@CrossOrigin
@RestController
public class UserController {
	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/users" , method = RequestMethod.GET)
	public ResponseEntity<List<User>> list() {
		return ResponseEntity.ok(userService.findAll());
	}
	
	@RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
	public ResponseEntity<User> getUser(@PathVariable String id) {
		User user=userService.findById(id);
		return ResponseEntity.ok(user);
	}
	
	@RequestMapping(value = "/users", method = RequestMethod.POST)
	public User createUser(@RequestBody User user) {
		System.out.println("here");
		return userService.create(user);
	}
	
	@RequestMapping(value = "/users/liked/{idShop}", method = RequestMethod.PUT)
	public   User addLikedShop(@RequestBody User user,@PathVariable String idShop) {	
		return userService.addPreferredShop(user,idShop);
	}
	
	@RequestMapping(value = "/users/removeLiked/{idShop}", method = RequestMethod.PUT)
	public   User removeLikedShop(@RequestBody User user,@PathVariable String idShop) {	
		return userService.removeLikedShop(user,idShop);
	}
	
	@RequestMapping(value = "/users/email", method = RequestMethod.GET)
	public ResponseEntity<User> getUserByEmail (@RequestParam String email) {
		return ResponseEntity.ok(userService.findByEmail(email));
	}
	
	@RequestMapping(value = "/users/check", method = RequestMethod.GET)
	public boolean checkUserByEmail (@RequestParam String email) {
		if (userService.findByEmail(email)!=null)
			return false;
		else 
			return true;
	}
	
	@RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable String id) {
			userService.delete(id);		
	}
	
	@RequestMapping(value = "/users/disliked/{idShop}", method = RequestMethod.PUT)
	public   User addDisLikedShop(@RequestBody User user,@PathVariable String idShop, @RequestParam String deadline) {	
		return userService.addDislikedShop(user,idShop,deadline);
	}
	
	@RequestMapping(value = "/users/disliked/{idUser}" , method = RequestMethod.GET)
	public ResponseEntity<List<DislikedShop>> dislikedShops(@PathVariable String idUser) {
		return ResponseEntity.ok(userService.getDislikedShops(idUser));
	}
	
	
}
