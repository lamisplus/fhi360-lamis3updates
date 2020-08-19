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
@Table(name = "NIGQUAL")
@Data
@SQLDelete(sql = "update nigqual set archived = true, last_modified = current_timestamp where id = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = false")
public class Nigqual extends TransactionEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Basic(optional = false)
    @NotNull
    @JoinColumn(name = "PATIENT_ID")
    @ManyToOne
    private Patient patient;

    @Basic(optional = false)
    @NotNull
    @Column(name = "PORTAL_ID")
    private Long portalId;

    @Basic(optional = false)
    @NotNull
    @Column(name = "REVIEW_PERIOD_ID")
    private Integer reviewPeriodId;

    @Size(max = 2)
    @Column(name = "THERMATIC_AREA")
    private String thermaticArea;

    @Column(name = "REPORTING_DATE_BEGIN")
    private LocalDate reportingDateBegin;

    @Column(name = "REPORTING_DATE_END")
    private LocalDate reportingDateEnd;

    @Column(name = "POPULATION")
    private Integer population;

    @Column(name = "SAMPLE_SIZE")
    private Integer sampleSize;
}
