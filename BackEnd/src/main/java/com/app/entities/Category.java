package com.app.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class Category extends BaseEntity{

	@Column(name = "category_name", length = 40, unique = true)
	private String categoryName;
	
	@Column(length = 100)
	private String description;
	
	@OneToMany(mappedBy = "itemCategory",cascade = CascadeType.ALL, 
			orphanRemoval = true, fetch = FetchType.EAGER)
	private List<Item> items=new ArrayList<>();
	
}
