package org.lamisplus.modules.lamis.legacy.domain.repositories;

import org.lamisplus.modules.lamis.legacy.domain.entities.MotherInformation;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MotherInformationRepository extends JpaRepository<MotherInformation, Long> {
    Optional<MotherInformation> findByPatient(Patient patient);

    Optional<MotherInformation> findByUuid(String uuid);
}
