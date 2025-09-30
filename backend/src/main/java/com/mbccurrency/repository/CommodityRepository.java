package com.mbccurrency.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mbccurrency.entity.Commodities;

public interface CommodityRepository extends JpaRepository<Commodities, LocalDate>  {

}
