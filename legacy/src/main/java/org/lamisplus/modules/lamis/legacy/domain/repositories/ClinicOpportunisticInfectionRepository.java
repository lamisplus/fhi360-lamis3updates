package org.lamisplus.modules.lamis.legacy.domain.repositories;

import org.lamisplus.modules.lamis.legacy.domain.entities.Clinic;
import org.lamisplus.modules.lamis.legacy.domain.entities.ClinicOpportunisticInfection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClinicOpportunisticInfectionRepository extends JpaRepository<ClinicOpportunisticInfection, Long> {
    List<ClinicOpportunisticInfection> findByClinic(Clinic clinic);
}
