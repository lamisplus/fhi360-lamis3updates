package org.fhi360.lamis.modules.patient.service.providers;

import com.foreach.across.core.annotations.Exposed;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;

@Exposed
public interface PatientWidgetProvider {
    String getTitle();

    String getComponentName();

    String getModuleName();

    String getUmdContent();

    String getUrl();

    boolean applicableTo(Patient patient);

    default String getIcon() {
        return "";
    }

    default Integer getIndex() {
        return 100;
    }
}
