package org.lamisplus.modules.lamis.legacy.domain.repositories;

import org.lamisplus.modules.lamis.legacy.domain.entities.ChronicCare;
import org.lamisplus.modules.lamis.legacy.domain.entities.ChronicCareDM;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChronicCareDMRepository extends JpaRepository<ChronicCareDM, Long> {
    List<ChronicCareDM> findByChronicCare(ChronicCare chronicCare);
}
