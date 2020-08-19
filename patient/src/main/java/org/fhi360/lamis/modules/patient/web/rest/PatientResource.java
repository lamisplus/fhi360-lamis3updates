package org.fhi360.lamis.modules.patient.web.rest;

import com.fasterxml.jackson.databind.JsonNode;
import io.github.jhipster.web.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.fhi360.lamis.modules.patient.service.PatientService;
import org.fhi360.lamis.modules.patient.web.rest.vm.PatientVM;
import org.lamisplus.modules.base.web.errors.BadRequestAlertException;
import org.lamisplus.modules.base.web.util.HeaderUtil;
import org.lamisplus.modules.base.web.util.PaginationUtil;
import org.lamisplus.modules.lamis.legacy.domain.entities.Facility;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.lamisplus.modules.lamis.legacy.domain.entities.StatusHistory;
import org.lamisplus.modules.lamis.legacy.domain.entities.Users;
import org.lamisplus.modules.lamis.legacy.domain.entities.enumerations.ClientStatus;
import org.lamisplus.modules.lamis.legacy.domain.repositories.PatientRepository;
import org.lamisplus.modules.lamis.legacy.domain.repositories.PharmacyRepository;
import org.lamisplus.modules.lamis.legacy.domain.repositories.StatusHistoryRepository;
import org.lamisplus.modules.lamis.legacy.domain.repositories.UserRepository;
import org.lamisplus.modules.security.config.security.SecurityUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@Slf4j
@RequiredArgsConstructor
public class PatientResource {
    private static final String ENTITY_NAME = "patient";

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final PatientService patientService;
    private final PharmacyRepository pharmacyRepository;
    private final StatusHistoryRepository statusHistoryRepository;

