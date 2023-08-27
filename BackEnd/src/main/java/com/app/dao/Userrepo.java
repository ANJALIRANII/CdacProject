package com.app.dao;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.User;

public interface Userrepo extends JpaRepository<User, Integer>{

	List<User> findAll();
	
	User findById(int id);

	@SuppressWarnings("unchecked")
	User save(User user);

	@Query("select u from User u where u.id=?1")
	User findByUserId(int userId);
	

//	@Query(value = "select u.first_name, u.last_name,u.email, u.mobile_no,o.delivery_date, o.order_date, o.order_status,a.flat_no,a.locality, a.city,v.make,v.model,v.fuel from users u join orders o join address a on a.id=o.address_id join vehicle v on v.id=o.vehicle_id WHERE a.pincode = ?1", nativeQuery = true)
//	List<Map<String, Object>> findUserByPincodeQ(String pincode);
//
//	
//	 @Query(value = "select u.first_name, u.last_name,u.email, u.mobile_no,o.delivery_date, o.order_date, o.order_status,a.flat_no,a.locality, a.city,v.make,v.model,v.fuel from users u join orders o join address a on a.id=o.address_id join vehicle v on v.id=o.vehicle_id WHERE a.pincode = ?1 AND o.order_status = 'Scheduled';", nativeQuery = true)
//	List<Map<String, Object>> findUserByPStatus(String pincode);
	 
	@Query(value = "select u.id, u.first_name, u.last_name,u.email, u.mobile_no,v.make,v.model,v.fuel,a.flat_no,a.locality, a.city ,o.delivery_date, o.order_date, o.order_status FROM orders o join users u on u.id=o.user_id join vehicle v on o.vehicle_id=v.id join address a on o.address_id=a.id where a.pincode=?1", nativeQuery = true)
	List<Map<String, Object>> findUserByPincodeQ(String pincode);

	
	 @Query(value = "select u.id, u.first_name, u.last_name,u.email, u.mobile_no,v.make,v.model,v.fuel,a.flat_no,a.locality, a.city ,o.delivery_date, o.order_date, o.order_status FROM orders o join users u on u.id=o.user_id join vehicle v on o.vehicle_id=v.id join address a on o.address_id=a.id where a.pincode=?1 AND o.order_status = 'Scheduled'", nativeQuery = true)
	List<Map<String, Object>> findUserByPStatus(String pincode);
	
	
	@Query(value="SELECT SUM(o.total_price) AS total_income FROM orders o WHERE o.order_status='COMPLETED' and o.order_date BETWEEN :startDate AND :endDate", nativeQuery = true)
	List<Map<String, Object>> findTotalIncomeFromDate1ToDate2(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

	
	
	@Query(value = "SELECT first_name, last_name, order_status, item_name, detail " +
		    "FROM users u " +
		    "JOIN orders o ON u.id = o.user_id " +
		    "JOIN order_items oi ON o.id = oi.order_id " +
		    "JOIN item i ON i.id = oi.item_id " +
		    "WHERE u.id = ?1", nativeQuery = true)
		List<Map<String, Object>> findCustomerDetailsByUserId(Integer id);


	@Modifying
	@Query(value="UPDATE orders SET order_status = 'NEW_ORDER_STATUS' WHERE id = ?1", nativeQuery = true)
	int updateOrderStatus(Integer id);
	
	@Query("select u from User u where u.role='VENDOR'")
	List<User> findAllVendor();
	
	@Modifying
	@Transactional
	@Query(value="delete from users where id=:userId",nativeQuery = true)
	int deleteVendorById(int userId);

	User findByEmail(String email);

	@Query(value="select id from users where email=?1 and password=?2", nativeQuery = true)
	int findUserByEmailAndOTP(String email, String otp);
	

	@Modifying
	@Transactional
	@Query(value="update users set first_name=?1,last_name=?2,mobile_no=?3,email=?4 where id=?5",nativeQuery=true)
	int updateUserDetail(String firstName, String lastName, String mobileNo, String email,int id);

	@Query(value="select password from users where id=?1",nativeQuery=true)
	String fetchPassword(int id);

	@Modifying
	@Transactional
	@Query(value="update users set password=?1 where id=?2",nativeQuery=true)
	int updateUserPassword(String encryPassword, int id);
	
	
}
