package com.coding.challenge.user.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.coding.challenge.user.model.User;

public interface IUserRepository  extends  MongoRepository<User, String> {
	   
	List<User> findAll();	 
	User findOne(String id);
	List<User> findByEmail(String email);
}
