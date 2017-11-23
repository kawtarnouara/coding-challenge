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
	public void createUser(@RequestBody User user) {
		userService.create(user);
	}
	
	@RequestMapping(value = "/users/{id}", method = RequestMethod.POST)
	public   User updatedShop(@RequestBody User user) {		
		return userService.update(user);
	}
	
	@RequestMapping(value = "/users/email", method = RequestMethod.GET)
	public ResponseEntity<User> getUserByEmail (@RequestParam String email) {
		return ResponseEntity.ok(userService.findByEmail(email));
	}
	
	@RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable String id) {
			userService.delete(id);		
	}
	
	@RequestMapping(value = "/users/preferredShops", method = RequestMethod.GET)
	public void addPreferredShop (@RequestParam String email,@RequestParam String idShop) {
		userService.addPreferredShop(email,idShop);
	}
}
