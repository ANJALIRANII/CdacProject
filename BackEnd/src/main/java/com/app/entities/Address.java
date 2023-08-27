package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

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
public class Address extends BaseEntity{

	@Column(name="flat_no", length = 10)
	private String flatNo;
	
	@Column(length=30)
	private String locality;
	
	@Column(length = 40)
	private String city;
	
	@Column(length = 6)
	private String pincode;
	
	
	@ManyToOne
	@JoinColumn(name="user_id", nullable = false)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private User owner;
	
}
