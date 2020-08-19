package org.fhi360.lamis.modules.patient.web.rest.vm;

import lombok.Data;

@Data
public class PatientVM {
    private Long id;
    private String uuid;
    private String surname;
    private String otherNames;
    private String gender;
    private String hospitalNum;
    private String uniqueId;
    private String address;
    private String phone;
    private String status;
}
