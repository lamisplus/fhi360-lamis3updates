/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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
import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 *
 * @author User10
 */
@Entity
@Table(name = "PHARMACY")
@Data
@SQLDelete(sql = "update pharmacy set archived = true, last_modified = current_timestamp where id = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = false")
@ToString(of = "dateVisit", callSuper = true)
@EqualsAndHashCode(of = {"patient", "dateVisit"}, callSuper = true)
public class Pharmacy extends TransactionEntity implements Serializable {

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

    @Column(name = "ADR_SCREENED")
    private Boolean adrScreened;

    @Column(name = "PRESCRIPTION_ERROR")
    private Boolean prescriptionError;

    @Column(name = "ADHERENCE")
    private Boolean adherence;

    @Column(name = "MMD_TYPE")
    private String mmdType;

    @Column(name = "NEXT_APPOINTMENT")
    private LocalDate nextAppointment;

    @Type(type = "jsonb-node")
    @Column(columnDefinition = "jsonb")
    private JsonNode extra;

    @OneToMany(mappedBy = "pharmacy", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<PharmacyLine> lines = new ArrayList<>();

    @OneToMany(mappedBy = "pharmacy", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<PharmacyAdverseDrugReaction> adrs = new ArrayList<>();

}
