  package com.app.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.CategoriesRepo;
import com.app.dao.ItemRepo;
import com.app.dao.Userrepo;
import com.app.dao.VehicleRepo;
import com.app.entities.Category;
import com.app.entities.Item;
import com.app.entities.User;
import com.app.entities.Vehicle;
import com.app.service.AdminService;
import com.app.service.ServiceImple;

@CrossOrigin
@RestController
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	private Userrepo us;
	
	@Autowired
	private VehicleRepo vehicleRepo;
	
	@Autowired
	private ServiceImple service;
	
	@Autowired
	private CategoriesRepo categoriesRepo;
	
	@Autowired
	private AdminService adminInterface;

	@Autowired
	private ItemRepo itemRepo;
	
	@Autowired
	private ModelMapper modelMapper;

	@GetMapping("/user")
	public ResponseEntity<?> getAllUserDetails(){
		
		System.out.println("Here in getAllUserDetails");
		return  ResponseEntity.ok(us.findAll());
	}
	
	@GetMapping("/vehicles")
	public ResponseEntity<?> getVehicles(){
		System.out.println("fetching all vehicles (make, model, fuel)");
		return ResponseEntity.ok(vehicleRepo.findAll()); //fetching all vehicles (make, model, fuel)
	}
	
	@PostMapping("/addnewvehicle")
	public ResponseEntity<?> addNewVehicle(@RequestBody Map<String,String> data){
		return ResponseEntity.ok(service.addNewVehicle(data)); //fetching all vehicles (make, model, fuel);
	}
	
	
	@DeleteMapping("/category")
	public ResponseEntity<?> removeCategoryAndItems(@RequestBody Map<String,Integer> data){
		return ResponseEntity.ok(service.removeCategoryAndItems(data.get("categoryId")));
	}
	
	@PostMapping("/addService")
	public ResponseEntity<?> setNewServices(@RequestBody Map<String, Object> requestData) {

		Item item = modelMapper.map(requestData.get("Item"), Item.class);

		Vehicle vehicle = modelMapper.map(requestData.get("Vehicle"), Vehicle.class);
		List<Vehicle> vehicles = new ArrayList<Vehicle>();
		vehicles.add(vehicle);

		System.out.println(item);
		System.out.println(vehicles);
		adminInterface.addNewServices(item, vehicles);
		return ResponseEntity.ok("Service added successfully");

	}

	@PostMapping("/addServiceForAllVehicle")
	public ResponseEntity<?> setNewServicesForAllVehicle(@RequestBody Item item) {

		List<Vehicle> vehicles = new ArrayList<Vehicle>();
		vehicles = vehicleRepo.findAll();

		System.out.println(item);
		System.out.println(vehicles);
		adminInterface.addNewServicesByVehicle(item, vehicles);
		return ResponseEntity.ok("Service added successfully with all vehicles");

	}

	@PostMapping("/addItem")
	public ResponseEntity<?> addItem(@RequestBody Item item) {

		itemRepo.save(item);
		return ResponseEntity.ok("Item added successfully");

	}

	@PutMapping("/editService")
	public ResponseEntity<?> editService(@RequestBody Item item) {

		int updatedService = adminInterface.editService(item);
		return ResponseEntity.ok("Item Service updated successfully and total row affected " + updatedService);
	}

	@PostMapping("/addCategory")
	public ResponseEntity<?> addCategory(@RequestBody Category category) {
		categoriesRepo.save(category);
		return ResponseEntity.ok("Category added successfully");
	}

	@GetMapping("/getVendorList")
	public ResponseEntity<?> getVendorList() {

		return ResponseEntity.ok(us.findAllVendor());
	}

	@DeleteMapping("/deleteService")
	public ResponseEntity<?> deleteService(@RequestBody Item item) {
		int serviceDeleted = adminInterface.deleteService(item);
		return ResponseEntity.ok("Service deleted successfully and Total rows affected " + serviceDeleted);
	}

	@DeleteMapping("/deleteVendor")
	public ResponseEntity<?> deleteVendor(@RequestBody User user) {
		int vendorDeleted = adminInterface.deleteVendor(user);
		return ResponseEntity.ok("Vendor deleted successfully and Total rows affected " + vendorDeleted);
	}
	
	@PostMapping("/addvendor")
	public ResponseEntity<?> setUserDetails(@RequestBody User user){ 
		//Add new User
		
		//adding new user in db
		return ResponseEntity.status(HttpStatus.CREATED).body(service.addVendor(user));
	}

	@DeleteMapping("/deleteVehicleFromService")
	public ResponseEntity<?> deleteVehicleFromService(@RequestBody Map<String, Object> requestData) {
		Item item = modelMapper.map(requestData.get("Item"), Item.class);

		Vehicle vehicle = modelMapper.map(requestData.get("Vehicle"), Vehicle.class);
		List<Vehicle> vehicles = new ArrayList<Vehicle>();
		vehicles.add(vehicle);
		int deletedVehicle=adminInterface.deletedVehicleFromService(item, vehicles);
		return ResponseEntity.ok("Vehicle deleted from service successfully and total rows affected "+deletedVehicle);
	}
	
	@DeleteMapping("/deleteVehicle")
	public ResponseEntity<?> deleteVehicle(@RequestBody Vehicle vehicle){
		int deletedVehicle=adminInterface.deletedVehicle(vehicle);
		return ResponseEntity.ok("Vehicle deleted successfully and total rows affected "+deletedVehicle);
	}
	
	
	@PutMapping("/updateVehicle")
	public ResponseEntity<?> updateVehicle(@RequestBody Vehicle vehicle){
		
		int updateVehicle=adminInterface.updateVehicle(vehicle);
		return ResponseEntity.ok("Vehicle updated successfully and total rows affected "+updateVehicle);
	}
	@PutMapping("/updateCategory")
	public ResponseEntity<?> updateCategory(@RequestBody Category category){
		int updateCategory=adminInterface.updateCategory(category);
		return ResponseEntity.ok("Category updated successfully and total rows affected "+updateCategory);
	}
	
	@GetMapping("/category/items")
	public ResponseEntity<?> getItemsByCategoryId(@RequestParam int categoryId){
		//find items having Category and vehiclId
		return ResponseEntity.ok(service.findByCategory_id(categoryId));
	}
	
	
}
