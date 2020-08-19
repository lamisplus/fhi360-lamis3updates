package org.fhi360.lamis.modules.biometrics.service;

import org.fhi360.lamis.modules.patient.service.providers.PatientObservationViewProvider;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.springframework.stereotype.Service;

@Service
public class BiometricObservationProvider implements PatientObservationViewProvider {
    @Override
    public boolean applicableTo(Patient patient) {
        return true;
    }

    @Override
    public String getName() {
        return "Enroll Biometrics";
    }

    @Override
    public String getPath() {
        return "biometrics";
    }

    @Override
    public String getTooltip() {
        return "Enroll or modify patient biometrics";
    }

    @Override
    public String getIcon() {
        return null;
    }
}
