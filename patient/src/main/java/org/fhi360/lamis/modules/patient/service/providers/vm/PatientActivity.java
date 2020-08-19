package org.fhi360.lamis.modules.patient.service.providers.vm;

import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Data
@RequiredArgsConstructor
public class PatientActivity {
    @NonNull
    private String uuid;
    @NonNull
    private String name;
    @NonNull
    private LocalDate date;
    @NonNull
    private String icon;
    @NonNull
    private String path;
    private Boolean deletable = true;
    private Boolean editable = true;
    private Boolean viewable = true;
}
