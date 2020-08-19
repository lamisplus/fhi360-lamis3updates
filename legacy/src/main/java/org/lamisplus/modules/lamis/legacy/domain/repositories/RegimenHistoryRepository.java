package org.lamisplus.modules.lamis.legacy.domain.repositories;


import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.lamisplus.modules.lamis.legacy.domain.entities.RegimenHistory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface RegimenHistoryRepository extends JpaRepository<RegimenHistory, Long> {

    Optional<RegimenHistory> findFirstByPatientAndDateVisitBeforeOrderByDateVisitDesc(Patient patient, LocalDate date);

    default Optional<RegimenHistory> getRegimenHistoryByPatientAt(Patient patient, LocalDate date) {
        return findFirstByPatientAndDateVisitBeforeOrderByDateVisitDesc(patient, date);
    }

    List<RegimenHistory> findByPatientAndDateVisitBefore(Patient patient, LocalDate date, Pageable pageable);

    List<RegimenHistory> findByPatientAndDateVisitAfter(Patient patient, LocalDate date, Pageable pageable);
}
