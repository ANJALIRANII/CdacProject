package com.app.service;

import java.util.Map;

import com.app.dto.UserDto;
import com.app.entities.Cart;
import com.app.entities.User;

public interface ServiceInterface {
	
	UserDto findById(int userid);
	
	Cart findByUserId(int userId);
	
	int addItemToCart(int itemId, int userId);

	Object makeOrderByUserId(int userId, int addressId, int vehicleId);
	
	Object findByCategory_idAndVehicle_id(int categoryId, int vehicleId);

	Object addNewVehicle(Map<String, String> data);

	Object addVehicleByUserId(Map<String, Integer> data);
	
	Object removeItemFromCart(Map<String, Integer> requestData);
	
	Object EmptyCartByUserId(int userId);
	
	Object removeCategoryAndItems(Integer categoryId);

	User addUser(User user);
	
	UserDto findByEmail(String email);

	User findByUserEmail(String email);
}
