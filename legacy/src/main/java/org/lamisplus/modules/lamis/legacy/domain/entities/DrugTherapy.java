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

@Entity
@Table(name = "DRUG_THERAPY")
@Data
@SQLDelete(sql = "update drug_therapy set archived = true, last_modified = current_timestamp where id = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = false")
public class DrugTherapy extends TransactionEntity implements Serializable {

    @Basic(optional = false)
    @NotNull
    @JoinColumn(name = "PATIENT_ID")
    @ManyToOne
    private Patient patient;

    @Basic(optional = false)
    @NotNull
    @ManyToOne
    @JoinColumn(name = "COMMUNITY_PHARMACY_ID")
    private CommunityPharmacy communityPharmacy;

    @Basic(optional = false)
    @NotNull
    @Column(name = "DATE_VISIT")
    private LocalDate dateVisit;

    @Size(max = 100)
    @Column(name = "OIS")
    private String ois;

    @Size(max = 5)
    @Column(name = "THERAPY_PROBLEM_SCREENED")
    private String therapyProblemScreened;

    @Size(max = 5)
    @Column(name = "ADHERENCE_ISSUES")
    private String adherenceIssues;

    @Size(max = 100)
    @Column(name = "MEDICATION_ERROR")
    private String medicationError;

    @Size(max = 100)
    @Column(name = "ADRS")
    private String adrs;

    @Size(max = 45)
    @Column(name = "SEVERITY")
    private String severity;

    @Size(max = 5)
    @Column(name = "ICSR_FORM")
    private String icsrForm;

    @Size(max = 5)
    @Column(name = "ADR_REFERRED")
    private String adrReferred;
}
