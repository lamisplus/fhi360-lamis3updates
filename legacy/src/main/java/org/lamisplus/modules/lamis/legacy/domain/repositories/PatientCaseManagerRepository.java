package org.lamisplus.modules.lamis.legacy.domain.repositories;


import org.lamisplus.modules.lamis.legacy.domain.entities.CaseManager;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.lamisplus.modules.lamis.legacy.domain.entities.PatientCaseManager;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PatientCaseManagerRepository extends JpaRepository<PatientCaseManager, Long> {
    Optional<PatientCaseManager> findByPatient(Patient patient);

    List<PatientCaseManager> findByCaseManager(CaseManager caseManager);
}
