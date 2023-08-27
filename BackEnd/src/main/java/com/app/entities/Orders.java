package com.app.entities;


import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

public class Orders extends BaseEntity {

	@Column(name = "order_date")
	@CreationTimestamp
	private Date orderDate;

	@Column(name = "delivery_date")
	@CreationTimestamp
	private Date deliveryDate;

	@Enumerated(EnumType.STRING)
	@Column(name = "order_status", length = 10)
	private OrderStatus orderStatus;

	@Column(name = "total_price")
	private double totalPrice;

	@ManyToMany(fetch = FetchType.EAGER)
	@JsonIgnoreProperties(value="vehicles")
	@JoinTable(name = "order_items", joinColumns = @JoinColumn(name = "order_id"), 
							inverseJoinColumns = @JoinColumn(name = "item_id"))
	private List<Item> items;
	
	@ManyToOne
	@JsonIgnoreProperties(value="addresses,orders,vehicles")
	@JoinColumn(name="user_id")
	private User owner;
	
	@OneToOne
	@JoinColumn(name="address_id", nullable = false)
	private Address address;
	
	@OneToOne
	@JoinColumn(name="vehicle_id", nullable = false)
	private Vehicle vehicle;
	
}
