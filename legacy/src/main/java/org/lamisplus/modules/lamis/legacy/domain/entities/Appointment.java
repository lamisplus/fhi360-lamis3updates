package org.lamisplus.modules.lamis.legacy.domain.entities;

import lombok.Data;
import org.hibernate.annotations.ResultCheckStyle;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "APPOINTMENT")
@Data
@Where(clause = "archived = false")
@SQLDelete(sql = "update appointment set archived = true, last_modified = current_timestamp where id = ?", check = ResultCheckStyle.COUNT)
public class Appointment extends TransactionEntity implements Serializable {
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

    @Basic(optional = false)
    @NotNull
    @JoinColumn(name = "COMMUNITY_PHARMACY_ID")
    @ManyToOne
    private CommunityPharmacy communityPharmacy;

    @Column(name = "DATE_LAST_VISIT")
    private LocalDate dateLastVisit;

    @Column(name = "DATE_NEXT_VISIT")
    private LocalDate dateNextVisit;

    @Column(name = "DATE_TRACKED")
    private LocalDate dateTracked;

    @Size(max = 15)
    @Column(name = "TYPE_TRACKING")
    private String typeTracking;

    @Size(max = 15)
    @Column(name = "TRACKING_OUTCOME")
    private String trackingOutcome;

    @Column(name = "DATE_AGREED")
    private LocalDate dateAgreed;
}
