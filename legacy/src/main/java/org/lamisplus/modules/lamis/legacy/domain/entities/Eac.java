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
import java.time.LocalDateTime;

@Entity
@Table(name = "Eac")
@SQLDelete(sql = "update eac set archived = true, last_modified = current_timestamp where id = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = false")
@Data
public class Eac extends TransactionEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Basic(optional = false)
    @NotNull
    @JoinColumn(name = "PATIENT_ID")
    @ManyToOne
    private Patient patient;

    @Column(name = "DATE_EAC1")
    @NotNull
    private LocalDate dateEac1;

    @Column(name = "DATE_EAC2")
    private LocalDate dateEac2;

    @Column(name = "DATE_EAC3")
    private LocalDate dateEac3;

    @Column(name = "DATE_SAMPLE_COLLECTED")
    private LocalDateTime dateSampleCollected;

    @Size(max = 500)
    @Column(name = "NOTES")
    private String notes;

    @Column(name = "LAST_VIRAL_LOAD")
    private Double lastViralLoad;

    @Column(name = "DATE_LAST_VIRAL_LOAD")
    private LocalDate dateLastViralLoad;
}
