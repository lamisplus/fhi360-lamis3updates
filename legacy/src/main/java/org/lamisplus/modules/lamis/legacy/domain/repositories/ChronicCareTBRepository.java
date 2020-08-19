package org.lamisplus.modules.lamis.legacy.domain.repositories;

import org.lamisplus.modules.lamis.legacy.domain.entities.ChronicCare;
import org.lamisplus.modules.lamis.legacy.domain.entities.ChronicCareTB;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChronicCareTBRepository extends JpaRepository<ChronicCareTB, Long> {
    List<ChronicCareTB> findByChronicCare(ChronicCare chronicCare);
}
