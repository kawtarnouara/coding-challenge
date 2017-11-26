package com.coding.challenge.user.model;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.coding.challenge.shop.model.DislikedShop;
import com.coding.challenge.shop.model.Shop;

@Document(collection="users")
public class User  {
	@Id
	private String id;
	
	@Indexed(unique = true)
	private String email;
	private String password;
	private ArrayList<Shop> preferedShops;
	private ArrayList<DislikedShop> dislikedShops;
	
	
	public User( String email, String password) {
		super();
		this.email = email;
		this.password = password;
		this.preferedShops= new ArrayList<Shop>();
		this.dislikedShops= new ArrayList<DislikedShop>();
	}


	public User() {
		super();
		this.preferedShops= new ArrayList<Shop>(); 
		this.dislikedShops= new ArrayList<DislikedShop>();
	}


	public User(String id, String email, String password) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
		this.preferedShops= new ArrayList<Shop>();
		this.dislikedShops= new ArrayList<DislikedShop>();
	}


	public User(String id, String email, String password, ArrayList<Shop> prefered) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
		this.preferedShops = prefered;
		this.dislikedShops= new ArrayList<DislikedShop>();
		
	}


	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public ArrayList<Shop> getPreferedShops() {
		return preferedShops;
	}


	public void setPreferedShops(ArrayList<Shop> preferedShops) {
		this.preferedShops = preferedShops;
	}



	public ArrayList<DislikedShop> getDislikedShops() {
		return dislikedShops;
	}


	public void setDislikedShops(ArrayList<DislikedShop> dislikedShops) {
		this.dislikedShops = dislikedShops;
	}


	public User(String id, String email, String password, ArrayList<Shop> preferedShops,
			ArrayList<DislikedShop> dislikedShops) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
		this.preferedShops = preferedShops;
		this.dislikedShops = dislikedShops;
	}


	@Override
	public String toString() {
		return "User [id=" + id + ", email=" + email + ", password=" + password + ", prefered=" + preferedShops
				+  "]";
	}
	
	
}
