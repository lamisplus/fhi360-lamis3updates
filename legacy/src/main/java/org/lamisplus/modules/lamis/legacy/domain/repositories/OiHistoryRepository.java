package org.lamisplus.modules.lamis.legacy.domain.repositories;


import org.lamisplus.modules.lamis.legacy.domain.entities.OiHistory;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OiHistoryRepository extends JpaRepository<OiHistory, Long> {
    List<OiHistory> findByPatient(Patient patient);
}
