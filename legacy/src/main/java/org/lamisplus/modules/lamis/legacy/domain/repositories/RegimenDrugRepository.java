package org.lamisplus.modules.lamis.legacy.domain.repositories;


import org.lamisplus.modules.lamis.legacy.domain.entities.Regimen;
import org.lamisplus.modules.lamis.legacy.domain.entities.RegimenDrug;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegimenDrugRepository extends JpaRepository<RegimenDrug, Long> {
    List<RegimenDrug> findByRegimen(Regimen regimen);
}
