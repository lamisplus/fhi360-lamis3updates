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
@Table(name = "PATIENT_CASE_MANAGER")
@SQLDelete(sql = "update patient_case_manager set archived = true, last_modified = current_timestamp where id = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = false")
@Data
public class PatientCaseManager extends TransactionEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    private Long id;

    @Basic(optional = false)
    @NotNull
    @JoinColumn(name = "PATIENT_ID")
    @ManyToOne
    private Patient patient;

    @JoinColumn(name = "CASE_MANAGER_ID", nullable = false)
    @ManyToOne
    private CaseManager caseManager;

    @Column(name = "DATE_ASSIGNED")
    private LocalDate dateAssigned;

    @Size(max = 120)
    @Column(name = "ACTION")
    private String action;

    @Override
    public boolean isNew() {
        return id == null;
    }
}
