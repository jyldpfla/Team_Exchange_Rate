package com.mbccurrency.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "grains")
public class Grains {
	
	@Id
	@Column(name = "date")
	private LocalDate date;
	
	@Column(name = "corn")
	private Double corn;
	
	@Column(name = "corn_volume")
	private Double corn_volume;
	
	@Column(name = "wheat")
	private Double wheat;
	
	@Column(name = "wheat_volume")
	private Double wheat_volume;
	
	@Column(name = "rice")
	private Double rice;
	
	@Column(name = "rice_volume")
	private Double rice_volume;
	
	@Column(name = "coffee")
	private Double coffee;
	
	@Column(name = "coffee_volume")
	private Double coffee_volume;
	
	@Column(name = "sugar")
	private Double sugar;
	
	@Column(name = "sugar_volume")
	private Double sugar_volume;
}
