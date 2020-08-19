package org.fhi360.lamis.modules.patient.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.lamisplus.modules.base.domain.entities.Module;
import org.lamisplus.modules.base.domain.repositories.ModuleRepository;
import org.lamisplus.modules.base.module.ModuleMapModifierProvider;
import org.springframework.stereotype.Service;

//@Service
@RequiredArgsConstructor
@Slf4j
public class ModuleMapResetter implements ModuleMapModifierProvider {
    private final static String NAME = "LAMISPatientModule";
    private final ModuleRepository moduleRepository;

    @Override
    public Module getModuleToModify() {
        return moduleRepository.findByName(NAME).orElse(null);
    }

    @Override
    public String getAngularModuleName() {
        return null;
    }

    @Override
    public String getUmdUrl() {
        return null;
    }

    @Override
    public String getModuleMap() {
        return moduleRepository.findByName(NAME).get().getModuleMap();
    }

    @Override
    public boolean reset() {
        return true;
    }

    @Override
    public String getUmdLocation() {
        return "/api/javascript/patient/umd/" + RandomStringUtils.randomAlphabetic(5);
    }
}
