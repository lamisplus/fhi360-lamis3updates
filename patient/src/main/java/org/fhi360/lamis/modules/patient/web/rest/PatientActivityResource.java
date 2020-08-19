package org.fhi360.lamis.modules.patient.web.rest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.fhi360.lamis.modules.patient.service.PatientActivityService;
import org.fhi360.lamis.modules.patient.service.providers.vm.PatientActivity;
import org.fhi360.lamis.modules.patient.web.rest.vm.TimelineVm;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.lamisplus.modules.lamis.legacy.domain.repositories.PatientRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class PatientActivityResource {
    private final PatientActivityService patientActivityService;
    private final PatientRepository patientRepository;

    @GetMapping("/patients/{patientId:\\d+}/activities")
    public List<TimelineVm> getActivities(@PathVariable Long patientId,
                                          @RequestParam(required = false, defaultValue = "false") Boolean full) {
        Patient patient = patientRepository.findById(patientId).orElse(null);
        if (patient == null) {
            return new ArrayList<>();
        }
        List<PatientActivity> patientActivities = patientActivityService.getActivitiesFor(patient);
        List<TimelineVm> timeline = new ArrayList<>();
        Map<String, List<PatientActivity>> activities = patientActivities.stream()
                .sorted(Comparator.comparing(PatientActivity::getName))
                .sorted((a1, a2) -> a2.getDate().compareTo(a1.getDate()))
                .collect(Collectors.groupingBy(activity ->
                        activity.getDate().format(DateTimeFormatter.ofPattern("dd MMM, yyyy"))));

        activities.forEach((d, a) -> {
            TimelineVm timelineVm = new TimelineVm();
            timelineVm.setDate(d);
            timelineVm.setActivities(a);
            timeline.add(timelineVm);
        });
        return timeline.stream()
                .sorted((t1, t2) -> LocalDate.parse(t2.getDate(), DateTimeFormatter.ofPattern("dd MMM, yyyy"))
                        .compareTo(LocalDate.parse(t1.getDate(), DateTimeFormatter.ofPattern("dd MMM, yyyy")))
                )
                .skip(0)
                .limit(full ? Long.MAX_VALUE : 3)
                .collect(Collectors.toList());
    }
}
