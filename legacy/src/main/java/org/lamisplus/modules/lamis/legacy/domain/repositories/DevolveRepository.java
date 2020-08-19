package org.lamisplus.modules.lamis.legacy.domain.repositories;


import org.lamisplus.modules.lamis.legacy.domain.entities.Devolve;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DevolveRepository extends JpaRepository<Devolve, Long> {
    Devolve findFirstByPatientOrderByDateDevolved(Patient patient);

    Devolve findFirstByPatientOrderByDateDevolvedDesc(Patient patient);

    Devolve findByPatientAndDateDevolved(Patient patient, LocalDate date);

    List<Devolve> findByPatient(Patient patient);

    Optional<Devolve> findByUuid(String uuid);

    List<Devolve> findByPatientAndDateDevolvedBefore(Patient patient, LocalDate date, Pageable pageable);

    List<Devolve> findByPatientAndDateDevolvedAfter(Patient patient, LocalDate date, Pageable pageable);
}
