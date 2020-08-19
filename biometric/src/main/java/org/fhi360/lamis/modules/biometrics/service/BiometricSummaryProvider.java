package org.fhi360.lamis.modules.biometrics.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.fhi360.lamis.modules.patient.service.providers.PatientSummaryProvider;
import org.fhi360.lamis.modules.patient.service.providers.vm.Field;
import org.fhi360.lamis.modules.patient.service.providers.vm.Summary;
import org.lamisplus.modules.lamis.legacy.domain.entities.Biometric;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.lamisplus.modules.lamis.legacy.domain.repositories.BiometricRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BiometricSummaryProvider implements PatientSummaryProvider {
    private final BiometricRepository biometricRepository;

    @Override
    public List<Summary> getSummaries(Patient patient) {
        List<Summary> summaries = new ArrayList<>();
        List<Biometric> biometrics = biometricRepository.findByPatient(patient);
        Summary summary = new Summary();
        summary.setHeader("Biometric Enrollment");
        List<Field> fields = new ArrayList<>();
        Field field = new Field(Field.FieldType.BOOLEAN, "Enrolled", !biometrics.isEmpty());
        fields.add(field);
        field = new Field(Field.FieldType.INT, "Fingers Enrolled", biometrics.size());
        fields.add(field);
        summary.setFields(fields);
        summaries.add(summary);
        return summaries;
    }
}

