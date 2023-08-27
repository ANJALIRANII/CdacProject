package com.app.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

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

public class Item extends BaseEntity {

	@Column(name = "item_name", length = 100)
	private String itemName;
	
	@Column(name = "in_stock")
	private boolean inStock;
	
	private double price;
	
	@Column(length = 300)
	private String detail;
	
	@ManyToOne
	@JoinColumn(name="category_id")
	@JsonProperty(access = Access.WRITE_ONLY)
	private Category itemCategory;
	
//	@ManyToMany
//	@JsonIgnore
//	@JoinColumn(name="items")
//	private Cart cart;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name="item_vehicle", joinColumns = @JoinColumn(name="item_id"),
				inverseJoinColumns = @JoinColumn(name="vehicle_id"))
	private List<Vehicle> vehicles= new ArrayList<>();
	
	
}
