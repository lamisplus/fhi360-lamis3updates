package org.lamisplus.modules.lamis.legacy.domain.entities;

import lombok.Data;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "DM_SCREEN")
@Data
public class DMScreen implements Serializable, Persistable<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    private Long id;

    private String description;

    @Override
    public boolean isNew() {
        return id == null;
    }
}
