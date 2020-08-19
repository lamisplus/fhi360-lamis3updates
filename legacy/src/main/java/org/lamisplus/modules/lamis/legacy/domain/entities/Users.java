package org.lamisplus.modules.lamis.legacy.domain.entities;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;

@Entity
@Data
@EqualsAndHashCode(of = "facility")
public class Users implements Persistable<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    private Long id;

    private String login;

    @ManyToOne
    private Facility facility;

    @Override
    public boolean isNew() {
        return id == null;
    }
}
