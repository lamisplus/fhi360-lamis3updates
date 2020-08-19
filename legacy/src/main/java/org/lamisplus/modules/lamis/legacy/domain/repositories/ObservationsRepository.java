package org.lamisplus.modules.lamis.legacy.domain.repositories;

import org.lamisplus.modules.lamis.legacy.domain.entities.Observations;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ObservationsRepository extends JpaRepository<Observations, String> {
    List<Observations> findByPatientAndType(Patient patient, String type);
}
