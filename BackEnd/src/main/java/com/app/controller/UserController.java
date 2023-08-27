package com.app.controller;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.razorpay.*;

import com.app.dao.Addressrepo;
import com.app.dao.CartRepo;
import com.app.dao.VehicleRepo;
import com.app.entities.Address;
import com.app.entities.User;
import com.app.service.ServiceImple;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private ServiceImple service;
	
	@Autowired
	private Addressrepo addressrepo;
	
	@Autowired
	private VehicleRepo vehicleRepo;
	
	
	@Autowired
	private CartRepo cartRepo;
	
	@Value("${razorId}")
	private String razorId;
	
	@Value("${razorPass}")
	private String razorPass;
	
	
	
//	@GetMapping("/user/{userid}")
//	public ResponseEntity<?> getUserDetails(@PathVariable int userid){ 
//		//fetching user details by userId
//		System.out.println("Here in getUserDetails");
//		return  ResponseEntity.ok(userRepo.findById(userid));
//	}
	
	@PostMapping("/fetchuser")
	public ResponseEntity<?> getUserDetails(@RequestBody User user){ 
		//fetching user details by userId through UserDto
		System.out.println("Here in getUserDetails");
		return  ResponseEntity.ok(service.findById(user.getId()));
	}
	
	
	@PostMapping("/adduseraddress")
	public ResponseEntity<?> setUserAddDetails(@RequestBody Address address){ 
		//adding address to the user
		return ResponseEntity.status(HttpStatus.CREATED).body(addressrepo.save(address));
	}
	
	
	@PostMapping("/address")
	public ResponseEntity<?> getAddressByUserId(@RequestBody User user){ 
		int userId= user.getId();
		//getting address by userId
		return ResponseEntity.ok(addressrepo.findByUserId(userId));
	}
	
	
	
	
//	
//	adding through service layer
//	
//	@GetMapping("/categories/items")
//	public ResponseEntity<?> getItemsByCatIdAndvehicleId(@RequestParam int categoryId, @RequestParam int vehicleId){
//		//find items having Category and vehiclId
//		return ResponseEntity.ok(itemRepo.findByCategory_idAndVehicle_id(categoryId, vehicleId));
//	}
	
	
	
	
	
//	@GetMapping("/vehicles/{makeid}")
//	public ResponseEntity<?> getVehicleByMakeId(@PathVariable int makeid){
//		System.out.println("fetching all vehicles (make, model, fuel)");
//		return ResponseEntity.ok(vehicleRepo.findByMake_id(makeid)); //fetching all vehicles (make, model, fuel)
//	}
	
	@GetMapping("/vehicle/{vehicleid}")
	public ResponseEntity<?> getVehicleByVehicleId(@PathVariable int vehicleid){
		System.out.println("fetching all vehicles (make, model, fuel)");
		return ResponseEntity.ok(vehicleRepo.findById(vehicleid)); //fetching all vehicles (make, model, fuel) by vehicle Id
	}
	@GetMapping("/vehicles/{userId}")
	public ResponseEntity<?> getVehiclesByUserId(@PathVariable int userId){
		System.out.println("fetching all vehicles (make, model, fuel)");
		return ResponseEntity.ok(vehicleRepo.findByUserId(userId)); //fetching all vehicles (make, model, fuel) by user Id
	}
	
	
	
	@GetMapping("/make")
	public ResponseEntity<?> getAllMake(){
		//Fetching Distinct makes from vehiles
		return ResponseEntity.ok(vehicleRepo.findMake()); 
	}
	
	@GetMapping("/model")
	public ResponseEntity<?> getAllModelsByMakeId(@RequestParam String makeName){
		System.out.println(makeName);
		//Fetching Distinct Models from vehiles by makeName
		return ResponseEntity.ok(vehicleRepo.findModelByMake(makeName)); 
	}
	
	@GetMapping("/fuel")
	public ResponseEntity<?> getFuelByModelId(@RequestParam String modelName){
		System.out.println("Searching for modelID: "+ modelName);
		//Fetching Distinct fuels avilable for Models
		return ResponseEntity.ok(vehicleRepo.findFuelByModel(modelName));
	}
	
	@PostMapping("/addvehicle")
	public ResponseEntity<?> addVehicleByUserId(@RequestBody Map<String,Integer> data){
		return ResponseEntity.ok(service.addVehicleByUserId(data)); //fetching all vehicles (make, model, fuel);
	}
	
	@PostMapping("/cart")  // get Cart by UserId
	public ResponseEntity<?> getCartByUserId(@RequestBody User user){
		return ResponseEntity.ok(cartRepo.findCartByUserId(user.getId()));
	}
	
	
	
	@PostMapping("/addtocart")//@RequestParam int itemId, @RequestParam int userId
	public ResponseEntity<?> addItemToCart(@RequestBody Map<String,Integer> requestData){
		System.out.println("Adding item to cart");
		int itemId=requestData.get("itemId");
		int userId=requestData.get("userId");
		return ResponseEntity.status(HttpStatus.OK).body(service.addItemToCart(itemId,userId));
	}
	
	@PostMapping("/removefromcart")
	public ResponseEntity<?> removeItemFromCart(@RequestBody Map<String,Integer> requestData){
		System.out.println(requestData);
		return ResponseEntity.ok(service.removeItemFromCart(requestData));
		
	}
	@DeleteMapping("/cart/empty")
	public ResponseEntity<?> EmptyCartByUserId(@RequestBody  Map<String,Integer> requestData){
		return ResponseEntity.ok(service.EmptyCartByUserId(requestData.get("userId")));
		
	}
	
	@GetMapping("/order")
	public ResponseEntity<?> addOrderAndEmptyCart(@RequestParam int userId, @RequestParam int addressId, @RequestParam int vehicleId){
		return ResponseEntity.status(HttpStatus.CREATED).body(service.makeOrderByUserId(userId,addressId,vehicleId));
	}
	
	@PostMapping("/razorpay")
	public ResponseEntity<?> createRazorOrder(@RequestBody Map<String,Integer> data) throws RazorpayException{
		int amount= data.get("amount");
		
		RazorpayClient razorpay=new RazorpayClient(razorId, razorPass);
		JSONObject orderRequest = new JSONObject();
		  orderRequest.put("amount", amount*100); // amount in the smallest currency unit i.e. paise
		  orderRequest.put("currency", "INR");
		  orderRequest.put("receipt", "order_rcptid_11");

		  Object order = razorpay.Orders.create(orderRequest);
		  System.out.println(order);
		return ResponseEntity.ok(order.toString());
	}
	
	@PutMapping("/updateUser")
	public ResponseEntity<?> updateUserDetails(@RequestBody User user){ 
		int userUpdate=service.updateUser(user);
		return ResponseEntity.status(HttpStatus.CREATED).body("User updated successfully and total row affected = "+userUpdate);
}

	@PostMapping("/matchPassword")
	public ResponseEntity<?> matchOldPasswordFromDB(@RequestBody User user){
		String status=service.matchPass(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(status);
	}
	
	@PutMapping("/updatePassword")
	public ResponseEntity<?> updatePassword(@RequestBody User user){
		int passwordUpdate=service.updatePassword(user);
		return ResponseEntity.status(HttpStatus.CREATED).body("Password updated successfully and total row affected = "+passwordUpdate);
	}
	
}
