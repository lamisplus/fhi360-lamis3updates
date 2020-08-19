package org.lamisplus.modules.lamis.legacy.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.domain.Persistable;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "REGIMEN_DRUG")
@Data

public class RegimenDrug implements Serializable, Persistable<Long> {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    private Long id;

    @JoinColumn(name = "DRUG_ID")
    @ManyToOne(optional = false)
    @JsonIgnore
    private Drug drug;

    @JoinColumn(name = "REGIMEN_ID")
    @ManyToOne(optional = false)
    @JsonIgnore
    private Regimen regimen;

    @Override
    public boolean isNew() {
        return id == null;
    }
}
