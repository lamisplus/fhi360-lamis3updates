package org.fhi360.lamis.modules.biometrics.web.rest;

import io.github.jhipster.web.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.fhi360.lamis.modules.biometrics.web.rest.vm.BiometricResult;
import org.fhi360.lamis.modules.biometrics.web.rest.vm.Reader;
import org.lamisplus.modules.base.web.errors.BadRequestAlertException;
import org.lamisplus.modules.base.web.util.HeaderUtil;
import org.lamisplus.modules.lamis.legacy.domain.entities.Biometric;
import org.lamisplus.modules.lamis.legacy.domain.repositories.BiometricRepository;
import org.lamisplus.modules.lamis.legacy.domain.repositories.PatientRepository;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@Slf4j
@RequiredArgsConstructor
public class BiometricsResource {
    private final RestTemplate restTemplate = new RestTemplate();
    private final static String PROXY_URL = "http://localhost:8888/api/biometrics";
    private static final String ENTITY_NAME = "biometric";

    private final BiometricRepository biometricRepository;
    private final PatientRepository patientRepository;

    /**
     * POST  /biometrics : Create a new biometric record.
     *
     * @param biometric the biometric to create
     * @return the ResponseEntity with status 201 (Created) and with body the new biometric, or with status 400 (Bad Request) if the biometric has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/biometrics")
    public ResponseEntity<Biometric> createBiometric(@RequestBody Biometric biometric) throws URISyntaxException {
        LOG.debug("REST request to save biometric");
        if (biometric.getId() != null) {
            throw new BadRequestAlertException("A new biometric cannot already have an ID", ENTITY_NAME, "idexists");
        }

        Biometric result = biometricRepository.save(biometric);
        return ResponseEntity.created(new URI("/api/biometrics/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId()))
                .body(result);
    }

    /**
     * POST  /biometrics/templates : Create a new biometric record.
     *
     * @param biometrics the biometric templates to create
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/biometrics/templates")
    public void saveBiometric(@RequestBody List<Biometric> biometrics) throws URISyntaxException {
        LOG.debug("REST request to save biometric");

        biometricRepository.saveAll(biometrics);
    }

    /**
     * PUT  /biometrics : Updates an existing biometric record.
     *
     * @param biometric the biometric to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated biometric,
     * or with status 400 (Bad Request) if the biometric is not valid,
     * or with status 500 (Internal Server Error) if the biometric couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/biometrics")
    public ResponseEntity<Biometric> updateBiometric(@RequestBody Biometric biometric) throws URISyntaxException {
        LOG.debug("REST request to update biometric : {}", biometric);
        if (biometric.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        Biometric result = biometricRepository.save(biometric);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, biometric.getId()))
                .body(result);
    }

    /**
     * GET  /biometrics : Get all biometric records.
     *
     * @return the ResponseEntity with status 200 and with body the list of biometric records
     */
    @GetMapping("/biometrics")
    public List<Biometric> biometrics() {
        LOG.debug("REST request to get all biometric templates");
        return biometricRepository.findAll();
    }

    /**
     * GET  /biometrics/:id : get the "id" biometric.
     *
     * @param id the id of the biometric to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the biometric, or with status 404 (Not Found)
     */
    @GetMapping("/biometrics/{id}")
    public ResponseEntity<Biometric> getBiometric(@PathVariable String id) {
        LOG.debug("REST request to get biometric : {}", id);
        Optional<Biometric> biometric = biometricRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(biometric);
    }

    /**
     * DELETE  /biometrics/:id : delete the "id" biometric.
     *
     * @param id the id of the biometric to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/biometrics/{id}")
    public ResponseEntity<Void> deleteBiometric(@PathVariable String id) {
        LOG.debug("REST request to delete biometric : {}", id);

        biometricRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }

    /**
     * GET  /biometrics/patient/:id : Get all biometric records by patient ID.
     *
     * @param id the id of the patient whose records to retrieve
     * @return the ResponseEntity with status 200 and with body the list of biometric records
     */
    @GetMapping("/biometrics/patient/{id}")
    public List<Biometric> findByPatient(@PathVariable Long id) {
        return patientRepository.findById(id).map(biometricRepository::findByPatient).orElse(new ArrayList<>());
    }

    /**
     * GET  /biometrics/readers : Get all biometric scanners available on the local system.
     *
     * @return the ResponseEntity with status 200 and with body the list of biometric scanners
     */
    @SneakyThrows
    @GetMapping("/biometrics/readers")
    public List<Reader> getReaders() {
        ResponseEntity<List<Reader>> response = restTemplate.exchange(
                RequestEntity.get(new URI(PROXY_URL + "/readers"))
                        .header("Content-Type", "application/json").build(),
                new ParameterizedTypeReference<List<Reader>>() {
                });
        return response.getBody();
    }

    /**
     * GET  /biometrics/identify/:reader : Identify a client using the given biometric scanner.
     *
     * @param reader: The biometric scanner
     * @return returns a BiometricResult containing relevant information
     */
    @SneakyThrows
    @GetMapping("/biometrics/identify")
    public BiometricResult identifyClient(@RequestParam String reader, @RequestParam String accessToken, @RequestParam String server) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(PROXY_URL + "/identify")
                .queryParam("accessToken", accessToken)
                .queryParam("server", server)
                .queryParam("reader", reader);
        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<BiometricResult> requestEntity = new HttpEntity<>(requestHeaders);
        ResponseEntity<BiometricResult> response = restTemplate.exchange(
                uriBuilder.toUriString(),
                HttpMethod.GET,
                requestEntity,
                BiometricResult.class
        );
        return response.getBody();
    }
}
