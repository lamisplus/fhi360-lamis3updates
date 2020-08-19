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
@Table(name = "PARTNER_INFORMATION")
@Data
@SQLDelete(sql = "update partner_information set archived = true, last_modified = current_timestamp where id = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = false")
public class PartnerInformation extends TransactionEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Basic(optional = false)
    @NotNull
    @JoinColumn(name = "PATIENT_ID")
    @ManyToOne
    private Patient patient;

    @Column(name = "DATE_VISIT")
    private LocalDate dateVisit;

    @Size(max = 7)
    @Column(name = "PARTNER_NOTIFICATION")
    private String partnerNotification;

    @Size(max = 25)
    @Column(name = "PARTNER_HIV_STATUS")
    private String partnerHivStatus;

    @Size(max = 45)
    @Column(name = "PARTNER_REFERRED")
    private String partnerReferred;
}
