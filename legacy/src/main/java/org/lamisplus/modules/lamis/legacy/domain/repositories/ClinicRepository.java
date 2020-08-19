package org.lamisplus.modules.lamis.legacy.domain.repositories;


import org.lamisplus.modules.lamis.legacy.domain.entities.Clinic;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.lamisplus.modules.lamis.legacy.domain.repositories.projections.VisitDates;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ClinicRepository extends JpaRepository<Clinic, Long> {

    List<Clinic> findByPatientAndDateVisit(Patient patient, LocalDate date);

    List<Clinic> findByPatient(Patient patient, Pageable pageable);

    List<Clinic> findByPatientAndCommenceIsTrue(Patient patient);

    @Query("select v from Clinic v where v.patient = ?1")
    List<VisitDates> findVisitsByPatient(Patient patient);

    default Optional<Clinic> getArtCommencement(Patient patient) {
        return findFirstByPatientAndCommenceIsTrueOrderByDateVisit(patient);
    }

    default Optional<Clinic> getLastClinicVisit(Patient patient) {
        return findFirstByPatientOrderByDateVisitDesc(patient);
    }

    Optional<Clinic> findFirstByPatientAndCommenceIsTrueOrderByDateVisit(Patient patient);

    Optional<Clinic> findFirstByPatientOrderByDateVisitDesc(Patient patient);

    Optional<Clinic> findByUuid(String uuid);

    List<Clinic> findByPatientAndDateVisitBefore(Patient patient, LocalDate date, Pageable pageable);

    List<Clinic> findByPatientAndDateVisitAfter(Patient patient, LocalDate date, Pageable pageable);

    default Long visitsByPatient(Patient patient) {
        return visitsByPatientBetweenDates(patient, LocalDate.now().minusMonths(12), LocalDate.now());
    }

    default Long precedingOpportunityInfectionsByPatient(Patient patient) {
        return precedingOpportunityInfectionsByPatientBetweenDates(patient, LocalDate.now().minusMonths(16), LocalDate.now());
    }

    @Query("select c.cd4 from Clinic c where c.patient = ?1 and c.commence = true")
    Long baselineCD4ByPatient(Patient patient);

    @Query("select count(c) from Clinic c join c.opportunisticInfections o where c.patient = ?1 and c.dateVisit between ?2 and ?3")
    Long precedingOpportunityInfectionsByPatientBetweenDates(Patient patient, LocalDate start, LocalDate end);

    @Query("select count(c) from Clinic c where c.patient = ?1 and c.dateVisit between ?2 and ?3")
    Long visitsByPatientBetweenDates(Patient patient, LocalDate start, LocalDate end);
}
