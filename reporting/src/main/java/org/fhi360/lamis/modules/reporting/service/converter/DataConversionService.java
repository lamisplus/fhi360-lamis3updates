package org.fhi360.lamis.modules.reporting.service.converter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class DataConversionService {
    private final ClinicDataConverter clinicDataConverter;
    private final LabDataConverter labDataConverter;
    private final PatientDataConverter patientDataConverter;

    public ByteArrayOutputStream convert(List<Long> facilityIds, Integer report, Long labTest) {

        LOG.info("Facilities: {}", facilityIds);
        if (Objects.equals(report, 1)) {
            return patientDataConverter.convertExcel(facilityIds);
        }
        if (Objects.equals(report, 2)) {
            return clinicDataConverter.convertExcel(facilityIds);
        }
        if (Objects.equals(report, 3)) {
            return labDataConverter.convertExcel(facilityIds, labTest);
        }
        return new ByteArrayOutputStream();
    }
}
