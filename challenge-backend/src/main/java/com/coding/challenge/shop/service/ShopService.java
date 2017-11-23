package com.coding.challenge.shop.service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coding.challenge.shop.model.Shop;
import com.coding.challenge.shop.repository.IShopRepository;

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
	
	
	public List<Shop> sortShops(double latitude, double longitude){
		List<Shop> shops=this.findAll();
		double distance;
		double shopLatitude;
		double shopLongitude;
		for(int i=0;i<shops.size();i++) {
			shopLongitude=shops.get(i).getLocation().getCoordinates()[0];			
			shopLatitude=shops.get(i).getLocation().getCoordinates()[1];
			distance=this.distance(latitude, longitude, shopLatitude, shopLongitude);
			shops.get(i).setDistance(distance);
		}
		Collections.sort(shops, new Comparator<Shop>() {
			 public int compare(Shop shop1, Shop shop2) {
				 return Double.compare(shop1.getDistance(), shop2.getDistance());	
				 }
	        });
		return shops;
	}
	
	public double distance(double lat1, double lng1, double lat2, double lng2) {
	    double earthRadius = 6371000; 
	    double dLat = Math.toRadians(lat2-lat1);
	    double dLng = Math.toRadians(lng2-lng1);
	    double a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	               Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
	               Math.sin(dLng/2) * Math.sin(dLng/2);
	    double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	    double dist = (double) (earthRadius * c);

	    return dist;
	    }

}
