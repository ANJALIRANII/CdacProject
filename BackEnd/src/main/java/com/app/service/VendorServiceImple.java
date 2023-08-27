package com.app.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.OrderRepo;
import com.app.dao.Userrepo;
import com.app.entities.OrderStatus;
import com.app.entities.Orders;

@Service
@Transactional
public class VendorServiceImple implements VendorService {

	@Autowired
	private Userrepo userrepo;

	@Autowired
	private OrderRepo orderRepo;

	public List<Map<String, Object>> getUserWithVendorList(String pincode) // to show all vehicles service
	{
		return userrepo.findUserByPincodeQ(pincode);
	}

	public List<Map<String, Object>> getUserWithVendorStatus(String pincode) // to show scheduled vehicles service
	{
		return userrepo.findUserByPStatus(pincode);
	}

	public List<Map<String, Object>> getCustomerDetailsByUserId(Integer id) // to show customer order details
	{
		return userrepo.findCustomerDetailsByUserId(id);
	}

	public List<Map<String, Object>> getTotalIncomeFromDate1ToDate2(LocalDate startDate, LocalDate endDate) {
		return userrepo.findTotalIncomeFromDate1ToDate2(startDate, endDate);
	}

	public void updateOrderStatus(Integer orderId) {
		Optional<Orders> order = orderRepo.findById(orderId);
		// OrderStatus status =order.get().getOrderStatus();
		if (order.get().getOrderStatus().toString().equals(OrderStatus.SCHEDULED.toString()))
			order.get().setOrderStatus(OrderStatus.PROCESSING);
		else if (order.get().getOrderStatus().toString().equals(OrderStatus.PROCESSING.toString()))
			order.get().setOrderStatus(OrderStatus.COMPLETED);
		orderRepo.save(order.get());
	}
}
