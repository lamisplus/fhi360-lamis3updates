package org.lamisplus.modules.lamis.legacy.domain.entities;

import lombok.Data;
import org.hibernate.annotations.ResultCheckStyle;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "MOTHER_INFORMATION")
@Data
@SQLDelete(sql = "update mother_information set archived = true, last_modified = current_timestamp where id = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = false")
public class MotherInformation extends TransactionEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Basic(optional = false)
    @NotNull
    @JoinColumn(name = "PATIENT_ID")
    @ManyToOne
    private Patient patient;

    @Size(max = 25)
    @Column(name = "HOSPITAL_NUM")
    private String hospitalNum;

    @Size(max = 36)
    @Column(name = "UNIQUE_ID")
    private String uniqueId;

    @Size(max = 45)
    @Column(name = "SURNAME")
    private String surname;

    @Size(max = 75)
    @Column(name = "OTHER_NAMES")
    private String otherNames;

    @Size(max = 255)
    @Column(name = "ADDRESS")
    private String address;

    @Size(max = 60)
    @Column(name = "PHONE")
    private String phone;

    @Size(max = 120)
    @Column(name = "ART_STATUS")
    private String artStatus;

    @Size(max = 120)
    @Column(name = "ENTRY_POINT")
    private String entryPoint;

    @Size(max = 120)
    @Column(name = "ANC_NUMBER")
    private String ancNumber;

    @Size(max = 40)
    @Column(name = "IN_FACILITY")
    private String inFacility;

    @Column(name = "DATE_STARTED")
    private LocalDate dateStarted;

    @Column(name = "DATE_CONFIRMED_HIV")
    private LocalDate dateConfirmedHiv;

    @Size(max = 35)
    @Column(name = "TIME_HIV_DIAGNOSIS")
    private String timeHivDiagnosis;

    @Column(name = "DATE_ENROLLED_PMTCT")
    private LocalDate dateEnrolledPMTCT;

    @Size(max = 100)
    @Column(name = "REGIMEN")
    private String regimen;

    @OneToMany(mappedBy = "mother", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Child> children = new ArrayList<>();
}
