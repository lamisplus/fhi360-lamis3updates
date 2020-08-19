package org.lamisplus.modules.lamis.legacy.domain.repositories;


import org.lamisplus.modules.lamis.legacy.domain.entities.Facility;
import org.lamisplus.modules.lamis.legacy.domain.entities.PartnerInformation;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PartnerInformationRepository extends JpaRepository<PartnerInformation, Long> {
    List<PartnerInformation> findByPatient(Patient patient);

    List<PartnerInformation> findByFacility(Facility facility);

    Optional<PartnerInformation> findByUuid(String uuid);
}
