package org.lamisplus.modules.lamis.legacy.domain.repositories;


import org.lamisplus.modules.lamis.legacy.domain.entities.Delivery;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    List<Delivery> findByPatientAndDateDelivery(Patient patient, LocalDate date);

    List<Delivery> findByPatient(Patient patient);

    Optional<Delivery> findByUuid(String uuid);
}
