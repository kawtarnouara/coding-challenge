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
import com.coding.challenge.user.model.User;
import com.coding.challenge.user.service.UserService;

@CrossOrigin
@RestController
public class UserController {
	@Autowired
	private UserService userService;

	// get a user by his id
	@RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
	public ResponseEntity<User> getUser(@PathVariable String id) {
		User user = userService.findById(id);
		if (user != null)
			user.setPassword(null);
		return ResponseEntity.ok(user);
	}

	// create a user
	@RequestMapping(value = "/users", method = RequestMethod.POST)
	public User createUser(@RequestBody User user) {
		userService.create(user);
		user.setPassword(null);
		return user;
	}

	// add a liked shop to a user
	@RequestMapping(value = "/users/liked/{idShop}", method = RequestMethod.PUT)
	public boolean addLikedShop(@RequestBody User user, @PathVariable String idShop) {
		userService.addPreferredShop(user, idShop);
		return true;
	}

	// remove a liked shop
	@RequestMapping(value = "/users/removeLiked/{idShop}", method = RequestMethod.PUT)
	public boolean removeLikedShop(@RequestBody User user, @PathVariable String idShop) {
		userService.removeLikedShop(user, idShop);
		return true;
	}

	// get a user by email
	@RequestMapping(value = "/users/email", method = RequestMethod.GET)
	public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
		User user = userService.findByEmail(email);
		if (user != null)
			user.setPassword(null);
		return ResponseEntity.ok(user);
	}

	// verify if the password and email are correct
	@RequestMapping(value = "/users/authenticate", method = RequestMethod.POST)
	public ResponseEntity<Boolean> authenticate(@RequestBody User user) {
		return ResponseEntity.ok(userService.authenticate(user));
	}

	// check if the email already exists
	@RequestMapping(value = "/users/check", method = RequestMethod.GET)
	public boolean checkUserByEmail(@RequestParam String email) {
		if (userService.findByEmail(email) != null)
			return false;
		else
			return true;
	}

	@RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable String id) {
		userService.delete(id);
	}

	// add disliked shop
	@RequestMapping(value = "/users/disliked/{idShop}", method = RequestMethod.PUT)
	public boolean addDisLikedShop(@RequestBody User user, @PathVariable String idShop, @RequestParam String deadline) {
		userService.addDislikedShop(user, idShop, deadline);
		return true;
	}

	// get the disliked shops
	@RequestMapping(value = "/users/disliked/{idUser}", method = RequestMethod.GET)
	public ResponseEntity<List<DislikedShop>> dislikedShops(@PathVariable String idUser) {
		return ResponseEntity.ok(userService.getDislikedShops(idUser));
	}

}
