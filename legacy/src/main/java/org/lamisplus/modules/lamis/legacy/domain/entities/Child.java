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
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "CHILD")
@SQLDelete(sql = "update child set archived = true, last_modified = current_timestamp where id = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = false")
@Data
public class Child extends TransactionEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Basic(optional = false)
    @NotNull
    @JoinColumn(name = "PATIENT_ID")
    @ManyToOne
    private Patient patient;

    @JoinColumn(name = "DELIVERY_ID")
    @ManyToOne
    @JsonIgnore
    private Delivery delivery;

    @Size(max = 36)
    @Column(name = "REFERENCE_NUM")
    private String referenceNum;

    @JoinColumn(name = "ANC_ID")
    @ManyToOne
    private Anc anc;

    @Column(name = "DATE_BIRTH")
    @Temporal(TemporalType.DATE)
    private Date dateBirth;

    @Size(max = 25)
    @Column(name = "HOSPITAL_NUMBER")
    private String hospitalNumber;

    @Size(max = 45)
    @Column(name = "SURNAME")
    private String surname;

    @Size(max = 75)
    @Column(name = "OTHER_NAMES")
    private String otherNames;

    @Size(max = 7)
    @Column(name = "GENDER")
    private String gender;

    @Column(name = "BODY_WEIGHT")
    private Double bodyWeight;

    @Column(name = "APGAR_SCORE")
    private Integer apgarScore;

    @Size(max = 45)
    @Column(name = "STATUS")
    private String status;

    @Size(max = 45)
    @Column(name = "ARV")
    private String arv;

    @Size(max = 45)
    @Column(name = "HEPB")
    private String hepb;

    @Size(max = 70)
    @Column(name = "REGISTRATION_STATUS")
    private String registrationStatus;

    @Size(max = 120)
    @Column(name = "ARV_TIMING")
    private String arvTiming;

    @Size(max = 45)
    @Column(name = "HBV")
    private String hbv;

    @JoinColumn(name = "MOTHER_ID")
    @ManyToOne
    private MotherInformation mother;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "child", fetch = FetchType.LAZY, orphanRemoval = true)
    private List<ChildFollowup> childFollowups;
}
