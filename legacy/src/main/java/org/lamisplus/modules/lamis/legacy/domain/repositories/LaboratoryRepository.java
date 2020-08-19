package org.lamisplus.modules.lamis.legacy.domain.repositories;

import org.lamisplus.modules.lamis.legacy.domain.entities.Facility;
import org.lamisplus.modules.lamis.legacy.domain.entities.Laboratory;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.lamisplus.modules.lamis.legacy.domain.repositories.projections.ReportedDates;
import org.lamisplus.modules.lamis.legacy.domain.repositories.projections.VisitDates;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface LaboratoryRepository extends JpaRepository<Laboratory, Long> {
    List<Laboratory> findByPatientAndDateResultReceived(Patient patient, LocalDate date);

    List<Laboratory> findByPatient(Patient patient, Pageable pageable);

    List<Laboratory> findByFacility(Facility facility, Pageable pageable);

    List<Laboratory> findByPatient(Patient patient);

    List<Laboratory> findByPatientOrderByDateResultReceived(Patient patient);

    @Query("select v from Laboratory v where v.patient = ?1")
    List<ReportedDates> findVisitsByPatient(Patient patient);

    Optional<Laboratory> findByUuid(String uuid);

    @Query("select l from Laboratory l join l.lines r where l.patient = ?1 and r.labTest.id = 16 and l.dateResultReceived <= current_date() order by l.dateResultReceived desc ")
    List<Laboratory> findViralLoadTestByPatient(Patient patient);

    @Query("select l from Laboratory l join l.lines r where l.patient = ?1 and r.labTest.id = 1 and l.dateResultReceived <= current_date() order by l.dateResultReceived desc ")
    List<Laboratory> findCD4TestByPatient(Patient patient);

    List<Laboratory> findByPatientAndDateResultReceivedBefore(Patient patient, LocalDate date, Pageable pageable);

    List<Laboratory> findByPatientAndDateResultReceived(Patient patient, LocalDate date, Pageable pageable);
}
