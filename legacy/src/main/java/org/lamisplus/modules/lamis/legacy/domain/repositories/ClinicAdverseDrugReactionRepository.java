package org.lamisplus.modules.lamis.legacy.domain.repositories;

import org.lamisplus.modules.lamis.legacy.domain.entities.Clinic;
import org.lamisplus.modules.lamis.legacy.domain.entities.ClinicAdverseDrugReaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClinicAdverseDrugReactionRepository extends JpaRepository<ClinicAdverseDrugReaction, Long> {
    List<ClinicAdverseDrugReaction> findByClinic(Clinic clinic);
}
