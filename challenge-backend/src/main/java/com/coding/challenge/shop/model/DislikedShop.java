package com.coding.challenge.shop.model;

// used to keep the deadline for a shop
public class DislikedShop {
	private Shop shop;
	private String deadline;
	
	
	public DislikedShop() {
		super();
	}
	public DislikedShop(Shop shop, String deadline) {
		super();
		this.shop = shop;
		this.deadline = deadline;
	}
	public Shop getShop() {
		return shop;
	}
	public void setShop(Shop shop) {
		this.shop = shop;
	}
	public String getDeadline() {
		return deadline;
	}
	public void setDeadline(String deadline) {
		this.deadline = deadline;
	}
	@Override
	public String toString() {
		return "DislikedShop [shop=" + shop + ", deadline=" + deadline + "]";
	}
	
	
}
