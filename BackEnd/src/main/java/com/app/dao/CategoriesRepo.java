package com.app.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Category;

public interface CategoriesRepo extends JpaRepository<Category, Integer> {

	List<Category> findAll();
	
	@Modifying
	@Transactional
	@Query(value="update category set category_name =:categoryName,description=:description where id=:categoryId",nativeQuery = true)
	int updateCategoryById(String categoryName, String description,int categoryId);

}
