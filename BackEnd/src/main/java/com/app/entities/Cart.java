package com.app.entities;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table

public class Cart extends BaseEntity{

	@Column(name="created_date")
	@CreationTimestamp
	private Date createdDate;
	
	
	@Column(name="updated_date")
	@UpdateTimestamp
	private Date updatedDate;
	
	@Column(name="total_items")
	private int totalItems;
	
	@Column(name = "total_price")
	private double totalPrice;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name="cart_items", joinColumns = @JoinColumn(name="cart_id"),
				inverseJoinColumns = @JoinColumn(name="item_id"))
	@JsonIgnoreProperties(value = "vehicles")
	private Set<Item> items= new HashSet<>();
	
	@OneToOne
	@JoinColumn(name = "user_id", nullable = false)
	@JsonProperty(access = Access.WRITE_ONLY)
	private User user;
}
