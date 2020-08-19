package org.lamisplus.modules.lamis.legacy.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@MappedSuperclass
@Data
@ToString(of = "id")
@EqualsAndHashCode(of = "id")
public abstract class TransactionEntity implements Serializable, Persistable<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    protected Long id;

    @Column(name = "LAST_MODIFIED")
    @JsonIgnore
    protected LocalDateTime lastModified;

    @Size(max = 36)
    @Column(name = "UUID")
    protected String uuid;

    @Basic(optional = false)
    @NotNull
    @ManyToOne
    @JoinColumn(name = "FACILITY_ID")
    protected Facility facility;

    protected Boolean archived = false;

    @Override
    public boolean isNew() {
        return id == null;
    }

    @PrePersist
    public void preSave() {
        uuid = UUID.randomUUID().toString();
        lastModified = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        if (uuid == null) {
            uuid = UUID.randomUUID().toString();
        }
        lastModified = LocalDateTime.now();
    }
}
