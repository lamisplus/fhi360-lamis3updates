package org.lamisplus.modules.lamis.legacy.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.ResultCheckStyle;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "CLINIC")
@Data
@ToString(of = "dateVisit", callSuper = true)
@SQLDelete(sql = "update clinic set archived = true, last_modified = current_timestamp where id = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = false")
@EqualsAndHashCode(of = {"patient", "dateVisit"}, callSuper = true)
public class Clinic extends TransactionEntity implements Serializable {
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

    @Size(max = 15)
    @Column(name = "CLINIC_STAGE")
    private String clinicStage;

    @Size(max = 15)
    @Column(name = "FUNC_STATUS")
    private String funcStatus;

    @Size(max = 75)
    @Column(name = "TB_STATUS")
    private String tbStatus;

    @Column(name = "VIRAL_LOAD")
    private Double viralLoad;

    @Column(name = "CD4")
    private Double cd4;

    @Column(name = "CD4P")
    private Double cd4p;

    @ManyToOne
    @JoinColumn(name = "REGIMEN_TYPE_ID")
    private RegimenType regimenType;

    @ManyToOne
    @JoinColumn(name = "REGIMEN_ID")
    private Regimen regimen;

    @Column(name = "BODY_WEIGHT")
    private Double bodyWeight;

    @Column(name = "HEIGHT")
    private Double height;

    @Column(name = "WAIST")
    private Double waist;

    @Size(max = 7)
    @Column(name = "BP")
    private String bp;

    @Column(name = "PREGNANT")
    private Boolean pregnant;

    @Column(name = "LMP")
    private LocalDate lmp;

    @Column(name = "BREASTFEEDING")
    private Boolean breastfeeding;

    @Size(max = 5)
    @Column(name = "OI_SCREENED")
    private String oiScreened;

    @Size(max = 50)
    @Column(name = "STI_IDS")
    private String stiIds;

    @Size(max = 5)
    @Column(name = "STI_TREATED")
    private String stiTreated;

    @ManyToMany(cascade = {CascadeType.MERGE})
    @JoinTable(name = "clinic_opportunistic_infection",
            joinColumns = @JoinColumn(name = "clinic_id"),
            inverseJoinColumns = @JoinColumn(name = "opportunistic_infection_id"))
    @JsonIgnore
    Set<OpportunisticInfection> opportunisticInfections = new HashSet<>();

    @Size(max = 5)
    @Column(name = "ADR_SCREENED")
    private String adrScreened;

    @OneToMany(mappedBy = "clinic", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    List<ClinicAdverseDrugReaction> clinicAdverseDrugReactions = new ArrayList<>();

    @Size(max = 15)
    @Column(name = "ADHERENCE_LEVEL")
    private String adherenceLevel;

    @ManyToMany(cascade = {CascadeType.MERGE})
    @JoinTable(
            name = "clinic_adhere",
            joinColumns = @JoinColumn(name = "clinic_id"),
            inverseJoinColumns = @JoinColumn(name = "adhere_id"))
    @JsonIgnore
    Set<Adhere> adheres = new HashSet<>();

    @Column(name = "COMMENCE")
    private Boolean commence = false;

    @Column(name = "NEXT_APPOINTMENT")
    private LocalDate nextAppointment;

    @Size(max = 500)
    @Column(name = "NOTES")
    private String notes;

    @Size(max = 90)
    @Column(name = "GESTATIONAL_AGE")
    private String gestationalAge;

    @Size(max = 90)
    @Column(name = "MATERNAL_STATUS_ART")
    private String maternalStatusArt;

    @Type(type = "jsonb-node")
    @Column(columnDefinition = "jsonb")
    private JsonNode extra;
}
