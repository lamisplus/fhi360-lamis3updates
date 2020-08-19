package org.lamisplus.modules.lamis.legacy.domain.repositories;


import org.lamisplus.modules.lamis.legacy.domain.entities.Facility;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.lamisplus.modules.lamis.legacy.domain.entities.Pharmacy;
import org.lamisplus.modules.lamis.legacy.domain.repositories.projections.VisitDates;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface PharmacyRepository extends JpaRepository<Pharmacy, Long> {
    List<Pharmacy> findByPatientAndDateVisit(Patient patient, LocalDate date);

    List<Pharmacy> findByPatient(Patient patient);

    @Query("select v from Pharmacy v where v.patient = ?1")
    List<VisitDates> findVisitsByPatient(Patient patient);

    List<Pharmacy> findByPatientAndFacilityOrderByDateVisit(Patient patient, Facility facility, Pageable pageable);

    default Pharmacy getLastRefillByPatient(Patient patient) {
        List<Pharmacy> pharmacies = getLastRefillVisit(patient, PageRequest.of(0, 1));
        return pharmacies.isEmpty() ? null : pharmacies.get(0);
    }

    @Query("select p from Pharmacy p join p.lines l where p.patient = ?1 and l.regimenType.id = 15 and p.dateVisit <= current_date()")
    List<Pharmacy> getIptRefills(Patient patient);

    @Query("select p from Pharmacy p join p.lines l where p.patient = ?1 and l.regimenType.id in (1, 2, 3, 4, 14) " +
            "and p.dateVisit <= current_date() order by p.dateVisit desc")
    List<Pharmacy> getLastRefillVisit(Patient patient, Pageable pageable);

    Optional<Pharmacy> findByUuid(String uuid);

    List<Pharmacy> findByPatientAndDateVisitBefore(Patient patient, LocalDate date, Pageable pageable);

    List<Pharmacy> findByPatientAndDateVisitAfter(Patient patient, LocalDate date, Pageable pageable);

    @Query(value = "select date(date_visit + l.duration + INTERVAL '29 DAYS') ltfu_date from pharmacy p join pharmacy_line l " +
            "on p.id = pharmacy_id where l.regimen_type_id in (1,2,3,4,14) and p.patient_id = ? and date_visit <= CURRENT_DATE " +
            "and p.archived = false and l.archived = false ORDER BY p.date_visit DESC, duration DESC LIMIT 1", nativeQuery = true)
    Optional<Date> getLTFUDate(Long patientId);
}
