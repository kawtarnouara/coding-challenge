package com.coding.challenge.shop.service;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.coding.challenge.shop.model.Shop;
import com.coding.challenge.shop.repository.IShopRepository;
import com.coding.challenge.user.repository.IUserRepository;

@Service
public class ShopService implements IShopService{
	
	@Autowired
	private IShopRepository repository;
	@Autowired
	private IUserRepository userRepository;
	
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
	
	
	public List<Shop> sortShops(double latitude, double longitude, String idUser){
		List<Shop> shops=this.findAll();
		ArrayList<Shop> likedShops = userRepository.findOne(idUser).getPreferedShops();
		shops=this.sort(shops,latitude,longitude);		
		for(int j=0;j<likedShops.size();j++) {
		Iterator<Shop> iter = shops.iterator();
		while (iter.hasNext()) {
		  Shop shop = iter.next();
		  if (shop.getId().equals(likedShops.get(j).getId())) 
			  iter.remove();
			}
		}
		return shops;
	}
	
	public List<Shop> sortLikedShops(double latitude, double longitude, String idUser){
		List<Shop> likedShops=userRepository.findOne(idUser).getPreferedShops();
		likedShops=this.sort(likedShops,latitude,longitude);		
		return likedShops;
	}
	
	private List<Shop> sort(List<Shop> shops, double latitude, double longitude) {
		double distance;
		double shopLatitude;
		double shopLongitude;
		
		for(int i=0;i<shops.size();i++) {
			shopLongitude=shops.get(i).getLocation().getCoordinates()[0];			
			shopLatitude=shops.get(i).getLocation().getCoordinates()[1];
			distance=this.distance(latitude, longitude, shopLatitude, shopLongitude);
			shops.get(i).setDistance( distance*0.001);
			this.update(shops.get(i));
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
