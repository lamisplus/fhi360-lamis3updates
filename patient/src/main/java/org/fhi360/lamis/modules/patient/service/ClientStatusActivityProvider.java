package org.fhi360.lamis.modules.patient.service;

import lombok.RequiredArgsConstructor;
import org.fhi360.lamis.modules.patient.service.providers.PatientActivityProvider;
import org.fhi360.lamis.modules.patient.service.providers.vm.PatientActivity;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.lamisplus.modules.lamis.legacy.domain.entities.enumerations.ClientStatus;
import org.lamisplus.modules.lamis.legacy.domain.repositories.StatusHistoryRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ClientStatusActivityProvider implements PatientActivityProvider {
    private final StatusHistoryRepository statusHistoryRepository;

    @Override
    public List<PatientActivity> getActivitiesFor(Patient patient) {
        List<PatientActivity> activities = new ArrayList<>();
        statusHistoryRepository.findByPatient(patient).forEach(history -> {
            String status = history.getStatus() != null ? history.getStatus().getStatus() : "Missing Status";
            if (history.getOutcome() != null) {
                status = history.getOutcome().getStatus();
            }
            PatientActivity activity = new PatientActivity(history.getUuid(), status, history.getDateStatus(), "", "client-statuses");
            activity.setViewable(false);
            if (Arrays.asList(ClientStatus.PRE_ART_TRANSFER_IN, ClientStatus.LOST_TO_FOLLOWUP, ClientStatus.HIV_PLUS_NON_ART,
                    ClientStatus.ART_RESTART, ClientStatus.ART_START, ClientStatus.ART_TRANSFER_IN,
                    ClientStatus.ART_START_EXTERNAL, ClientStatus.HIV_EXPOSED_BABY_HIV_STATUS_UNKNOWN, ClientStatus.HIV_EXPOSED_INFANT_NEGATION,
                    ClientStatus.HIV_NEGATIVE).contains(history.getStatus())) {
                activity.setDeletable(false);
                activity.setEditable(false);
            }
            activities.add(activity);
        });
        return activities;
    }
}
