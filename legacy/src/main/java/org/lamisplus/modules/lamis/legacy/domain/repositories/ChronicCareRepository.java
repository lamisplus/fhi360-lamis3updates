package org.lamisplus.modules.lamis.legacy.domain.repositories;


import org.lamisplus.modules.lamis.legacy.domain.entities.Appointment;
import org.lamisplus.modules.lamis.legacy.domain.entities.ChronicCare;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.lamisplus.modules.lamis.legacy.domain.repositories.projections.VisitDates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ChronicCareRepository extends JpaRepository<ChronicCare, Long> {
    ChronicCare findByPatientAndDateVisit(Patient patient, LocalDate date);

    List<ChronicCare> findByPatient(Patient patient);

    Optional<ChronicCare> findByUuid(String uuid);

    @Query("select v from ChronicCare v where v.patient = ?1")
    List<VisitDates> findVisitsByPatient(Patient patient);
}
