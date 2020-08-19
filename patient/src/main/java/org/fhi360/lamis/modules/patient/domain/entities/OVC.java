package org.fhi360.lamis.modules.patient.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.lamisplus.modules.lamis.legacy.domain.entities.Facility;
import org.lamisplus.modules.lamis.legacy.domain.entities.Patient;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "ovc")
@Data
public class OVC implements Serializable, Persistable<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    protected Long id;

    @NotNull
    private String householdUniqueNo;

    private String referredTo;

    private LocalDate dateReferredTo;

    private String referredFrom;

    private LocalDate dateReferredFrom;

    @OneToOne
    @NotNull
    private Patient patient;

    @ManyToOne
    @NotNull
    private Facility facility;

    @Column(name = "LAST_MODIFIED")
    @JsonIgnore
    protected LocalDateTime lastModified;

    private String uuid;

    private Boolean archived = false;

    @Override
    public boolean isNew() {
        return id == null;
    }

    @PrePersist
    public void update() {
        uuid = UUID.randomUUID().toString();
        lastModified = LocalDateTime.now();
    }

    @PreUpdate
    public void lastModified() {
        lastModified = LocalDateTime.now();
    }
}
