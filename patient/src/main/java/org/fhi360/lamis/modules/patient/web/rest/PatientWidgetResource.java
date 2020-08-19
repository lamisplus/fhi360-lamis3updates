package org.fhi360.lamis.modules.patient.web.rest;

import lombok.RequiredArgsConstructor;
import org.fhi360.lamis.modules.patient.service.PatientWidgetService;
import org.fhi360.lamis.modules.patient.service.providers.PatientWidgetProvider;
import org.fhi360.lamis.modules.patient.web.rest.vm.PatientWidget;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.lamisplus.modules.lamis.legacy.domain.repositories.PatientRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PatientWidgetResource {
    private final PatientRepository patientRepository;
    private final PatientWidgetService patientWidgetService;

    @GetMapping("/patients/{patientId:\\d+}/widgets")
    public List<PatientWidget> getWidgets(@PathVariable Long patientId) {
        Patient patient = patientRepository.findById(patientId).orElse(null);
        if (patient == null) {
            return new ArrayList<>();
        }

        return patientWidgetService.getWidgetsFor(patient)
                .stream()
                .sorted(Comparator.comparing(PatientWidgetProvider::getIndex))
                .map(PatientWidget::new)
                .collect(Collectors.toList());
    }
}
