package com.coding.challenge.model;

import java.util.Arrays;

public class Location {
	private String type;
	private String[] coordinates = new String[2];
	
	
	public Location(String type, String[] coordinates) {
		super();
		this.type = type;
		this.coordinates = coordinates;
	}


	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}


	public String[] getCoordinates() {
		return coordinates;
	}


	public void setCoordinates(String[] coordinates) {
		this.coordinates = coordinates;
	}


	@Override
	public String toString() {
		return "Location [type=" + type + ", coordinates=" + Arrays.toString(coordinates) + "]";
	}
	
	
}
