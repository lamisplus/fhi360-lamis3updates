package org.lamisplus.modules.lamis.legacy.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;
import org.lamisplus.modules.base.domain.entities.Province;
import org.lamisplus.modules.base.domain.entities.State;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table(name = "FACILITY")
@Data
@ToString(of = "name")
public class Facility implements Serializable, Persistable<Long> {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    private Long id;

    @Basic(optional = false)
    @NotNull
    @JoinColumn(name = "STATE_ID")
    @ManyToOne
    @JsonIgnore
    private State state;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "NAME")
    private String name;

    @Size(max = 45)
    @Column(name = "FACILITY_TYPE")
    private String facilityType;

    @Size(max = 45)
    @Column(name = "ADDRESS1")
    private String address1;

    @Size(max = 45)
    @Column(name = "ADDRESS2")
    private String address2;

    @Size(max = 25)
    @Column(name = "PHONE1")
    private String phone1;

    @Size(max = 25)
    @Column(name = "PHONE2")
    private String phone2;

    @Size(max = 45)
    @Column(name = "EMAIL")
    private String email;

    @Column(name = "PAD_HOSPITAL_NUM")
    private Integer padHospitalNum;

    @Column(name = "DAY_DQA")
    private Integer dayDqa;

    @Column(name = "ACTIVE")
    private Boolean active;

    @Size(max = 45)
    @Column(name = "DATIM_ID")
    private String datimId;

    @JoinColumn(name = "LGA_ID")
    @ManyToOne(optional = false)
    private Province lga;

    @Override
    public boolean isNew() {
        return id == null;
    }
}
