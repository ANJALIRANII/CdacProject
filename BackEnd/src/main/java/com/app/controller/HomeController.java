package com.app.controller;

import java.security.Principal;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.CategoriesRepo;
import com.app.dao.Userrepo;
import com.app.dao.VehicleRepo;
import com.app.entities.User;
import com.app.service.EmailService;
import com.app.service.ServiceImple;
import com.app.service.ServiceInterface;

@CrossOrigin
@RestController
@RequestMapping("/home")
public class HomeController {
	
	@Autowired
	private VehicleRepo vehicleRepo;
	
	@Autowired
	private CategoriesRepo categoriesRepo;
	
	@Autowired
	private Userrepo userRepo;
	
	
	@Autowired
	private ServiceImple service;
	@Autowired
	private EmailService emailService;
	
	Random random=new Random(1000);
	
	@GetMapping("/")
	public String home() {
		return "Home";
	}
	
	@PostMapping("/adduser")
	public ResponseEntity<?> setUserDetails(@RequestBody User user){ 
		//Add new User
		
		//adding new user in db
		return ResponseEntity.status(HttpStatus.CREATED).body(service.addUser(user));
	}

	@GetMapping("/user")
	public String user(Principal principal) {
		return "User " + principal.getName();
	}

	@GetMapping("/admin")
	public String admin(Principal principal) {
		return "Admin " + principal.getName();
	}
	
	@GetMapping("/vendor")
	public String vendor(Principal principal) {
		return "Vendor " + principal.getName();
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
	
	@GetMapping("/vehicleId")
	public ResponseEntity<?> getVehicleId(@RequestParam String make, @RequestParam String model,
			@RequestParam String fuel) {
		System.out.println("Getting vehicleId ");
		System.out.println(make + " " + model + " " + fuel);
		return ResponseEntity.ok(vehicleRepo.findVehicleIdByMadeModelFuel(make, model, fuel));
	}
	
	@GetMapping("/allVehicle")
	public ResponseEntity<?> getAllVehicle(){
		return ResponseEntity.ok(vehicleRepo.findAll());
	}
	
	@GetMapping("/categories/items")
	public ResponseEntity<?> getItemsByCatIdAndvehicleId(@RequestParam int categoryId, @RequestParam int vehicleId){
		//find items having Category and vehiclId
		return ResponseEntity.ok(service.findByCategory_idAndVehicle_id(categoryId, vehicleId));
	}
	@GetMapping("/categories")
	public ResponseEntity<?> getAllCategories(){
		// getting all Categories
		return ResponseEntity.ok(categoriesRepo.findAll());
	}
	
	
	@PostMapping("/forgetPassword")
	public ResponseEntity<?> forgetPassword(@RequestBody Map<String, String> data){
		String email=data.get("email");	
		
		String otp= Integer.toString(random.nextInt(999999)) ;
		
		User user=service.findByUserEmail(email);
		if(user==null) {
			return ResponseEntity.ok(false);
		}
		
		user.setPassword(otp);
		System.out.println(otp);
		
		String subject="OTP from peakAutomotives";
		String message="For forgot password use OTP  '"+otp+"'.  Please do not share with anyone. Regards peakAutomotives";
		String to=data.get("email");
		boolean flag=emailService.sendEmail(subject, message, to);
		System.out.println(flag);
		
		userRepo.save(user);
		return ResponseEntity.ok(flag);
	}
	
	@PostMapping("/verifyOtp")
	public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String>data){
		String email=data.get("email");
		String otp= data.get("otp");
		
		boolean flag= service.getUserByEmailAndOTP(email,otp);
		
		return ResponseEntity.ok(flag);
	}
	
	@PutMapping("/changePassword")
	public ResponseEntity<?> updatePassword(@RequestBody Map<String, String> data){
		String email= data.get("email");
		String password= data.get("password");
		
		int passwordUpdate=service.updatePasswordByEmail(email,password);
		if(passwordUpdate>=1)
		return ResponseEntity.status(HttpStatus.CREATED).body(true);
		else
			return ResponseEntity.ok(false);
	}
}
