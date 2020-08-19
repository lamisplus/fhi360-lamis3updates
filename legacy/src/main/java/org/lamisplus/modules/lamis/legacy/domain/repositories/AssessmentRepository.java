package org.lamisplus.modules.lamis.legacy.domain.repositories;


import org.lamisplus.modules.lamis.legacy.domain.entities.Assessment;
import org.lamisplus.modules.lamis.legacy.domain.entities.Facility;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AssessmentRepository extends JpaRepository<Assessment, Long> {
    Assessment findByClientCodeAndFacility(String clientCode, Facility facility);

    Optional<Assessment> findByUuid(String uuid);
}
