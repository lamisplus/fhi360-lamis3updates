package org.lamisplus.modules.lamis.legacy.domain.repositories;


import org.lamisplus.modules.lamis.legacy.domain.entities.Eac;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface EacRepository extends JpaRepository<Eac, Long> {
    Eac findByPatientAndDateEac1(Patient patient, LocalDate date);

    Eac findFirstByPatientOrderByDateEac1Desc(Patient patient);

    List<Eac> findByPatientOrderByDateEac1Desc(Patient patient);

    List<Eac> findByPatient(Patient patient);

    Optional<Eac> findByUuid(String uuid);
}
