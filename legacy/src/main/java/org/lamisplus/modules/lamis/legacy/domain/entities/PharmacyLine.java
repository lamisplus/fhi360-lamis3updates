package org.lamisplus.modules.lamis.legacy.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NonNull;
import org.hibernate.annotations.ResultCheckStyle;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@Data
@SQLDelete(sql = "update pharmacy_line set archived = true, last_modified = current_timestamp where id = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = false")
@EqualsAndHashCode(callSuper = true)
public class PharmacyLine extends TransactionEntity implements Serializable {
    public PharmacyLine() {}

    @ManyToOne
    @NonNull
    @JsonIgnore
    private Pharmacy pharmacy;

    @Basic(optional = false)
    @NotNull
    @JoinColumn(name = "PATIENT_ID")
    @ManyToOne
    @JsonIgnore
    private Patient patient;

    @Column(name = "DURATION")
    private Integer duration;

    @Column(name = "MORNING")
    private Double morning;

    @Column(name = "AFTERNOON")
    private Double afternoon;

    @Column(name = "EVENING")
    private Double evening;

    @Basic(optional = false)
    @NotNull
    @JoinColumn(name = "REGIMEN_TYPE_ID")
    @ManyToOne
    private RegimenType regimenType;

    @Basic(optional = false)
    @NotNull
    @JoinColumn(name = "REGIMEN_ID")
    @ManyToOne
    private Regimen regimen;

    @Basic(optional = false)
    @NotNull
    @JoinColumn(name = "REGIMEN_DRUG_ID")
    @ManyToOne
    private RegimenDrug regimenDrug;

    @Type(type = "jsonb-node")
    @Column(columnDefinition = "jsonb")
    private JsonNode extra;
}
