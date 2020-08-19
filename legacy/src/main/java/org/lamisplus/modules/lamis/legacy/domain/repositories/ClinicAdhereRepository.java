package org.lamisplus.modules.lamis.legacy.domain.repositories;

import org.lamisplus.modules.lamis.legacy.domain.entities.Clinic;
import org.lamisplus.modules.lamis.legacy.domain.entities.ClinicAdhere;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClinicAdhereRepository extends JpaRepository<ClinicAdhere, Long> {
    List<ClinicAdhere> findByClinic(Clinic clinic);
}
