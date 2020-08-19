package org.fhi360.lamis.modules.patient.web.rest;

import lombok.RequiredArgsConstructor;
import org.fhi360.lamis.modules.patient.service.PatientSummaryService;
import org.fhi360.lamis.modules.patient.service.providers.PatientSummaryProvider;
import org.fhi360.lamis.modules.patient.service.providers.vm.Summary;
import org.lamisplus.modules.lamis.legacy.domain.repositories.PatientRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PatientSummaryResource {
    private final PatientSummaryService patientSummaryService;
    private final PatientRepository patientRepository;

    @GetMapping("/patients/{id}/summary")
    public List<Summary> getSummaryForPatient(@PathVariable Long id) {
        return patientRepository.findById(id).map(patient -> {
            List<PatientSummaryProvider> providers = patientSummaryService.getSummaryProviders();
            List<Summary> summaries = new ArrayList<>();
            providers.forEach(provider -> summaries.addAll(provider.getSummaries(patient)));
            return summaries;
        }).orElse(new ArrayList<>());
    }
}
