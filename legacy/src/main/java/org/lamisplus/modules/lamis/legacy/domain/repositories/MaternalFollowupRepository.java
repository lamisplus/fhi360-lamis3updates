package org.lamisplus.modules.lamis.legacy.domain.repositories;


import org.lamisplus.modules.lamis.legacy.domain.entities.MaternalFollowup;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MaternalFollowupRepository extends JpaRepository<MaternalFollowup, Long> {
    List<MaternalFollowup> findByPatientAndDateVisit(Patient patient, LocalDate date);

    List<MaternalFollowup> findByPatient(Patient patient);

    List<MaternalFollowup> findByPatient(Patient patient, Pageable pageable);

    Optional<MaternalFollowup> findByUuid(String uuid);
}
