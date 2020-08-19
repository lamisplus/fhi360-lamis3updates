package org.fhi360.lamis.modules.biometrics.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.fhi360.lamis.modules.patient.service.providers.PatientActivityProvider;
import org.fhi360.lamis.modules.patient.service.providers.vm.PatientActivity;
import org.lamisplus.modules.lamis.legacy.domain.entities.Biometric;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.lamisplus.modules.lamis.legacy.domain.repositories.BiometricRepository;
import org.lamisplus.modules.lamis.legacy.domain.repositories.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BiometricsActivityProvider implements PatientActivityProvider {
    private final BiometricRepository biometricRepository;

    @Override
    public List<PatientActivity> getActivitiesFor(Patient patient) {
        List<PatientActivity> activities = new ArrayList<>();
        List<Biometric> biometrics = biometricRepository.findByPatient(patient);

        biometrics.stream()
                .sorted(Comparator.comparing(Biometric::getDate))
                .limit(1)
                .forEach(biometric -> {
                    String name = "Biometric Enrollment";
                    PatientActivity activity = new PatientActivity(biometric.getId(), name, biometric.getDate(), "", "biometrics");
                    activity.setDeletable(false);
                    activity.setEditable(false);
                    activity.setViewable(false);
                    activities.add(activity);
                });
        return activities;
    }
}
