package org.lamisplus.modules.lamis.legacy.domain.repositories;


import org.lamisplus.modules.base.domain.entities.Province;
import org.lamisplus.modules.lamis.legacy.domain.entities.CommunityPharmacy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommunityPharmacyRepository extends JpaRepository<CommunityPharmacy, Long> {
    Optional<CommunityPharmacy> findByUuid(String uuid);

    List<CommunityPharmacy> findByLga(Province province);
}
