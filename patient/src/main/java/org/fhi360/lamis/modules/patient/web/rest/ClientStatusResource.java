package org.fhi360.lamis.modules.patient.web.rest;

import io.github.jhipster.web.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.base.web.errors.BadRequestAlertException;
import org.lamisplus.modules.base.web.util.HeaderUtil;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.lamisplus.modules.lamis.legacy.domain.entities.StatusHistory;
import org.lamisplus.modules.lamis.legacy.domain.entities.enumerations.ClientStatus;
import org.lamisplus.modules.lamis.legacy.domain.repositories.PatientRepository;
import org.lamisplus.modules.lamis.legacy.domain.repositories.PharmacyRepository;
import org.lamisplus.modules.lamis.legacy.domain.repositories.StatusHistoryRepository;
import org.lamisplus.modules.lamis.legacy.domain.repositories.projections.CurrentStatusDates;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class ClientStatusResource {
    private static final String ENTITY_NAME = "client-status";

    private final StatusHistoryRepository statusHistoryRepository;
    private final PatientRepository patientRepository;
    private final PharmacyRepository pharmacyRepository;

    /**
     * POST  /client-statuses : Create a new status history.
     *
     * @param statusHistory the status history to create
     * @return the ResponseEntity with status 201 (Created) and with body the new status history, or with status 400 (Bad Request) if the status history has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/client-statuses")
    public ResponseEntity<StatusHistory> createStatus(@RequestBody StatusHistory statusHistory) throws URISyntaxException {
        LOG.debug("REST request to save Client status : {}", statusHistory);
        if (statusHistory.getId() != null) {
            throw new BadRequestAlertException("A new status cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StatusHistory result = statusHistoryRepository.save(statusHistory);
        return ResponseEntity.created(new URI("/api/client-statuses/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * PUT  /client-statuses : Updates an existing status history.
     *
     * @param statusHistory the status history to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated status history,
     * or with status 400 (Bad Request) if the status history is not valid,
     * or with status 500 (Internal Server Error) if the status history couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/client-statuses")
    public ResponseEntity<StatusHistory> updateStatus(@RequestBody StatusHistory statusHistory) throws URISyntaxException {
        LOG.debug("REST request to update status history : {}", statusHistory);
        if (statusHistory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StatusHistory result = statusHistoryRepository.save(statusHistory);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, statusHistory.getId().toString()))
                .body(result);
    }

    /**
     * GET  /client-statuses/:id : get the "id" status.
     *
     * @param id the id of the statusHistory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the statusHistory, or with status 404 (Not Found)
     */
    @GetMapping("/client-statuses/{id}")
    public ResponseEntity<StatusHistory> getStatus(@PathVariable Long id) {
        LOG.debug("REST request to get Status history : {}", id);
        Optional<StatusHistory> statusHistory = statusHistoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(statusHistory);
    }

    /**
     * GET  /client-statuses/:id : get the "id" status.
     *
     * @param id the id of the statusHistory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the statusHistory, or with status 404 (Not Found)
     */
    @GetMapping("/client-statuses/by-uuid/{id}")
    public ResponseEntity<StatusHistory> getStatusByUuid(@PathVariable String id) {
        LOG.debug("REST request to get Status history : {}", id);
        Optional<StatusHistory> statusHistory = statusHistoryRepository.findByUuid(id);
        return ResponseUtil.wrapOrNotFound(statusHistory);
    }

    /**
     * DELETE  /client-statuses/:id : delete the "id" statusHistory.
     *
     * @param id the id of the statusHistory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/client-statuses/{id}")
    public ResponseEntity<Void> deleteStatus(@PathVariable Long id) {
        LOG.debug("REST request to delete Status history : {}", id);
        statusHistoryRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * DELETE  /client-statuses/:id : delete the "id" statusHistory.
     *
     * @param id the id of the statusHistory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/client-statuses/by-uuid/{id}")
    public ResponseEntity<Void> deleteStatusByUuid(@PathVariable String id) {
        LOG.debug("REST request to delete Status history : {}", id);
        statusHistoryRepository.findByUuid(id).ifPresent(statusHistoryRepository::delete);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }

    @GetMapping("/client-statuses/{id}/name")
    public String getStatusName(@PathVariable Long id) {
        return statusHistoryRepository.findById(id).map(s -> s.getStatus().getStatus()).orElse("");
    }

    @GetMapping("/client-statuses/patient/{id}/status-dates")
    public List<LocalDate> getVisitDatesByStatus(@PathVariable Long id) {
        List<LocalDate> visitDates = new ArrayList<>();
        patientRepository.findById(id).ifPresent(patient -> {
            List<LocalDate> dates = statusHistoryRepository.findVisitsByPatient(patient).stream()
                    .map(CurrentStatusDates::getDateStatus)
                    .collect(Collectors.toList());
            visitDates.addAll(dates);
        });
        return visitDates;
    }

    @GetMapping("/client-statuses/patient/{patientId}/current")
    public ResponseEntity<String> getCurrentStatus(@PathVariable String patientId) {
        Patient patient = patientRepository.findByUuid(patientId).orElse(null);

        if (patient != null) {
            String status = "";
            Optional<Date> date = pharmacyRepository.getLTFUDate(patient.getId());
            Optional<StatusHistory> statusHistory = statusHistoryRepository.getCurrentStatusForPatientAt(patient, LocalDate.now());
            if (!date.isPresent()) {
                if (patient.getStatusAtRegistration() != null) {
                    status = patient.getStatusAtRegistration().getStatus();
                } else if (statusHistory.isPresent()) {
                    status = statusHistory.get().getStatus().getStatus();
                }
            } else {
                LocalDate ltfuDate = Instant.ofEpochMilli(date.get().getTime()).atZone(ZoneId.systemDefault()).toLocalDate();

                if (!ltfuDate.isBefore(LocalDate.now())) {
                    if (statusHistory.isPresent() && statusHistory.get().getStatus().equals(ClientStatus.KNOWN_DEATH)) {
                        status = ClientStatus.KNOWN_DEATH.getStatus();
                    } else if (statusHistory.isPresent() && statusHistory.get().getStatus().equals(ClientStatus.ART_TRANSFER_OUT)) {
                        status = ClientStatus.ART_TRANSFER_OUT.getStatus();
                    } else if (statusHistory.isPresent() && statusHistory.get().getStatus().equals(ClientStatus.STOPPED_TREATMENT)) {
                        status = ClientStatus.STOPPED_TREATMENT.getStatus();
                    } else if (statusHistory.isPresent()) {
                        StatusHistory history = statusHistory.get();
                        if (history.getStatus().equals(ClientStatus.ART_RESTART)) {
                            status = ClientStatus.ART_RESTART.getStatus();
                        } else if (history.getStatus().equals(ClientStatus.ART_START)) {
                            status = ClientStatus.ART_START.getStatus();
                        } else if (history.getStatus().equals(ClientStatus.ART_TRANSFER_IN)) {
                            status = ClientStatus.ART_TRANSFER_IN.getStatus();
                        } else {
                            status = ClientStatus.ART_START.getStatus();
                        }
                    } else {
                        status = ClientStatus.ART_START.getStatus();
                    }
                } else {
                    if (statusHistory.isPresent() && statusHistory.get().getStatus().equals(ClientStatus.KNOWN_DEATH)) {
                        status = ClientStatus.KNOWN_DEATH.getStatus();
                    } else if (statusHistory.isPresent() && statusHistory.get().getStatus().equals(ClientStatus.ART_TRANSFER_OUT)) {
                        status = ClientStatus.ART_TRANSFER_OUT.getStatus();
                    } else if (statusHistory.isPresent() && statusHistory.get().getStatus().equals(ClientStatus.STOPPED_TREATMENT)) {
                        status = ClientStatus.STOPPED_TREATMENT.getStatus();
                    } else {
                        status = ClientStatus.LOST_TO_FOLLOWUP.getStatus();
                    }
                }
            }
            return ResponseEntity.ok(status);
        }
        return ResponseEntity.ok("");
    }
}
