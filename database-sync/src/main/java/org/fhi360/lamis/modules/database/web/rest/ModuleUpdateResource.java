package org.fhi360.lamis.modules.database.web.rest;

import lombok.RequiredArgsConstructor;
import org.fhi360.lamis.modules.database.service.ModuleUpdateManager;
import org.lamisplus.modules.base.domain.entities.Module;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/module-updates")
@RequiredArgsConstructor
public class ModuleUpdateResource {
    private final ModuleUpdateManager moduleUpdateManager;

    @GetMapping("/install-updates")
    public List<Module> update(){
        moduleUpdateManager.installUpdates();
        return moduleUpdateManager.updatesAvailable();
    }

    @GetMapping("/available-updates")
    public List<Module> availableUpdates() {
        return moduleUpdateManager.updatesAvailable();
    }
}
