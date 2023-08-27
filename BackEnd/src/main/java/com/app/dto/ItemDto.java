package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ItemDto {
	
		private int id;
		private String itemName;
		private boolean inStock;
		private double price;
		private String detail;
		
}
