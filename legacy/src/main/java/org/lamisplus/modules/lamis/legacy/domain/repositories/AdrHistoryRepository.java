package org.lamisplus.modules.lamis.legacy.domain.repositories;


import org.lamisplus.modules.lamis.legacy.domain.entities.AdrHistory;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdrHistoryRepository extends JpaRepository<AdrHistory, Long> {

    List<AdrHistory> findByPatient(Patient patient);
}
