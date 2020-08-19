package org.lamisplus.modules.lamis.legacy.domain.entities;

import lombok.Data;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Data
public class AdverseDrugReaction implements Serializable, Persistable<Long> {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    private Long id;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "DESCRIPTION")
    private String description;

    @Size(max = 75)
    @Column(name = "ORGAN")
    private String organ;

    @Transient
    private String severity;

    @Override
    public boolean isNew() {
        return id == null;
    }
}
