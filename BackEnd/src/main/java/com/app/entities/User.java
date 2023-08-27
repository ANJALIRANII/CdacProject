package com.app.entities;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Pattern;

import com.app.dto.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString

public class User extends BaseEntity{

	@Column(name="first_name", length = 20, nullable = false)
	private String firstName;
	
	@Column(name = "last_name", length=20)
	private String lastName;
	
	@Column(unique = true, length = 100)
	private String email;
	
	
	@Column(name = "mobile_no", length=10)
	private String mobileNo;
	
	@Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})")
	@Column(nullable = false, length = 50)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;
	
	@Enumerated(EnumType.STRING)
	@Column(length = 10)
	private Role role;
	
	@OneToMany(mappedBy = "owner",fetch = FetchType.EAGER)
	//@JsonIgnoreProperties(value="Owner")
	//@JsonIgnore
	private List<Address> addresses= new ArrayList<>();
	
	@ManyToMany( fetch = FetchType.EAGER)
	@JsonIgnore
	@JoinTable(name="user_vehicles", joinColumns =@JoinColumn(name="user_id"),
				inverseJoinColumns = @JoinColumn(name="vehicle_id"))
	private Set<Vehicle> vehicles= new HashSet<>();//override hashcode and equals
	
//	@OneToOne(mappedBy = "user")
//	private Cart cart=new Cart();
	
	@OneToMany(mappedBy = "owner",fetch = FetchType.EAGER )
	@JsonIgnore
	private Set<Orders> orders=new HashSet<>();
	
	
}
