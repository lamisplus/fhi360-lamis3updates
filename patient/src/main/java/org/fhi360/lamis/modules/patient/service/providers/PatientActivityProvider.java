package org.fhi360.lamis.modules.patient.service.providers;

import com.foreach.across.core.annotations.Exposed;
import org.fhi360.lamis.modules.patient.service.providers.vm.PatientActivity;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;

import java.util.List;

@Exposed
public interface PatientActivityProvider {
    List<PatientActivity> getActivitiesFor(Patient patient);
}
