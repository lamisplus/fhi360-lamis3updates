package org.lamisplus.modules.lamis.legacy.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.text.WordUtils;
import org.hibernate.annotations.ResultCheckStyle;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.Where;
import org.lamisplus.modules.base.domain.entities.Province;
import org.lamisplus.modules.lamis.legacy.domain.entities.enumerations.ClientStatus;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "PATIENT")
@Data
@ToString(of = {"id", "hospitalNum", "surname", "otherNames"})
@Where(clause = "archived = false")
@SQLDelete(sql = "update Patient set archived = true, last_modified = current_timestamp where id = ?", check = ResultCheckStyle.COUNT)
@EqualsAndHashCode(of = {"hospitalNum", "facility"})
public class Patient extends TransactionEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
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

    @Size(max = 7)
    @Column(name = "GENDER")
    private String gender;

    @Column(name = "DATE_BIRTH")
    @NotNull
    private LocalDate dateBirth;

    @Size(max = 15)
    @Column(name = "MARITAL_STATUS")
    private String maritalStatus;

    @Size(max = 128)
    @Column(name = "EDUCATION")
    private String education;

    @Size(max = 128)
    @Column(name = "OCCUPATION")
    private String occupation;

    @Size(max = 300)
    @Column(name = "ADDRESS")
    private String address;

    @Size(max = 25)
    @Column(name = "PHONE")
    private String phone;

    @Column(name = "dob_estimated")
    private Boolean dobEstimated;

    @Size(max = 75)
    private String nextOfKin;

    private String nextOfKinAddress;

    @Size(max = 25)
    private String nextOfKinPhone;

    @Size(max = 25)
    private String nextOfKinRelationship;

    @Size(max = 15)
    @Column(name = "ENTRY_POINT")
    private String entryPoint;

    @Size(max = 15)
    @Column(name = "TARGET_GROUP")
    private String targetGroup;

    @Column(name = "DATE_CONFIRMED_HIV")
    private LocalDate dateConfirmedHiv;

    @Column(name = "DATE_ENROLLED_PMTCT")
    private LocalDate dateEnrolledPMTCT;

    @Size(max = 100)
    @Column(name = "SOURCE_REFERRAL")
    private String sourceReferral;

    @Size(max = 35)
    @Column(name = "TIME_HIV_DIAGNOSIS")
    private String timeHivDiagnosis;

    @Size(max = 75)
    @Column(name = "TB_STATUS")
    private String tbStatus;

    @Column(name = "PREGNANT")
    private Boolean pregnant;

    @Column(name = "BREASTFEEDING")
    private Boolean breastfeeding;

    @Column(name = "DATE_REGISTRATION")
    private LocalDate dateRegistration;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS_AT_REGISTRATION")
    private ClientStatus statusAtRegistration;

    @Size(max = 15)
    @Column(name = "ENROLLMENT_SETTING")
    private String enrollmentSetting;

    @JoinColumn(name = "CASE_MANAGER_ID")
    @ManyToOne
    private CaseManager caseManager;

    @JoinColumn(name = "COMMUNITY_PHARMACY_ID")
    @ManyToOne
    private CommunityPharmacy communityPharmacy;

    @Column(name = "DATE_STARTED")
    private LocalDate dateStarted;

    @Column(name = "SEND_MESSAGE")
    private Boolean sendMessage;

    @JoinColumn(name = "PARTNER_INFORMATION_ID")
    @ManyToOne(cascade = CascadeType.ALL)
    private PartnerInformation partnerInformation;

    @ManyToOne
    @JoinColumn(name = "LGA_ID")
    private Province lga;

    @Type(type = "jsonb-node")
    @Column(columnDefinition = "jsonb")
    private JsonNode extra;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "patient")
    @JsonIgnore
    private List<Devolve> devolves;

    /*@OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Prescription> prescriptions;
*/
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "patient")
    @JsonIgnore
    private List<Appointment> appointments;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Eac> eacs;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "patient")
    @JsonIgnore
    private List<Encounter> encounters;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "patient")
    @JsonIgnore
    private List<Clinic> clinics;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "patient")
    @JsonIgnore
    private List<Pharmacy> pharmacies;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "patient")
    @JsonIgnore
    private List<Anc> ancs;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "patient")
    @JsonIgnore
    private List<PatientCaseManager> patientCaseManagers;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "patient")
    @JsonIgnore
    private List<MotherInformation> motherInformations;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "patient")
    @JsonIgnore
    private List<MaternalFollowup> maternalFollowups;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "patient")
    @JsonIgnore
    private List<Delivery> deliveries;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "patient")
    @JsonIgnore
    private List<ChronicCare> chronicCares;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "patient")
    @JsonIgnore
    private List<Laboratory> laboratories;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "patient")
    @JsonIgnore
    private List<RegimenHistory> regimenHistories;

    @OneToMany(cascade = {CascadeType.REMOVE, CascadeType.PERSIST}, mappedBy = "patient")
    @JsonIgnore
    private List<StatusHistory> statusHistories = new ArrayList<>();

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "patient")
    @JsonIgnore
    private List<DrugTherapy> drugTherapies;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "patient")
    @JsonIgnore
    private List<Nigqual> nigquals;

    @PrePersist
    @PreUpdate
    public void update() {
        surname = WordUtils.capitalize(surname);
        otherNames = WordUtils.capitalize(otherNames);

        address = WordUtils.capitalize(StringUtils.replace(address, ",", ", ").replaceAll("\\s+", " "));
        nextOfKinAddress = WordUtils.capitalize(StringUtils.replace(StringUtils.trimToEmpty(nextOfKinAddress),
                ",", ", ").replaceAll("\\s+", " "));
        nextOfKin = WordUtils.capitalize(nextOfKin);
    }
}
