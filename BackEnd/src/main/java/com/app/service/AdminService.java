package com.app.service;

import java.util.List;

import com.app.entities.Category;
import com.app.entities.Item;
import com.app.entities.User;
import com.app.entities.Vehicle;

public interface AdminService {

	void addNewServices(Item item,List<Vehicle> vehicle);

	int editService(Item item);

	int deleteService(Item item);

	int deleteVendor(User user);

	void addNewServicesByVehicle(Item item, List<Vehicle> vehicles);

	int deletedVehicleFromService(Item item, List<Vehicle> vehicles);

	int deletedVehicle(Vehicle vehicle);

	int updateVehicle(Vehicle vehicle);

	int updateCategory(Category category);
}
