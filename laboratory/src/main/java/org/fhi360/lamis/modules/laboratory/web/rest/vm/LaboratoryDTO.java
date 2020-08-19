package org.fhi360.lamis.modules.laboratory.web.rest.vm;

import lombok.Data;
import org.lamisplus.modules.lamis.legacy.domain.entities.Facility;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class LaboratoryDTO {
    private Long id;
    private Facility facility;
    private Patient patient;
    private LocalDate dateResultReceived;
    private LocalDate dateSampleCollected;
    private LocalDate dateAssay;
    private String labNo;
    private List<LaboratoryLineDTO> lines = new ArrayList<>();
}
