// repository/CommoditiesIndexRepository.java
package com.mbccurrency.repository;

import com.mbccurrency.entity.CommoditiesIndex;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;

public interface CommoditiesIndexRepository extends JpaRepository<CommoditiesIndex, LocalDate> {}
