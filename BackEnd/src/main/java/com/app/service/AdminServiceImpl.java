package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.CategoriesRepo;
import com.app.dao.ItemRepo;
import com.app.dao.Userrepo;
import com.app.dao.VehicleRepo;
import com.app.entities.Category;
import com.app.entities.Item;
import com.app.entities.User;
import com.app.entities.Vehicle;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private Userrepo userrepo;
	
	@Autowired
	private ItemRepo itemRepo;
	
	@Autowired
	private VehicleRepo vehicleRepo;
	
	@Autowired
	private CategoriesRepo categoriesRepo;


	@Override
	public void addNewServices(Item item, List<Vehicle> vehicle) {
		Item items = new Item();
		items.setItemName(item.getItemName());
		items.setPrice(item.getPrice());
		items.setItemCategory(item.getItemCategory());
		items.setDetail(item.getDetail());
		items.setVehicles(vehicle);

		itemRepo.save(items);
	}

	@Override
	public int editService(Item item) {
		String itemName = item.getItemName();
		Category itemCategory = item.getItemCategory();
		String detail = item.getDetail();
		double price = item.getPrice();
		int itemId = item.getId();
		System.out.println(itemId);

		int updatedServices = itemRepo.editServices(itemName, itemCategory, detail, price, itemId);
		return updatedServices;
	}

	@Override
	public int deleteService(Item item) {

		int itemId = item.getId();

		int deleteServices = itemRepo.deleteServiceById(itemId);
		return deleteServices;
	}

	@Override
	public int deleteVendor(User user) {
		int userId = user.getId();

		int deleteVendors = userrepo.deleteVendorById(userId);
		return deleteVendors;
	}

	@Override
	public void addNewServicesByVehicle(Item item, List<Vehicle> vehicles) {
		Item items = new Item();
		items.setItemName(item.getItemName());
		items.setPrice(item.getPrice());
		items.setItemCategory(item.getItemCategory());
		items.setDetail(item.getDetail());
		items.setVehicles(vehicles);

		itemRepo.save(items);
		
	}

	@Override
	public int deletedVehicleFromService(Item item, List<Vehicle> vehicles) {
		int itemId=item.getId();
		int deletedServices=0;
		for (Vehicle vehicle : vehicles) {
			int vehicleId=vehicle.getId();
			deletedServices=itemRepo.deleteVehiclesFromService(itemId,vehicleId);
		}
		
		return deletedServices;
	}

	@Override
	public int deletedVehicle(Vehicle vehicle) {
		int vehicleId=vehicle.getId();
		System.out.println(vehicleId);
		int deleteVehicle=vehicleRepo.deleteVehicle(vehicleId);
		int deleteVehicleDetailFromUser_Vehicle=vehicleRepo.deleteVehicleFromUser_Vehicle(vehicleId);
		int deleteVehicleDetailFromItem_Vehicle=vehicleRepo.deleteVehicleFromItem_Vehicle(vehicleId);
		
		int totalDeletedRow=deleteVehicle+deleteVehicleDetailFromUser_Vehicle+deleteVehicleDetailFromItem_Vehicle;
		return totalDeletedRow;
	}

	@Override
	public int updateVehicle(Vehicle vehicle) {
		int vehicleId=vehicle.getId();
		String vehicleMake=vehicle.getMake();
		String vehicleModel=vehicle.getModel();
		String vehicleFuel=vehicle.getFuel();
		int updatedVehicle=vehicleRepo.updateVehicleById(vehicleMake,vehicleModel,vehicleFuel,vehicleId);
		return updatedVehicle;
	}

	@Override
	public int updateCategory(Category category) {
		String categoryName=category.getCategoryName();
		String description=category.getDescription();
		int categoryId=category.getId();
		
		int updatedCategory=categoriesRepo.updateCategoryById(categoryName,description,categoryId);
		return updatedCategory;
	}
	
}
