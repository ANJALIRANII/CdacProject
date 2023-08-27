package com.app.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.dao.CartRepo;
import com.app.dao.CategoriesRepo;
import com.app.dao.ItemRepo;
import com.app.dao.OrderRepo;
import com.app.dao.Userrepo;
import com.app.dao.VehicleRepo;
import com.app.dto.ItemDto;
import com.app.dto.Role;
import com.app.dto.UserDto;
import com.app.entities.Address;
import com.app.entities.Cart;
import com.app.entities.Category;
import com.app.entities.Item;
import com.app.entities.OrderStatus;
import com.app.entities.Orders;
import com.app.entities.User;
import com.app.entities.Vehicle;

@Service
public class ServiceImple implements ServiceInterface {

	@Autowired
	private ModelMapper ModelMapper;

	@Autowired
	private Userrepo us;
	@Autowired
	private CartRepo cartRepo;
	@Autowired
	private OrderRepo orderRepo;

	@Autowired
	private ItemRepo itemRepo;
	@Autowired
	private VehicleRepo vehicleRepo;
	@Autowired
	private CategoriesRepo categoriesRepo;
	
	PasswordEncoder passwordEncoder= new BCryptPasswordEncoder();


	@Override
	public UserDto findById(int userid) {
		System.out.println("In service Imple");
		User user = us.findById(userid);
		System.out.println(user);
		return ModelMapper.map(user, UserDto.class);

	}
	
	@Override
	public UserDto findByEmail(String email) {
		User user = us.findByEmail(email);
		return ModelMapper.map(user, UserDto.class);
	}
	
	@Override
	public User findByUserEmail(String email) {
		User user = us.findByEmail(email);
		return user;
	}

	@Override
	public Cart findByUserId(int userId) {
		System.out.println("userId :" + userId);
		Cart cart = cartRepo.findCartByUserId(userId);
		System.out.println(cart);
		return cart;
	}

//	public int addItemToCart(int itemId, int userId) {
//		System.out.println("itemId: " + itemId + "&userId: " + userId);
//
//		Cart cart = cartRepo.findCartByUserId(userId);
//		Set<Item> itemList = cart.getItems();
//		Item item = itemRepo.findItemById(itemId);
//		itemList.add(item);
//		cart.setItems(itemList);
//		cart.setTotalItems(cart.getTotalItems() + 1);
//		cart.setTotalPrice(cart.getTotalPrice() + item.getPrice());
//		cartRepo.save(cart);
//
//		return 1;
//	}
	public int addItemToCart(int itemId, int userId) {
		System.out.println("itemId: " + itemId + "&userId: " + userId);

		Cart cart = cartRepo.findCartByUserId(userId);
		Set<Item> itemList = cart.getItems();
		for (Item item : itemList) {
			if(item.getId()==itemId) {
				return 0;
			}
		}
		Item item = itemRepo.findItemById(itemId);
		itemList.add(item);
		cart.setItems(itemList);
		cart.setTotalItems(cart.getTotalItems() + 1);
		cart.setTotalPrice(cart.getTotalPrice() + item.getPrice());
		cartRepo.save(cart);

		return 1;
	}
	

	public Object makeOrderByUserId(int userId, int addressId, int vehicleId) {
		double totalPrice = 0;
		Orders order = new Orders();

		List<Item> items = cartRepo.findItemsByUserId(userId); // getting Items in Cart by user Id
		System.out.println(items);

		for (Item item : items) {
			totalPrice = totalPrice + item.getPrice();
		}

		if (totalPrice == 0)
			return "No Items in cart to place Order";
		else {

			User user = us.findById(userId); // getting User By user Id
			List<Address> addressList = user.getAddresses(); // getting All Addresses user belongs to
			Address userAddress = null;
			for (Address address : addressList) {
				if (address.getId() == addressId)
					System.out.println(address.getId());
				userAddress = address;
			}

			if (userAddress == null)
				return "No Delivery Address/ address not belongs to User";

			order.setAddress(userAddress);

			Vehicle userVehicle = vehicleRepo.findByvehicleId(vehicleId);
			order.setVehicle(userVehicle);

			order.setOrderStatus(OrderStatus.SCHEDULED);
			order.setTotalPrice(totalPrice);// get total price the cart has
			order.setOwner(user);

			LocalDateTime localDate = LocalDateTime.now();
			System.out.println(localDate);
			localDate.plusDays(1);
			System.out.println("afterr 1day :" + localDate);
			Date date = Date.from(localDate.atZone(ZoneId.systemDefault()).toInstant());
			System.out.println("entering in db date :" + date);
			order.setDeliveryDate(date);
			order.setItems(items);
			orderRepo.save(order);

			Cart cart = cartRepo.findCartByUserId(userId);
			cart.getItems().clear();
			cart.setTotalPrice(0);
			cart.setTotalItems(0);
			cartRepo.save(cart);

			return "Order placed Successfully";
		}
	}

	public Object findByCategory_idAndVehicle_id(int categoryId, int vehicleId) {
		Set<Item> items = itemRepo.findByCategory_idAndVehicle_id(categoryId, vehicleId);
		Set<ItemDto> itemDto = items.stream().map(item -> new ItemDto(item.getId(), item.getItemName(),
				item.isInStock(), item.getPrice(), item.getDetail())).collect(Collectors.toSet());
		return itemDto;
	}

