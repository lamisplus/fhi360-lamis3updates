package org.lamisplus.modules.lamis.legacy.web.rest;

import io.github.jhipster.web.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.base.domain.repositories.ProvinceRepository;
import org.lamisplus.modules.lamis.legacy.domain.entities.Facility;
import org.lamisplus.modules.lamis.legacy.domain.entities.Users;
import org.lamisplus.modules.lamis.legacy.domain.repositories.FacilityRepository;
import org.lamisplus.modules.lamis.legacy.domain.repositories.UserRepository;
import org.lamisplus.modules.security.config.security.SecurityUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class FacilityResource {
    private final FacilityRepository facilityRepository;
    private final ProvinceRepository provinceRepository;
    private final UserRepository userRepository;

    @GetMapping("/facilities/lga/{lgaId}")
    public List<Facility> getFacilitiesByLga(@PathVariable Long lgaId) {
        List<Facility> facilities = new ArrayList<>();
        provinceRepository.findById(lgaId).ifPresent(lga ->
                facilities.addAll(facilityRepository.findByLgaAndActiveTrue(lga)));
        return facilities;
    }

    @PutMapping("/facilities")
    public Facility updateFacility(@RequestBody Facility facility) {
        return facilityRepository.save(facility);
    }

    @PostMapping("/facilities/switch")
    public ResponseEntity<Facility> switchFacility(@RequestBody Facility facility) {
        SecurityUtils.getCurrentUserLogin().flatMap(userRepository::findByLogin).ifPresent(users -> {
            users.setFacility(facility);
            userRepository.save(users);
        });
        return ResponseEntity.ok(facility);
    }

    @GetMapping("/facilities")
    public List<Facility> allFacilities() {
        return facilityRepository.findAll();
    }

    @GetMapping("/facilities/active")
    public ResponseEntity<Facility> getActiveFacility() {
        Optional<Facility> facility = SecurityUtils.getCurrentUserLogin().flatMap(userRepository::findByLogin)
                .map(Users::getFacility);
        return ResponseUtil.wrapOrNotFound(facility);
    }
}
