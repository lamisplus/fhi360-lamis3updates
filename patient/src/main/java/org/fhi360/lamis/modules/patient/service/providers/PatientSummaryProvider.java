package org.fhi360.lamis.modules.patient.service.providers;

import com.foreach.across.core.annotations.Exposed;
import org.fhi360.lamis.modules.patient.service.providers.vm.Summary;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;

import java.util.List;

@Exposed
public interface PatientSummaryProvider {
    List<Summary> getSummaries(Patient patient);
}
