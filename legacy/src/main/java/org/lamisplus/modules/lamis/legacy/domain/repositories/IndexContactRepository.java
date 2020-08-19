package org.lamisplus.modules.lamis.legacy.domain.repositories;

import org.lamisplus.modules.lamis.legacy.domain.entities.Facility;
import org.lamisplus.modules.lamis.legacy.domain.entities.Hts;
import org.lamisplus.modules.lamis.legacy.domain.entities.IndexContact;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IndexContactRepository extends JpaRepository<IndexContact, Long> {
    IndexContact findByClientCode(String code);

    IndexContact findByClientCodeAndFacility(String code, Facility facility);

    List<IndexContact> findByHts(Hts hts, Pageable pageable);

    Optional<IndexContact> findByUuid(String uuid);
}
