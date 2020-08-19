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
@Table(name = "PRESCRIPTION")
@Data
@SQLDelete(sql = "update prescription set archived = true, last_modified = current_timestamp where id = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = false")
public class Prescription extends TransactionEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID")
    private Long id;

    @Basic(optional = false)
    @NotNull
    @JoinColumn(name = "PATIENT_ID")
    @ManyToOne
    private Patient patient;

    @Column(name = "DATE_VISIT")
    private LocalDate dateVisit;

    @Size(max = 100)
    @Column(name = "PRESCRIPTION_TYPE")
    private String prescriptionType;

    @JoinColumn(name = "LABTEST_ID")
    @ManyToOne
    private LabTest labTest;

    @JoinColumn(name = "REGIMEN_ID")
    @ManyToOne
    private Regimen regimen;

    @JoinColumn(name = "REGIMENTYPE_ID")
    @ManyToOne
    private RegimenType regimenType;

    @Column(name = "DURATION")
    private Integer duration;

    @Column(name = "STATUS")
    private Integer status;

    @Override
    public boolean isNew() {
        return id == null;
    }
}
