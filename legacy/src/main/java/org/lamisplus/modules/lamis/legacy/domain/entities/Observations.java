package org.lamisplus.modules.lamis.legacy.domain.entities;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import org.hibernate.annotations.*;
import org.springframework.data.domain.Persistable;

import javax.persistence.Entity;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@SQLDelete(sql = "update observations set archived = true where id = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = false")
public class Observations implements Serializable, Persistable<String> {
    @Id
    @GeneratedValue( generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Basic(optional = false)
    @Column(name = "ID")
    private String id;

    @JoinColumn(name = "PATIENT_ID", referencedColumnName = "UUID")
    @ManyToOne(optional = false)
    private Patient patient;

    @JoinColumn(name = "FACILITY_ID")
    @ManyToOne(optional = false)
    private Facility facility;

    @NotNull
    private String type;

    @Type(type = "jsonb-node")
    @Column(columnDefinition = "jsonb")
    private JsonNode data;

    @NotNull
    private LocalDate date;

    private Boolean archived = false;

    private LocalDateTime lastModified;

    @Override
    public boolean isNew() {
        return id == null;
    }

    @PrePersist
    @PreUpdate
    public void update() {
        lastModified = LocalDateTime.now();
    }
}
