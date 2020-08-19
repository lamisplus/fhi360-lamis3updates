package org.fhi360.lamis.modules.patient.web.rest.vm;

import lombok.Data;
import org.fhi360.lamis.modules.patient.service.providers.PatientWidgetProvider;

@Data
public class PatientWidget {
    private String title;

    private String componentName;

    private String icon;

    private int index;

    public PatientWidget(PatientWidgetProvider widgetProvider) {
        title = widgetProvider.getTitle();
        componentName = widgetProvider.getComponentName();
        icon = widgetProvider.getIcon();
        index = widgetProvider.getIndex();
    }
}
