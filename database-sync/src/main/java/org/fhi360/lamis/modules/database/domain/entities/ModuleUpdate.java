package org.fhi360.lamis.modules.database.domain.entities;

import lombok.Data;
import org.springframework.data.domain.Persistable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

@Data
@Entity
public class ModuleUpdate implements Serializable, Persistable<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String fileName;

    private byte[] data;

    private Boolean install;

    private Boolean uninstall;

    @Override
    public boolean isNew() {
        return id == null;
    }
}
