package org.lamisplus.modules.lamis.legacy.domain.repositories;

import org.lamisplus.modules.lamis.legacy.domain.entities.Biometric;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BiometricRepository extends JpaRepository<Biometric, String> {
    List<Biometric> findByPatient(Patient patient);
}
