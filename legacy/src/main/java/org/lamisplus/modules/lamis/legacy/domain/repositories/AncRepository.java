package org.lamisplus.modules.lamis.legacy.domain.repositories;


import org.lamisplus.modules.lamis.legacy.domain.entities.Anc;
import org.lamisplus.modules.lamis.legacy.domain.entities.Facility;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AncRepository extends JpaRepository<Anc, Long> {
    Anc findFirstByPatientOrderByDateVisitDesc(Patient patient);

    Anc findFirstByPatientOrderByDateVisit(Patient patient);

    List<Anc> findByPatientAndDateVisit(Patient patient, LocalDate date);

    List<Anc> findByPatient(Patient patient);

    List<Anc> findByFacility(Facility facility, Pageable pageable);

    Long countByFacility(Facility facility);

    List<Anc> findByPatientOrderByDateVisitDesc(Patient patient);

    Optional<Anc> findByUuid(String uuid);
}
