package com.coding.challenge.shop.controller;

import com.coding.challenge.shop.model.Shop;
import com.coding.challenge.shop.service.ShopService;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class ShopController {

	@Autowired
	private ShopService shopService;

	// get a shop by id
	@RequestMapping(value = "/shops/{id}", method = RequestMethod.GET)
	public ResponseEntity<Shop> getShop(@PathVariable String id) {
		Shop shop = shopService.findById(id);
		return ResponseEntity.ok(shop);
	}
	
	// get the shops sorted by distance
	@RequestMapping(value = "/shops/location/{idUser}", method = RequestMethod.GET)
	public ResponseEntity<List<Shop>> sortShops(@RequestParam String latitude, @RequestParam String longitude,
			@PathVariable String idUser) {
		return ResponseEntity
				.ok(shopService.sortShops(Double.parseDouble(latitude), Double.parseDouble(longitude), idUser));
	}
	
	// get a user's shops sorted by distance
	@RequestMapping(value = "/shops/location/liked/{idUser}", method = RequestMethod.GET)
	public ResponseEntity<List<Shop>> sortLikedShops(@RequestParam String latitude, @RequestParam String longitude,
			@PathVariable String idUser) {
		return ResponseEntity
				.ok(shopService.sortLikedShops(Double.parseDouble(latitude), Double.parseDouble(longitude), idUser));
	}

}
