package org.fhi360.lamis.modules.patient.service;

import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.lamisplus.modules.lamis.legacy.domain.entities.StatusHistory;
import org.lamisplus.modules.lamis.legacy.domain.repositories.PatientRepository;
import org.lamisplus.modules.lamis.legacy.domain.repositories.PharmacyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientRepository patientRepository;
    private final PharmacyRepository pharmacyRepository;

    public Patient savePatient(Patient patient) {
        StatusHistory statusHistory = new StatusHistory();
        statusHistory.setPatient(patient);
        statusHistory.setFacility(patient.getFacility());
        statusHistory.setDateStatus(patient.getDateRegistration());
        statusHistory.setStatus(patient.getStatusAtRegistration());

        patient.getStatusHistories().add(statusHistory);
        return patientRepository.save(patient);
    }

    @Transactional
    public Date getLTFUDate() {
        return pharmacyRepository.getLTFUDate(54L).orElse(new Date());
    }
}
