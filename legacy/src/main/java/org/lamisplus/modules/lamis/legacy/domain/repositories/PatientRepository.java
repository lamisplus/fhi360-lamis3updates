package org.lamisplus.modules.lamis.legacy.domain.repositories;


import org.lamisplus.modules.lamis.legacy.domain.entities.CaseManager;
import org.lamisplus.modules.lamis.legacy.domain.entities.Facility;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    @Query(value = "select p from Patient p where (lower(p.surname) like lower(concat('%', :query, '%') ) or " +
            "lower(p.otherNames) like lower(concat('%', :query, '%')) or lower(p.hospitalNum) = lower(:query) or " +
            "lower(p.uniqueId) = lower(:query)) and p.facility.id = :facility")
    Page<Patient> searchPatient(@Param("facility") Long facilityId, @Param("query") String query, Pageable pageable);

    List<Patient> findByCaseManager(CaseManager caseManager);

    Long countByCaseManager(CaseManager caseManager);

    List<Patient> findByHospitalNumAndFacility(String hospitalNumber, Facility facility);

    Optional<Patient> findByUuid(String uuid);

    @Query("select count(p) from Patient p join StatusHistory s on s.patient = p where s.status = 'LOST_TO_FOLLOWUP' or " +
            "s.status = 'STOPPED_TREATMENT' and s.dateStatus <= current_date and p.facility.id = ?1")
    Long unstableClients(Long facilityId);

    @Query("select count(p) from Patient p join StatusHistory s on s.patient = p where s.status = 'LOST_TO_FOLLOWUP' or " +
            "s.status = 'STOPPED_TREATMENT' and s.dateStatus <= current_date and p.caseManager = ?1 and p.facility.id = ?2")
    Long unstableClientsByCaseManager(CaseManager caseManager, Long facilityId);

    default Boolean isRecentTXNew(Patient patient) {
        return existsByIdAndDateStartedBetween(patient.getId(), LocalDate.now().minusMonths(12), LocalDate.now());
    }

    Boolean existsByIdAndDateStartedBetween(Long patientId, LocalDate start, LocalDate end);

    Boolean existsByCaseManagerAndDateStartedBetween(CaseManager caseManager, LocalDate start, LocalDate end);
}
