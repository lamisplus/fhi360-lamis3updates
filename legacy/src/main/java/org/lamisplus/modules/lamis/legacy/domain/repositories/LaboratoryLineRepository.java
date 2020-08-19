package org.lamisplus.modules.lamis.legacy.domain.repositories;

import org.lamisplus.modules.lamis.legacy.domain.entities.Laboratory;
import org.lamisplus.modules.lamis.legacy.domain.entities.LaboratoryLine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LaboratoryLineRepository extends JpaRepository<LaboratoryLine, Long> {
    List<LaboratoryLine> findByLaboratory(Laboratory laboratory);
}
