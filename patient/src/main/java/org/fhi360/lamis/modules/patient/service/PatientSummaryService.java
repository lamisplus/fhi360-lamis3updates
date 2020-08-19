package org.fhi360.lamis.modules.patient.service;

import lombok.RequiredArgsConstructor;
import org.fhi360.lamis.modules.patient.service.providers.PatientSummaryProvider;
import org.lamisplus.modules.base.module.BeanProvider;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientSummaryService {
    private final BeanProvider beanProvider;

    public List<PatientSummaryProvider> getSummaryProviders() {
        return new ArrayList<>(beanProvider.getBeansOfType(PatientSummaryProvider.class));
    }
}
