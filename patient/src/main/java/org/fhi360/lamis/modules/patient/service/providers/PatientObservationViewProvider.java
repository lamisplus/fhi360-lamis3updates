package org.fhi360.lamis.modules.patient.service.providers;

import com.foreach.across.core.annotations.Exposed;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;


@Exposed
public interface PatientObservationViewProvider {
    boolean applicableTo(Patient patient);

    String getName();

    String getPath();

    default String getTooltip() {
        return "";
    }

    default String getIcon() {
        return "";
    }
}
