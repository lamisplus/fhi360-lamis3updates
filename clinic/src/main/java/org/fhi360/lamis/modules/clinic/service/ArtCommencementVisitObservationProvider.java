package org.fhi360.lamis.modules.clinic.service;

import lombok.AllArgsConstructor;
import org.fhi360.lamis.modules.patient.service.providers.PatientObservationViewProvider;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.lamisplus.modules.lamis.legacy.domain.repositories.ClinicRepository;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ArtCommencementVisitObservationProvider implements PatientObservationViewProvider {
    private final ClinicRepository clinicRepository;

    @Override
    public boolean applicableTo(Patient patient) {
        return !clinicRepository.getArtCommencement(patient).isPresent();
    }

    @Override
    public String getName() {
        return "Commence ART";
    }

    @Override
    public String getPath() {
        return "clinics/art-commencement";
    }

    @Override
    public String getTooltip() {
        return "ART Commencement Visit";
    }

    @Override
    public String getIcon() {
        return null;
    }
}
