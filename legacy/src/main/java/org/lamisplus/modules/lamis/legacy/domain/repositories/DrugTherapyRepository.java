package org.lamisplus.modules.lamis.legacy.domain.repositories;


import org.lamisplus.modules.lamis.legacy.domain.entities.DrugTherapy;
import org.lamisplus.modules.lamis.legacy.domain.entities.Facility;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DrugTherapyRepository extends JpaRepository<DrugTherapy, Long> {
    DrugTherapy findByPatientAndDateVisit(Patient patient, LocalDate date);

    DrugTherapy findByFacilityAndPatientAndDateVisit(Facility facility, Patient patient, LocalDate date);

    List<DrugTherapy> findByPatient(Patient patient);
}
