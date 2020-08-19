package org.fhi360.lamis.modules.clinic.service;

import lombok.RequiredArgsConstructor;
import org.fhi360.lamis.modules.patient.service.providers.PatientObservationViewProvider;
import org.lamisplus.modules.lamis.legacy.domain.entities.LaboratoryLine;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.lamisplus.modules.lamis.legacy.domain.repositories.EacRepository;
import org.lamisplus.modules.lamis.legacy.domain.repositories.LaboratoryLineRepository;
import org.lamisplus.modules.lamis.legacy.domain.repositories.LaboratoryRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EacObservationProvider implements PatientObservationViewProvider {
    private final EacRepository eacRepository;
    private final LaboratoryRepository laboratoryRepository;
    private final LaboratoryLineRepository laboratoryLineRepository;

    @Override
    public boolean applicableTo(Patient patient) {
        final boolean[] above1000 = {false};
        laboratoryRepository.findViralLoadTestByPatient(patient).stream()
                .sorted((l1, l2) -> l2.getDateResultReceived().compareTo(l1.getDateResultReceived()))
                .limit(1)
                .forEach(laboratory -> {
                    LaboratoryLine line = laboratoryLineRepository.findByLaboratory(laboratory)
                            .stream().filter(l -> l.getLabTest().getId() == 16)
                            .findFirst().get();
                    long result= 0L;
                    try {
                        result = Long.parseLong(line.getResult());
                    }catch (NumberFormatException ignored) {}
                    if (result > 1000) {
                        above1000[0] = true;
                    }
                });
        return eacRepository.findByPatient(patient).isEmpty() && above1000[0];
    }

    @Override
    public String getName() {
        return "Start EAC Session";
    }

    @Override
    public String getPath() {
        return "eacs";
    }
}
