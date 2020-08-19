package org.lamisplus.modules.lamis.legacy.domain.repositories;


import org.lamisplus.modules.lamis.legacy.domain.entities.Eid;
import org.lamisplus.modules.lamis.legacy.domain.entities.Facility;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EidRepository extends JpaRepository<Eid, Long> {
    List<Eid> findByFacilityAndLabNo(Facility facility, String labNo);

    Optional<Eid> findByUuid(String uuid);
}
