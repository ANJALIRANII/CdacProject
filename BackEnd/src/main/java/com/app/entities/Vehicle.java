package com.app.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

public class Vehicle extends BaseEntity {

//	@Column(name="rto_no", length = 10, unique = true)
//	private String rtoNo;
//	
//	@Column(name = "running_km")
//	private int runningKM;

	@Column(length = 30)
	private String make;

	@Column(length = 30)
	private String model;

	@Column(length = 10)
	private String fuel;

//	@ManyToOne
//	@JoinColumn(name="user_id")
//	private User vehicleOwner;

	@ManyToMany(mappedBy = "vehicles")
	@JsonIgnore
	private Set<User> users = new HashSet<>();// override hashcode and equals

}