	public Object addNewVehicle(Map<String, String> data) {
		Vehicle vehicle = new Vehicle();
		vehicle.setMake(data.get("make"));
		vehicle.setModel(data.get("model"));
		vehicle.setFuel(data.get("fuel"));
		vehicleRepo.save(vehicle);
		return vehicle;
	}

	public Object addVehicleByUserId(Map<String, Integer> data) {
		int userId = data.get("userId");
		int vehicleId = data.get("vehicleId");

		User user = us.findByUserId(userId);
		Set<Vehicle> vehicles = user.getVehicles();
		for (Vehicle vehicle : vehicles) {
			if (vehicle.getId() == vehicleId)
				return "Vehicle Already Added";
		}
		vehicles.add(vehicleRepo.findByvehicleId(vehicleId));
		user.setVehicles(vehicles);
		us.save(user);

		return "vehicle Added Successfully";
	}

	public Object removeItemFromCart(Map<String, Integer> requestData) {
		int userId = requestData.get("userId");
		int itemId = requestData.get("itemId");
//		System.out.println(userId + " " + itemId);
//		
//		return cartRepo.removeItemFromCart(itemId, userId);
		
		
			System.out.println("itemId: " + itemId + "&userId: " + userId);

			Cart cart = cartRepo.findCartByUserId(userId);
			Set<Item> itemList = cart.getItems();
			for (Item item : itemList) {
				if(item.getId()==itemId) {
					Item item1 = itemRepo.findItemById(itemId);
					itemList.remove(item);
					cart.setItems(itemList);
					cart.setTotalItems(cart.getTotalItems() - 1);
					cart.setTotalPrice(cart.getTotalPrice() - item1.getPrice());
					cartRepo.save(cart);

					return item.getItemName();
				}
			}
			return 0;
		
		
	}

	public Object EmptyCartByUserId(int userId) {

		return cartRepo.EmptyCartByUserId(userId);
	}

	public Object removeCategoryAndItems(Integer categoryId) {
		Optional<Category> category = categoriesRepo.findById(categoryId);
		categoriesRepo.delete(category.get());
		return "Category and Related Items removed";
	}

	public User addUser(User user) {
		System.out.println(user);
		Cart cart= new Cart();
		String encryPassword=passwordEncoder.encode(user.getPassword());
		user.setPassword(encryPassword);
		user.setRole(Role.USER);
		User addedUser= us.save(user);
		cart.setUser(user);
		cartRepo.save(cart);
		
		return addedUser;
	}
	public User addVendor(User user) {
		System.out.println(user);
		Cart cart= new Cart();
		String encryPassword=passwordEncoder.encode(user.getPassword());
		user.setPassword(encryPassword);
		user.setRole(Role.VENDOR);
		User addedUser= us.save(user);
		cart.setUser(user);
		cartRepo.save(cart);
		
		return addedUser;
	}
	public Object findByCategory_id(int categoryId) {
		Set<Item> items = itemRepo.findByCategory_id(categoryId);
		Set<ItemDto> itemDto = items.stream().map(item -> new ItemDto(item.getId(), item.getItemName(),
				item.isInStock(), item.getPrice(), item.getDetail())).collect(Collectors.toSet());
		return itemDto;
	}

	public boolean getUserByEmailAndOTP(String email, String otp) {
		int id= us.findUserByEmailAndOTP(email,otp);
		if(id>=1) {
			return true;
		}
		return false;
	}
	
	public int updateUser(User user) {
		
		String firstName=user.getFirstName();
		String lastName=user.getLastName();
		String mobileNo=user.getMobileNo();
		String email=user.getEmail();
		
		int id=user.getId();
		
		System.out.println("firstName: "+firstName+" lastName: "+lastName+" mobileNo: "+mobileNo+" email: "+email+" id: "+id);
		
		int userUpdated=us.updateUserDetail(firstName,lastName,mobileNo,email,id);
		return userUpdated;
	}

	public String matchPass(User user) {
		
		System.out.println("Password: "+user.getPassword());
		
		String password=user.getPassword();
		
		
		int id=user.getId();
		
		String dbPassword=us.fetchPassword(id);
		System.out.println("dbPassword: "+dbPassword);
		System.out.println("id: "+id);
		
		boolean isMatched=passwordEncoder.matches(password, dbPassword);
		
		if(isMatched) {
			return "Success";
		}
		else {
			return "Failure";
		}
		
		
	}

	public int updatePassword(User user) {
		String encryPassword=passwordEncoder.encode(user.getPassword());
		String password=user.getPassword();
		
		int id=user.getId();
		
		System.out.println("encryPassword: "+encryPassword+" & Password: "+password);
		
		int passwordUpdated=us.updateUserPassword(encryPassword,id);
		return passwordUpdated;
	}
	public int updatePasswordByEmail(String email, String Password){
		
		User user=findByUserEmail(email);
		String encrptedpassword=passwordEncoder.encode(Password);
		user.setPassword(encrptedpassword);
		us.save(user);
		return 1;
	}

	

	
}
