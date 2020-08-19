package org.lamisplus.modules.lamis.legacy.domain.repositories;


import org.lamisplus.modules.lamis.legacy.domain.entities.Appointment;
import org.lamisplus.modules.lamis.legacy.domain.entities.Facility;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    Appointment findByPatientAndDateTracked(Patient patient, LocalDate date);

    Appointment findByFacilityAndPatientAndDateTracked(Facility facility, Patient patient, LocalDate date);

    List<Appointment> findByPatient(Patient patient);

    Optional<Appointment> findByUuid(String uuid);
}
