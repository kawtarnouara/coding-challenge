package com.coding.challenge.user.service;

import java.util.List;

import com.coding.challenge.user.model.User;

public interface IUserService {

	User create(User user);
 
    List<User> findAll();
 
    User findById(String id);
    
    User findByEmail(String email);
    
    User update(User user);
}
