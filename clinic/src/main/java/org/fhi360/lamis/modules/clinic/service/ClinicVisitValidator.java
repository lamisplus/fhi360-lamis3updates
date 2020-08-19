package org.fhi360.lamis.modules.clinic.service;

import lombok.RequiredArgsConstructor;
import org.fhi360.lamis.modules.patient.service.providers.ObservationValidator;
import org.lamisplus.modules.lamis.legacy.domain.entities.Clinic;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.lamisplus.modules.lamis.legacy.domain.repositories.ClinicRepository;
import org.lamisplus.modules.lamis.legacy.web.rest.errors.ObservationValidationException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class ClinicVisitValidator implements ObservationValidator {
    private final ClinicRepository clinicRepository;

    @Override
    public void validate(Object object, Patient patient) throws ObservationValidationException {
        if (object instanceof Clinic) {
            Clinic clinic = (Clinic) object;
            LocalDate dateVisit = clinic.getDateVisit();
            if (dateVisit.isBefore(patient.getDateRegistration())) {
                throw new ObservationValidationException(String.format("Date Visit %s cannot be before Date of Registration %s",
                        dateVisit.format(DateTimeFormatter.ofPattern("dd MMM, yyyy")),
                        patient.getDateRegistration().format(DateTimeFormatter.ofPattern("dd MMM, yyyy"))));
            }
        }
    }

    @Override
    public boolean applicableForType(Class<?> aClass) {
        return aClass.isInstance(Clinic.class);
    }
}
