package org.fhi360.lamis.modules.patient.web.rest.vm;

import lombok.Data;
import org.fhi360.lamis.modules.patient.service.providers.vm.PatientActivity;

import java.util.List;

@Data
public class TimelineVm {
    private String date;
    private List<PatientActivity> activities;
}
