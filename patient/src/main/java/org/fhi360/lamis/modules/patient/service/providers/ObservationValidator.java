package org.fhi360.lamis.modules.patient.service.providers;

import com.foreach.across.core.annotations.Exposed;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.lamisplus.modules.lamis.legacy.web.rest.errors.ObservationValidationException;

@Exposed
public interface ObservationValidator {
    void validate(Object observation, Patient patient) throws ObservationValidationException;
    boolean applicableForType(Class<?> type);
}
