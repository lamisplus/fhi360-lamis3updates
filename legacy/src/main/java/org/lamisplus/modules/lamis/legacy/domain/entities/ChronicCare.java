package org.lamisplus.modules.lamis.legacy.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "CHRONIC_CARE")
@SQLDelete(sql = "update chronic_care set archived = true, last_modified = current_timestamp where id = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = false")
@Data
public class ChronicCare extends TransactionEntity implements Serializable {

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

    @Size(max = 75)
    @Column(name = "CLIENT_TYPE")
    private String clientType;

    @Size(max = 75)
    @Column(name = "CURRENT_STATUS")
    private String currentStatus;

    @Size(max = 15)
    @Column(name = "CLINIC_STAGE")
    private String clinicStage;

    @Size(max = 75)
    @Column(name = "PREGNANCY_STATUS")
    private String pregnancyStatus;

    @Column(name = "LAST_CD4")
    private Double lastCd4;

    @Column(name = "DATE_LAST_CD4")
    private LocalDate dateLastCd4;

    @Column(name = "LAST_VIRAL_LOAD")
    private Double lastViralLoad;

    @Column(name = "DATE_LAST_VIRAL_LOAD")
    private LocalDate dateLastViralLoad;

    @Column(name = "ELIGIBLE_FOR_CD4")
    private Boolean eligibleCd4;

    @Column(name = "ELIGIBLE_FOR_VIRAL_LOAD")
    private Boolean eligibleViralLoad;

    @Column(name = "plhiv_symtomatic_hiv")
    private Boolean plhivSymtomaticHiv;

    @Column(name = "plhiv_asymtomatic_CD4_L500")
    private Boolean plhivAsymtomaticCD4L500;

    @Column(name = "plhiv_Active_Tb")
    private Boolean plhivActiveTb;

    @Column(name = "plhiv_pregnant_after_1st_trimester")
    private Boolean plhivPregnantAfter1stTrimester;

    @Column(name = "plhiv_L5_Years")
    private Boolean plhivL5Years;

    @Column(name = "IPT")
    private Boolean ipt;

    @Column(name = "INH")
    private Boolean inh;

    @Column(name = "TB_TREATMENT")
    private Boolean tbTreatment;

    @Column(name = "DATE_STARTED_TB_TREATMENT")
    private LocalDate dateStartedTbTreatment;

    @Column(name = "TB_REFERRED")
    private Boolean tbReferred;

    @Column(name = "ELIGIBLE_FOR_IPT")
    private Boolean eligibleIpt;

    @Column(name = "BODY_WEIGHT")
    private Double bodyWeight;

    @Column(name = "HEIGHT")
    private Double height;

    @Size(max = 45)
    @Column(name = "BMI")
    private String bmi;

    @Column(name = "MUAC")
    private Double muac;

    @Size(max = 45)
    @Column(name = "MUAC_PEDIATRICS")
    private String muacPediatrics;

    @Size(max = 45)
    @Column(name = "MUAC_PREGNANT")
    private String muacPregnant;

    @Column(name = "SUPPLEMENTARY_FOOD")
    private Boolean supplementaryFood;

    @Column(name = "NUTRITIONAL_STATUS_REFERRED")
    private Boolean nutritionalStatusReferred;

    @Column(name = "sexually_abused")
    private Boolean sexuallyAbused;

    @Column(name = "sexually_abused_REFERRED")
    private Boolean sexuallyAbusedReferred;

    @Column(name = "essentials_Denied_By_Partner")
    private Boolean essentialsDeniedByPartner;

    @Column(name = "essentials_Denied_By_Partner_REFERRED")
    private Boolean essentialsDeniedByPartnerReferred;

    @Column(name = "HYPERTENSIVE")
    private Boolean hypertensive;

    @Column(name = "FIRST_HYPERTENSIVE")
    private Boolean firstHypertensive;

    @Column(name = "BP_ABOVE_140_90")
    private Boolean bpAbove14090;

    @Column(name = "BP_REFERRED")
    private Boolean bpReferred;

    @Column(name = "DIABETIC")
    private Boolean diabetic;

    @Column(name = "FIRST_DIABETIC")
    private Boolean firstDiabetic;

    @Column(name = "DM_REFERRED")
    private Boolean dmReferred;

    @Column(name = "missed_Arvs")
    private String missedArvs;

    @Column(name = "missed_arvs_SERVICES_PROVIDED")
    private Boolean missedArvsServicesProvided;

    @Column(name = "status_Disclosed_To_Partner")
    private Boolean statusDisclosedToPartner;

    @Column(name = "partner_status_known")
    private Boolean partnerStatusKnown;

    @Column(name = "use_condoms_always")
    private Boolean useCondomsAlways;

    @Column(name = "use_condoms_always_SERVICES_PROVIDED")
    private Boolean useCondomsAlwaysServicesProvided;

    @Column(name = "opportunistic_infections")
    private Boolean opportunisticInfections;

    @Column(name = "missed_cotrim")
    private Integer missedCotrim;

    @Column(name = "weekly_alcohol_consumption")
    private Integer weeklyAlcoholConsumption;

    @Column(name = "weekly_alcohol_consumption_SERVICES_PROVIDED")
    private Boolean weeklyAlcoholConsumptionServicesProvided;

    @Column(name = "wash_SERVICES_PROVIDED")
    private Boolean washServicesProvided;

    @Column(name = "use_insecticide_nets")
    private Boolean useInsecticideNets;

    private Boolean cervicalCancerScreening;

    @Column(name = "active_member_of_sg")
    private Boolean activeMemberOfSG;

    private Boolean familyPlanning;

    private Boolean basicCareKits;

    private Boolean disclosureCounseling;

    private Boolean socialServices;

    private Boolean legalServices;

    @Column(name = "linkage_to_iga")
    private Boolean linkageToIGA;

    private Boolean otherServices;

    @Column(name = "cervical_cancer_screening_within_past_year")
    private Boolean cervicalCancerScreeningWithinPastYear;

    @Column(name = "cervical_cancer_screening_within_past_year_REFERRED")
    private Boolean cervicalCancerScreeningWithinPastYearReferred;

    @Column(name = "want_pregnancy_within_a_year")
    private Boolean wantPregnancyWithinAYear;

    @Column(name = "want_pregnancy_within_a_year_REFERRED")
    private Boolean wantPregnancyWithinAYearReferred;

    @Column(name = "currently_using_contraceptive")
    private Boolean currentlyUsingContraceptive;

    @Column(name = "currently_using_contraceptive_REFERRED")
    private Boolean currentlyUsingContraceptiveReferred;

    private Boolean useInsecticideBedNet;

    private Boolean useInsecticideBedNetReferred;

    private Boolean pregnantIntermittentPreventiveTherapy;

    private Boolean pregnantIntermittentPreventiveTherapyReferred;

    @JoinColumn(name = "COMMUNITY_PHARMACY_ID")
    @ManyToOne
    private CommunityPharmacy communityPharmacy;

    @OneToMany(mappedBy = "chronicCare", orphanRemoval = true)
    @JsonIgnore
    private List<ChronicCareDM> dms = new ArrayList<>();

    @OneToMany(mappedBy = "chronicCare", orphanRemoval = true)
    @JsonIgnore
    private List<ChronicCareTB> tbs = new ArrayList<>();
}
