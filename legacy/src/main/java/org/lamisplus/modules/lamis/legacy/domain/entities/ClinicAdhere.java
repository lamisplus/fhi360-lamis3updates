package org.lamisplus.modules.lamis.legacy.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.ResultCheckStyle;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@SQLDelete(sql = "update clinic_adhere set archived = true, last_modified = current_timestamp where id = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = false")
@Data
@EqualsAndHashCode(of = {"clinic", "adhere"})
public class ClinicAdhere implements Serializable, Persistable<Long> {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clinic_id")
    @JsonIgnore
    private Clinic clinic;

    @ManyToOne
    @JoinColumn(name = "adhere_id")
    private Adhere adhere;

    Boolean archived = false;

    private String uuid;

    private LocalDateTime lastModified;

    @PrePersist
    public void prePersist() {
        lastModified = LocalDateTime.now();
        uuid = UUID.randomUUID().toString();
    }

    @PreUpdate
    public void preUpdate() {
        lastModified = LocalDateTime.now();
    }

    @Override
    public boolean isNew() {
        return id == null;
    }
}
