package org.lamisplus.modules.lamis.legacy.domain.repositories;


import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.lamisplus.modules.lamis.legacy.domain.entities.StatusHistory;
import org.lamisplus.modules.lamis.legacy.domain.repositories.projections.CurrentStatusDates;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface StatusHistoryRepository extends JpaRepository<StatusHistory, Long> {

    List<StatusHistory> findByPatient(Patient patient);

    List<StatusHistory> findByPatientAndDateStatus(Patient patient, LocalDate date);

    List<StatusHistory> findByPatientAndDateStatusBefore(Patient patient, LocalDate date);

    default Optional<StatusHistory> getCurrentStatusForPatient(Patient patient) {
        return findFirstByPatientAndStatusNotNullOrderByDateStatusDescIdDesc(patient);
    }

    default Optional<StatusHistory> getCurrentStatusForPatientAt(Patient patient, LocalDate date) {
        return findFirstByPatientAndDateStatusBeforeAndStatusNotNullOrderByDateStatusDescIdDesc(patient, date);
    }

    Optional<StatusHistory> findFirstByPatientAndStatusNotNullOrderByDateStatusDescIdDesc(Patient patient);

    Optional<StatusHistory> findFirstByPatientAndDateStatusBeforeAndStatusNotNullOrderByDateStatusDescIdDesc(Patient patient, LocalDate date);

    @Query("select v from StatusHistory v where v.patient = ?1")
    List<CurrentStatusDates> findVisitsByPatient(Patient patient);

    Optional<StatusHistory> findByUuid(String uuid);

    List<StatusHistory> findByPatientAndDateStatusBefore(Patient patient, LocalDate date, Pageable pageable);

    List<StatusHistory> findByPatientAndDateStatusAfter(Patient patient, LocalDate date, Pageable pageable);
}
