package org.fhi360.lamis.modules.patient.web.rest;

import lombok.RequiredArgsConstructor;
import org.fhi360.lamis.modules.patient.service.PatientWidgetService;
import org.fhi360.lamis.modules.patient.service.providers.PatientWidgetProvider;
import org.lamisplus.modules.base.module.UMDModule;
import org.lamisplus.modules.base.module.UMDModuleExtender;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PatientUMDResource {
    private final PatientWidgetService patientWidgetProvider;

    @GetMapping("/javascript/patient/umd/{random}")
    public ResponseEntity<String> getUmd(@PathVariable String random) throws IOException {
        Resource resource = new ClassPathResource("views/static/patient/js/bundles/lamis-patient.umd.js");
        String umd = new String(FileCopyUtils.copyToByteArray(resource.getInputStream()));
        UMDModule patientModule = new UMDModule("PatientModule", "", umd);
        List<PatientWidgetProvider> widgets = patientWidgetProvider.getWidgets();
        List<String> urls = new ArrayList<>();
        List<UMDModule> modules = new ArrayList<>();
        widgets.forEach(widget -> {
            if (!urls.contains(widget.getUrl())) {
                UMDModule module = new UMDModule(widget.getModuleName(), widget.getUrl(), widget.getUmdContent());
                urls.add(widget.getUrl());
                modules.add(module);
            }
        });
        UMDModule module = UMDModuleExtender.extendModule(patientModule, modules);
        return ResponseEntity.ok()
                .header("Content-Type", "application/javascript")
                .body(module.getContent());
    }
}
