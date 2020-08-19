package org.fhi360.lamis.modules.patient.service;

import lombok.RequiredArgsConstructor;
import org.fhi360.lamis.modules.patient.service.providers.PatientActivityProvider;
import org.fhi360.lamis.modules.patient.service.providers.vm.PatientActivity;
import org.lamisplus.modules.base.module.BeanProvider;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class PatientActivityService {
    private final BeanProvider beanProvider;

    public List<PatientActivity> getActivitiesFor(Patient patient) {
        return beanProvider.getBeansOfType(PatientActivityProvider.class)
                .stream()
                .flatMap(activityProvider -> activityProvider.getActivitiesFor(patient).stream())
                .collect(toList());
    }
}
