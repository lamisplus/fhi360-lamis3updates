package org.fhi360.lamis.modules.clinic.web.rest;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.fhi360.lamis.modules.clinic.service.CervicalCancerScreeningService;
import org.fhi360.lamis.modules.clinic.web.rest.vm.ScreeningVM;
import org.lamisplus.modules.lamis.legacy.domain.repositories.ObservationsRepository;
import org.lamisplus.modules.lamis.legacy.domain.repositories.PatientRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CervicalCancerScreenResource {
    private final ObservationsRepository observationsRepository;
    private final CervicalCancerScreeningService screeningService;
    private final PatientRepository patientRepository;

    @PostMapping("/cervical-cancer-screenings")
    public void saveScreening(@RequestBody ScreeningVM vm) {
        screeningService.saveScreening(vm.getPatient(), vm.getDate(), vm.getData());
    }

    @GetMapping("/cervical-cancer-screenings/patient/{id}")
    public JsonNode getScreeningByPatient(@PathVariable Long id) {
        return patientRepository.findById(id).map(screeningService::getCervicalCancerScreening).orElse(null);
    }

    @GetMapping("/cervical-cancer-screenings/patient/{id}/has-screening")
    public boolean patientHasScreening(@PathVariable Long id) {
        return patientRepository.findById(id).map(screeningService::hasCervicalCancerScreening).orElse(false);
    }

    @DeleteMapping("/cervical-cancer-screenings/{id}")
    public void delete(@PathVariable String id) {
        observationsRepository.deleteById(id);
    }

    @DeleteMapping("/cervical-cancer-screenings/by-uuid/{id}")
    public void deleteByUuid(@PathVariable String id) {
        observationsRepository.deleteById(id);
    }
}
