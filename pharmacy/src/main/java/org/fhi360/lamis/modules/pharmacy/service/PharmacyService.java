package org.fhi360.lamis.modules.pharmacy.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.fhi360.lamis.modules.pharmacy.web.rest.vm.PharmacyDTO;
import org.fhi360.lamis.modules.pharmacy.web.rest.vm.PharmacyLineDTO;
import org.fhi360.lamis.modules.pharmacy.web.rest.vm.RegimenInfo;
import org.lamisplus.modules.base.web.rest.JobSchedulerResource;
import org.lamisplus.modules.base.web.vm.ScheduleRequest;
import org.lamisplus.modules.lamis.legacy.domain.entities.*;
import org.lamisplus.modules.lamis.legacy.domain.entities.enumerations.ClientStatus;
import org.lamisplus.modules.lamis.legacy.domain.repositories.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.sql.ResultSet;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

import static org.lamisplus.modules.lamis.legacy.domain.entities.enumerations.ClientStatus.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class PharmacyService {
    private final PharmacyRepository pharmacyRepository;
    private final PatientRepository patientRepository;
    private final PharmacyLineRepository pharmacyLineRepository;
    private final RegimenHistoryRepository regimenHistoryRepository;
    private final StatusHistoryRepository statusHistoryRepository;
    private final DevolveRepository devolveRepository;
    private final JobSchedulerResource jobSchedulerResource;
    private final JdbcTemplate jdbcTemplate;

    public Pharmacy savePharmacy(PharmacyDTO dto) {
        RegimenHistory regimenHistory = regimenHistoryRepository
                .getRegimenHistoryByPatientAt(dto.getPatient(), dto.getDateVisit()).orElse(null);
        Pharmacy pharmacy = new Pharmacy();
        //pharmacy.setId(dto.getId());
        pharmacy.setPatient(dto.getPatient());
        pharmacy.setFacility(dto.getFacility());
        pharmacy.setMmdType(dto.getMmdType());
        pharmacy.setDateVisit(dto.getDateVisit());
        pharmacy.setNextAppointment(dto.getNextAppointment());
        pharmacy.setPrescriptionError(dto.getPrescriptionError());
        pharmacy.setAdherence(dto.getAdherence());
        pharmacy.setAdrScreened(dto.getAdrScreened());

        Set<PharmacyLine> lines = dto.getLines().stream().map(line -> {
            PharmacyLine pharmacyLine = new PharmacyLine();
            //pharmacyLine.setId(dto.getId());
            pharmacyLine.setPatient(dto.getPatient());
            pharmacyLine.setFacility(dto.getFacility());
            pharmacyLine.setPharmacy(pharmacy);
            pharmacyLine.setMorning(line.getMorning());
            pharmacyLine.setAfternoon(line.getAfternoon());
            pharmacyLine.setEvening(line.getEvening());
            pharmacyLine.setDuration(line.getDuration());
            pharmacyLine.setRegimen(line.getRegimen());
            pharmacyLine.setRegimenType(line.getRegimenType());
            pharmacyLine.setRegimenDrug(line.getRegimenDrug());

            if (Arrays.asList(1, 2, 3, 4, 14).contains(line.getRegimenType().getId())) {
                if (regimenHistory == null || !regimenHistory.getRegimen().equals(line.getRegimen())) {
                    RegimenHistory history = new RegimenHistory();
                    history.setDateVisit(dto.getDateVisit());
                    history.setRegimen(line.getRegimen());
                    history.setRegimenType(line.getRegimenType());
                    history.setPatient(dto.getPatient());
                    history.setFacility(dto.getFacility());
                    regimenHistoryRepository.save(history);
                }
            }
            return pharmacyLine;
        }).collect(Collectors.toSet());
        List<StatusHistory> statusHistories1 = statusHistoryRepository
                .findByPatientAndDateStatusBefore(pharmacy.getPatient(), pharmacy.getDateVisit().plusDays(1));
        if (statusHistories1.size() <= 1) {
            StatusHistory history = new StatusHistory();
            history.setFacility(pharmacy.getFacility());
            history.setPatient(pharmacy.getPatient());
            history.setDateStatus(pharmacy.getDateVisit());
            history.setStatus(ClientStatus.ART_START);
            Patient patient = patientRepository.findById(pharmacy.getPatient().getId()).orElse(null);
            if (patient != null && patient.getStatusAtRegistration().equals(ClientStatus.ART_TRANSFER_IN)) {
                history.setStatus(ClientStatus.ART_TRANSFER_IN);
            }
            statusHistoryRepository.save(history);
        } else {
            ClientStatus status = getStatus(pharmacy.getPatient());
            List<ClientStatus> statuses = Arrays.asList(STOPPED_TREATMENT, LOST_TO_FOLLOWUP, DID_NOT_ATTEMPT_TO_TRACE,
                    TRACED_AGREED_TO_RETURN_TO_CARE, TRACED_UNABLE_TO_LOCATE);
            if (statuses.contains(status)) {
                StatusHistory history = new StatusHistory();
                history.setFacility(pharmacy.getFacility());
                history.setPatient(pharmacy.getPatient());
                history.setDateStatus(pharmacy.getDateVisit());
                history.setStatus(ART_RESTART);
                statusHistoryRepository.save(history);
            }
        }
        List<StatusHistory> statusHistories = statusHistoryRepository.findByPatientAndDateStatusBefore(pharmacy.getPatient(),
                pharmacy.getDateVisit().plusMonths(1));
        statusHistories.stream()
                .sorted((s1, s2) -> s2.getDateStatus().compareTo(s1.getDateStatus()))
                .forEach(s -> {
                    if (!s.getDateStatus().isBefore(pharmacy.getDateVisit()) && s.getAuto()) {
                        statusHistoryRepository.delete(s);
                    }
                });
        statusHistoryRepository.findByPatientAndDateStatusAfter(pharmacy.getPatient(),
                pharmacy.getDateVisit().minusDays(1), PageRequest.of(0, 100000)).forEach(history -> {
            if (history.getStatus() != null && history.getStatus().equals(LOST_TO_FOLLOWUP)) {
                statusHistoryRepository.delete(history);
            }
        });
        final Devolve[] devolve = {null};
        if (dto.getId() != null) {
            devolveRepository.findByPatient(pharmacy.getPatient())
                    .forEach(d -> {
                        if (d.getRelatedPharmacy() != null && Objects.equals(dto.getId(), d.getRelatedPharmacy().getId())) {
                            devolve[0] = d;
                        }
                    });
            pharmacyRepository.deleteById(dto.getId());
        }
        pharmacy.getLines().addAll(lines);
        Pharmacy pharmacy1 = pharmacyRepository.save(pharmacy);
        if (devolve[0] != null) {
            devolve[0].setRelatedPharmacy(pharmacy1);
            devolveRepository.save(devolve[0]);
        }
        return pharmacy1;
    }

    public Pharmacy updatePharmacy(PharmacyDTO dto) {
        return savePharmacy(dto);
    }

    public List<PharmacyLineDTO> getPharmacyLines(Long pharmacyId) {
        List<PharmacyLineDTO> lines = new ArrayList<>();
        pharmacyRepository.findById(pharmacyId).ifPresent(pharmacy ->
                pharmacyLineRepository.findByPharmacy(pharmacy).forEach(pharmacyLine -> {
                    PharmacyLineDTO line = new PharmacyLineDTO();
                    line.setId(pharmacyLine.getId());
                    line.setMorning(pharmacyLine.getMorning());
                    line.setAfternoon(pharmacyLine.getAfternoon());
                    line.setEvening(pharmacyLine.getEvening());
                    line.setDuration(pharmacyLine.getDuration());
                    line.setDescription(pharmacyLine.getRegimenDrug().getDrug().getName());
                    line.setDrug(pharmacyLine.getRegimenDrug().getDrug());
                    line.setRegimenDrug(pharmacyLine.getRegimenDrug());
                    line.setRegimen(pharmacyLine.getRegimen());
                    line.setRegimenType(pharmacyLine.getRegimenType());
                    lines.add(line);
                }));
        return lines;
    }

    public RegimenInfo getRegimeInfo(Long patientId) {
        RegimenInfo regimenInfo = new RegimenInfo("", "");
        Patient patient = patientRepository.findById(patientId).orElse(null);
        if (patient != null) {
            Pharmacy pharmacy = pharmacyRepository.getLastRefillByPatient(patient);
            if (pharmacy != null) {
                List<PharmacyLine> lines = pharmacyLineRepository.findByPharmacy(pharmacy);
                PharmacyLine line = lines.stream()
                        .filter(l -> (l.getRegimenType().getId() < 5) || l.getRegimenType().getId() == 14)
                        .findAny().get();
                regimenInfo = new RegimenInfo(line.getRegimenType().getDescription(), line.getRegimen().getDescription());
            }
        }
        return regimenInfo;
    }

    public void deletePharmacy(String uuid) {
        pharmacyRepository.findByUuid(uuid).ifPresent(pharmacy -> deletePharmacy(pharmacy.getId()));
    }

    public void deletePharmacy(Long pharmacyId) {
        pharmacyRepository.findById(pharmacyId).ifPresent(pharmacy -> {
            Patient patient = pharmacy.getPatient();
            devolveRepository.findByPatient(patient)
                    .forEach(devolve -> {
                        if (devolve.getRelatedPharmacy() != null && Objects.equals(pharmacyId, devolve.getRelatedPharmacy().getId())) {
                            devolve.setRelatedPharmacy(null);
                            devolveRepository.save(devolve);
                        }
                    });
            statusHistoryRepository.getCurrentStatusForPatientAt(patient, pharmacy.getDateVisit())
                    .ifPresent(statusHistory -> {
                        if (statusHistory.getDateStatus().equals(pharmacy.getDateVisit())) {
                            statusHistoryRepository.delete(statusHistory);
                        }
                    });
            regimenHistoryRepository.getRegimenHistoryByPatientAt(patient, pharmacy.getDateVisit())
                    .ifPresent(history -> {
                        if (history.getDateVisit().equals(pharmacy.getDateVisit())) {
                            regimenHistoryRepository.delete(history);
                        }
                    });
            pharmacyRepository.delete(pharmacy);
        });
    }

    //@Transactional
    public void updateLostToFollowup() {
        patientRepository.findAll().stream()
                .filter(patient -> hasPharmacyVisitWithinLast6Months(patient.getId()))
                .forEach(patient -> {
                    pharmacyRepository.getLTFUDate(patient.getId()).ifPresent(date -> {
                        if (!convertToLocalDate(date).isBefore(LocalDate.now().minusMonths(6))
                                && !convertToLocalDate(date).isAfter(LocalDate.now())) {
                            Optional<StatusHistory> currentStatus = statusHistoryRepository.getCurrentStatusForPatient(patient);
                            if (!currentStatus.isPresent() ||
                                    !Arrays.asList(LOST_TO_FOLLOWUP, ART_TRANSFER_OUT, STOPPED_TREATMENT, KNOWN_DEATH)
                                            .contains(currentStatus.get().getStatus())) {
                                StatusHistory history = new StatusHistory();
                                history.setAuto(true);
                                history.setPatient(patient);
                                history.setFacility(patient.getFacility());
                                history.setDateStatus(convertToLocalDate(date));
                                history.setStatus(LOST_TO_FOLLOWUP);
                                statusHistoryRepository.save(history);
                            }
                        }
                    });
                });
    }

    @PostConstruct
    public void init() {

        String jobClass = "org.fhi360.lamis.modules.pharmacy.service.LostToFollowupJob";
        boolean scheduled = jobSchedulerResource.listJobClasses()
                .stream()
                .anyMatch(c -> c.equals(jobClass));
        if (!scheduled) {
            ScheduleRequest request = new ScheduleRequest();
            request.setJobClass(jobClass);
            request.setCronExpression("0 0 10 ? * *");
            try {
                jobSchedulerResource.scheduleJob(request);
            } catch (Exception ignored) {
            }
        }
    }

    private Boolean hasPharmacyVisitWithinLast6Months(Long patientId) {
        return jdbcTemplate.query("select date_visit from pharmacy where patient_id = ? and date_visit >= " +
                        "current_date - interval '6 months' and archived = false",
                ResultSet::next, patientId);
    }

    private LocalDate convertToLocalDate(Date date) {
        return Instant.ofEpochMilli(date.getTime())
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
    }

    public ClientStatus getStatus(Patient patient) {
        ClientStatus status = patient.getStatusAtRegistration();
        Optional<Date> date = pharmacyRepository.getLTFUDate(patient.getId());
        Optional<StatusHistory> statusHistory = statusHistoryRepository.getCurrentStatusForPatientAt(patient, LocalDate.now());
        if (!date.isPresent()) {
            if (patient.getStatusAtRegistration() != null) {
                status = patient.getStatusAtRegistration();
            } else if (statusHistory.isPresent()) {
                status = statusHistory.get().getStatus();
            }
        } else {
            LocalDate ltfuDate = Instant.ofEpochMilli(date.get().getTime()).atZone(ZoneId.systemDefault()).toLocalDate();

            if (!ltfuDate.isBefore(LocalDate.now())) {
                if (statusHistory.isPresent() && statusHistory.get().getStatus().equals(ClientStatus.KNOWN_DEATH)) {
                    status = ClientStatus.KNOWN_DEATH;
                } else if (statusHistory.isPresent() && statusHistory.get().getStatus().equals(ClientStatus.ART_TRANSFER_OUT)) {
                    status = ClientStatus.ART_TRANSFER_OUT;
                } else if (statusHistory.isPresent() && statusHistory.get().getStatus().equals(ClientStatus.STOPPED_TREATMENT)) {
                    status = ClientStatus.STOPPED_TREATMENT;
                } else if (statusHistory.isPresent()) {
                    StatusHistory history = statusHistory.get();
                    if (history.getStatus().equals(ClientStatus.ART_RESTART)) {
                        status = ClientStatus.ART_RESTART;
                    } else if (history.getStatus().equals(ClientStatus.ART_START)) {
                        status = ClientStatus.ART_START;
                    } else if (history.getStatus().equals(ClientStatus.ART_TRANSFER_IN)) {
                        status = ClientStatus.ART_TRANSFER_IN;
                    } else {
                        status = ClientStatus.ART_START;
                    }
                } else {
                    status = ClientStatus.ART_START;
                }
            } else {
                if (statusHistory.isPresent() && statusHistory.get().getStatus().equals(ClientStatus.KNOWN_DEATH)) {
                    status = ClientStatus.KNOWN_DEATH;
                } else if (statusHistory.isPresent() && statusHistory.get().getStatus().equals(ClientStatus.ART_TRANSFER_OUT)) {
                    status = ClientStatus.ART_TRANSFER_OUT;
                } else if (statusHistory.isPresent() && statusHistory.get().getStatus().equals(ClientStatus.STOPPED_TREATMENT)) {
                    status = ClientStatus.STOPPED_TREATMENT;
                } else {
                    status = ClientStatus.LOST_TO_FOLLOWUP;
                }
            }
        }
        return status;
    }

    @Transactional
    public Long count() {
        return pharmacyRepository.count();
    }
}
