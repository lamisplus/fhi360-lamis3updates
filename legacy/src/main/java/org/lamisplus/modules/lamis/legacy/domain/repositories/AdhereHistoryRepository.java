package org.lamisplus.modules.lamis.legacy.domain.repositories;

import org.lamisplus.modules.lamis.legacy.domain.entities.AdhereHistory;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdhereHistoryRepository extends JpaRepository<AdhereHistory, Long> {
    List<AdhereHistory> findByPatient(Patient patient);
}
