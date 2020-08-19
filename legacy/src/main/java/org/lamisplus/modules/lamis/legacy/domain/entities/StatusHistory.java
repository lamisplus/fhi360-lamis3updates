package org.lamisplus.modules.lamis.legacy.domain.entities;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.ResultCheckStyle;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.Where;
import org.lamisplus.modules.lamis.legacy.domain.entities.enumerations.ClientStatus;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "STATUS_HISTORY")
@Data
@EqualsAndHashCode(of = "id", callSuper = false)
@SQLDelete(sql = "update status_history set archived = true, last_modified = current_timestamp where id = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = false")
public class StatusHistory extends TransactionEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Basic(optional = false)
    @NotNull
    @JoinColumn(name = "PATIENT_ID")
    @ManyToOne
    private Patient patient;

    @Enumerated(EnumType.STRING)
    private ClientStatus status;

    @Column(name = "DATE_STATUS")
    private LocalDate dateStatus;

    @Enumerated(EnumType.STRING)
    private ClientStatus outcome;

    @Column(name = "AGREED_DATE")
    private LocalDate agreedDate;

    @Size(max = 100)
    @Column(name = "REASON_FOR_INTERRUPTION")
    private String reasonForInterruption;

    @Column(name = "DATE_TRACKED")
    private LocalDate dateTracked;

    @Size(max = 100)
    @Column(name = "CAUSE_OF_DEATH")
    private String causeOfDeath;

    private Boolean auto = false;

    @Type(type = "jsonb-node")
    @Column(columnDefinition = "jsonb")
    private JsonNode extra;
}
