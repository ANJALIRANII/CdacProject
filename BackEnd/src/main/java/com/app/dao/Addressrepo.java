package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Address;

public interface Addressrepo extends JpaRepository<Address, String> {

	Address save(Address address);
	
	@Query("select a from Address a where a.owner.id=?1")
	List<Address> findByUserId(int userid);
}
