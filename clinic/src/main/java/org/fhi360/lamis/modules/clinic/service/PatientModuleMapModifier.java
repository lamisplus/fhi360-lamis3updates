package org.fhi360.lamis.modules.clinic.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.base.domain.entities.Module;
import org.lamisplus.modules.base.domain.repositories.ModuleRepository;
import org.lamisplus.modules.base.module.ModuleMapModifierProvider;
import org.springframework.stereotype.Service;

//@Service
@RequiredArgsConstructor
@Slf4j
public class PatientModuleMapModifier implements ModuleMapModifierProvider {
    private final static String NAME ="LAMISPatientModule";
    private final ModuleRepository moduleRepository;

    @Override
    public Module getModuleToModify() {
        return moduleRepository.findByName(NAME).get();
    }

    @Override
    public String getAngularModuleName() {
        return "ClinicWidgetModule";
    }

    @Override
    public String getUmdUrl() {
        return "/across/resources/static/clinic/js/bundles/lamis-clinic-1.0.1.umd.js";
    }

    @Override
    public String getModuleMap() {
        return "{}";
    }
}
