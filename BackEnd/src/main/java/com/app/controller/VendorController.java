package com.app.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.VendorServiceImple;

@CrossOrigin
@RestController
@RequestMapping("/vendor")
public class VendorController {

	@Autowired
	private VendorServiceImple verService;
	
	@GetMapping("/users/{pincode}")
	public ResponseEntity<?> getUserByPincode(@PathVariable String pincode){
		System.out.println(pincode);
	return ResponseEntity.ok(verService.getUserWithVendorList(pincode));
	}
	
	
	@GetMapping("/status/{pincode}")
	public ResponseEntity<?> getUserByStatus(@PathVariable String pincode){
	return ResponseEntity.ok(verService.getUserWithVendorStatus(pincode));
	}
	
	@GetMapping("/customer/{id}")                               
	public ResponseEntity<?> getCustomerDetails(@PathVariable Integer id){
	return ResponseEntity.ok(verService.getCustomerDetailsByUserId(id));
	}
	
	
	@GetMapping("/totalincome")
	public ResponseEntity<?> getTotalIncome(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate){
	return ResponseEntity.ok(verService.getTotalIncomeFromDate1ToDate2(startDate, endDate));
	}

	
	@PutMapping("/order/changestatus")
	public ResponseEntity<String> updateOrderStatus(@RequestParam Integer id) {
	    verService.updateOrderStatus(id);
	    return ResponseEntity.ok().build();
	   // return ResponseEntity.ok("Order status updated successfully");
	    
	}
}
