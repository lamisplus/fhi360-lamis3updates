package org.fhi360.lamis.modules.patient.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.fhi360.lamis.modules.patient.service.providers.PatientObservationViewProvider;
import org.lamisplus.modules.base.module.BeanProvider;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.lamisplus.modules.lamis.legacy.domain.entities.StatusHistory;
import org.lamisplus.modules.lamis.legacy.domain.entities.enumerations.ClientStatus;
import org.lamisplus.modules.lamis.legacy.domain.repositories.StatusHistoryRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
@Slf4j
public class PatientObservationViewService {
    private final BeanProvider beanProvider;
    private final StatusHistoryRepository statusHistoryRepository;

    public List<PatientObservationViewProvider> getObservationsFor(Patient patient) {

        return beanProvider.getBeansOfType(PatientObservationViewProvider.class)
                .stream()
                /*.filter(provider -> {
                    Optional<StatusHistory> optional = statusHistoryRepository.getCurrentStatusForPatient(patient);
                    return !optional.isPresent() || !optional.get().getStatus().equals(ClientStatus.KNOWN_DEATH);
                })*/
                .filter(provider -> provider.applicableTo(patient))
                .sorted(Comparator.comparing(PatientObservationViewProvider::getName))
                .collect(toList());
    }
}
