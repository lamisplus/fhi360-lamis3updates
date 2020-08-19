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
@Table(name = "MATERNAL_FOLLOWUP")
@Data
@SQLDelete(sql = "update maternal_followup set archived = true, last_modified = current_timestamp where id = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = false")
public class MaternalFollowup extends TransactionEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Basic(optional = false)
    @NotNull
    @JoinColumn(name = "PATIENT_ID")
    @ManyToOne
    private Patient patient;

    @Basic(optional = false)
    @NotNull
    @Column(name = "DATE_VISIT")
    private LocalDate dateVisit;

    @JoinColumn(name = "ANC_ID")
    @ManyToOne
    private Anc anc;

    @Column(name = "BODY_WEIGHT")
    private Double bodyWeight;

    @Size(max = 7)
    @Column(name = "BP")
    private String bp;

    @Column(name = "FUNDAL_HEIGHT")
    private Double fundalHeight;

    @Size(max = 25)
    @Column(name = "FETAL_PRESENTATION")
    private String fetalPresentation;

    @Column(name = "DATE_CONFIRMED_HIV")
    private LocalDate dateConfirmedHiv;

    @Size(max = 45)
    @Column(name = "TIME_HIV_DIAGNOSIS")
    private String timeHivDiagnosis;

    @Size(max = 100)
    @Column(name = "ARV_REGIMEN_PAST")
    private String arvRegimenPast;

    @Size(max = 100)
    @Column(name = "ARV_REGIMEN_CURRENT")
    private String arvRegimenCurrent;

    @Column(name = "DATE_ARV_REGIMEN_CURRENT")
    private LocalDate dateArvRegimenCurrent;

    @Column(name = "SCREEN_POST_PARTUM")
    private Integer screenPostPartum;

    @Size(max = 7)
    @Column(name = "SYPHILIS_TESTED")
    private String syphilisTested;

    @Size(max = 45)
    @Column(name = "SYPHILIS_TEST_RESULT")
    private String syphilisTestResult;

    @Size(max = 7)
    @Column(name = "SYPHILIS_TREATED")
    private String syphilisTreated;

    @Size(max = 45)
    @Column(name = "CD4_ORDERED")
    private String cd4Ordered;

    @Column(name = "CD4")
    private Double cd4;

    @Size(max = 120)
    @Column(name = "GESTATIONAL_AGE")
    private String gestationalAge;

    @Size(max = 10)
    @Column(name = "VIRAL_LOAD_COLLECTED")
    private String viralLoadCollected;

    @Size(max = 120)
    @Column(name = "VISIT_STATUS")
    private String visitStatus;

    @Column(name = "DATE_SAMPLE_COLLECTED")
    private LocalDate dateSampleCollected;

    @Size(max = 120)
    @Column(name = "TB_STATUS")
    private String tbStatus;

    @Size(max = 10)
    @Column(name = "TYPE_OF_VISIT")
    private String typeOfVisit;

    @Column(name = "COUNSEL_NUTRITION")
    private Integer counselNutrition;

    @Column(name = "COUNSEL_FEEDING")
    private Integer counselFeeding;

    @Column(name = "COUNSEL_FAMILY_PLANNING")
    private Integer counselFamilyPlanning;

    @Size(max = 45)
    @Column(name = "FAMILY_PLANNING_METHOD")
    private String familyPlanningMethod;

    @Size(max = 45)
    @Column(name = "REFERRED")
    private String referred;

    @Column(name = "DATE_NEXT_VISIT")
    private LocalDate dateNextVisit;
}
