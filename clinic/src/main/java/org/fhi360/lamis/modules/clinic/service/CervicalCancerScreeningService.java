package org.fhi360.lamis.modules.clinic.service;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.lamis.legacy.domain.entities.Observations;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.lamisplus.modules.lamis.legacy.domain.repositories.ObservationsRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CervicalCancerScreeningService {
    private final static String TYPE = "CERVICAL_CANCER_SCREENING";
    private final ObservationsRepository observationsRepository;

    public boolean hasCervicalCancerScreening(Patient patient) {
        return !observationsRepository.findByPatientAndType(patient, TYPE).isEmpty();
    }

    public JsonNode getCervicalCancerScreening(Patient patient) {
        return observationsRepository.findByPatientAndType(patient, TYPE).get(0).getData();
    }

    public void saveScreening(Patient patient, LocalDate date, JsonNode data) {
        List<Observations> observations = observationsRepository.findByPatientAndType(patient, TYPE);
        Observations observation;
        if (!observations.isEmpty()) {
            observation = observations.get(0);
        }else {
            observation = new Observations();
            observation.setPatient(patient);
            observation.setFacility(patient.getFacility());
        }
        observation.setDate(date);
        observation.setData(data);
    }

    public void deleteScreening(Patient patient) {
        observationsRepository.deleteAll(observationsRepository.findByPatientAndType(patient, TYPE));
    }
}
