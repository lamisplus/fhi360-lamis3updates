package org.lamisplus.modules.lamis.legacy.domain.repositories;


import org.lamisplus.modules.lamis.legacy.domain.entities.Child;
import org.lamisplus.modules.lamis.legacy.domain.entities.ChildFollowup;
import org.lamisplus.modules.lamis.legacy.domain.entities.Facility;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ChildFollowupRepository extends JpaRepository<ChildFollowup, Long> {
    List<ChildFollowup> findByChildAndDateVisit(Child child, LocalDate date);

    List<ChildFollowup> findByChild(Child child);

    List<ChildFollowup> findByFacility(Facility facility);

    Long countByFacility(Facility facility);

    Long countByChild(Child child);

    Optional<ChildFollowup> findByUuid(String uuid);
}
