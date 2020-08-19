package org.lamisplus.modules.lamis.legacy.domain.repositories;


import org.lamisplus.modules.base.domain.entities.Province;
import org.lamisplus.modules.base.domain.entities.State;
import org.lamisplus.modules.lamis.legacy.domain.entities.Facility;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FacilityRepository extends JpaRepository<Facility, Long> {
    List<Facility> findByState(State state);

    List<Facility> findByLgaAndActiveTrue(Province lga);
}
