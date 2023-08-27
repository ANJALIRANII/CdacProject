package com.app.dao;

import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.Category;
import com.app.entities.Item;

public interface ItemRepo extends JpaRepository<Item, Integer> {

	@Query("select i, v from Item i Join Fetch i.vehicles v where i.itemCategory.id=:catId and v.id=:vehicleId")
	Set<Item> findByCategory_idAndVehicle_id(@Param("catId") Integer catId,@Param("vehicleId") Integer vehicleId);

	@Query("select i.price from Item i where i.id=?1")
	double findPriceById(int itemId);
	
	@Query("select i from Item i where i.id=?1")
	Item findItemById(int itemId);
	
	@Query("select i.id from Item i where i.itemName=?1")
	int getLatestItemId(String itemName);
	
	@Modifying
	@Transactional
	@Query(value="update item set item_name=:itemName,category_id=:itemCategory,detail=:detail,price=:price where id=:itemId",nativeQuery = true)
	int editServices(String itemName, Category itemCategory, String detail, double price,int itemId);
	
	@Modifying
	@Transactional
	@Query(value="delete from item where id=:itemId",nativeQuery = true)
	int deleteServiceById(int itemId);
	
	@Modifying
	@Transactional
	@Query(value="delete from item_vehicle where item_id=:itemId and vehicle_id=:vehicleId",nativeQuery = true)
	int deleteVehiclesFromService(int itemId, int vehicleId);
	
	@Query("select i from Item i where i.itemCategory.id=:categoryId")
	Set<Item> findByCategory_id(@Param("categoryId")int categoryId);
	
	
}
