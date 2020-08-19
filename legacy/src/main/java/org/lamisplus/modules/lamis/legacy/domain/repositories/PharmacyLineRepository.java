package org.lamisplus.modules.lamis.legacy.domain.repositories;

import org.lamisplus.modules.lamis.legacy.domain.entities.Pharmacy;
import org.lamisplus.modules.lamis.legacy.domain.entities.PharmacyLine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PharmacyLineRepository extends JpaRepository<PharmacyLine, Long> {
    List<PharmacyLine> findByPharmacy(Pharmacy pharmacy);
}
