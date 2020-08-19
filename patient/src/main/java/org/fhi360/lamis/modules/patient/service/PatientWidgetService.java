package org.fhi360.lamis.modules.patient.service;

import lombok.RequiredArgsConstructor;
import org.fhi360.lamis.modules.patient.service.providers.PatientWidgetProvider;
import org.lamisplus.modules.base.module.BeanProvider;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientWidgetService {
    private final BeanProvider beanProvider;

    public List<PatientWidgetProvider> getWidgetsFor(Patient patient) {
        return beanProvider.getBeansOfType(PatientWidgetProvider.class)
                .stream()
                .filter(v -> v.applicableTo(patient))
                .collect(Collectors.toList());
    }

    public List<PatientWidgetProvider> getWidgets() {
        return new ArrayList<>(beanProvider.getBeansOfType(PatientWidgetProvider.class));
    }
}
