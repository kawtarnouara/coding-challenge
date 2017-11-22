package com.coding.challenge.controller;

import com.coding.challenge.model.Shop;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.coding.challenge.service.ShopService;
@CrossOrigin
@RestController
public class ShopController {

	@Autowired
	private ShopService shopService;

	@RequestMapping(value = "/shops" , method = RequestMethod.GET)
	public ResponseEntity<List<Shop>> list() {
		return ResponseEntity.ok(shopService.findAll());
	}
	
	@RequestMapping(value = "/shops/{id}", method = RequestMethod.GET)
	public ResponseEntity<Shop> getShop(@PathVariable String id) {
		Shop shop=shopService.findById(id);
		return ResponseEntity.ok(shop);
	}
	
	@RequestMapping(value = "/shops", method = RequestMethod.POST)
	public void createShop(@RequestBody Shop shop) {
		 shopService.create(shop);
	}
	
	@RequestMapping(value = "/shops/{id}", method = RequestMethod.POST)
	public   Shop updatedShop(@RequestBody Shop shop) {		
		return shopService.update(shop);
	}
	
	@RequestMapping(value = "/shops/{id}", method = RequestMethod.DELETE)
	public Shop deleteShop(@PathVariable String id) {
		Shop found=shopService.findById(id);
		if(found!=null)
			shopService.delete(id);
		return found;		
	}
}
