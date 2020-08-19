package org.fhi360.lamis.modules.patient.web.rest.vm;

import lombok.Getter;
import lombok.Setter;
import org.fhi360.lamis.modules.patient.service.providers.PatientObservationViewProvider;

@Getter
@Setter
public class ObservationView {
    private String name;
    private String icon;
    private String tooltip;
    private String path;

    public ObservationView(PatientObservationViewProvider provider) {
        name = provider.getName();
        icon = provider.getIcon();
        tooltip = provider.getTooltip();
        path = provider.getPath();
    }
}
