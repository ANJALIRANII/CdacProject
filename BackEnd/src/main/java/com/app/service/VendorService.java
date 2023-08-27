package com.app.service;

import java.time.LocalDate;


public interface VendorService {

	Object getUserWithVendorList(String pincode);

	Object getUserWithVendorStatus(String pincode);

	Object getCustomerDetailsByUserId(Integer id);

	Object getTotalIncomeFromDate1ToDate2(LocalDate startDate, LocalDate endDate);

	void updateOrderStatus(Integer id);

}
