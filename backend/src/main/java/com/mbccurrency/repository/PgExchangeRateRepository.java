package com.mbccurrency.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mbccurrency.entity.ExchangeRate;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface PgExchangeRateRepository extends JpaRepository<ExchangeRate, LocalDate> {

	// 기간 조회(오름차순)
    List<ExchangeRate> findByDateBetweenOrderByDateAsc(LocalDate start, LocalDate end);

    // 최신 1건
    Optional<ExchangeRate> findTopByOrderByDateDesc();
}
