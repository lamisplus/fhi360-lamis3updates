package org.fhi360.lamis.modules.patient.web.rest;

import lombok.RequiredArgsConstructor;
import org.fhi360.lamis.modules.patient.service.PatientObservationViewService;
import org.fhi360.lamis.modules.patient.web.rest.vm.ObservationView;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.lamisplus.modules.lamis.legacy.domain.repositories.PatientRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PatientObservationResource {
    private final PatientObservationViewService patientObservationViewService;
    private final PatientRepository patientRepository;

    @GetMapping("/patients/{patientId:\\d+}/observations")
    public List<ObservationView> getObservations(@PathVariable Long patientId) {
        Patient patient = patientRepository.findById(patientId).orElse(null);
        if (patient == null) {
            return new ArrayList<>();
        }

        return patientObservationViewService.getObservationsFor(patient)
                .stream()
                .map(ObservationView::new)
                .collect(Collectors.toList());
    }
}
