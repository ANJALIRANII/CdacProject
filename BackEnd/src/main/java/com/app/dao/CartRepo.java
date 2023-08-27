package com.app.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.entities.Cart;
import com.app.entities.Item;

@Repository
public interface CartRepo extends JpaRepository<Cart, Integer> {

	@Query(value="select * from cart where user_id=?1", nativeQuery = true)
	Cart findCartByUserId(@Param("userId") int userId);
	
//	@Modifying
//	@Transactional
//	@Query(value="insert into cart_items (item_id,cart_id) VALUES((select id from item where id=:itemId),(select id from cart where user_id=:userId))",nativeQuery = true)
//	int addItemToCart(@Param("itemId") int itemId,@Param("userId") int userId);
	
	@Query("select c.items from Cart c where c.id=(select c.id from Cart c where c.user.id=?1)")
	List<Item> findItemsByUserId(int id);
	
//	@Modifying
//	@Transactional
//	@Query("delete from Cart c where c.user.id=?1")
//	void deleteByUserId(int userId);

	@Modifying
	@Transactional
	@Query(value="delete from cart_items where item_id=?1 and cart_id = (select id from cart where user_id=?2)", nativeQuery = true)
	int removeItemFromCart(int itemId, int userId);

	@Modifying
	@Transactional
	@Query(value="delete from cart_items where cart_id = (select id from cart where user_id=?1)", nativeQuery = true)
	int EmptyCartByUserId(int userId);
}
