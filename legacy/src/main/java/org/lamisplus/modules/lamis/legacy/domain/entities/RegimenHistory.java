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
@Table(name = "REGIMEN_HISTORY")
@Data
@SQLDelete(sql = "update regimen_history set archived = true, last_modified = current_timestamp where id = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = false")
public class RegimenHistory extends TransactionEntity implements Serializable {

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

    @JoinColumn(name = "REGIMEN_TYPE_ID")
    @ManyToOne
    private RegimenType regimenType;

    @JoinColumn(name = "REGIMEN_ID")
    @ManyToOne
    private Regimen regimen;

    @Size(max = 100)
    @Column(name = "REASON_SWITCHED_SUBS")
    private String reasonSwitchedSubs;
}
