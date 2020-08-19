package org.lamisplus.modules.lamis.legacy.domain.repositories;

import org.lamisplus.modules.lamis.legacy.domain.entities.Pharmacy;
import org.lamisplus.modules.lamis.legacy.domain.entities.PharmacyAdverseDrugReaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PharmacyAdverseDrugReactionRepository extends JpaRepository<PharmacyAdverseDrugReaction, Long> {
    List<PharmacyAdverseDrugReaction> findByPharmacy(Pharmacy pharmacy);
}