    /**
     * POST  /patients : Create a new patient.
     *
     * @param patient the patient to create
     * @return the ResponseEntity with status 201 (Created) and with body the new patient, or with status 400 (Bad Request) if the patient has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/patients")
    public ResponseEntity<Patient> createPatient(@RequestBody Patient patient) throws URISyntaxException {
        LOG.debug("REST request to save Patient : {}", patient);
        if (patient.getId() != null) {
            throw new BadRequestAlertException("A new patient cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Patient result = patientService.savePatient(patient);
        return ResponseEntity.created(new URI("/api/patients/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * PUT  /patients : Updates an existing patient.
     *
     * @param patient the patient to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated patient,
     * or with status 400 (Bad Request) if the patient is not valid,
     * or with status 500 (Internal Server Error) if the patient couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/patients")
    public ResponseEntity<Patient> updatePatient(@RequestBody Patient patient) throws URISyntaxException {
        LOG.debug("REST request to update Patient : {}", patient);
        if (patient.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Patient result = patientRepository.save(patient);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, patient.getId().toString()))
                .body(result);
    }

    /**
     * GET  /patients : get all the patients.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of patients in body
     */
    @GetMapping("/patients")
    public ResponseEntity<List<PatientVM>> getAllPatients(@RequestParam Long facilityId, @RequestParam String keyword, Pageable pageable) {
        LOG.debug("REST request to get all Patients in facility {} matching {}", facilityId, keyword);
        if (pageable == null) {
            pageable = PageRequest.of(0, 20);
        }
        if (pageable.getPageSize() > 50) {
            pageable = PageRequest.of(pageable.getPageNumber(), 50, pageable.getSort());
        }
        Page<Patient> page = patientRepository.searchPatient(facilityId, keyword, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/patients");
        List<PatientVM> patients = page.getContent().stream()
                .map(patient -> {
                    PatientVM vm = new PatientVM();
                    vm.setId(patient.getId());
                    vm.setUuid(patient.getUuid());
                    vm.setSurname(patient.getSurname());
                    vm.setOtherNames(patient.getOtherNames());
                    vm.setGender(patient.getGender());
                    vm.setHospitalNum(patient.getHospitalNum());
                    vm.setUniqueId(patient.getUniqueId());
                    vm.setPhone(patient.getPhone());
                    vm.setAddress(patient.getAddress());
                    Optional<Date> date = pharmacyRepository.getLTFUDate(patient.getId());
                    Optional<StatusHistory> statusHistory = statusHistoryRepository.getCurrentStatusForPatientAt(patient, LocalDate.now());
                    if (!date.isPresent()) {
                        if (statusHistory.isPresent()) {
                            vm.setStatus(statusHistory.get().getStatus().getStatus());
                        } else {
                            if (patient.getStatusAtRegistration() != null) {
                                vm.setStatus(patient.getStatusAtRegistration().getStatus());
                            }
                        }
                    } else {
                        LocalDate ltfuDate = Instant.ofEpochMilli(date.get().getTime()).atZone(ZoneId.systemDefault()).toLocalDate();

                        if (!ltfuDate.isBefore(LocalDate.now())) {
                            if (statusHistory.isPresent() && statusHistory.get().getStatus().equals(ClientStatus.KNOWN_DEATH)) {
                                vm.setStatus(ClientStatus.KNOWN_DEATH.getStatus());
                            } else if (statusHistory.isPresent() && statusHistory.get().getStatus().equals(ClientStatus.ART_TRANSFER_OUT)) {
                                vm.setStatus(ClientStatus.ART_TRANSFER_OUT.getStatus());
                            } else if (statusHistory.isPresent() && statusHistory.get().getStatus().equals(ClientStatus.STOPPED_TREATMENT)) {
                                vm.setStatus(ClientStatus.STOPPED_TREATMENT.getStatus());
                            } else if (statusHistory.isPresent()) {
                                StatusHistory history = statusHistory.get();
                                if (history.getStatus().equals(ClientStatus.ART_RESTART)) {
                                    vm.setStatus(ClientStatus.ART_RESTART.getStatus());
                                } else if (history.getStatus().equals(ClientStatus.ART_START)) {
                                    vm.setStatus(ClientStatus.ART_START.getStatus());
                                } else if (history.getStatus().equals(ClientStatus.ART_TRANSFER_IN)) {
                                    vm.setStatus(ClientStatus.ART_TRANSFER_IN.getStatus());
                                } else {
                                    vm.setStatus(ClientStatus.ART_START.getStatus());
                                }
                            } else {
                                vm.setStatus(ClientStatus.ART_START.getStatus());
                            }
                        } else {
                            vm.setStatus(ClientStatus.LOST_TO_FOLLOWUP.getStatus());
                            if (statusHistory.isPresent() && statusHistory.get().getStatus().equals(ClientStatus.KNOWN_DEATH)) {
                                vm.setStatus(ClientStatus.KNOWN_DEATH.getStatus());
                            } else if (statusHistory.isPresent() && statusHistory.get().getStatus().equals(ClientStatus.ART_TRANSFER_OUT)) {
                                vm.setStatus(ClientStatus.ART_TRANSFER_OUT.getStatus());
                            } else if (statusHistory.isPresent() && statusHistory.get().getStatus().equals(ClientStatus.STOPPED_TREATMENT)) {
                                vm.setStatus(ClientStatus.STOPPED_TREATMENT.getStatus());
                            } else {
                                vm.setStatus(ClientStatus.LOST_TO_FOLLOWUP.getStatus());
                            }
                        }
                    }
                    return vm;
                }).collect(Collectors.toList());
        return new ResponseEntity<>(patients, headers, HttpStatus.OK);
    }

    /**
     * GET  /patients/:id : get the "id" patient.
     *
     * @param id the id of the patient to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the patient, or with status 404 (Not Found)
     */
    @GetMapping("/patients/{id}")
    public ResponseEntity<Patient> getPatient(@PathVariable Long id) {
        LOG.debug("REST request to get Patient : {}", id);
        Optional<Patient> patient = patientRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(patient);
    }

    /**
     * GET  /patients/:id : get the "uuid" patient.
     *
     * @param id the uuid of the patient to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the patient, or with status 404 (Not Found)
     */
    @GetMapping("/patients/by-uuid/{id}")
    public ResponseEntity<Patient> getPatientByUuid(@PathVariable String id) {
        LOG.debug("REST request to get Patient : {}", id);
        Optional<Patient> patient = patientRepository.findByUuid(id);
        return ResponseUtil.wrapOrNotFound(patient);
    }

    /**
     * DELETE  /patients/:id : delete the "id" patient.
     *
     * @param id the id of the patient to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/patients/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        LOG.debug("REST request to delete Patient : {}", id);
        patientRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @PostMapping("/patients/exists/hospital-number")
    public ResponseEntity<Boolean> hospitalNumberExists(@RequestBody JsonNode holder) {
        Optional<Facility> facility = SecurityUtils.getCurrentUserLogin()
                .flatMap(login -> userRepository.findByLogin(login).map(Users::getFacility));
        if (facility.isPresent()) {
            List<Patient> patients = patientRepository.findByHospitalNumAndFacility(holder.get("number").asText(), facility.get());
            if (!patients.isEmpty()) {
                return ResponseEntity.ok(true);
            }
        }
        return ResponseEntity.ok(false);
    }

    @GetMapping("/patients/test-transactional")
    public Date testTransactional() {
        return patientService.getLTFUDate();
    }
}
