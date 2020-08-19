package org.lamisplus.modules.lamis.legacy.domain.entities;

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
@SQLDelete(sql = "update pharmacy_adverse_drug_reaction set archived = true, last_modified = current_timestamp where id = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = false")
@Data
@EqualsAndHashCode(of = {"pharmacy", "adverseDrugReaction"})
public class PharmacyAdverseDrugReaction implements Serializable, Persistable<Long> {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pharmacy_id")
    private Pharmacy pharmacy;

    @ManyToOne
    @JoinColumn(name = "adverse_drug_reaction_id")
    private AdverseDrugReaction adverseDrugReaction;

    Boolean archived = false;

    private String severity;

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
