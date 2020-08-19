package org.lamisplus.modules.lamis.legacy.domain.repositories;


import org.lamisplus.modules.lamis.legacy.domain.entities.LabTest;
import org.lamisplus.modules.lamis.legacy.domain.entities.LabTestCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LabTestRepository extends JpaRepository<LabTest, Long> {

    List<LabTest> findByLabTestCategory(LabTestCategory category);
}
